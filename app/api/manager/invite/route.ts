import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { sendTeamInviteEmail } from "@/lib/emails/senders";
import { BASE_URL } from "@/lib/emails/config";

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
 * POST /api/manager/invite - Invite users to the manager's company (manager-only)
 * Body: { emails: string[] } or { emails: "a@x.com, b@y.com" } or array of strings
 *
 * This endpoint now:
 * - Records pending invites in company_invites
 * - Sends invite emails
 * - Does NOT create or update users; users are only attached to a company after they sign in.
 */
export async function POST(request: NextRequest) {
  try {
    const manager = await requireManager();

    if (!manager.companyId) {
      return NextResponse.json(
        { error: "Manager is not associated with a company" },
        { status: 400 }
      );
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

    const company = await queryOne<{ name: string }>(
      `SELECT name FROM companies WHERE id = $1`,
      [manager.companyId]
    );
    const companyName = company?.name || "Your team";
    const signInUrl = `${BASE_URL}/auth/signin`;

    let invited = 0;
    const failed: { email: string; reason: string }[] = [];

    for (const email of uniqueEmails) {
      try {
        // Upsert invite record; do not create a user yet.
        await query(
          `INSERT INTO company_invites (id, email, "companyId", role, "createdAt")
           VALUES ($1, $2, $3, 'user', NOW())
           ON CONFLICT (email, "companyId")
           DO UPDATE SET "createdAt" = NOW(), "acceptedAt" = NULL`,
          [
            `invite_${Date.now()}_${Math.random()
              .toString(36)
              .substring(2, 11)}`,
            email,
            manager.companyId,
          ]
        );

        const sent = await sendTeamInviteEmail({
          companyName,
          inviteeEmail: email,
          signInUrl,
        });
        if (sent) {
          invited++;
        } else {
          failed.push({ email, reason: "Failed to send invite email" });
        }
      } catch (err) {
        console.error("Invite error for", email, err);
        failed.push({
          email,
          reason: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({ invited, failed });
  } catch (error) {
    console.error("Manager invite error:", error);
    return NextResponse.json(
      { error: "Failed to send invites" },
      { status: 500 }
    );
  }
}
