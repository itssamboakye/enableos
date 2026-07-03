import { NextRequest, NextResponse } from "next/server";
import { getTeamAffectTrends } from "@/lib/analytics/affect-trends";
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

    const trends = await getTeamAffectTrends(manager.companyId, period);
    return NextResponse.json({ trends, period });
  } catch (error) {
    console.error("[manager/analytics/affect]", error);
    return NextResponse.json(
      { error: "Failed to load affect trends" },
      { status: 500 }
    );
  }
}
