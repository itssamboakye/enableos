import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { queryOne } from "@/lib/db";

/**
 * GET /api/manager/sessions/:id - Get a single practice session with transcript for a manager's company
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
    const manager = await requireManager();

    if (!manager.companyId) {
      return NextResponse.json(
        { error: "Manager is not associated with a company" },
        { status: 400 }
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
      managerNote: string | null;
      managerLabel: string | null;
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
         ps.scores,
         mn.note as "managerNote",
         mn.label as "managerLabel"
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       LEFT JOIN manager_session_notes mn
         ON mn."sessionId" = ps.id AND mn."managerId" = $2
       WHERE ps.id = $1
         AND u."companyId" = $3`,
      [id, manager.id, manager.companyId]
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
      managerNote: session.managerNote,
      managerLabel: session.managerLabel,
    });
  } catch (error) {
    console.error("Error fetching manager session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}

