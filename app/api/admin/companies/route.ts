import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

/**
 * GET /api/admin/companies - List all companies with trial and member count (admin-only)
 */
export async function GET() {
  try {
    await requireAdmin();

    const rows = await query<{
      id: string;
      name: string;
      trialEndsAt: string | null;
      createdAt: string;
      memberCount: string;
    }>(
      `SELECT 
         c.id,
         c.name,
         c."trialEndsAt",
         c."createdAt",
         COUNT(u.id)::text as "memberCount"
       FROM companies c
       LEFT JOIN users u ON u."companyId" = c.id
       GROUP BY c.id, c.name, c."trialEndsAt", c."createdAt"
       ORDER BY c."createdAt" DESC`
    );

    const companies = rows.map((r) => ({
      id: r.id,
      name: r.name,
      trialEndsAt: r.trialEndsAt,
      createdAt: r.createdAt,
      memberCount: parseInt(r.memberCount, 10) || 0,
    }));

    return NextResponse.json({ companies });
  } catch (error) {
    console.error("Error fetching admin companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/companies - Create a new company (admin-only)
 * Body: { name: string, trialDays?: number } — trialDays defaults to 30
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json().catch(() => ({}));
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const trialDays = typeof body?.trialDays === "number" ? body.trialDays : 30;

    if (!name) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    const id = `company_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + Math.max(0, trialDays));

    await query(
      `INSERT INTO companies (id, name, "trialEndsAt", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, NOW(), NOW())`,
      [id, name, trialEndsAt.toISOString()]
    );

    const company = await queryOne<{ id: string; name: string; trialEndsAt: string }>(
      `SELECT id, name, "trialEndsAt" FROM companies WHERE id = $1`,
      [id]
    );

    return NextResponse.json({
      company: company
        ? {
            id: company.id,
            name: company.name,
            trialEndsAt: company.trialEndsAt,
          }
        : { id, name, trialEndsAt: trialEndsAt.toISOString() },
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}
