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

    // Format transcript for OpenAI with clear labels
    // Add context labels to make it clear who is speaking
    const messages = transcript.map((entry, index) => {
      const speaker = entry.role === "user" ? "USER (Sales Rep)" : "ATLAS (Coach/AI)";
      return {
        role: entry.role === "user" ? "user" : "assistant",
        content: `[${speaker}] ${entry.text}`,
      };
    });

    // System prompt based on ATLAS feedback format
    const systemPrompt = `You are ATLAS, the Discovery Practice Coach. Analyze this discovery call transcript and provide structured feedback.

CRITICAL INSTRUCTIONS:
1. This transcript shows a conversation between the USER (the sales rep practicing) and ATLAS (the AI coach).
2. ALL feedback must be about the USER's performance, NOT about ATLAS or any AI behavior.
3. If ATLAS made mistakes (e.g., asking for name repeatedly, confusion), acknowledge this in the summary but focus your feedback on the USER's skills.
4. Use clear language: "You [did X]" refers to the USER (sales rep), "ATLAS [did X]" refers to the AI coach.
5. If the conversation is very short, lacks substance, or the user ended early due to frustration, clearly state this and provide limited but helpful feedback.

IMPORTANT: When describing issues in the "improvements" section, be clear about who did what:
- "You asked..." = the USER (sales rep) did this
- "ATLAS asked..." = the AI did this (only mention if relevant context)
- Always frame feedback as guidance for the USER's future performance

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
      "issue": "what happened (be specific about USER's actions, not ATLAS's)",
      "impact": "why it matters for the USER's discovery skills",
      "example": "rewritten example the USER (sales rep) could say next time"
    },
    {
      "issue": "what happened (be specific about USER's actions, not ATLAS's)",
      "impact": "why it matters for the USER's discovery skills",
      "example": "rewritten example the USER (sales rep) could say next time"
    },
    {
      "issue": "what happened (be specific about USER's actions, not ATLAS's)",
      "impact": "why it matters for the USER's discovery skills",
      "example": "rewritten example the USER (sales rep) could say next time"
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
