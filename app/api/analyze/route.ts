import { NextRequest, NextResponse } from "next/server";
import { HumeClient } from "../../../dist/cjs/wrapper/index.js";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes for Hume API processing

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.HUME_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "HUME_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Get video file from form data
    const formData = await request.formData();
    const videoFile = formData.get("video") as File;
    
    if (!videoFile) {
      return NextResponse.json(
        { error: "No video file provided" },
        { status: 400 }
      );
    }

    // Initialize Hume client
    const hume = new HumeClient({
      apiKey,
    });

    // Convert File to Blob for SDK
    const videoBlob = new Blob([await videoFile.arrayBuffer()], {
      type: videoFile.type,
    });

    // Start batch inference job with face, prosody, and language models
    const job = await hume.expressionMeasurement.batch.startInferenceJobFromLocalFile({
      json: {
        models: {
          face: {},
          prosody: {},
          language: {},
        },
      },
      file: [videoBlob],
    });

    // Wait for job completion
    await job.awaitCompletion();

    // Get predictions
    const batchClient = hume.expressionMeasurement.batch;
    const predictions = await batchClient.getJobPredictions(job.jobId);

    // Process predictions into feedback
    const feedback = processPredictions(predictions);

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process video" },
      { status: 500 }
    );
  }
}

function processPredictions(predictions: any[]): string[] {
  const feedback: string[] = [];

  if (predictions.length === 0) {
    return ["No predictions received from analysis"];
  }

  // Process each prediction result
  for (const result of predictions) {
    if (result.predictions) {
      // Face analysis
      if (result.predictions.face?.groupedPredictions) {
        const faceFeedback = processFacePredictions(
          result.predictions.face.groupedPredictions
        );
        feedback.push(...faceFeedback);
      }

      // Prosody analysis
      if (result.predictions.prosody?.groupedPredictions) {
        const prosodyFeedback = processProsodyPredictions(
          result.predictions.prosody.groupedPredictions
        );
        feedback.push(...prosodyFeedback);
      }

      // Language analysis
      if (result.predictions.language?.groupedPredictions) {
        const languageFeedback = processLanguagePredictions(
          result.predictions.language.groupedPredictions
        );
        feedback.push(...languageFeedback);
      }
    }
  }

  // If no specific feedback, provide general message
  if (feedback.length === 0) {
    feedback.push("Analysis completed successfully");
  }

  return feedback;
}

function processFacePredictions(facePredictions: any[]): string[] {
  const feedback: string[] = [];

  if (facePredictions.length === 0) return feedback;

  // Analyze overall emotional expression
  const allEmotions: Record<string, number> = {};
  let totalFrames = 0;

  for (const group of facePredictions) {
    if (group.predictions) {
      for (const pred of group.predictions) {
        if (pred.emotions) {
          totalFrames++;
          for (const emotion of pred.emotions) {
            allEmotions[emotion.name] = (allEmotions[emotion.name] || 0) + emotion.score;
          }
        }
      }
    }
  }

  // Get top emotions
  const topEmotions = Object.entries(allEmotions)
    .map(([name, score]) => ({ name, score: score / totalFrames }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .filter((e) => e.score > 0.1);

  if (topEmotions.length > 0) {
    const emotionNames = topEmotions.map((e) => e.name).join(", ");
    feedback.push(`Expressed ${emotionNames} during the conversation`);
  }

  return feedback;
}

function processProsodyPredictions(prosodyPredictions: any[]): string[] {
  const feedback: string[] = [];

  if (prosodyPredictions.length === 0) return feedback;

  // Analyze prosody for engagement and clarity
  for (const group of prosodyPredictions) {
    if (group.predictions) {
      for (const pred of group.predictions) {
        if (pred.emotions) {
          // Look for engagement indicators
          const engagementEmotions = pred.emotions.filter(
            (e: any) =>
              e.name === "interest" ||
              e.name === "concentration" ||
              e.name === "excitement"
          );
          if (engagementEmotions.some((e: any) => e.score > 0.3)) {
            feedback.push("Demonstrated strong vocal engagement");
            break;
          }
        }
      }
    }
  }

  return feedback;
}

function processLanguagePredictions(languagePredictions: any[]): string[] {
  const feedback: string[] = [];

  if (languagePredictions.length === 0) return feedback;

  // Analyze language for open-ended questions and discovery techniques
  let openEndedCount = 0;
  let totalUtterances = 0;

  for (const group of languagePredictions) {
    if (group.predictions) {
      for (const pred of group.predictions) {
        if (pred.text) {
          totalUtterances++;
          const text = pred.text.toLowerCase();
          // Detect open-ended questions
          if (
            text.includes("what") ||
            text.includes("how") ||
            text.includes("why") ||
            text.includes("tell me about") ||
            text.includes("can you describe")
          ) {
            openEndedCount++;
          }
        }
      }
    }
  }

  if (totalUtterances > 0) {
    const openEndedRatio = openEndedCount / totalUtterances;
    if (openEndedRatio > 0.4) {
      feedback.push("Used effective open-ended questions");
    } else if (openEndedRatio < 0.2) {
      feedback.push("Could ask more open-ended questions to explore deeper");
    }
  }

  return feedback;
}
