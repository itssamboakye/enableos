/** Expression labels + normalization (from Track 1b playground). */

export const EXPRESSION_LABELS = [
  "admiration",
  "adoration",
  "amusement",
  "anger",
  "annoyance",
  "anxiety",
  "awe",
  "awkwardness",
  "boredom",
  "calmness",
  "concentration",
  "confusion",
  "contempt",
  "contentment",
  "determination",
  "disappointment",
  "disgust",
  "distress",
  "doubt",
  "embarrassment",
  "excitement",
  "fear",
  "gratitude",
  "grief",
  "guilt",
  "happiness",
  "interest",
  "joy",
  "love",
  "nervousness",
  "neutral",
  "pain",
  "pride",
  "realization",
  "relief",
  "remorse",
  "reserved",
  "sadness",
  "satisfaction",
  "shame",
  "surprise",
  "sympathy",
  "tiredness",
  "triumph",
  "confident",
  "engaged",
  "enthusiastic",
  "excited",
  "frustrated",
  "hesitant",
  "nervous",
] as const;

export const EXPRESSION_SET = new Set<string>(EXPRESSION_LABELS);

/** Coaching labels shown on the face overlay pill(s) — sales-practice vocabulary. */
export const COACHING_OVERLAY_LABELS = [
  "engaged",
  "attentive",
  "curious",
  "confident",
  "composed",
  "enthusiastic",
  "excited",
  "reserved",
  "hesitant",
  "nervous",
  "uncomfortable",
  "frustrated",
  "discouraged",
  "surprised",
] as const;

export type CoachingOverlayLabel = (typeof COACHING_OVERLAY_LABELS)[number];

const COACHING_LABELS = new Set<string>(COACHING_OVERLAY_LABELS);

const TO_COACHING: Record<string, CoachingOverlayLabel> = {
  // Engaged / listening
  interest: "engaged",
  admiration: "engaged",
  sympathy: "engaged",
  gratitude: "engaged",
  love: "engaged",
  adoration: "engaged",
  engaged: "engaged",
  // Focused
  concentration: "attentive",
  determination: "attentive",
  realization: "attentive",
  // Curious / exploring
  awe: "curious",
  curiosity: "curious",
  doubt: "curious",
  // Assured
  satisfaction: "confident",
  pride: "confident",
  contentment: "confident",
  triumph: "confident",
  confident: "confident",
  // Steady / calm (not negative)
  calmness: "composed",
  relief: "composed",
  // Low energy / neutral (default for quiet listening faces)
  neutral: "reserved",
  boredom: "reserved",
  tiredness: "reserved",
  reserved: "reserved",
  sadness: "reserved",
  flat: "reserved",
  // Warm / upbeat
  joy: "enthusiastic",
  happiness: "enthusiastic",
  amusement: "enthusiastic",
  enthusiastic: "enthusiastic",
  excited: "excited",
  excitement: "excited",
  // Uncertain
  confusion: "hesitant",
  hesitant: "hesitant",
  // Anxious
  anxiety: "nervous",
  fear: "nervous",
  nervousness: "nervous",
  nervous: "nervous",
  // Social discomfort
  awkwardness: "uncomfortable",
  embarrassment: "uncomfortable",
  shame: "uncomfortable",
  distress: "uncomfortable",
  pain: "uncomfortable",
  // Negative active
  anger: "frustrated",
  annoyance: "frustrated",
  contempt: "frustrated",
  disgust: "frustrated",
  frustrated: "frustrated",
  // Deflated
  disappointment: "discouraged",
  grief: "discouraged",
  guilt: "discouraged",
  remorse: "discouraged",
  // Surprise
  surprise: "surprised",
  surprise_positive: "surprised",
  surprise_negative: "surprised",
};

const ALIASES: Record<string, string> = {
  flat: "reserved",
  low_energy: "reserved",
  lowenergy: "reserved",
};

export function normalizeLabel(raw: string | undefined | null): string {
  const label = String(raw ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[()]/g, "");
  return ALIASES[label] ?? label;
}

export function isKnownExpression(label: string): boolean {
  const n = normalizeLabel(label);
  return EXPRESSION_SET.has(n) || COACHING_LABELS.has(n);
}

export function toCoachingLabel(raw: string): CoachingOverlayLabel | null {
  const label = normalizeLabel(raw);
  if (COACHING_LABELS.has(label)) return label as CoachingOverlayLabel;
  return TO_COACHING[label] ?? null;
}

export interface ScoredEmotion {
  label: string;
  confidence: number;
}

export function coachingRollup(emotions: ScoredEmotion[]): ScoredEmotion[] {
  if (!emotions?.length) return [];
  const scored = new Map<string, number>();
  for (const e of emotions) {
    const coaching = toCoachingLabel(e.label) ?? (COACHING_LABELS.has(e.label) ? e.label : null);
    if (!coaching) continue;
    const prev = scored.get(coaching) ?? 0;
    scored.set(coaching, Math.max(prev, e.confidence));
  }
  return [...scored.entries()]
    .map(([label, confidence]) => ({ label, confidence }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}

export function formatLabel(label: string): string {
  return normalizeLabel(label).replace(/_/g, " ");
}
