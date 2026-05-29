import { NextRequest, NextResponse } from "next/server";
import { getPlaybookReport, playbookReportToCsv } from "@/lib/analytics";
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
    const csv = playbookReportToCsv(report);
    const filename = `enableos-playbook-${period}-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("[manager/analytics/insights/export]", error);
    return NextResponse.json(
      { error: "Failed to export playbook" },
      { status: 500 }
    );
  }
}
