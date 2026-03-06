import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * DELETE /api/admin/companies/[id] - Delete a company (admin-only).
 * With company-delete-cascade migration applied, this also deletes all users
 * in that company (and their sessions, progress, practice_sessions, accounts).
 */
export async function DELETE(
  _request: NextRequest,
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

    await query(`DELETE FROM companies WHERE id = $1`, [companyId]);

    return NextResponse.json({ ok: true, deleted: companyId });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}
