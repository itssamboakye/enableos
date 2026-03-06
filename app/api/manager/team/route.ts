import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { query } from "@/lib/db";

/**
 * GET /api/manager/team - List team members with aggregated stats
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

    const users = await query<{
      id: string;
      email: string;
      name: string | null;
      company: string | null;
      title: string | null;
      createdAt: string;
      totalSessions: number;
      lastSessionDate: string | null;
      averageClarity: number | null;
      averageCuriosity: number | null;
      averageListening: number | null;
      averageFlowControl: number | null;
      averageConfidence: number | null;
    }>(
      `SELECT 
         u.id,
         u.email,
         u.name,
         u.company,
         u.title,
         u."createdAt",
         COALESCE(p."totalSessions", 0) as "totalSessions",
         p."lastSessionDate",
         p."averageClarity",
         p."averageCuriosity",
         p."averageListening",
         p."averageFlowControl",
         p."averageConfidence"
       FROM users u
       LEFT JOIN progress p ON p."userId" = u.id
       WHERE u."companyId" = $1
         AND u.role = 'user'
       ORDER BY COALESCE(p."totalSessions", 0) DESC, u."createdAt" ASC`,
      [manager.companyId]
    );

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching manager team:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}

