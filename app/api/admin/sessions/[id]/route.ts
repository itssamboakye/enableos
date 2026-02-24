import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { queryOne } from "@/lib/db";

/**
 * GET /api/admin/sessions/:id - Get a single practice session with transcript for administrators
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    try {
      await requireAdmin();
    } catch (error) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const session = await queryOne<{
      id: string;
      userId: string;
      userEmail: string;
      userName: string | null;
      createdAt: string;
      duration: number | null;
      callType: string | null;
      buyerContext: string | null;
      buyerRole: string | null;
      transcript: any;
      feedback: any;
      scores: any;
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
         ps."buyerRole",
         ps.transcript,
         ps.feedback,
         ps.scores
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       WHERE ps.id = $1`,
      [id]
    );

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const normalizeJson = (value: any) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    };

    return NextResponse.json({
      ...session,
      transcript: normalizeJson(session.transcript),
      feedback: normalizeJson(session.feedback),
      scores: normalizeJson(session.scores),
    });
  } catch (error) {
    console.error("Error fetching admin session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}

