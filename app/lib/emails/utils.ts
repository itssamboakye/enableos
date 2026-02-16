import { queryOne } from "@/lib/db";
import { EmailPreferences, EmailType } from "./types";
import { v4 as uuidv4 } from "uuid";

/**
 * Get user email preferences
 */
export async function getUserEmailPreferences(
  userId: string
): Promise<EmailPreferences> {
  const user = await queryOne<{ emailPreferences: EmailPreferences }>(
    `SELECT "emailPreferences" FROM users WHERE id = $1`,
    [userId]
  );

  if (!user?.emailPreferences) {
    // Return default preferences
    return {
      sessionCompletion: true,
      welcome: true,
      practiceReminders: true,
      milestones: true,
      feedbackReady: true,
      sessionExport: true,
      accountUpdates: true,
      reminderFrequency: "weekly",
    };
  }

  return user.emailPreferences;
}

/**
 * Check if user has opted in for a specific email type
 */
export async function canSendEmail(
  userId: string,
  emailType: EmailType
): Promise<boolean> {
  const preferences = await getUserEmailPreferences(userId);
  
  const preferenceMap: Record<EmailType, keyof EmailPreferences> = {
    sessionCompletion: "sessionCompletion",
    welcome: "welcome",
    practiceReminder: "practiceReminders",
    milestone: "milestones",
    feedbackReady: "feedbackReady",
    sessionExport: "sessionExport",
    accountUpdate: "accountUpdates",
  };

  const preferenceKey = preferenceMap[emailType];
  return preferences[preferenceKey] !== false;
}

/**
 * Generate unsubscribe token
 */
export async function generateUnsubscribeToken(
  userId: string,
  emailType: EmailType
): Promise<string> {
  const token = uuidv4();
  
  await queryOne(
    `INSERT INTO email_unsubscribes (id, "userId", token, "emailType")
     VALUES ($1, $2, $3, $4)
     ON CONFLICT ("userId", "emailType") 
     DO UPDATE SET token = $3, "createdAt" = NOW()`,
    [`unsub_${uuidv4()}`, userId, token, emailType]
  );

  return token;
}

/**
 * Get unsubscribe URL
 */
export function getUnsubscribeUrl(token: string, emailType: EmailType): string {
  const { BASE_URL } = require("./config");
  return `${BASE_URL}/api/emails/unsubscribe?token=${token}&type=${emailType}`;
}
