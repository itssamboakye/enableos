import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { EmailPreferences } from "@/lib/emails/types";

/**
 * GET /api/emails/preferences - Get user email preferences
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userData = await queryOne<{ emailPreferences: EmailPreferences }>(
      `SELECT "emailPreferences" FROM users WHERE id = $1`,
      [user.id]
    );

    const preferences = userData?.emailPreferences || {
      sessionCompletion: true,
      welcome: true,
      practiceReminders: true,
      milestones: true,
      feedbackReady: true,
      sessionExport: true,
      accountUpdates: true,
      reminderFrequency: "weekly",
    };

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching email preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/emails/preferences - Update user email preferences
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const preferences: EmailPreferences = body;

    // Validate preferences structure
    const validKeys = [
      "sessionCompletion",
      "welcome",
      "practiceReminders",
      "milestones",
      "feedbackReady",
      "sessionExport",
      "accountUpdates",
      "reminderFrequency",
    ];

    const filteredPreferences: EmailPreferences = {};
    for (const key of validKeys) {
      if (key in preferences) {
        (filteredPreferences as any)[key] = preferences[key as keyof EmailPreferences];
      }
    }

    await query(
      `UPDATE users 
       SET "emailPreferences" = $1
       WHERE id = $2`,
      [JSON.stringify(filteredPreferences), user.id]
    );

    return NextResponse.json({ success: true, preferences: filteredPreferences });
  } catch (error) {
    console.error("Error updating email preferences:", error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 }
    );
  }
}
