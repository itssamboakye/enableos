import { describe, expect, it, beforeEach } from "vitest";
import { buildAffectSummary } from "../../../app/lib/affect/buildAffectSummary";
import { FaceAffectAggregator } from "../../../app/lib/affect/faceAffectAggregator";

describe("FaceAffectAggregator", () => {
  let aggregator: FaceAffectAggregator;

  beforeEach(() => {
    aggregator = new FaceAffectAggregator();
  });

  it("summarizes coaching distribution from samples", () => {
    aggregator.record("engaged", [{ name: "Engaged", score: 0.8 }], true);
    aggregator.record("engaged", [{ name: "Engaged", score: 0.7 }], true);
    aggregator.record("reserved", [{ name: "Reserved", score: 0.6 }], true);

    const summary = aggregator.summarize();
    expect(summary?.samples).toBe(3);
    expect(summary?.primaryMode).toBe("engaged");
    expect(summary?.coachingDistribution.engaged).toBeCloseTo(0.667, 2);
  });
});

describe("buildAffectSummary", () => {
  it("combines face and voice with alignment notes", () => {
    const face = new FaceAffectAggregator();
    face.record("reserved", [{ name: "Reserved", score: 0.7 }], true);
    face.record("reserved", [{ name: "Reserved", score: 0.65 }], true);

    const summary = buildAffectSummary(face, [
      {
        role: "user",
        text: "Tell me more about your workflow.",
        timestamp: 1000,
        emotions: [
          { name: "Interest", score: 0.82 },
          { name: "Concentration", score: 0.4 },
        ],
      },
    ]);

    expect(summary?.version).toBe(1);
    expect(summary?.face?.primaryMode).toBe("reserved");
    expect(summary?.voice?.utteranceCount).toBe(1);
    expect(summary?.voice?.topEmotions.interest).toBeGreaterThan(0);
    expect(summary?.alignment?.dominantFace).toBe("reserved");
    expect(summary?.alignment?.dominantVoice).toBe("interest");
  });

  it("returns null when no face or voice data exists", () => {
    expect(buildAffectSummary(new FaceAffectAggregator(), [])).toBeNull();
  });
});
