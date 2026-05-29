import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { query } from "@/lib/db";

/**
 * GET /api/manager/sessions - List practice sessions for a manager's company
 * Optional query params:
 *  - userId: filter sessions by specific user (must belong to manager's company)
 *  - limit, offset: pagination
 */
export async function GET(request: NextRequest) {
  try {
    const manager = await requireManager();

    if (!manager.companyId) {
      return NextResponse.json(
        { error: "Manager is not associated with a company" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const userId = searchParams.get("userId");
    const scenarioId = searchParams.get("scenarioId");

    const params: any[] = [manager.companyId];
    let whereClause = `WHERE u."companyId" = $1`;

    if (userId) {
      params.push(userId);
      whereClause += ` AND ps."userId" = $${params.length}`;
    }

    if (scenarioId) {
      params.push(scenarioId);
      whereClause += ` AND (
        ps."scenarioId" = $${params.length}
        OR (
          ps."scenarioId" IS NULL
          AND ps."callType" = (
            SELECT "callType" FROM scenarios WHERE id = $${params.length}
          )
        )
      )`;
    }

    params.push(limit);
    params.push(offset);

    const sessions = await query<{
      id: string;
      userId: string;
      userEmail: string;
      userName: string | null;
      createdAt: string;
      duration: number | null;
      callType: string | null;
      buyerContext: string | null;
      buyerRole: string | null;
    }>(
      `SELECT 
         ps.id,
         ps."userId" as "userId",
         u.email as "userEmail",
         COALESCE(u."preferredName", u.name) as "userName",
         ps."createdAt",
         ps.duration,
         ps."callType",
         ps."buyerContext",
         ps."buyerRole"
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       ${whereClause}
       ORDER BY ps."createdAt" DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    return NextResponse.json({
      sessions,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching manager sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

