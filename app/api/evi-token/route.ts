import { NextResponse } from "next/server";
// @ts-ignore - SDK module
import { fetchAccessToken } from "../../../dist/cjs/wrapper/index.js";

export const runtime = "nodejs";

export async function GET() {
  try {
    const apiKey = process.env.HUME_API_KEY;
    const secretKey = process.env.HUME_SECRET_KEY;

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { error: "Hume credentials not configured" },
        { status: 500 }
      );
    }

    const accessToken = await fetchAccessToken({
      apiKey,
      secretKey,
    });

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get access token" },
      { status: 500 }
    );
  }
}
