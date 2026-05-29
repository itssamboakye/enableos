import { NextRequest, NextResponse } from "next/server";
import { getPlaybookReport } from "@/lib/analytics";
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

    const report = await getPlaybookReport(manager.companyId, period);
    return NextResponse.json({ report });
  } catch (error) {
    console.error("[manager/analytics/insights]", error);
    return NextResponse.json(
      { error: "Failed to load playbook insights" },
      { status: 500 }
    );
  }
}
