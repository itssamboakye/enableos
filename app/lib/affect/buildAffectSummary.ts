import type {
  AffectAlignment,
  AffectSummary,
  TranscriptEntryForAffect,
  VoiceAffectSummary,
} from "./types";
import { FaceAffectAggregator } from "./faceAffectAggregator";

/** Rough map from Hume prosody labels to coaching-adjacent terms for alignment. */
const VOICE_TO_COACHING: Record<string, string[]> = {
  interest: ["engaged", "curious", "attentive", "enthusiastic"],
  concentration: ["attentive", "composed", "engaged"],
  calmness: ["composed", "reserved", "confident"],
  joy: ["enthusiastic", "excited", "engaged"],
  excitement: ["excited", "enthusiastic", "engaged"],
  anxiety: ["nervous", "hesitant", "uncomfortable"],
  doubt: ["hesitant", "discouraged"],
  confusion: ["hesitant", "uncomfortable"],
  sadness: ["discouraged", "reserved"],
  anger: ["frustrated"],
  contempt: ["frustrated", "uncomfortable"],
  disappointment: ["discouraged", "frustrated"],
  boredom: ["reserved"],
  tiredness: ["reserved"],
};

function normalizeVoiceLabel(name: string): string {
  return name.replace(/([A-Z])/g, " $1").trim().toLowerCase().replace(/\s+/g, "");
}

function summarizeVoice(transcript: TranscriptEntryForAffect[]): VoiceAffectSummary | null {
  const userUtterances = transcript.filter(
    (e) => e.role === "user" && e.emotions && e.emotions.length > 0
  );

  if (userUtterances.length === 0) return null;

  const topEmotions: Record<string, number> = {};
  const byUtterance: VoiceAffectSummary["byUtterance"] = [];

  for (const entry of userUtterances) {
    const emotions = entry.emotions!;
    for (const e of emotions) {
      const key = normalizeVoiceLabel(e.name);
      topEmotions[key] = (topEmotions[key] ?? 0) + e.score;
    }
    byUtterance.push({
      timestamp: entry.timestamp,
      top: emotions.slice(0, 3).map((e) => normalizeVoiceLabel(e.name)),
    });
  }

  const emotionCount = Object.keys(topEmotions).length;
  if (emotionCount > 0) {
    const total = Object.values(topEmotions).reduce((a, b) => a + b, 0);
    for (const key of Object.keys(topEmotions)) {
      topEmotions[key] = Math.round((topEmotions[key]! / total) * 1000) / 1000;
    }
  }

  return {
    utteranceCount: userUtterances.length,
    topEmotions,
    byUtterance,
  };
}

function dominantVoiceEmotion(voice: VoiceAffectSummary): string | null {
  const entries = Object.entries(voice.topEmotions);
  if (entries.length === 0) return null;
  return entries.sort((a, b) => b[1] - a[1])[0]![0];
}

function computeAlignment(
  facePrimary: string | null,
  voice: VoiceAffectSummary | null
): AffectAlignment | null {
  if (!facePrimary && !voice) return null;

  const dominantVoice = voice ? dominantVoiceEmotion(voice) : null;
  const notes: string[] = [];
  let faceVoiceAgreement: number | null = null;

  if (facePrimary && dominantVoice) {
    const coachingHints = VOICE_TO_COACHING[dominantVoice] ?? [];
    if (facePrimary === dominantVoice || coachingHints.includes(facePrimary)) {
      faceVoiceAgreement = 1;
    } else if (coachingHints.length > 0) {
      faceVoiceAgreement = 0.35;
      notes.push(
        `Face read "${facePrimary}" while voice prosody leaned "${dominantVoice}"`
      );
    } else {
      faceVoiceAgreement = 0.5;
    }
  }

  return {
    faceVoiceAgreement,
    dominantFace: facePrimary,
    dominantVoice,
    notes,
  };
}

export function buildAffectSummary(
  faceAggregator: FaceAffectAggregator,
  transcript: TranscriptEntryForAffect[]
): AffectSummary | null {
  const face = faceAggregator.summarize();
  const voice = summarizeVoice(transcript);

  if (!face && !voice) return null;

  const alignment = computeAlignment(face?.primaryMode ?? null, voice);

  return {
    version: 1,
    capturedAt: new Date().toISOString(),
    face,
    voice,
    alignment,
  };
}
