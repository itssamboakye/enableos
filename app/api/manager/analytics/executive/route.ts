import { NextRequest, NextResponse } from "next/server";
import { getExecutiveSummary } from "@/lib/analytics";
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

    const summary = await getExecutiveSummary(manager.companyId, period);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("[manager/analytics/executive]", error);
    return NextResponse.json(
      { error: "Failed to load executive summary" },
      { status: 500 }
    );
  }
}
