/**
 * Parse emotion output — Track 1b multi-channel JSON (video / audio / combined).
 */
import {
  coachingRollup,
  isKnownExpression,
  normalizeLabel,
} from "./emotionTaxonomy.js";

const CHANNELS = ["video", "audio", "combined"];

function clampConfidence(value) {
  const n = typeof value === "number" ? value : parseFloat(String(value));
  if (Number.isNaN(n)) return 0;
  if (n <= 1) return Math.round(n * 100);
  return Math.round(Math.min(100, Math.max(0, n)));
}

function normalizeEmotionList(raw, max = 5) {
  if (!Array.isArray(raw)) return [];

  const seen = new Set();
  const out = [];

  for (const e of raw) {
    const label = normalizeLabel(e.label ?? e.name);
    if (!label || seen.has(label)) continue;
    const confidence = clampConfidence(e.confidence ?? e.score ?? 0);
    if (confidence <= 0) continue;
    seen.add(label);
    out.push({
      label,
      confidence,
      known: isKnownExpression(label),
    });
  }

  return out.sort((a, b) => b.confidence - a.confidence).slice(0, max);
}

function parseChannelBlock(block) {
  if (!block || typeof block !== "object") {
    return { emotions: [], faceDetected: null };
  }
  return {
    emotions: normalizeEmotionList(block.emotions),
    faceDetected:
      block.faceDetected === undefined || block.faceDetected === null
        ? null
        : Boolean(block.faceDetected),
  };
}

function extractJsonObject(text) {
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

function emptyChannels() {
  return {
    video: { emotions: [], faceDetected: null },
    audio: { emotions: [], faceDetected: null },
    combined: { emotions: [], faceDetected: null },
  };
}

function tryMultiChannelJson(text) {
  const jsonBlob = extractJsonObject(text.trim());
  if (!jsonBlob) return null;

  try {
    const parsed = JSON.parse(jsonBlob);
    const channels = emptyChannels();

    let hasAny = false;

    for (const key of CHANNELS) {
      if (parsed[key]) {
        channels[key] = parseChannelBlock(parsed[key]);
        if (channels[key].emotions.length > 0) hasAny = true;
      }
    }

    // Legacy single-blob → treat as combined
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

export function parseEmotionOutput(text) {
  const base = {
    raw: text ?? "",
    channels: emptyChannels(),
    coaching: [],
    faceDetected: null,
    emotions: [], // legacy compat = combined top 3
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
    return {
      success: true,
      skipped: false,
      ...parsed,
      emotions: combinedTop,
      raw: text,
    };
  }

  return { success: false, skipped: false, method: "none", ...base, raw: text };
}
