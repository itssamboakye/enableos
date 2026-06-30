import "dotenv/config";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { WebSocketServer } from "ws";
import { LiveEmotionSession, estimateCostUsd } from "./liveSession.js";
import { SessionLogger } from "./sessionLogger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT ?? "4040", 10);
const MODEL = process.env.GEMINI_LIVE_MODEL ?? "gemini-3.1-flash-live-preview";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY — copy .env.example to .env");
  process.exit(1);
}

const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

function send(ws, payload) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

const VALID_MODES = new Set(["video+audio", "video-only", "audio-only"]);

wss.on("connection", (ws) => {
  let liveSession = null;
  let logger = null;
  let sessionStart = null;
  let mode = "video+audio";
  let fastFaceMode = false;

  ws.on("message", async (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      send(ws, { type: "error", message: "Invalid JSON" });
      return;
    }

    if (msg.type === "start") {
      if (liveSession) {
        send(ws, { type: "error", message: "Session already active" });
        return;
      }

      mode = VALID_MODES.has(msg.mode) ? msg.mode : "video+audio";
      fastFaceMode = Boolean(msg.fastFaceMode) && mode === "video-only";
      const sessionId = randomUUID();
      logger = new SessionLogger(sessionId);
      sessionStart = Date.now();

      send(ws, { type: "status", message: "Connecting to Gemini Live...", model: MODEL, mode });

      liveSession = new LiveEmotionSession({
        apiKey,
        model: MODEL,
        mode,
        fastFaceMode,
        logger,
        onEmotionUpdate: (data) => {
          send(ws, { type: "emotion", ...data });
        },
        onStatus: (data) => {
          send(ws, { type: "status", ...data });
        },
        onGoAway: (goAway) => {
          send(ws, { type: "goAway", timeLeft: goAway.timeLeft });
          send(ws, {
            type: "sessionLog",
            category: "session",
            message: `GoAway — reconnecting (${goAway.timeLeft ?? "?"})`,
          });
          liveSession?.reconnect().catch((err) => {
            send(ws, { type: "error", message: err.message ?? "Reconnect failed" });
          });
        },
        onSessionLog: (entry) => {
          send(ws, { type: "sessionLog", ...entry });
        },
      });

      try {
        await liveSession.start();
        send(ws, {
          type: "started",
          sessionId,
          model: MODEL,
          mode,
          fastFaceMode,
          readIntervalMs: fastFaceMode ? 1000 : 1500,
          logPaths: { jsonl: logger.jsonlPath, csv: logger.csvPath },
        });
      } catch (err) {
        send(ws, { type: "error", message: err.message ?? "Failed to start Live session" });
        liveSession = null;
        logger = null;
      }
      return;
    }

    if (msg.type === "stop") {
      if (liveSession) {
        await liveSession.end();
        liveSession = null;
      }
      const summary = logger?.end({
        mode,
        model: MODEL,
        estimatedCostUsd: estimateCostUsd({
          durationMs: sessionStart ? Date.now() - sessionStart : 0,
          videoMode: mode,
          emotionUpdates: logger?.emotionUpdates,
        }),
      });
      send(ws, { type: "stopped", summary });
      logger = null;
      sessionStart = null;
      return;
    }

    if (!liveSession) return;

    if (msg.type === "video" && msg.data) {
      liveSession.sendVideoFrame(msg.data);
    } else if (msg.type === "audio" && msg.data) {
      liveSession.sendAudioChunk(msg.data);
    }
  });

  ws.on("close", async () => {
    if (liveSession) {
      await liveSession.end();
      logger?.end({ reason: "client_disconnect", mode, model: MODEL });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Gemini Live Emotion Playground — Track 1`);
  console.log(`http://localhost:${PORT}`);
  console.log(`Model: ${MODEL}`);
  console.log(`Run research gate first: npm run research`);
});
