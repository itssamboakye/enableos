import {
  formatLabel,
  toCoachingLabel,
  normalizeLabel,
  COACHING_OVERLAY_LABELS,
} from "./emotionTaxonomy";

/** Raw face read from Gemini (confidence 0–100). */
export interface RawFaceEmotion {
  label: string;
  confidence: number;
}

/** Coaching labels that need stronger evidence — weak reads default to reserved. */
const GATED_NEGATIVE_COACHING = new Set(["frustrated", "discouraged", "uncomfortable"]);
/** Min raw model confidence (0–100) before we trust a negative coaching label. */
const NEGATIVE_RAW_MIN = 65;
/** Min raw confidence for disappointment → discouraged (otherwise reserved). */
const DISCOURAGED_RAW_MIN = 72;

const RESERVED_SOURCES = new Set([
  "neutral",
  "boredom",
  "tiredness",
  "reserved",
  "calmness",
  "concentration",
  "interest",
  "contentment",
  "relief",
  "sadness",
]);

export interface CoachingPill {
  name: string;
  score: number;
  label: string;
}

export interface StabilizedFaceOverlay {
  faceDetected: boolean;
  topEmotion: CoachingPill | null;
  coachingPills: CoachingPill[];
  coachingLabel: string | null;
}

/** EMA weight for new frame — balanced: responsive but dampens single-frame spikes. */
const EMA_ALPHA = 0.48;
const STICKY_CONSECUTIVE_READS = 1;
const SWITCH_MARGIN = 0.1;
const MIN_DISPLAY_SCORE = 0.3;
const MAX_PILLS = 3;

function emptySmoothed(): Record<string, number> {
  return Object.fromEntries(COACHING_OVERLAY_LABELS.map((l) => [l, 0]));
}

function mapRawToCoaching(emotion: RawFaceEmotion): string | null {
  const normalized = normalizeLabel(emotion.label);
  let coaching = toCoachingLabel(emotion.label);
  if (!coaching) return null;

  if (GATED_NEGATIVE_COACHING.has(coaching)) {
    if (normalized === "disappointment" && emotion.confidence < DISCOURAGED_RAW_MIN) {
      return "reserved";
    }
    if (emotion.confidence < NEGATIVE_RAW_MIN) {
      return "reserved";
    }
  }

  return coaching;
}

function applyReservedBias(
  buckets: Record<string, number>,
  emotions: RawFaceEmotion[]
): Record<string, number> {
  const out = { ...buckets };

  let reservedStrength = out.reserved ?? 0;
  let composedStrength = out.composed ?? 0;

  for (const e of emotions) {
    const normalized = normalizeLabel(e.label);
    const score = e.confidence / 100;
    if (RESERVED_SOURCES.has(normalized)) {
      reservedStrength = Math.max(reservedStrength, score);
      if (normalized === "calmness" || normalized === "relief") {
        composedStrength = Math.max(composedStrength, score * 0.9);
      }
    }
  }

  const negativePeak = Math.max(
    0,
    out.frustrated ?? 0,
    out.discouraged ?? 0,
    out.uncomfortable ?? 0
  );
  const neutralPeak = Math.max(reservedStrength, composedStrength * 0.85);

  // Quiet/neutral face: prefer reserved over weak negative inference
  if (negativePeak > 0 && negativePeak < 0.58 && neutralPeak >= 0.22) {
    out.reserved = Math.max(out.reserved ?? 0, neutralPeak, negativePeak * 0.75);
    for (const key of GATED_NEGATIVE_COACHING) {
      if (out[key] != null && out[key] < 0.62) {
        out[key] = out[key] * 0.35;
      }
    }
  } else if (neutralPeak > 0) {
    out.reserved = Math.max(out.reserved ?? 0, reservedStrength);
    out.composed = Math.max(out.composed ?? 0, composedStrength);
  }

  return out;
}

function rawToCoachingBuckets(emotions: RawFaceEmotion[]): Record<string, number> {
  const buckets: Record<string, number> = {};

  for (const e of emotions) {
    const coaching = mapRawToCoaching(e);
    if (!coaching) continue;
    const score = e.confidence / 100;
    buckets[coaching] = Math.max(buckets[coaching] ?? 0, score);
  }

  if (Object.keys(buckets).length === 0 && emotions.length > 0) {
    const top = emotions.reduce((a, b) => (b.confidence > a.confidence ? b : a));
    const coaching = mapRawToCoaching(top) ?? "reserved";
    buckets[coaching] = top.confidence / 100;
  }

  return applyReservedBias(buckets, emotions);
}

function pickTopCoaching(
  scores: Record<string, number>,
  limit = MAX_PILLS
): CoachingPill[] {
  return Object.entries(scores)
    .filter(([, score]) => score >= MIN_DISPLAY_SCORE)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, score]) => ({
      label,
      name: formatLabel(label),
      score,
    }));
}

function pickTopOne(scores: Record<string, number>): CoachingPill | null {
  return pickTopCoaching(scores, 1)[0] ?? null;
}

function toPill(label: string, score: number): CoachingPill {
  return { label, name: formatLabel(label), score };
}

/**
 * Stabilizes Gemini face reads for the video pill — coaching rollup + EMA + sticky label.
 */
export class FaceOverlayStabilizer {
  #smoothed: Record<string, number> = emptySmoothed();
  #displayed: { label: string; score: number } | null = null;
  #challengerLabel: string | null = null;
  #challengerStreak = 0;

  reset() {
    this.#smoothed = emptySmoothed();
    this.#displayed = null;
    this.#challengerLabel = null;
    this.#challengerStreak = 0;
  }

  update(emotions: RawFaceEmotion[], faceDetected: boolean): StabilizedFaceOverlay {
    if (!faceDetected || emotions.length === 0) {
      this.reset();
      return { faceDetected: false, topEmotion: null, coachingPills: [], coachingLabel: null };
    }

    const buckets = rawToCoachingBuckets(emotions);

    for (const label of COACHING_OVERLAY_LABELS) {
      const incoming = buckets[label] ?? 0;
      const prev = this.#smoothed[label] ?? 0;
      this.#smoothed[label] = EMA_ALPHA * incoming + (1 - EMA_ALPHA) * prev;
    }

    const candidate = this.#displayed
      ? pickTopOne(this.#smoothed)
      : pickTopOne(buckets);

    if (!candidate || candidate.score < MIN_DISPLAY_SCORE) {
      if (this.#displayed) {
        const held = this.#smoothed[this.#displayed.label] ?? this.#displayed.score;
        const primary = toPill(this.#displayed.label, held);
        const pills = pickTopCoaching(this.#smoothed).length
          ? pickTopCoaching(this.#smoothed)
          : [primary];
        return {
          faceDetected: true,
          topEmotion: primary,
          coachingPills: pills,
          coachingLabel: this.#displayed.label,
        };
      }
      return {
        faceDetected: true,
        topEmotion: null,
        coachingPills: [],
        coachingLabel: null,
      };
    }

    if (!this.#displayed) {
      this.#displayed = { label: candidate.label, score: candidate.score };
      this.#challengerLabel = null;
      this.#challengerStreak = 0;
    } else {
      const heldScore = this.#smoothed[this.#displayed.label] ?? this.#displayed.score;

      if (candidate.label === this.#displayed.label) {
        this.#displayed = { label: candidate.label, score: candidate.score };
        this.#challengerLabel = null;
        this.#challengerStreak = 0;
      } else if (candidate.score >= heldScore + SWITCH_MARGIN) {
        this.#displayed = { label: candidate.label, score: candidate.score };
        this.#challengerLabel = null;
        this.#challengerStreak = 0;
      } else {
        if (this.#challengerLabel !== candidate.label) {
          this.#challengerLabel = candidate.label;
          this.#challengerStreak = 1;
        } else {
          this.#challengerStreak += 1;
        }

        if (this.#challengerStreak >= STICKY_CONSECUTIVE_READS) {
          this.#displayed = { label: candidate.label, score: candidate.score };
          this.#challengerLabel = null;
          this.#challengerStreak = 0;
        } else {
          this.#displayed = { label: this.#displayed.label, score: heldScore };
        }
      }
    }

    const pills = pickTopCoaching(this.#smoothed);
    const primary =
      pills.find((p) => p.label === this.#displayed!.label) ??
      toPill(this.#displayed!.label, this.#displayed!.score);
    const coachingPills = [
      primary,
      ...pills.filter((p) => p.label !== primary.label),
    ].slice(0, MAX_PILLS);

    return {
      faceDetected: true,
      topEmotion: primary,
      coachingPills,
      coachingLabel: this.#displayed!.label,
    };
  }
}

/** @internal for tests */
export function coachingBucketsFromRaw(emotions: RawFaceEmotion[]) {
  return rawToCoachingBuckets(emotions);
}
