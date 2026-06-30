import { NextResponse } from "next/server";
import { getGeminiFacePublicConfig } from "@/lib/gemini-face/publicConfig";

export const runtime = "nodejs";

/** Public config for the browser face-overlay hook (no API key). */
export async function GET() {
  return NextResponse.json(getGeminiFacePublicConfig());
}
