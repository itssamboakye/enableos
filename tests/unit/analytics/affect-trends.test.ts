import { describe, expect, it } from "vitest";
import {
  aggregateTeamAffectTrends,
  type AffectSessionRow,
} from "../../../app/lib/analytics/aggregate-affect";

const baseSummary = {
  version: 1 as const,
  capturedAt: "2026-06-26T12:00:00.000Z",
  face: {
    samples: 10,
    faceDetectedSamples: 10,
    coachingDistribution: { engaged: 0.6, attentive: 0.4 },
    primaryMode: "engaged",
    stability: 0.7,
  },
  voice: {
    utteranceCount: 3,
    topEmotions: { interest: 0.6, calmness: 0.4 },
    byUtterance: [{ timestamp: 1, top: ["interest"] }],
  },
  alignment: {
    faceVoiceAgreement: 1,
    dominantFace: "engaged",
    dominantVoice: "interest",
    notes: [],
  },
};

function row(overrides: Partial<AffectSessionRow> = {}): AffectSessionRow {
  return {
    sessionId: "s1",
    userId: "u1",
    userName: "Alex",
    createdAt: "2026-06-26T15:00:00.000Z",
    callType: "Enterprise",
    scores: { listening: 4, clarity: 6 },
    affectSummary: baseSummary,
    ...overrides,
  };
}

describe("aggregateTeamAffectTrends", () => {
  it("aggregates face and voice distributions", () => {
    const trends = aggregateTeamAffectTrends(
      [
        row(),
        row({
          sessionId: "s2",
          affectSummary: {
            ...baseSummary,
            face: { ...baseSummary.face!, primaryMode: "reserved" },
          },
        }),
      ],
      "30d",
      5
    );

    expect(trends.sessionsWithAffect).toBe(2);
    expect(trends.sessionsTotal).toBe(5);
    expect(trends.facePrimaryDistribution.engaged).toBeCloseTo(0.5);
    expect(trends.facePrimaryDistribution.reserved).toBeCloseTo(0.5);
    expect(trends.voiceEmotionDistribution.interest).toBeGreaterThan(0);
  });

  it("builds rep highlights and listening correlation insight", () => {
    const trends = aggregateTeamAffectTrends(
      [
        row({ scores: { listening: 3 } }),
        row({
          sessionId: "s2",
          scores: { listening: 8 },
          affectSummary: {
            ...baseSummary,
            face: { ...baseSummary.face!, primaryMode: "confident" },
          },
        }),
      ],
      "30d",
      2
    );

    expect(trends.repHighlights[0]?.userId).toBe("u1");
    expect(trends.skillCorrelations.some((c) => c.skill === "listening")).toBe(true);
  });

  it("returns empty distributions when no affect rows", () => {
    const trends = aggregateTeamAffectTrends([], "7d", 0);
    expect(trends.sessionsWithAffect).toBe(0);
    expect(trends.facePrimaryDistribution).toEqual({});
  });
});
