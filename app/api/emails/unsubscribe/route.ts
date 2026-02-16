import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { EmailType } from "@/lib/emails/types";

/**
 * GET /api/emails/unsubscribe - Handle email unsubscribe
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const type = searchParams.get("type") as EmailType | null;

    if (!token) {
      return NextResponse.redirect(
        new URL("/?error=missing_token", request.url)
      );
    }

    // Find unsubscribe record
    const unsubscribe = await queryOne<{
      userId: string;
      emailType: string;
    }>(
      `SELECT "userId", "emailType" FROM email_unsubscribes WHERE token = $1`,
      [token]
    );

    if (!unsubscribe) {
      return NextResponse.redirect(
        new URL("/?error=invalid_token", request.url)
      );
    }

    // Update user preferences to opt out
    const emailType = type || unsubscribe.emailType;
    const preferenceMap: Record<string, string> = {
      sessionCompletion: "sessionCompletion",
      welcome: "welcome",
      practiceReminder: "practiceReminders",
      milestone: "milestones",
      feedbackReady: "feedbackReady",
      sessionExport: "sessionExport",
      accountUpdate: "accountUpdates",
    };

    const preferenceKey = preferenceMap[emailType];
    if (preferenceKey) {
      await query(
        `UPDATE users 
         SET "emailPreferences" = jsonb_set(
           COALESCE("emailPreferences", '{}'::jsonb),
           '{${preferenceKey}}',
           'false'::jsonb
         )
         WHERE id = $1`,
        [unsubscribe.userId]
      );
    }

    // Redirect to confirmation page
    return NextResponse.redirect(
      new URL("/unsubscribed?type=" + encodeURIComponent(emailType), request.url)
    );
  } catch (error) {
    console.error("Error processing unsubscribe:", error);
    return NextResponse.redirect(
      new URL("/?error=unsubscribe_failed", request.url)
    );
  }
}
