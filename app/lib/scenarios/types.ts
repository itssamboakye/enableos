export type ScenarioAssignmentStatus =
  | "assigned"
  | "in_progress"
  | "completed"
  | "passed";

export interface Scenario {
  id: string;
  companyId: string | null;
  name: string;
  slug: string;
  description: string | null;
  callType: string | null;
  competencies: string[];
  active: boolean;
}

export interface ScenarioAssignment {
  id: string;
  scenarioId: string;
  userId: string;
  assignedBy: string | null;
  companyId: string;
  status: ScenarioAssignmentStatus;
  dueAt: string | null;
  completedAt: string | null;
  createdAt: string;
  scenarioName?: string;
  userName?: string;
  userEmail?: string;
}
