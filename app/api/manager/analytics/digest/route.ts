import { NextRequest, NextResponse } from "next/server";
import { getExecutiveSummary } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { getOpenCoachingFlagCount } from "@/lib/coaching/flags";
import { requireManager } from "@/lib/auth";
import { getUserDisplayName } from "@/lib/auth";
import { sendManagerDigestEmail } from "@/lib/emails/senders";
import { BASE_URL } from "@/lib/emails/config";

const PERIOD_LABELS = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
} as const;

export async function POST(request: NextRequest) {
  try {
    const manager = await requireManager();
    if (!manager.companyId || !manager.email) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const period: AnalyticsPeriod =
      body.period === "7d" || body.period === "90d" ? body.period : "30d";

    const [summary, openFlags] = await Promise.all([
      getExecutiveSummary(manager.companyId, period),
      getOpenCoachingFlagCount(manager.companyId),
    ]);

    const sent = await sendManagerDigestEmail(manager.email, {
      managerName: getUserDisplayName(manager) || "there",
      companyName: summary.companyName,
      periodLabel: PERIOD_LABELS[period],
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

    if (!sent) {
      return NextResponse.json(
        { error: "Email could not be sent — check Resend configuration" },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true, sentTo: manager.email });
  } catch (error) {
    console.error("[manager/analytics/digest]", error);
    return NextResponse.json(
      { error: "Failed to send digest" },
      { status: 500 }
    );
  }
}
