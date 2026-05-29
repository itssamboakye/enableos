import { NextRequest, NextResponse } from "next/server";
import { getCompanyOverviewMetrics } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const manager = await requireManager();
    if (!manager.companyId) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const periodParam = request.nextUrl.searchParams.get("period");
    const period: AnalyticsPeriod =
      periodParam === "7d" || periodParam === "90d" ? periodParam : "30d";

    const metrics = await getCompanyOverviewMetrics(manager.companyId, period);
    return NextResponse.json({ metrics, period });
  } catch (error) {
    console.error("[manager/analytics/overview]", error);
    return NextResponse.json(
      { error: "Failed to load overview metrics" },
      { status: 500 }
    );
  }
}
