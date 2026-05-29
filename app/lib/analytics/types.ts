import type { CanonicalSkillKey } from "@/lib/scores";

export type AnalyticsPeriod = "7d" | "30d" | "90d";

export interface DateRange {
  from: Date;
  to: Date;
  period: AnalyticsPeriod;
}

export interface CompanyOverviewMetrics {
  activeRepsThisWeek: number;
  sessionsCompleted: number;
  avgReadiness: number | null;
  readinessChange7d: number | null;
  readinessChange30d: number | null;
  totalPracticeMinutes: number;
  completionRate: number;
  repsAtRisk: number;
  topImprovingReps: ImprovingRep[];
  weakestSkills: TeamSkillAverage[];
}

export interface ImprovingRep {
  userId: string;
  name: string;
  email: string;
  readinessDelta: number;
  currentReadiness: number;
}

export interface TeamSkillAverage {
  skill: CanonicalSkillKey;
  label: string;
  average: number;
}

export interface RepScoreboardRow {
  userId: string;
  name: string;
  email: string;
  readiness: number | null;
  readinessDelta: number | null;
  sessionsCompleted: number;
  lastPracticeDate: string | null;
  strongestSkill: CanonicalSkillKey | null;
  weakestSkill: CanonicalSkillKey | null;
  needsReview: boolean;
}
