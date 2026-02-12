import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { queryOne } from "@/lib/db";

/**
 * GET /api/progress - Get user progress data
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const progress = await queryOne<{
      totalSessions: number;
      averageClarity: number | null;
      averageCuriosity: number | null;
      averageListening: number | null;
      averageFlowControl: number | null;
      averageConfidence: number | null;
      averageNextStep: number | null;
      lastSessionDate: string | null;
    }>(
      `SELECT "totalSessions", "averageClarity", "averageCuriosity", "averageListening",
              "averageFlowControl", "averageConfidence", "averageNextStep", "lastSessionDate"
       FROM progress
       WHERE "userId" = $1`,
      [user.id]
    );

    if (!progress) {
      return NextResponse.json({
        totalSessions: 0,
        averageClarity: null,
        averageCuriosity: null,
        averageListening: null,
        averageFlowControl: null,
        averageConfidence: null,
        averageNextStep: null,
        lastSessionDate: null,
      });
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
