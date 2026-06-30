/**
 * Track 1b — full expression taxonomy + coaching rollup labels.
 * Inspired by Hume Expression Measurement; "reserved" replaces harsh "flat".
 */

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
  // coaching-friendly (also valid outputs)
  "confident",
  "engaged",
  "enthusiastic",
  "excited",
  "frustrated",
  "hesitant",
  "nervous",
];

export const EXPRESSION_SET = new Set(EXPRESSION_LABELS);

/** UI valence for color-coding badges */
export const VALENCE = {
  admiration: "positive",
  adoration: "positive",
  amusement: "positive",
  awe: "positive",
  calmness: "positive",
  concentration: "positive",
  contentment: "positive",
  determination: "positive",
  excitement: "positive",
  gratitude: "positive",
  happiness: "positive",
  interest: "positive",
  joy: "positive",
  love: "positive",
  pride: "positive",
  realization: "positive",
  relief: "positive",
  satisfaction: "positive",
  surprise: "positive",
  triumph: "positive",
  confident: "positive",
  engaged: "positive",
  enthusiastic: "positive",
  excited: "positive",
  anxiety: "negative",
  awkwardness: "negative",
  anger: "negative",
  annoyance: "negative",
  confusion: "negative",
  contempt: "negative",
  disappointment: "negative",
  disgust: "negative",
  distress: "negative",
  doubt: "negative",
  embarrassment: "negative",
  fear: "negative",
  grief: "negative",
  guilt: "negative",
  nervousness: "negative",
  pain: "negative",
  remorse: "negative",
  sadness: "negative",
  shame: "negative",
  frustrated: "negative",
  hesitant: "negative",
  nervous: "negative",
  boredom: "neutral",
  neutral: "neutral",
  reserved: "neutral",
  tiredness: "neutral",
  sympathy: "neutral",
};

const COACHING_LABELS = new Set([
  "confident",
  "excited",
  "nervous",
  "engaged",
  "reserved",
  "frustrated",
  "hesitant",
  "enthusiastic",
]);

/** Map expression labels → coaching rollup for manager-style readout */
const TO_COACHING = {
  interest: "engaged",
  concentration: "engaged",
  admiration: "engaged",
  excitement: "excited",
  joy: "enthusiastic",
  happiness: "enthusiastic",
  amusement: "enthusiastic",
  triumph: "enthusiastic",
  calmness: "confident",
  satisfaction: "confident",
  pride: "confident",
  determination: "confident",
  contentment: "confident",
  anxiety: "nervous",
  fear: "nervous",
  nervousness: "nervous",
  awkwardness: "nervous",
  embarrassment: "nervous",
  anger: "frustrated",
  annoyance: "frustrated",
  contempt: "frustrated",
  confusion: "hesitant",
  doubt: "hesitant",
  boredom: "reserved",
  tiredness: "reserved",
  neutral: "reserved",
  sadness: "reserved",
  disappointment: "reserved",
  flat: "reserved",
};

const ALIASES = {
  flat: "reserved",
  low_energy: "reserved",
  lowenergy: "reserved",
};

export function normalizeLabel(raw) {
  const label = String(raw ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
  return ALIASES[label] ?? label;
}

export function isKnownExpression(label) {
  const n = normalizeLabel(label);
  return EXPRESSION_SET.has(n) || COACHING_LABELS.has(n);
}

export function toCoachingLabel(raw) {
  const label = normalizeLabel(raw);
  if (COACHING_LABELS.has(label)) return label;
  return TO_COACHING[label] ?? null;
}

export function coachingRollup(emotions) {
  if (!emotions?.length) return [];
  const scored = new Map();
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

export function formatLabel(label) {
  return normalizeLabel(label).replace(/_/g, " ");
}
