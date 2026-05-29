import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getExecutiveSummary } from "@/lib/analytics";
import { getOpenCoachingFlagCount } from "@/lib/coaching/flags";
import { sendManagerDigestEmail } from "@/lib/emails/senders";
import { BASE_URL } from "@/lib/emails/config";

/**
 * POST /api/emails/manager-digest — Weekly digest for all managers (cron).
 */
export async function POST(request: NextRequest) {
  try {
    const isVercelCron = request.headers.get("x-vercel-cron") === "1";

    if (!isVercelCron) {
      const authHeader = request.headers.get("authorization");
      if (
        process.env.CRON_SECRET &&
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const managers = await query<{
      id: string;
      email: string;
      name: string | null;
      preferredName: string | null;
      companyId: string;
    }>(
      `SELECT id, email, name, "preferredName", "companyId"
       FROM users
       WHERE role IN ('manager', 'admin')
         AND "companyId" IS NOT NULL
         AND email IS NOT NULL`
    );

    let sent = 0;
    let failed = 0;

    for (const manager of managers) {
      try {
        const [summary, openFlags] = await Promise.all([
          getExecutiveSummary(manager.companyId, "7d"),
          getOpenCoachingFlagCount(manager.companyId),
        ]);

        const ok = await sendManagerDigestEmail(manager.email, {
          managerName:
            manager.preferredName || manager.name?.split(" ")[0] || "there",
          companyName: summary.companyName,
          periodLabel: "7 days",
          activeReps: summary.metrics.activeRepsThisWeek,
          sessionsCompleted: summary.metrics.sessionsCompleted,
          avgReadiness: summary.metrics.avgReadiness,
          repsAtRisk: summary.metrics.repsAtRisk,
          readinessChange7d: summary.metrics.readinessChange7d,
          openFlags,
          topInsights: summary.topInsights.slice(0, 3).map((i) => ({
            title: i.title,
            recommendedAction: i.recommendedAction,
          })),
          dashboardUrl: `${BASE_URL}/manager/executive`,
        });

        if (ok) sent++;
        else failed++;
      } catch (err) {
        console.error("Digest failed for", manager.email, err);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      sent,
      failed,
      total: managers.length,
    });
  } catch (error) {
    console.error("Error sending manager digests:", error);
    return NextResponse.json(
      { error: "Failed to send manager digests" },
      { status: 500 }
    );
  }
}
