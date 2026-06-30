import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = path.join(__dirname, "..", "logs");

export class SessionLogger {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.startedAt = new Date();
    this.lastInputAt = null;
    this.lastEmotionAt = null;
    this.reconnectCount = 0;
    this.parseAttempts = 0;
    this.parseSuccesses = 0;
    this.emotionUpdates = 0;

    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR, { recursive: true });
    }

    const stamp = this.startedAt.toISOString().replace(/[:.]/g, "-");
    this.baseName = `session-${stamp}-${sessionId.slice(0, 8)}`;
    this.jsonlPath = path.join(LOGS_DIR, `${this.baseName}.jsonl`);
    this.csvPath = path.join(LOGS_DIR, `${this.baseName}.csv`);

    fs.writeFileSync(
      this.csvPath,
      "timestamp,event,latencyMs,stalenessMs,parseSuccess,rawOutput,parsedLabels,reconnectCount\n"
    );

    this.log("session_start", { sessionId });
  }

  markInput() {
    this.lastInputAt = Date.now();
  }

  log(event, data = {}) {
    const row = {
      timestamp: new Date().toISOString(),
      event,
      sessionId: this.sessionId,
      reconnectCount: this.reconnectCount,
      ...data,
    };
    fs.appendFileSync(this.jsonlPath, `${JSON.stringify(row)}\n`);
  }

  logEmotion({ raw, parsed, latencyMs }) {
    this.parseAttempts += 1;
    if (parsed.success) {
      this.parseSuccesses += 1;
      this.emotionUpdates += 1;
      this.lastEmotionAt = Date.now();
    }

    const labels = parsed.channels?.combined?.emotions
      ?.map((e) => `${e.label}:${e.confidence}`)
      .join("|") ?? "";

    const stalenessMs =
      this.lastInputAt && latencyMs != null
        ? Math.max(0, Date.now() - this.lastInputAt)
        : null;

    this.log("emotion_update", {
      latencyMs,
      stalenessMs,
      parseSuccess: parsed.success,
      parseMethod: parsed.method,
      faceDetected: parsed.faceDetected,
      coaching: parsed.coaching,
      channels: parsed.channels,
      rawOutput: raw?.slice(0, 800),
    });

    const csvLine = [
      new Date().toISOString(),
      "emotion_update",
      latencyMs ?? "",
      stalenessMs ?? "",
      parsed.success,
      JSON.stringify(raw ?? "").replace(/"/g, '""'),
      labels,
      this.reconnectCount,
    ]
      .map((v) => `"${v}"`)
      .join(",");

    fs.appendFileSync(this.csvPath, `${csvLine}\n`);
  }

  logReconnect(reason) {
    this.reconnectCount += 1;
    this.log("reconnect", { reason });
  }

  end(summary = {}) {
    const durationMs = Date.now() - this.startedAt.getTime();
    const parseRate =
      this.parseAttempts > 0
        ? Math.round((this.parseSuccesses / this.parseAttempts) * 1000) / 10
        : 0;

    this.log("session_end", {
      durationMs,
      emotionUpdates: this.emotionUpdates,
      parseAttempts: this.parseAttempts,
      parseSuccesses: this.parseSuccesses,
      parseSuccessRate: parseRate,
      reconnectCount: this.reconnectCount,
      ...summary,
    });

    return {
      jsonlPath: this.jsonlPath,
      csvPath: this.csvPath,
      durationMs,
      parseSuccessRate: parseRate,
      emotionUpdates: this.emotionUpdates,
      reconnectCount: this.reconnectCount,
    };
  }
}
