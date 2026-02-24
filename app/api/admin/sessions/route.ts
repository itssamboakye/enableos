import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

/**
 * GET /api/admin/sessions - List practice sessions for administrators
 * Optional query params:
 *  - userId: filter sessions by user
 *  - limit, offset: pagination
 */
export async function GET(request: NextRequest) {
  try {
    try {
      await requireAdmin();
    } catch (error) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const userId = searchParams.get("userId");

    const params: any[] = [];
    let whereClause = "";

    if (userId) {
      params.push(userId);
      whereClause = `WHERE ps."userId" = $${params.length}`;
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
    console.error("Error fetching admin sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

