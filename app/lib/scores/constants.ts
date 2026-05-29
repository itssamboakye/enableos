import type { SkillDefinition } from "./types";

export const SKILL_DEFINITIONS: SkillDefinition[] = [
  { key: "clarity", label: "Clarity", prdCategory: "Opening / value articulation" },
  { key: "curiosity", label: "Discovery questioning", prdCategory: "Discovery questioning" },
  { key: "listening", label: "Listening & follow-ups", prdCategory: "Discovery questioning" },
  { key: "flowControl", label: "Flow control", prdCategory: "Closing / next-step control" },
  { key: "confidence", label: "Confidence & tone", prdCategory: "Value articulation" },
  { key: "nextStep", label: "Next-step effectiveness", prdCategory: "Follow-up quality" },
];

/** Minimum sessions with scores before showing team readiness averages. */
export const MIN_SCORED_SESSIONS_FOR_TEAM_READINESS = 1;

/** Readiness bands for scoreboard UI (Phase 2+). */
export const READINESS_BANDS = {
  strong: { min: 7, label: "Strong" },
  developing: { min: 5, label: "Developing" },
  atRisk: { min: 0, label: "At risk" },
} as const;
