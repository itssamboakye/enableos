import { CANONICAL_SKILL_KEYS, type CanonicalSkillKey } from "./types";

/**
 * Readiness = simple average of all competency scores (0–10).
 * Documented for manager dashboards; adjust weights in one place if needed later.
 */
export function computeReadiness(scores: Record<CanonicalSkillKey, number>): number {
  const values = CANONICAL_SKILL_KEYS.map((k) => scores[k]).filter((v) => v > 0);
  if (values.length === 0) return 0;
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(avg * 10) / 10;
}

export function strongestSkill(scores: Record<CanonicalSkillKey, number>): CanonicalSkillKey | null {
  let best: CanonicalSkillKey | null = null;
  let bestVal = -1;
  for (const key of CANONICAL_SKILL_KEYS) {
    if (scores[key] > bestVal) {
      bestVal = scores[key];
      best = key;
    }
  }
  return best;
}

export function weakestSkill(scores: Record<CanonicalSkillKey, number>): CanonicalSkillKey | null {
  let worst: CanonicalSkillKey | null = null;
  let worstVal = Infinity;
  for (const key of CANONICAL_SKILL_KEYS) {
    if (scores[key] > 0 && scores[key] < worstVal) {
      worstVal = scores[key];
      worst = key;
    }
  }
  return worst;
}

export function readinessFromProgress(progress: {
  averageClarity: number | null;
  averageCuriosity: number | null;
  averageListening: number | null;
  averageFlowControl: number | null;
  averageConfidence: number | null;
  averageNextStep: number | null;
}): number | null {
  const scores: Record<CanonicalSkillKey, number> = {
    clarity: progress.averageClarity ?? 0,
    curiosity: progress.averageCuriosity ?? 0,
    listening: progress.averageListening ?? 0,
    flowControl: progress.averageFlowControl ?? 0,
    confidence: progress.averageConfidence ?? 0,
    nextStep: progress.averageNextStep ?? 0,
  };
  const readiness = computeReadiness(scores);
  return readiness > 0 ? readiness : null;
}
