import { describe, expect, it } from "vitest";
import { normalizeScorecard } from "../../app/lib/scores";

describe("normalizeScorecard", () => {
  it("maps API flow and nextSteps keys to canonical storage", () => {
    const result = normalizeScorecard({
      clarity: 8,
      curiosity: 7,
      listening: 6,
      flow: 5,
      confidence: 9,
      nextSteps: 4,
    });

    expect(result).toMatchObject({
      clarity: 8,
      curiosity: 7,
      listening: 6,
      flowControl: 5,
      confidence: 9,
      nextStep: 4,
      readiness: 6.5,
    });
  });

  it("returns null when all scores are zero", () => {
    expect(normalizeScorecard({ clarity: 0, flow: 0 })).toBeNull();
  });
});
