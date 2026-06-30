/** Session-level affect summary (no raw video/audio). */
export interface AffectSummary {
  version: 1;
  capturedAt: string;
  face: FaceAffectSummary | null;
  voice: VoiceAffectSummary | null;
  alignment: AffectAlignment | null;
}

export interface FaceAffectSummary {
  samples: number;
  faceDetectedSamples: number;
  coachingDistribution: Record<string, number>;
  primaryMode: string | null;
  /** 0–1: how often consecutive reads shared the same primary label */
  stability: number | null;
}

export interface VoiceAffectSummary {
  utteranceCount: number;
  topEmotions: Record<string, number>;
  byUtterance: Array<{
    timestamp: number;
    top: string[];
  }>;
}

export interface AffectAlignment {
  /** 0–1 overlap between dominant face coaching mode and dominant voice emotion */
  faceVoiceAgreement: number | null;
  dominantFace: string | null;
  dominantVoice: string | null;
  notes: string[];
}

export interface TranscriptEntryForAffect {
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  emotions?: Array<{ name: string; score: number }>;
}
