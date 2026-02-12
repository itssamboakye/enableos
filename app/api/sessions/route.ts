import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

/**
 * GET /api/sessions - Get all practice sessions for current user
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const sessions = await query(
      `SELECT id, transcript, feedback, scores, duration, "buyerContext", "buyerRole", "callType", "createdAt"
       FROM practice_sessions
       WHERE "userId" = $1
       ORDER BY "createdAt" DESC
       LIMIT $2 OFFSET $3`,
      [user.id, limit, offset]
    );

    const total = await queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM practice_sessions WHERE "userId" = $1`,
      [user.id]
    );

    return NextResponse.json({
      sessions,
      total: parseInt(total?.count || "0"),
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sessions - Save a new practice session
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
    const {
      transcript,
      feedback,
      scores,
      duration,
      buyerContext,
      buyerRole,
      callType,
    } = body;

    if (!transcript || !Array.isArray(transcript)) {
      return NextResponse.json(
        { error: "Transcript is required and must be an array" },
        { status: 400 }
      );
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Save session
    await query(
      `INSERT INTO practice_sessions 
       (id, "userId", transcript, feedback, scores, duration, "buyerContext", "buyerRole", "callType", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
      [
        sessionId,
        user.id,
        JSON.stringify(transcript),
        feedback ? JSON.stringify(feedback) : null,
        scores ? JSON.stringify(scores) : null,
        duration || null,
        buyerContext || null,
        buyerRole || null,
        callType || null,
      ]
    );

    // Update progress
    if (scores) {
      const progress = await queryOne<{
        totalSessions: number;
        averageClarity: number | null;
        averageCuriosity: number | null;
        averageListening: number | null;
        averageFlowControl: number | null;
        averageConfidence: number | null;
        averageNextStep: number | null;
      }>(
        `SELECT "totalSessions", "averageClarity", "averageCuriosity", "averageListening", 
                "averageFlowControl", "averageConfidence", "averageNextStep"
         FROM progress
         WHERE "userId" = $1`,
        [user.id]
      );

      if (progress) {
        const newTotal = progress.totalSessions + 1;
        const clarity = scores.clarity || 0;
        const curiosity = scores.curiosity || 0;
        const listening = scores.listening || 0;
        const flowControl = scores.flowControl || 0;
        const confidence = scores.confidence || 0;
        const nextStep = scores.nextStep || 0;

        // Calculate new averages
        const newAvgClarity =
          progress.averageClarity !== null
            ? (progress.averageClarity * progress.totalSessions + clarity) / newTotal
            : clarity;
        const newAvgCuriosity =
          progress.averageCuriosity !== null
            ? (progress.averageCuriosity * progress.totalSessions + curiosity) / newTotal
            : curiosity;
        const newAvgListening =
          progress.averageListening !== null
            ? (progress.averageListening * progress.totalSessions + listening) / newTotal
            : listening;
        const newAvgFlowControl =
          progress.averageFlowControl !== null
            ? (progress.averageFlowControl * progress.totalSessions + flowControl) / newTotal
            : flowControl;
        const newAvgConfidence =
          progress.averageConfidence !== null
            ? (progress.averageConfidence * progress.totalSessions + confidence) / newTotal
            : confidence;
        const newAvgNextStep =
          progress.averageNextStep !== null
            ? (progress.averageNextStep * progress.totalSessions + nextStep) / newTotal
            : nextStep;

        await query(
          `UPDATE progress
           SET "totalSessions" = $1,
               "averageClarity" = $2,
               "averageCuriosity" = $3,
               "averageListening" = $4,
               "averageFlowControl" = $5,
               "averageConfidence" = $6,
               "averageNextStep" = $7,
               "lastSessionDate" = NOW(),
               "updatedAt" = NOW()
           WHERE "userId" = $8`,
          [
            newTotal,
            newAvgClarity,
            newAvgCuriosity,
            newAvgListening,
            newAvgFlowControl,
            newAvgConfidence,
            newAvgNextStep,
            user.id,
          ]
        );
      }
    }

    return NextResponse.json({ id: sessionId, success: true });
  } catch (error) {
    console.error("Error saving session:", error);
    return NextResponse.json(
      { error: "Failed to save session" },
      { status: 500 }
    );
  }
}
