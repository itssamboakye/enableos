import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { updateCoachingFlagStatus } from "@/lib/coaching/flags";
import type { CoachingFlagStatus } from "@/lib/coaching/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const manager = await requireManager();
    if (!manager.companyId) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const status = body.status as CoachingFlagStatus;

    if (
      status !== "open" &&
      status !== "acknowledged" &&
      status !== "resolved"
    ) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await updateCoachingFlagStatus(
      id,
      manager.companyId,
      status
    );

    if (!updated) {
      return NextResponse.json({ error: "Flag not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[manager/coaching/flags]", error);
    return NextResponse.json(
      { error: "Failed to update flag" },
      { status: 500 }
    );
  }
}
