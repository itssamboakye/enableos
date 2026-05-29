export type EmailType =
  | "sessionCompletion"
  | "welcome"
  | "practiceReminder"
  | "milestone"
  | "feedbackReady"
  | "sessionExport"
  | "accountUpdate";

export interface EmailPreferences {
  sessionCompletion?: boolean;
  welcome?: boolean;
  practiceReminders?: boolean;
  milestones?: boolean;
  feedbackReady?: boolean;
  sessionExport?: boolean;
  accountUpdates?: boolean;
  reminderFrequency?: "daily" | "weekly" | "monthly" | "never";
}

export interface SessionCompletionEmailData {
  userName: string;
  sessionId: string;
  sessionDate: string;
  duration: number | null;
  buyerContext: string | null;
  buyerRole: string | null;
  callType: string | null;
  scores: {
    clarity?: number;
    curiosity?: number;
    listening?: number;
    flowControl?: number;
    confidence?: number;
    nextStep?: number;
  } | null;
  feedbackHighlights: {
    strengths?: string[];
    improvements?: string[];
  };
  feedbackUrl: string;
}

export interface WelcomeEmailData {
  userName: string;
  userEmail: string;
}

export interface PracticeReminderEmailData {
  userName: string;
  daysSinceLastSession: number;
  lastSessionDate: string | null;
  totalSessions: number;
}

export interface MilestoneEmailData {
  userName: string;
  milestone: string;
  milestoneDescription: string;
  nextMilestone?: string;
}

export interface FeedbackReadyEmailData {
  userName: string;
  sessionId: string;
  sessionDate: string;
  feedbackUrl: string;
}

export interface SessionExportEmailData {
  userName: string;
  sessionId: string;
  sessionDate: string;
  transcript: any[];
  feedback: any;
  scores: any;
  exportUrl?: string;
}

export interface AccountUpdateEmailData {
  userName: string;
  updateType: "emailVerification" | "profileUpdate" | "passwordChange";
  verificationLink?: string;
}

export interface TeamInviteEmailData {
  companyName: string;
  inviteeEmail: string;
  signInUrl: string;
}

export interface ManagerInviteEmailData {
  companyName: string;
  inviteeEmail: string;
  signInUrl: string;
}

export interface ManagerDigestEmailData {
  managerName: string;
  companyName: string;
  periodLabel: string;
  activeReps: number;
  sessionsCompleted: number;
  avgReadiness: number | null;
  repsAtRisk: number;
  readinessChange7d: number | null;
  openFlags: number;
  topInsights: { title: string; recommendedAction: string }[];
  dashboardUrl: string;
}
