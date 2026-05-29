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

export interface RepSessionTrendPoint {
  sessionId: string;
  date: string;
  readiness: number;
  callType: string | null;
}

export interface RepSkillSnapshot {
  skill: CanonicalSkillKey;
  label: string;
  average: number;
}

export interface RepRecentSession {
  id: string;
  createdAt: string;
  duration: number | null;
  callType: string | null;
  readiness: number | null;
}

export interface RepProfile {
  userId: string;
  name: string;
  email: string;
  title: string | null;
  readiness: number | null;
  readinessDelta: number | null;
  totalSessions: number;
  sessionsInPeriod: number;
  lastPracticeDate: string | null;
  strongestSkill: CanonicalSkillKey | null;
  weakestSkill: CanonicalSkillKey | null;
  needsReview: boolean;
  skills: RepSkillSnapshot[];
  sessionTrend: RepSessionTrendPoint[];
  recentSessions: RepRecentSession[];
}
