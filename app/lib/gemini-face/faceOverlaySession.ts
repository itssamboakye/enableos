import { GoogleGenAI, Modality, ThinkingLevel } from "@google/genai";
import { parseEmotionOutput, type ParsedEmotionOutput } from "./emotionParser";

const SYSTEM_INSTRUCTION = `You are a facial expression analyzer for sales coaching. You receive webcam video frames only.

NEVER speak conversationally. Your entire response must be ONLY one JSON object — nothing before or after.

Output this exact shape every turn:
{"video":{"emotions":[{"label":"interest","confidence":72},{"label":"concentration","confidence":55}],"faceDetected":true}}

Rules:
- Infer ONLY from facial expression in the latest frame(s)
- Use rich expression labels (examples): interest, concentration, joy, excitement, calmness, anxiety, pride, satisfaction, boredom, confusion, doubt, admiration, amusement, determination, surprise, relief, neutral
- SALES COACHING BIAS — important:
  - Quiet, listening, resting, or neutral faces → prefer neutral, calmness, boredom, concentration, interest (low-intensity). Do NOT default to disappointment, disgust, anger, contempt, or sadness.
  - Only use disappointment, anger, disgust, contempt, sadness when the expression is clearly and strongly visible (confidence 70+).
  - Subtle flat affect is "neutral" or "boredom", not "disappointment" or "frustration".
- Do NOT use "flat" — use "reserved" or "neutral" for low affect
- confidence: integer 0-100 (not decimals)
- max 3 emotions, highest first
- video.faceDetected: true only if a face is clearly visible`;

const FACE_READ_PROMPT = "Report facial emotions as JSON only (video channel). No other text.";

const READ_THROTTLE_MS = 1000;
const READ_TIMEOUT_MS = 3000;

export interface FaceOverlayUpdate extends ParsedEmotionOutput {
  latencyMs: number | null;
}

export interface FaceOverlaySessionOptions {
  apiKey: string;
  model: string;
  onFaceUpdate: (data: FaceOverlayUpdate) => void;
  onStatus?: (data: { type: string; message?: string }) => void;
  onGoAway?: (goAway: { timeLeft?: string }) => void;
}

export class FaceOverlaySession {
  #ai: GoogleGenAI;
  #model: string;
  #session: Awaited<ReturnType<GoogleGenAI["live"]["connect"]>> | null = null;
  #resumptionHandle: string | null = null;
  #closed = false;
  #lastInputAt: number | null = null;
  #lastReadRequestAt = 0;
  #readInFlight = false;
  #pendingRead = false;
  #readTimeoutId: ReturnType<typeof setTimeout> | null = null;
  #throttleTimerId: ReturnType<typeof setTimeout> | null = null;
  #transcriptionBuffer = "";
  #videoFramesReceived = 0;
  #onFaceUpdate: (data: FaceOverlayUpdate) => void;
  #onStatus?: FaceOverlaySessionOptions["onStatus"];
  #onGoAway?: FaceOverlaySessionOptions["onGoAway"];

  constructor({ apiKey, model, onFaceUpdate, onStatus, onGoAway }: FaceOverlaySessionOptions) {
    this.#ai = new GoogleGenAI({ apiKey });
    this.#model = model;
    this.#onFaceUpdate = onFaceUpdate;
    this.#onStatus = onStatus;
    this.#onGoAway = onGoAway;
  }

  async start() {
    await this.#connect();
    this.#scheduleEmotionRead();
  }

  async #connect() {
    const self = this;

    return new Promise<void>((resolve, reject) => {
      let opened = false;

      this.#ai.live
        .connect({
          model: this.#model,
          config: {
            responseModalities: [Modality.AUDIO],
            outputAudioTranscription: {},
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
            contextWindowCompression: { slidingWindow: {} },
            sessionResumption: this.#resumptionHandle
              ? { handle: this.#resumptionHandle }
              : undefined,
            systemInstruction: SYSTEM_INSTRUCTION,
          },
          callbacks: {
            onopen: () => {
              opened = true;
              self.#onStatus?.({ type: "connected", message: "Gemini face overlay connected" });
              resolve();
            },
            onmessage: (message) => {
              self.#handleMessage(message);
            },
            onerror: (err) => {
              const message = err?.message ?? String(err);
              self.#onStatus?.({ type: "error", message });
              if (!opened) reject(err);
            },
            onclose: () => {
              if (!self.#closed) {
                self.#onStatus?.({ type: "disconnected", message: "Gemini session closed" });
              }
            },
          },
        })
        .then((session) => {
          self.#session = session;
        })
        .catch(reject);
    });
  }

  #handleMessage(message: {
    sessionResumptionUpdate?: { resumable?: boolean; newHandle?: string };
    goAway?: { timeLeft?: string };
    serverContent?: {
      outputTranscription?: { text?: string };
      modelTurn?: { parts?: Array<{ text?: string }> };
      turnComplete?: boolean;
      generationComplete?: boolean;
    };
  }) {
    if (message.sessionResumptionUpdate?.resumable) {
      const handle = message.sessionResumptionUpdate.newHandle;
      if (handle) this.#resumptionHandle = handle;
    }

    if (message.goAway) {
      this.#onGoAway?.(message.goAway);
    }

    const sc = message.serverContent;
    if (!sc) return;

    const chunk = sc.outputTranscription?.text ?? "";
    const partsText =
      sc.modelTurn?.parts
        ?.map((p) => p.text)
        .filter(Boolean)
        .join("") ?? "";

    if (chunk) this.#transcriptionBuffer += chunk;
    if (partsText) this.#transcriptionBuffer += partsText;

    const isTurnDone = Boolean(sc.turnComplete || sc.generationComplete);
    if (this.#transcriptionBuffer.trim()) {
      const buffered = this.#transcriptionBuffer.trim();
      const parsed = parseEmotionOutput(buffered);
      if (parsed.success) {
        this.#emitFace(buffered, parsed);
        this.#transcriptionBuffer = "";
      } else if (isTurnDone) {
        if (!parsed.skipped) {
          this.#emitFace(buffered, parsed);
        }
        this.#transcriptionBuffer = "";
      }
    }

    if (isTurnDone) {
      this.#completeReadTurn();
    }
  }

  #emitFace(transcription: string, parsed: ParsedEmotionOutput) {
    const latencyMs = this.#lastInputAt ? Date.now() - this.#lastInputAt : null;
    this.#onFaceUpdate({ ...parsed, latencyMs });
  }

  #scheduleEmotionRead() {
    this.#pendingRead = true;
    this.#maybeRequestEmotionRead();
  }

  #maybeRequestEmotionRead() {
    if (!this.#session || this.#closed) return;
    if (!this.#pendingRead) return;
    if (this.#readInFlight) return;

    const now = Date.now();
    const elapsed = now - this.#lastReadRequestAt;
    if (elapsed < READ_THROTTLE_MS) {
      if (!this.#throttleTimerId) {
        this.#throttleTimerId = setTimeout(() => {
          this.#throttleTimerId = null;
          this.#maybeRequestEmotionRead();
        }, READ_THROTTLE_MS - elapsed);
      }
      return;
    }

    this.#pendingRead = false;
    this.#sendEmotionRead();
  }

  #sendEmotionRead() {
    if (!this.#session || this.#closed) return;

    try {
      this.#session.sendClientContent({
        turns: FACE_READ_PROMPT,
        turnComplete: true,
      });
      this.#readInFlight = true;
      this.#lastReadRequestAt = Date.now();
      if (this.#readTimeoutId) clearTimeout(this.#readTimeoutId);
      this.#readTimeoutId = setTimeout(
        () => this.#completeReadTurn({ timedOut: true }),
        READ_TIMEOUT_MS
      );
      this.#onStatus?.({ type: "read_requested", message: "Requesting face read…" });
    } catch {
      this.#readInFlight = false;
      if (this.#pendingRead) this.#maybeRequestEmotionRead();
    }
  }

  #completeReadTurn({ timedOut = false } = {}) {
    if (this.#readTimeoutId) {
      clearTimeout(this.#readTimeoutId);
      this.#readTimeoutId = null;
    }

    const wasInFlight = this.#readInFlight;
    if (!wasInFlight && !timedOut) return;

    this.#readInFlight = false;

    if (timedOut && wasInFlight) {
      this.#transcriptionBuffer = "";
      this.#onStatus?.({ type: "read_timeout", message: "Face read timed out" });
    }

    if (this.#pendingRead) {
      this.#maybeRequestEmotionRead();
    }
  }

  #clearReadSchedulers() {
    if (this.#readTimeoutId) {
      clearTimeout(this.#readTimeoutId);
      this.#readTimeoutId = null;
    }
    if (this.#throttleTimerId) {
      clearTimeout(this.#throttleTimerId);
      this.#throttleTimerId = null;
    }
    this.#readInFlight = false;
    this.#pendingRead = false;
  }

  sendVideoFrame(jpegBase64: string) {
    if (!this.#session || this.#closed) return;
    this.#videoFramesReceived += 1;
    this.#lastInputAt = Date.now();
    this.#session.sendRealtimeInput({
      video: {
        data: jpegBase64,
        mimeType: "image/jpeg",
      },
    });
    this.#scheduleEmotionRead();
  }

  async reconnect() {
    this.#clearReadSchedulers();
    try {
      this.#session?.close();
    } catch {
      /* ignore */
    }
    this.#session = null;
    await this.#connect();
    this.#scheduleEmotionRead();
  }

  async end() {
    this.#closed = true;
    this.#clearReadSchedulers();
    try {
      this.#session?.close();
    } catch {
      /* ignore */
    }
    this.#session = null;
  }
}

export function getGeminiFaceModel(): string {
  return process.env.GEMINI_LIVE_MODEL ?? "gemini-3.1-flash-live-preview";
}
