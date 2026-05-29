import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import {
  assignScenarioToUser,
  getScenarioById,
} from "@/lib/scenarios/queries";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const manager = await requireManager();
    if (!manager.companyId) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const { id: scenarioId } = await params;
    const scenario = await getScenarioById(scenarioId, manager.companyId);
    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const userId = typeof body.userId === "string" ? body.userId : null;
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const dueAt =
      typeof body.dueAt === "string" && body.dueAt
        ? new Date(body.dueAt)
        : null;
    const note = typeof body.note === "string" ? body.note : null;

    const { assignment } = await assignScenarioToUser({
      scenarioId,
      userId,
      companyId: manager.companyId,
      assignedBy: manager.id,
      dueAt,
      note,
    });

    return NextResponse.json({ assignment });
  } catch (error) {
    console.error("[manager/scenarios/assign]", error);
    const message =
      error instanceof Error ? error.message : "Failed to assign scenario";
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
