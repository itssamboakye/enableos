import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { sendSessionCompletionEmail, sendMilestoneEmail } from "@/lib/emails/senders";
import { createNotification } from "@/lib/notifications";
import { normalizeScorecard } from "@/lib/scores";
import { evaluateCoachingFlagsOnSession } from "@/lib/coaching/flags";
import { resolveScenarioIdForCallType } from "@/lib/scenarios/queries";

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

    const feedbackObj =
      feedback && typeof feedback === "string" ? JSON.parse(feedback) : feedback;
    let normalizedScores = normalizeScorecard(scores);
    if (!normalizedScores && feedbackObj?.scorecard) {
      normalizedScores = normalizeScorecard(feedbackObj.scorecard);
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const scenarioId = await resolveScenarioIdForCallType(callType || null);

    // Save session
    await query(
      `INSERT INTO practice_sessions 
       (id, "userId", transcript, feedback, scores, duration, "buyerContext", "buyerRole", "callType", "scenarioId", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
      [
        sessionId,
        user.id,
        JSON.stringify(transcript),
        feedbackObj ? JSON.stringify(feedbackObj) : null,
        normalizedScores ? JSON.stringify(normalizedScores) : null,
        duration || null,
        buyerContext || null,
        buyerRole || null,
        callType || null,
        scenarioId,
      ]
    );

    // Update progress
    if (normalizedScores) {
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
        const clarity = normalizedScores.clarity;
        const curiosity = normalizedScores.curiosity;
        const listening = normalizedScores.listening;
        const flowControl = normalizedScores.flowControl;
        const confidence = normalizedScores.confidence;
        const nextStep = normalizedScores.nextStep;

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

    try {
      await evaluateCoachingFlagsOnSession({
        userId: user.id,
        companyId: user.companyId,
        sessionId,
        scores: normalizedScores,
      });
    } catch (flagError) {
      console.error("Coaching flag evaluation failed:", flagError);
    }

    // Send session completion email (non-blocking)
    let userData: { email: string; name: string | null; preferredName: string | null } | null = null;
    try {
      userData = await queryOne<{
        email: string;
        name: string | null;
        preferredName: string | null;
      }>(
        `SELECT email, name, "preferredName" FROM users WHERE id = $1`,
        [user.id]
      );

      if (userData?.email) {
        const userName = userData.preferredName || userData.name?.split(" ")[0] || "there";
        const feedbackData = feedbackObj ?? null;
        
        // Extract feedback highlights
        const feedbackHighlights = feedbackData
          ? {
              strengths: feedbackData.strengths?.slice(0, 3) || [],
              improvements: feedbackData.improvements?.slice(0, 3).map((imp: any) => imp.issue) || [],
            }
          : {
              strengths: [],
              improvements: [],
            };

        // Map scores to match email format (flow -> flowControl, nextSteps -> nextStep)
        const emailScores = normalizedScores
          ? {
              clarity: normalizedScores.clarity,
              curiosity: normalizedScores.curiosity,
              listening: normalizedScores.listening,
              flowControl: normalizedScores.flowControl,
              confidence: normalizedScores.confidence,
              nextStep: normalizedScores.nextStep,
            }
          : null;

        console.log(`[SESSION_EMAIL] Attempting to send session completion email for session ${sessionId}`);
        const emailSent = await sendSessionCompletionEmail(user.id, userData.email, {
          userName,
          sessionId,
          sessionDate: new Date().toISOString(),
          duration,
          buyerContext: buyerContext || null,
          buyerRole: buyerRole || null,
          callType: callType || null,
          scores: emailScores,
          feedbackHighlights,
          feedbackUrl: "", // Will be set in sender
        });
        
        if (emailSent) {
          console.log(`[SESSION_EMAIL] Session completion email sent successfully for session ${sessionId}`);
        } else {
          console.log(`[SESSION_EMAIL] Session completion email was not sent for session ${sessionId} (check logs above for reason)`);
        }
      }
    } catch (emailError) {
      console.error("Error preparing session completion email:", emailError);
      // Don't fail the request if email preparation fails
    }

    // Check for milestones (non-blocking)
    try {
      const progress = await queryOne<{ totalSessions: number }>(
        `SELECT "totalSessions" FROM progress WHERE "userId" = $1`,
        [user.id]
      );
      
      if (progress && userData?.email) {
        const milestones = [
          { count: 5, name: "5 Sessions Completed", desc: "You've completed 5 practice sessions! You're building momentum." },
          { count: 10, name: "10 Sessions Completed", desc: "Congratulations on 10 sessions! Your consistency is paying off." },
          { count: 25, name: "25 Sessions Completed", desc: "Amazing! 25 sessions completed. You're developing strong discovery skills." },
          { count: 50, name: "50 Sessions Completed", desc: "Incredible milestone! 50 sessions shows serious dedication to improvement." },
          { count: 100, name: "100 Sessions Completed", desc: "Outstanding achievement! 100 sessions demonstrates exceptional commitment." },
        ];
        
        const milestone = milestones.find(m => m.count === progress.totalSessions);
        if (milestone) {
          const userName = userData.preferredName || userData.name?.split(" ")[0] || "there";
          const nextMilestone = milestones.find(m => m.count > progress.totalSessions);
          
          sendMilestoneEmail(user.id, userData.email, {
            userName,
            milestone: milestone.name,
            milestoneDescription: milestone.desc,
            nextMilestone: nextMilestone ? `Reach ${nextMilestone.count} sessions` : undefined,
          }).catch((err) => {
            console.error("Failed to send milestone email:", err);
          });

          // Create notification for milestone achievement (non-blocking)
          createNotification({
            userId: user.id,
            type: "achievement",
            title: milestone.name,
            message: milestone.desc,
            link: "/dashboard",
          }).catch((err) => {
            console.error("Failed to create milestone notification:", err);
          });
        }
      }
    } catch (milestoneError) {
      console.error("Error checking milestones:", milestoneError);
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
