/**
 * Phase 0 research smoke test — run before building UI.
 * Usage: npm run research
 */
import "dotenv/config";
import { GoogleGenAI, Modality } from "@google/genai";
import { parseEmotionOutput } from "./emotionParser.js";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_LIVE_MODEL ?? "gemini-3.1-flash-live-preview";

const SMOKE_INSTRUCTION = `Output ONLY JSON with video, audio, and combined channels. No conversation.
{"video":{"emotions":[{"label":"interest","confidence":50}],"faceDetected":false},"audio":{"emotions":[]},"combined":{"emotions":[{"label":"engaged","confidence":50}]}}`;

if (!apiKey || apiKey === "your_key_here") {
  console.error("Set GEMINI_API_KEY in playgrounds/gemini-live-emotion-playground/.env");
  process.exit(1);
}

console.log("Track 1 research smoke test");
console.log("Model:", model);
console.log("---");

const ai = new GoogleGenAI({ apiKey });
let session = null;
let closedEarly = false;
let gotEmotionJson = false;
let conversationalChunks = 0;

try {
  await new Promise((resolve, reject) => {
    ai.live
      .connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          thinkingConfig: { thinkingLevel: "minimal" },
          contextWindowCompression: { slidingWindow: {} },
          systemInstruction: SMOKE_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            console.log("✓ WebSocket opened");
            resolve();
          },
          onmessage: (msg) => {
            const text = msg.serverContent?.outputTranscription?.text;
            if (!text) return;

            const parsed = parseEmotionOutput(text);
            if (parsed.success) {
              gotEmotionJson = true;
              console.log("Transcription:", text.slice(0, 160));
              const v = parsed.channels?.video?.emotions?.[0];
              const a = parsed.channels?.audio?.emotions?.[0];
              const c = parsed.channels?.combined?.emotions?.[0];
              console.log(
                `✓ Parsed (${parsed.method}) — face: ${v?.label ?? "—"} | voice: ${a?.label ?? "—"} | combined: ${c?.label ?? "—"}`
              );
              if (parsed.coaching?.length) {
                console.log(
                  `  Coaching rollup: ${parsed.coaching.map((e) => `${e.label}:${e.confidence}%`).join(", ")}`
                );
              }
              if (text.includes("}") && text.indexOf("}") < text.length - 1) {
                console.log("  ⚠ JSON followed by extra speech — model ignored no-conversation rule");
              }
            } else if (parsed.skipped) {
              conversationalChunks += 1;
              console.log(`  (ignored conversational chunk: "${text.trim().slice(0, 60)}")`);
            } else {
              console.log("Transcription:", text);
              console.log("✗ Parse failed — JSON present but no usable coaching labels");
            }
          },
          onerror: (e) => {
            console.error("✗ Error:", e.message ?? e);
            reject(e);
          },
          onclose: (e) => {
            const reason = e?.reason ?? "unknown";
            console.log("Closed:", reason);
            if (
              reason.toLowerCase().includes("api key") ||
              reason.toLowerCase().includes("invalid")
            ) {
              closedEarly = true;
              reject(new Error(reason));
            }
          },
        },
      })
      .then((s) => {
        session = s;
        console.log("Sending test text input...");
        session.sendRealtimeInput({ text: "Report emotions now. JSON only." });
        setTimeout(() => {
          if (!closedEarly) {
            session.close();
            console.log("---");
            console.log("Summary:");
            console.log(`  Connection:        ✓`);
            console.log(`  Emotion JSON:      ${gotEmotionJson ? "✓" : "✗"}`);
            console.log(`  Conversational tail chunks ignored: ${conversationalChunks}`);
            if (gotEmotionJson) {
              console.log("✓ Smoke test passed — proceed to UI (watch for conversational leakage in real sessions)");
            } else {
              console.log("✗ No parseable emotion JSON — check prompt/model before UI testing");
            }
            process.exit(gotEmotionJson ? 0 : 1);
          }
        }, 8000);
      })
      .catch(reject);
  });
} catch (err) {
  console.error("Smoke test failed:", err.message ?? err);
  process.exit(1);
}
