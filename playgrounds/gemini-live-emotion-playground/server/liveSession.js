import { GoogleGenAI, Modality } from "@google/genai";
import { parseEmotionOutput } from "./emotionParser.js";

const SYSTEM_INSTRUCTION = `You are an emotion-reading assistant for sales coaching. You receive webcam video frames and microphone audio.

NEVER speak conversationally. Your entire response must be ONLY one JSON object — nothing before or after.

Output this exact shape every turn:
{"video":{"emotions":[{"label":"interest","confidence":72},{"label":"concentration","confidence":55}],"faceDetected":true},"audio":{"emotions":[{"label":"nervousness","confidence":40}]},"combined":{"emotions":[{"label":"engaged","confidence":68}]}}

Rules:
- video: infer ONLY from facial expression in the latest frame(s)
- audio: infer ONLY from vocal tone, pace, and prosody in recent audio
- combined: holistic read from both face and voice
- Use rich expression labels from this set (examples): interest, concentration, joy, excitement, calmness, anxiety, nervousness, pride, satisfaction, boredom, confusion, doubt, admiration, amusement, determination, disappointment, reserved, neutral, engaged, confident, enthusiastic, frustrated, hesitant, nervous
- Do NOT use "flat" — use "reserved" or "neutral" for low affect
- confidence: integer 0-100 (not decimals)
- max 3 emotions per channel, highest first
- video.faceDetected: true only if a face is clearly visible`;

/** Rough Live API cost estimate (USD) — verify against current pricing page. */
export function estimateCostUsd({ durationMs, videoMode, emotionUpdates }) {
  const minutes = durationMs / 60000;
  const audioInPerMin = 0.005;
  const videoInPerMin = 0.002;
  const audioOutPerMin = 0.018;
  const hasAudio = videoMode === "video+audio" || videoMode === "audio-only";
  const hasVideo = videoMode === "video+audio" || videoMode === "video-only";
  const audioIn = hasAudio ? audioInPerMin * minutes : 0;
  const videoIn = hasVideo ? videoInPerMin * minutes : 0;
  const audioOut = audioOutPerMin * minutes;
  const turnOverhead = (emotionUpdates ?? 0) * 0.0005;
  return Math.round((audioIn + videoIn + audioOut + turnOverhead) * 10000) / 10000;
}

const EMOTION_READ_PROMPT =
  "Report video, audio, and combined emotions as JSON only (video/audio/combined channels). No other text.";

const FAST_FACE_SYSTEM_INSTRUCTION = `You are a facial expression analyzer for sales coaching. You receive webcam video frames only.

NEVER speak conversationally. Your entire response must be ONLY one JSON object — nothing before or after.

Output this exact shape every turn:
{"video":{"emotions":[{"label":"interest","confidence":72},{"label":"concentration","confidence":55}],"faceDetected":true}}

Rules:
- Infer ONLY from facial expression in the latest frame(s)
- Use rich expression labels (examples): interest, concentration, joy, excitement, calmness, anxiety, pride, satisfaction, boredom, confusion, doubt, admiration, amusement, determination, disappointment, reserved, neutral, engaged, confident, enthusiastic, frustrated
- Do NOT use "flat" — use "reserved" or "neutral" for low affect
- confidence: integer 0-100 (not decimals)
- max 3 emotions, highest first
- video.faceDetected: true only if a face is clearly visible`;

const FAST_FACE_READ_PROMPT =
  "Report facial emotions as JSON only (video channel). No other text.";

const READ_THROTTLE_MS = { default: 1500, fastFace: 1000 };
const READ_TIMEOUT_MS = 3000;

export class LiveEmotionSession {
  #ai;
  #model;
  #mode;
  #session = null;
  #resumptionHandle = null;
  #closed = false;
  #lastInputAt = null;
  #lastReadRequestAt = 0;
  #readInFlight = false;
  #pendingRead = false;
  #readTimeoutId = null;
  #throttleTimerId = null;
  #transcriptionBuffer = "";
  #audioChunksReceived = 0;
  #videoFramesReceived = 0;
  #onEmotionUpdate;
  #onStatus;
  #onGoAway;
  #logger;
  #onSessionLog;
  #debug;
  #audioReadInterval = null;
  #fastFaceMode = false;

  constructor({
    apiKey,
    model,
    mode,
    fastFaceMode,
    logger,
    onEmotionUpdate,
    onStatus,
    onGoAway,
    onSessionLog,
    debug,
  }) {
    this.#ai = new GoogleGenAI({ apiKey });
    this.#model = model;
    this.#mode = mode;
    this.#fastFaceMode = Boolean(fastFaceMode) && mode === "video-only";
    this.#logger = logger;
    this.#onEmotionUpdate = onEmotionUpdate;
    this.#onStatus = onStatus;
    this.#onGoAway = onGoAway;
    this.#onSessionLog = onSessionLog;
    this.#debug = debug ?? process.env.LOG_LEVEL === "debug";
  }

  #readThrottleMs() {
    return this.#fastFaceMode ? READ_THROTTLE_MS.fastFace : READ_THROTTLE_MS.default;
  }

  #log(category, message, data = {}) {
    if (this.#fastFaceMode && category === "audio") return;
    const payload = { category, message, ...data };
    if (this.#fastFaceMode) {
      delete payload.voice;
      delete payload.combined;
      delete payload.coaching;
      delete payload.serverAudioChunks;
    }
    this.#onSessionLog?.(payload);
  }

  #systemInstructionForMode() {
    if (this.#fastFaceMode) {
      return FAST_FACE_SYSTEM_INSTRUCTION;
    }
    if (this.#mode === "audio-only") {
      return `${SYSTEM_INSTRUCTION}

SESSION MODE: audio-only. No video input. Set video.emotions to [] and video.faceDetected to false. Infer audio and combined from vocal tone only.`;
    }
    if (this.#mode === "video-only") {
      return `${SYSTEM_INSTRUCTION}

SESSION MODE: video-only. No audio input. Set audio.emotions to []. Infer video and combined from facial expression only.`;
    }
    return SYSTEM_INSTRUCTION;
  }

  async start() {
    await this.#connect();
    const fastNote = this.#fastFaceMode ? `, fastFace=1s reads` : "";
    this.#log("session", `Gemini Live connected (mode=${this.#mode}, model=${this.#model}${fastNote})`, {
      readIntervalMs: this.#readThrottleMs(),
      readTimeoutMs: READ_TIMEOUT_MS,
      fastFaceMode: this.#fastFaceMode,
    });
    this.#scheduleEmotionRead();
    if (this.#mode === "audio-only") {
      this.#audioReadInterval = setInterval(() => this.#scheduleEmotionRead(), 2000);
    }
  }

  async #connect() {
    const self = this;

    return new Promise((resolve, reject) => {
      let opened = false;

      this.#ai.live
        .connect({
          model: this.#model,
          config: {
            responseModalities: [Modality.AUDIO],
            outputAudioTranscription: {},
            thinkingConfig: { thinkingLevel: "minimal" },
            contextWindowCompression: { slidingWindow: {} },
            sessionResumption: this.#resumptionHandle
              ? { handle: this.#resumptionHandle }
              : undefined,
            systemInstruction: this.#systemInstructionForMode(),
          },
          callbacks: {
            onopen: () => {
              opened = true;
              self.#onStatus?.({ type: "connected", model: self.#model, mode: self.#mode });
              resolve();
            },
            onmessage: (message) => {
              self.#handleMessage(message);
            },
            onerror: (err) => {
              self.#logger?.log("gemini_error", { message: err?.message ?? String(err) });
              self.#onStatus?.({ type: "error", message: err?.message ?? String(err) });
              if (!opened) reject(err);
            },
            onclose: (evt) => {
              self.#logger?.log("gemini_close", { reason: evt?.reason, code: evt?.code });
              if (!self.#closed) {
                self.#onStatus?.({ type: "disconnected", reason: evt?.reason });
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

  #handleMessage(message) {
    if (message.sessionResumptionUpdate?.resumable) {
      const handle = message.sessionResumptionUpdate.newHandle;
      if (handle) {
        this.#resumptionHandle = handle;
        this.#logger?.log("resumption_handle", { handle: handle.slice(0, 16) });
      }
    }

    if (message.goAway) {
      this.#logger?.log("go_away", { timeLeft: message.goAway.timeLeft });
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

    if (this.#debug) {
      console.log("[gemini]", {
        chunk: chunk.slice(0, 80),
        turnComplete: sc.turnComplete,
        generationComplete: sc.generationComplete,
        bufferLen: this.#transcriptionBuffer.length,
      });
    }

    const isTurnDone = Boolean(sc.turnComplete || sc.generationComplete);
    if (this.#transcriptionBuffer.trim()) {
      const buffered = this.#transcriptionBuffer.trim();
      const parsed = parseEmotionOutput(buffered);
      if (parsed.success) {
        this.#emitEmotion(buffered, parsed);
        this.#transcriptionBuffer = "";
      } else if (isTurnDone) {
        if (!parsed.skipped) {
          this.#emitEmotion(buffered, parsed);
        }
        this.#transcriptionBuffer = "";
      }
    }

    if (isTurnDone) {
      this.#completeReadTurn();
    }
  }

  #emitEmotion(transcription, parsed) {
    const result = parsed ?? parseEmotionOutput(transcription);
    const latencyMs = this.#lastInputAt ? Date.now() - this.#lastInputAt : null;
    this.#logger?.logEmotion({ raw: transcription, parsed: result, latencyMs });

    const fmt = (list) =>
      list?.map((e) => `${e.label}:${e.confidence}%`).join(", ") || "—";

    const logData = {
      latencyMs,
      parseSuccess: result.success,
      parseMethod: result.method,
      face: fmt(result.channels?.video?.emotions),
      faceDetected: result.faceDetected,
      serverVideoFrames: this.#videoFramesReceived,
      rawSnippet: (transcription ?? "").slice(0, 300),
    };
    if (!this.#fastFaceMode) {
      logData.voice = fmt(result.channels?.audio?.emotions);
      logData.combined = fmt(result.channels?.combined?.emotions);
      logData.coaching = fmt(result.coaching);
      logData.serverAudioChunks = this.#audioChunksReceived;
    }
    this.#log(
      "emotion",
      result.success
        ? this.#fastFaceMode
          ? "Face read parsed"
          : "Emotion read parsed"
        : this.#fastFaceMode
          ? "Face read parse failed"
          : "Emotion read parse failed",
      logData
    );
    this.#onEmotionUpdate?.({
      ...result,
      latencyMs,
      transcription,
      inputStats: {
        videoFrames: this.#videoFramesReceived,
        audioChunks: this.#audioChunksReceived,
        mode: this.#mode,
      },
    });
  }

  getStats() {
    return {
      videoFrames: this.#videoFramesReceived,
      audioChunks: this.#audioChunksReceived,
      mode: this.#mode,
    };
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
    const throttleMs = this.#readThrottleMs();
    const elapsed = now - this.#lastReadRequestAt;
    if (elapsed < throttleMs) {
      if (!this.#throttleTimerId) {
        this.#throttleTimerId = setTimeout(() => {
          this.#throttleTimerId = null;
          this.#maybeRequestEmotionRead();
        }, throttleMs - elapsed);
      }
      return;
    }

    this.#pendingRead = false;
    this.#sendEmotionRead();
  }

  #sendEmotionRead() {
    if (!this.#session || this.#closed) return;

    const throttleMs = this.#readThrottleMs();
    try {
      this.#session.sendClientContent({
        turns: this.#fastFaceMode ? FAST_FACE_READ_PROMPT : EMOTION_READ_PROMPT,
        turnComplete: true,
      });
      this.#readInFlight = true;
      this.#lastReadRequestAt = Date.now();
      if (this.#readTimeoutId) clearTimeout(this.#readTimeoutId);
      this.#readTimeoutId = setTimeout(
        () => this.#completeReadTurn({ timedOut: true }),
        READ_TIMEOUT_MS
      );
      this.#onStatus?.({
        type: "read_requested",
        message: this.#fastFaceMode ? "Requesting face read…" : "Requesting emotion read…",
      });
      this.#log("read", this.#fastFaceMode ? "Face read requested" : "Emotion read requested", {
        serverVideoFrames: this.#videoFramesReceived,
        readIntervalMs: throttleMs,
        readInFlight: true,
        ...(this.#fastFaceMode ? {} : { serverAudioChunks: this.#audioChunksReceived }),
      });
    } catch (err) {
      this.#readInFlight = false;
      this.#logger?.log("read_request_error", { message: err?.message ?? String(err) });
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
      this.#log("read", this.#fastFaceMode ? "Face read timed out" : "Emotion read timed out", {
        timeoutMs: READ_TIMEOUT_MS,
        serverVideoFrames: this.#videoFramesReceived,
      });
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

  sendVideoFrame(jpegBase64) {
    if (!this.#session || this.#closed || this.#mode === "audio-only") return;
    this.#videoFramesReceived += 1;
    this.#lastInputAt = Date.now();
    this.#logger?.markInput();
    this.#session.sendRealtimeInput({
      video: {
        data: jpegBase64,
        mimeType: "image/jpeg",
      },
    });
    this.#scheduleEmotionRead();
  }

  sendAudioChunk(pcmBase64) {
    if (!this.#session || this.#closed) return;
    if (this.#mode !== "video+audio" && this.#mode !== "audio-only") return;
    this.#audioChunksReceived += 1;
    this.#lastInputAt = Date.now();
    this.#logger?.markInput();
    this.#session.sendRealtimeInput({
      audio: {
        data: pcmBase64,
        mimeType: "audio/pcm;rate=16000",
      },
    });

    if (this.#audioChunksReceived === 1) {
      this.#log("audio", "First PCM chunk received by server");
    } else if (this.#audioChunksReceived % 100 === 0) {
      this.#log("audio", `${this.#audioChunksReceived} PCM chunks received by server`, {
        serverAudioChunks: this.#audioChunksReceived,
      });
    }
  }

  async reconnect() {
    this.#clearReadSchedulers();
    this.#logger?.logReconnect("manual_or_goaway");
    try {
      this.#session?.close();
    } catch {
      /* ignore */
    }
    this.#session = null;
    await this.#connect();
  }

  async end() {
    this.#closed = true;
    this.#clearReadSchedulers();
    if (this.#audioReadInterval) {
      clearInterval(this.#audioReadInterval);
      this.#audioReadInterval = null;
    }
    try {
      this.#session?.close();
    } catch {
      /* ignore */
    }
    this.#session = null;
  }
}
