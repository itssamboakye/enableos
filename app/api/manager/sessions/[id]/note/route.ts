import { NextRequest, NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

/**
 * POST /api/manager/sessions/:id/note - Create or update manager note/label for a session
 */
export async function POST(
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

    const body = await request.json();
    const note: string | null = body.note ?? null;
    const label: string | null = body.label ?? null;

    // Verify the session belongs to the manager's company
    const session = await queryOne<{ id: string }>(
      `SELECT ps.id
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       WHERE ps.id = $1 AND u."companyId" = $2`,
      [id, manager.companyId]
    );

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const noteId = `note_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    await query(
      `INSERT INTO manager_session_notes (id, "sessionId", "managerId", note, label, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT ("sessionId", "managerId")
       DO UPDATE SET note = EXCLUDED.note,
                     label = EXCLUDED.label,
                     "updatedAt" = NOW()`,
      [noteId, id, manager.id, note, label]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving manager note:", error);
    return NextResponse.json(
      { error: "Failed to save note" },
      { status: 500 }
    );
  }
}

