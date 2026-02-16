import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import { sendSessionExportEmail } from "@/lib/emails/senders";

/**
 * POST /api/emails/export - Send session export via email
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get session data
    const session = await queryOne<{
      transcript: any;
      feedback: any;
      scores: any;
      duration: number | null;
      createdAt: string;
    }>(
      `SELECT transcript, feedback, scores, duration, "createdAt"
       FROM practice_sessions
       WHERE id = $1 AND "userId" = $2`,
      [sessionId, user.id]
    );

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Get user data
    const userData = await queryOne<{
      email: string;
      name: string | null;
      preferredName: string | null;
    }>(
      `SELECT email, name, "preferredName" FROM users WHERE id = $1`,
      [user.id]
    );

    if (!userData?.email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 404 }
      );
    }

    const userName = userData.preferredName || userData.name?.split(" ")[0] || "there";

    // Send export email
    await sendSessionExportEmail(user.id, userData.email, {
      userName,
      sessionId,
      sessionDate: session.createdAt,
      transcript: typeof session.transcript === "string" 
        ? JSON.parse(session.transcript) 
        : session.transcript,
      feedback: typeof session.feedback === "string"
        ? JSON.parse(session.feedback)
        : session.feedback,
      scores: typeof session.scores === "string"
        ? JSON.parse(session.scores)
        : session.scores,
      exportUrl: `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL || "enableos.io"}`
        : "http://localhost:3000"}/discovery-practice/summary?session=${sessionId}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending session export email:", error);
    return NextResponse.json(
      { error: "Failed to send export email" },
      { status: 500 }
    );
  }
}
