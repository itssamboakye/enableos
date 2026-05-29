import type { CanonicalSkillKey } from "@/lib/scores";

export type CoachingFlagType =
  | "inactive"
  | "score_drop"
  | "weak_skill"
  | "low_readiness"
  | "repeated_weak_skill";

export type CoachingFlagStatus = "open" | "acknowledged" | "resolved";

export type CoachingActionStatus = "pending" | "completed" | "cancelled";

export interface CoachingFlag {
  id: string;
  userId: string;
  companyId: string;
  type: CoachingFlagType;
  skill: CanonicalSkillKey | null;
  reason: string;
  evidenceSessionIds: string[];
  suggestedAction: string | null;
  status: CoachingFlagStatus;
  createdAt: string;
  userName?: string;
  userEmail?: string;
}

export interface CoachingAction {
  id: string;
  flagId: string | null;
  userId: string;
  assignedBy: string | null;
  companyId: string;
  scenarioId: string | null;
  assignmentId: string | null;
  actionType: string;
  note: string | null;
  status: CoachingActionStatus;
  createdAt: string;
}
