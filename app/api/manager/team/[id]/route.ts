import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { query } from "@/lib/db";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * DELETE /api/manager/team/[id] - Remove a user from the manager's company.
 * This does NOT delete the user; it just clears their companyId so they
 * no longer appear on the team.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const manager = await requireManager();

    if (!manager.companyId) {
      return NextResponse.json(
        { error: "Manager is not associated with a company" },
        { status: 400 }
      );
    }

    const { id: userId } = await params;

    const result = await query<{
      rowCount: number;
    }>(
      `UPDATE users
       SET "companyId" = NULL,
           "updatedAt" = NOW()
       WHERE id = $1
         AND "companyId" = $2
         AND role = 'user'`,
      [userId, manager.companyId]
    );

    // node-postgres doesn't return rowCount through our helper, so we just
    // respond with ok; managers will see updated list on refresh.
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error removing user from team:", error);
    return NextResponse.json(
      { error: "Failed to remove user from team" },
      { status: 500 }
    );
  }
}

