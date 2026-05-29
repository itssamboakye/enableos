import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { assignRemediationFromFlag } from "@/lib/coaching/flags";

export async function POST(request: NextRequest) {
  try {
    const manager = await requireManager();
    if (!manager.companyId) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const flagId = typeof body.flagId === "string" ? body.flagId : null;
    const scenarioId = typeof body.scenarioId === "string" ? body.scenarioId : null;
    const note = typeof body.note === "string" ? body.note : null;

    if (!flagId || !scenarioId) {
      return NextResponse.json(
        { error: "flagId and scenarioId are required" },
        { status: 400 }
      );
    }

    const result = await assignRemediationFromFlag({
      flagId,
      scenarioId,
      companyId: manager.companyId,
      assignedBy: manager.id,
      note,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[manager/coaching/actions]", error);
    const message =
      error instanceof Error ? error.message : "Failed to assign remediation";
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
