import { CANONICAL_SKILL_KEYS, type CanonicalScorecard, type CanonicalSkillKey, type RawScorecard } from "./types";
import { computeReadiness } from "./readiness";

function toScore(value: unknown): number {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return Math.max(0, Math.min(10, Math.round(value)));
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return Math.max(0, Math.min(10, Math.round(parsed)));
    }
  }
  return 0;
}

function pick(raw: RawScorecard, ...keys: string[]): number {
  for (const key of keys) {
    if (key in raw && raw[key] !== undefined && raw[key] !== null) {
      return toScore(raw[key]);
    }
  }
  return 0;
}

/**
 * Maps API feedback scorecard (flow, nextSteps) and legacy DB keys to canonical storage.
 */
export function normalizeScorecard(raw: RawScorecard | null | undefined): CanonicalScorecard | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const partial: Record<CanonicalSkillKey, number> = {
    clarity: pick(raw, "clarity"),
    curiosity: pick(raw, "curiosity"),
    listening: pick(raw, "listening"),
    flowControl: pick(raw, "flowControl", "flow"),
    confidence: pick(raw, "confidence"),
    nextStep: pick(raw, "nextStep", "nextSteps"),
  };

  const hasAny = CANONICAL_SKILL_KEYS.some((k) => partial[k] > 0);
  if (!hasAny) {
    return null;
  }

  const readiness = computeReadiness(partial);
  return { ...partial, readiness };
}

/** For SQL/API responses that may still use mixed keys. */
export function normalizeScorecardPartial(raw: RawScorecard | null | undefined): Record<CanonicalSkillKey, number> {
  return normalizeScorecard(raw) ?? {
    clarity: 0,
    curiosity: 0,
    listening: 0,
    flowControl: 0,
    confidence: 0,
    nextStep: 0,
  };
}
