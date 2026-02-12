import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Test endpoint to verify database connection
 * GET /api/test/db
 */
export async function GET() {
  try {
    // Test database connection by querying users table
    const result = await query("SELECT COUNT(*) as count FROM users");
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userCount: result[0]?.count || 0,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Database connection failed",
      },
      { status: 500 }
    );
  }
}
