import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { sendManagerInviteEmail } from "@/lib/emails/senders";
import { BASE_URL } from "@/lib/emails/config";

type RouteParams = { params: Promise<{ id: string }> };

function parseEmails(body: unknown): string[] {
  if (Array.isArray(body)) {
    return body
      .flatMap((e) =>
        typeof e === "string"
          ? e.split(/[\n,]+/).map((s) => s.trim().toLowerCase())
          : []
      )
      .filter(Boolean);
  }
  if (typeof body === "object" && body !== null && "emails" in body) {
    const emails = (body as { emails: unknown }).emails;
    if (typeof emails === "string") {
      return emails
        .split(/[\n,]+/)
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    }
    if (Array.isArray(emails)) {
      return emails
        .flatMap((e) =>
          typeof e === "string"
            ? e.split(/[\n,]+/).map((s) => s.trim().toLowerCase())
            : []
        )
        .filter(Boolean);
    }
  }
  return [];
}

/**
 * POST /api/admin/companies/[id]/invite-managers - Invite managers to a company (admin-only)
 * Body: { emails: string[] } or { emails: "a@x.com, b@y.com" }
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin();
    const { id: companyId } = await params;

    const company = await queryOne<{ name: string }>(
      `SELECT name FROM companies WHERE id = $1`,
      [companyId]
    );
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const emails = parseEmails(body);
    const uniqueEmails = [...new Set(emails)];

    if (uniqueEmails.length === 0) {
      return NextResponse.json(
        { error: "Provide at least one email address" },
        { status: 400 }
      );
    }

    const signInUrl = `${BASE_URL}/auth/signin`;
    let invited = 0;
    const failed: { email: string; reason: string }[] = [];

    for (const email of uniqueEmails) {
      try {
        await query(
          `INSERT INTO company_invites (id, email, "companyId", role, "createdAt")
           VALUES ($1, $2, $3, 'manager', NOW())
           ON CONFLICT (email, "companyId")
           DO UPDATE SET role = 'manager', "createdAt" = NOW(), "acceptedAt" = NULL`,
          [
            `invite_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            email,
            companyId,
          ]
        );

        const sent = await sendManagerInviteEmail({
          companyName: company.name,
          inviteeEmail: email,
          signInUrl,
        });
        if (sent) {
          invited++;
        } else {
          failed.push({ email, reason: "Failed to send invite email" });
        }
      } catch (err) {
        console.error("Invite manager error for", email, err);
        failed.push({
          email,
          reason: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({ invited, failed });
  } catch (error) {
    console.error("Admin invite managers error:", error);
    return NextResponse.json(
      { error: "Failed to send invites" },
      { status: 500 }
    );
  }
}
