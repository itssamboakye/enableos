import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Public config for the browser face-overlay hook (no API key). */
export async function GET() {
  return NextResponse.json({
    enabled: Boolean(process.env.GEMINI_API_KEY),
    wsPath: "/api/gemini-face/ws",
    model: process.env.GEMINI_LIVE_MODEL ?? "gemini-3.1-flash-live-preview",
  });
}
