export interface FaceAffectSample {
  ts: number;
  primary: string;
  pills: Array<{ name: string; score: number }>;
}

export class FaceAffectAggregator {
  #samples: FaceAffectSample[] = [];

  record(
    primary: string | null | undefined,
    pills: Array<{ name: string; score: number }>,
    faceDetected: boolean
  ) {
    if (!faceDetected || !primary) return;

    this.#samples.push({
      ts: Date.now(),
      primary,
      pills: pills.slice(0, 3),
    });
  }

  reset() {
    this.#samples = [];
  }

  get sampleCount() {
    return this.#samples.length;
  }

  summarize(): {
    samples: number;
    faceDetectedSamples: number;
    coachingDistribution: Record<string, number>;
    primaryMode: string | null;
    stability: number | null;
  } | null {
    if (this.#samples.length === 0) return null;

    const coachingDistribution: Record<string, number> = {};
    for (const sample of this.#samples) {
      coachingDistribution[sample.primary] =
        (coachingDistribution[sample.primary] ?? 0) + 1;
    }

    const total = this.#samples.length;
    for (const key of Object.keys(coachingDistribution)) {
      coachingDistribution[key] = Math.round((coachingDistribution[key]! / total) * 1000) / 1000;
    }

    const primaryMode = Object.entries(coachingDistribution).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] ?? null;

    let stability: number | null = null;
    if (this.#samples.length > 1) {
      let matches = 0;
      for (let i = 1; i < this.#samples.length; i++) {
        if (this.#samples[i]!.primary === this.#samples[i - 1]!.primary) {
          matches++;
        }
      }
      stability = Math.round((matches / (this.#samples.length - 1)) * 1000) / 1000;
    }

    return {
      samples: total,
      faceDetectedSamples: total,
      coachingDistribution,
      primaryMode,
      stability,
    };
  }
}
