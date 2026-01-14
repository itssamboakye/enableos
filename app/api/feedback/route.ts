import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface FeedbackRequest {
  transcript: Array<{
    role: "user" | "assistant";
    text: string;
    timestamp: number;
  }>;
}

export async function POST(request: Request) {
  try {
    const { transcript }: FeedbackRequest = await request.json();

    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        { error: "No transcript provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Format transcript for OpenAI
    const messages = transcript.map((entry) => ({
      role: entry.role === "user" ? "user" : "assistant",
      content: entry.text,
    }));

    // System prompt based on ATLAS feedback format
    const systemPrompt = `You are ATLAS, the Discovery Practice Coach. Analyze this discovery call transcript and provide structured feedback.

IMPORTANT: If the conversation is very short, lacks substance, or didn't gather meaningful information, clearly state this in your feedback.

Provide feedback in the following JSON format:
{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "scorecard": {
    "clarity": number (0-10),
    "curiosity": number (0-10),
    "listening": number (0-10),
    "flow": number (0-10),
    "confidence": number (0-10),
    "nextSteps": number (0-10)
  },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": [
    {
      "issue": "what happened",
      "impact": "why it matters",
      "example": "rewritten example they could say"
    },
    {
      "issue": "what happened",
      "impact": "why it matters",
      "example": "rewritten example they could say"
    },
    {
      "issue": "what happened",
      "impact": "why it matters",
      "example": "rewritten example they could say"
    }
  ],
  "drill": "one short, repeatable exercise for next time",
  "insufficientData": boolean (true if not enough info was gathered)
}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return NextResponse.json(
        { error: "Failed to generate feedback" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const feedbackContent = data.choices[0]?.message?.content;

    if (!feedbackContent) {
      return NextResponse.json(
        { error: "No feedback generated" },
        { status: 500 }
      );
    }

    const feedback = JSON.parse(feedbackContent);

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error generating feedback:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
