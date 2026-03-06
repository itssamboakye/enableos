import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/companies/[id]/users - List users (and managers) in a company (admin-only)
 */
export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    await requireAdmin();
    const { id: companyId } = await params;

    const company = await queryOne<{ id: string; name: string }>(
      `SELECT id, name FROM companies WHERE id = $1`,
      [companyId]
    );
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const users = await query<{
      id: string;
      email: string;
      name: string | null;
      role: string | null;
      createdAt: string;
      totalSessions: number;
      lastSessionDate: string | null;
    }>(
      `SELECT 
         u.id,
         u.email,
         u.name,
         u.role,
         u."createdAt",
         COALESCE(p."totalSessions", 0)::int as "totalSessions",
         p."lastSessionDate"
       FROM users u
       LEFT JOIN progress p ON p."userId" = u.id
       WHERE u."companyId" = $1
       ORDER BY u.role ASC, u."createdAt" ASC`,
      [companyId]
    );

    return NextResponse.json({
      company: { id: company.id, name: company.name },
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role || "user",
        createdAt: u.createdAt,
        totalSessions: u.totalSessions,
        lastSessionDate: u.lastSessionDate,
      })),
    });
  } catch (error) {
    console.error("Error fetching company users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
