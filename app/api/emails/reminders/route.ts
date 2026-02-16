import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendPracticeReminderEmail } from "@/lib/emails/senders";
import { getUserEmailPreferences } from "@/lib/emails/utils";

/**
 * POST /api/emails/reminders - Send practice reminders to users who haven't practiced recently
 * This can be called by a cron job or scheduled task
 */
export async function POST(request: NextRequest) {
  try {
    // Check if this is a Vercel cron job request
    const isVercelCron = request.headers.get("x-vercel-cron") === "1";
    
    // If not a Vercel cron, check for manual authorization
    if (!isVercelCron) {
      const authHeader = request.headers.get("authorization");
      if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Get users who haven't practiced in the last 3, 7, or 14 days
    const reminderDays = [3, 7, 14];
    let emailsSent = 0;

    for (const days of reminderDays) {
      const users = await query<{
        id: string;
        email: string;
        name: string | null;
        preferredName: string | null;
        totalSessions: number;
        lastSessionDate: string | null;
      }>(
        `SELECT u.id, u.email, u.name, u."preferredName", 
                p."totalSessions", p."lastSessionDate"
         FROM users u
         INNER JOIN progress p ON u.id = p."userId"
         WHERE p."lastSessionDate" < NOW() - INTERVAL '${days} days'
           AND p."lastSessionDate" >= NOW() - INTERVAL '${days + 1} days'
           AND p."totalSessions" > 0`,
        []
      );

      for (const user of users) {
        const preferences = await getUserEmailPreferences(user.id);
        
        // Check if user wants reminders and frequency matches
        if (
          preferences.practiceReminders !== false &&
          (preferences.reminderFrequency === "weekly" || 
           preferences.reminderFrequency === "daily" ||
           !preferences.reminderFrequency)
        ) {
          const daysSinceLastSession = user.lastSessionDate
            ? Math.floor(
                (Date.now() - new Date(user.lastSessionDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            : 0;

          const userName = user.preferredName || user.name?.split(" ")[0] || "there";

          await sendPracticeReminderEmail(user.id, user.email, {
            userName,
            daysSinceLastSession,
            lastSessionDate: user.lastSessionDate,
            totalSessions: user.totalSessions,
          });

          emailsSent++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      message: `Sent ${emailsSent} practice reminder emails`,
    });
  } catch (error) {
    console.error("Error sending practice reminders:", error);
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
