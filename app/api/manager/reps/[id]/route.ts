import { NextRequest, NextResponse } from "next/server";
import { getRepProfile } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";
import { getCoachingFlagsForUser } from "@/lib/coaching/flags";
import { listAssignmentsForUser } from "@/lib/scenarios/queries";
import { queryOne } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const manager = await requireManager();
    if (!manager.companyId) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const { id: userId } = await params;
    const periodParam = request.nextUrl.searchParams.get("period");
    const period: AnalyticsPeriod =
      periodParam === "7d" || periodParam === "90d" ? periodParam : "30d";

    const member = await queryOne<{ id: string }>(
      `SELECT id FROM users WHERE id = $1 AND "companyId" = $2 AND role = 'user'`,
      [userId, manager.companyId]
    );

    if (!member) {
      return NextResponse.json({ error: "Rep not found" }, { status: 404 });
    }

    const [profile, flags, assignments] = await Promise.all([
      getRepProfile(userId, manager.companyId, period),
      getCoachingFlagsForUser(userId, manager.companyId),
      listAssignmentsForUser(userId, manager.companyId),
    ]);

    if (!profile) {
      return NextResponse.json({ error: "Rep not found" }, { status: 404 });
    }

    return NextResponse.json({ profile, flags, assignments, period });
  } catch (error) {
    console.error("[manager/reps/profile]", error);
    return NextResponse.json(
      { error: "Failed to load rep profile" },
      { status: 500 }
    );
  }
}
