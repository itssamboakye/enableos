/** Canonical skill keys stored in practice_sessions.scores and used in analytics. */
export const CANONICAL_SKILL_KEYS = [
  "clarity",
  "curiosity",
  "listening",
  "flowControl",
  "confidence",
  "nextStep",
] as const;

export type CanonicalSkillKey = (typeof CANONICAL_SKILL_KEYS)[number];

/** Stored on practice_sessions.scores after normalization. */
export interface CanonicalScorecard {
  clarity: number;
  curiosity: number;
  listening: number;
  flowControl: number;
  confidence: number;
  nextStep: number;
  /** Weighted average of all skills (0–10), computed at save time. */
  readiness: number;
}

/** Raw scorecard shapes from OpenAI feedback or legacy rows. */
export type RawScorecard = Record<string, unknown>;

export interface SkillDefinition {
  key: CanonicalSkillKey;
  label: string;
  /** PRD skill bucket for future 8-column heatmap. */
  prdCategory: string;
}
