import { describe, expect, it, beforeEach } from "vitest";
import { FaceOverlayStabilizer, coachingBucketsFromRaw } from "../../../app/lib/gemini-face/overlayStabilizer";
import { toCoachingLabel } from "../../../app/lib/gemini-face/emotionTaxonomy";

describe("FaceOverlayStabilizer", () => {
  let stabilizer: FaceOverlayStabilizer;

  beforeEach(() => {
    stabilizer = new FaceOverlayStabilizer();
  });

  it("maps concentration to attentive", () => {
    expect(toCoachingLabel("concentration")).toBe("attentive");
  });

  it("maps raw emotions to expanded coaching labels", () => {
    const first = stabilizer.update(
      [
        { label: "concentration", confidence: 90 },
        { label: "interest", confidence: 70 },
      ],
      true
    );
    expect(first.topEmotion?.name).toBe("attentive");
    expect(first.coachingPills.length).toBeGreaterThan(0);
  });

  it("returns up to three coaching pills", () => {
    const result = stabilizer.update(
      [
        { label: "concentration", confidence: 85 },
        { label: "interest", confidence: 75 },
        { label: "calmness", confidence: 65 },
      ],
      true
    );
    expect(result.coachingPills.length).toBeLessThanOrEqual(3);
    expect(result.coachingPills[0]?.name).toBeTruthy();
  });

  it("switches on a strong single read", () => {
    stabilizer.update([{ label: "concentration", confidence: 55 }], true);
    const second = stabilizer.update([{ label: "joy", confidence: 95 }], true);
    expect(second.coachingLabel).toBe("enthusiastic");
  });

  it("maps anxiety to nervous after sustained reads", () => {
    stabilizer.update([{ label: "calmness", confidence: 60 }], true);
    stabilizer.update([{ label: "anxiety", confidence: 98 }], true);
    const third = stabilizer.update([{ label: "anxiety", confidence: 98 }], true);
    expect(third.coachingLabel).toBe("nervous");
  });

  it("downgrades weak disappointment to reserved", () => {
    const buckets = coachingBucketsFromRaw([
      { label: "disappointment", confidence: 45 },
      { label: "neutral", confidence: 40 },
    ]);
    expect((buckets.discouraged ?? 0)).toBeLessThan(0.2);
    expect(buckets.reserved).toBeGreaterThan(0.3);
  });

  it("keeps strong frustration when confidence is high", () => {
    const buckets = coachingBucketsFromRaw([{ label: "anger", confidence: 88 }]);
    expect(buckets.frustrated).toBeGreaterThan(0.8);
  });

  it("resets when face is lost", () => {
    stabilizer.update([{ label: "concentration", confidence: 90 }], true);
    const lost = stabilizer.update([], false);
    expect(lost.topEmotion).toBeNull();
    expect(lost.coachingPills).toEqual([]);
    expect(lost.faceDetected).toBe(false);
  });
});
