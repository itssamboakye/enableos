import {
  coachingRollup,
  isKnownExpression,
  normalizeLabel,
  type ScoredEmotion,
} from "./emotionTaxonomy";

const CHANNELS = ["video", "audio", "combined"] as const;

export interface EmotionChannel {
  emotions: ScoredEmotion[];
  faceDetected: boolean | null;
}

export interface ParsedEmotionOutput {
  success: boolean;
  skipped?: boolean;
  method: string;
  raw: string;
  channels: Record<(typeof CHANNELS)[number], EmotionChannel>;
  coaching: ScoredEmotion[];
  faceDetected: boolean | null;
  emotions: ScoredEmotion[];
}

function clampConfidence(value: unknown): number {
  const n = typeof value === "number" ? value : parseFloat(String(value));
  if (Number.isNaN(n)) return 0;
  if (n <= 1) return Math.round(n * 100);
  return Math.round(Math.min(100, Math.max(0, n)));
}

function normalizeEmotionList(raw: unknown, max = 5): ScoredEmotion[] {
  if (!Array.isArray(raw)) return [];

  const seen = new Set<string>();
  const out: ScoredEmotion[] = [];

  for (const e of raw) {
    if (!e || typeof e !== "object") continue;
    const item = e as { label?: string; name?: string; confidence?: number; score?: number };
    const label = normalizeLabel(item.label ?? item.name);
    if (!label || seen.has(label)) continue;
    const confidence = clampConfidence(item.confidence ?? item.score ?? 0);
    if (confidence <= 0) continue;
    seen.add(label);
    out.push({ label, confidence });
  }

  return out.sort((a, b) => b.confidence - a.confidence).slice(0, max);
}

function parseChannelBlock(block: unknown): EmotionChannel {
  if (!block || typeof block !== "object") {
    return { emotions: [], faceDetected: null };
  }
  const b = block as { emotions?: unknown; faceDetected?: boolean | null };
  return {
    emotions: normalizeEmotionList(b.emotions),
    faceDetected:
      b.faceDetected === undefined || b.faceDetected === null ? null : Boolean(b.faceDetected),
  };
}

function extractJsonObject(text: string): string | null {
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "{") depth++;
    if (text[i] === "}") depth--;
    if (depth === 0) return text.slice(start, i + 1);
  }
  return null;
}

function emptyChannels(): Record<(typeof CHANNELS)[number], EmotionChannel> {
  return {
    video: { emotions: [], faceDetected: null },
    audio: { emotions: [], faceDetected: null },
    combined: { emotions: [], faceDetected: null },
  };
}

function tryMultiChannelJson(text: string) {
  const jsonBlob = extractJsonObject(text.trim());
  if (!jsonBlob) return null;

  try {
    const parsed = JSON.parse(jsonBlob) as Record<string, unknown>;
    const channels = emptyChannels();

    let hasAny = false;

    for (const key of CHANNELS) {
      if (parsed[key]) {
        channels[key] = parseChannelBlock(parsed[key]);
        if (channels[key].emotions.length > 0) hasAny = true;
      }
    }

    if (!hasAny && parsed.emotions) {
      channels.combined = parseChannelBlock(parsed);
      hasAny = channels.combined.emotions.length > 0;
    }

    if (!hasAny) return null;

    const coaching = coachingRollup(channels.combined.emotions);

    return {
      channels,
      coaching,
      faceDetected: channels.video.faceDetected ?? channels.combined.faceDetected ?? null,
      method: parsed.video || parsed.audio ? "json-channels" : "json-legacy",
    };
  } catch {
    return null;
  }
}

export function parseEmotionOutput(text: string | null | undefined): ParsedEmotionOutput {
  const base = {
    raw: text ?? "",
    channels: emptyChannels(),
    coaching: [] as ScoredEmotion[],
    faceDetected: null as boolean | null,
    emotions: [] as ScoredEmotion[],
  };

  if (!text || typeof text !== "string") {
    return { success: false, skipped: true, method: "none", ...base };
  }

  const trimmed = text.trim();
  if (!trimmed.includes("{") && !/EMOTIONS:/i.test(trimmed)) {
    return { success: false, skipped: true, method: "conversational", ...base, raw: text };
  }

  const parsed = tryMultiChannelJson(text);
  if (parsed) {
    const combinedTop = parsed.channels.combined.emotions.slice(0, 3);
    const videoTop = parsed.channels.video.emotions.slice(0, 3);
    return {
      success: true,
      skipped: false,
      ...parsed,
      emotions: videoTop.length > 0 ? videoTop : combinedTop,
      raw: text,
    };
  }

  return { success: false, skipped: false, method: "none", ...base, raw: text };
}
