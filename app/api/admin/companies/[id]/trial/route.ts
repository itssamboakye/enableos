import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * PATCH /api/admin/companies/[id]/trial - Extend or end trial (admin-only)
 * Body: { action: "extend" | "end" }
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin();
    const { id: companyId } = await params;

    const body = await request.json().catch(() => ({}));
    const action = (body?.action as string)?.toLowerCase();

    if (action !== "extend" && action !== "end") {
      return NextResponse.json(
        { error: "Body must include action: 'extend' or 'end'" },
        { status: 400 }
      );
    }

    const company = await queryOne<{ id: string; trialEndsAt: string | null }>(
      `SELECT id, "trialEndsAt" FROM companies WHERE id = $1`,
      [companyId]
    );

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const now = new Date();
    let newTrialEndsAt: Date;

    if (action === "end") {
      newTrialEndsAt = now;
    } else {
      const current = company.trialEndsAt ? new Date(company.trialEndsAt) : null;
      const base = current && current > now ? current : now;
      newTrialEndsAt = new Date(base);
      newTrialEndsAt.setDate(newTrialEndsAt.getDate() + 30);
    }

    await query(
      `UPDATE companies SET "trialEndsAt" = $1, "updatedAt" = NOW() WHERE id = $2`,
      [newTrialEndsAt.toISOString(), companyId]
    );

    return NextResponse.json({
      ok: true,
      trialEndsAt: newTrialEndsAt.toISOString(),
      action,
    });
  } catch (error) {
    console.error("Error updating company trial:", error);
    return NextResponse.json(
      { error: "Failed to update trial" },
      { status: 500 }
    );
  }
}
