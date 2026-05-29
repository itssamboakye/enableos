import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { getCoachingQueue } from "@/lib/coaching/flags";
import type { CoachingFlagStatus } from "@/lib/coaching/types";

export async function GET(request: NextRequest) {
  try {
    const manager = await requireManager();
    if (!manager.companyId) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const statusParam = request.nextUrl.searchParams.get("status");
    const status: CoachingFlagStatus | "all" =
      statusParam === "acknowledged" ||
      statusParam === "resolved" ||
      statusParam === "all"
        ? statusParam
        : "open";

    const flags = await getCoachingQueue(manager.companyId, status);
    return NextResponse.json({ flags });
  } catch (error) {
    console.error("[manager/coaching/queue]", error);
    return NextResponse.json(
      { error: "Failed to load coaching queue" },
      { status: 500 }
    );
  }
}
