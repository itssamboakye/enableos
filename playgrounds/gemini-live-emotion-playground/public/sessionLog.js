/** In-browser session log — copyable report for evaluation. */

export function createSessionLog() {
  const entries = [];
  let meta = {};

  function ts() {
    return new Date().toISOString();
  }

  function push(category, message, data = {}) {
    const entry = { time: ts(), category, message, ...data };
    entries.push(entry);
    return entry;
  }

  function setMeta(next) {
    meta = { ...meta, ...next };
  }

  function formatEmotions(list) {
    if (!list?.length) return "—";
    return list.map((e) => `${e.label}:${e.confidence}%`).join(", ");
  }

  function toText() {
    const faceFocus = meta.logFocus === "face";
    const lines = faceFocus
      ? [
          "=== Gemini Live — Face Overlay Eval Log (Hume comparison) ===",
          `Generated: ${ts()}`,
          "",
          "--- Session ---",
          `Mode: ${meta.mode ?? "—"} (fast face overlay)`,
          `Model: ${meta.model ?? "—"}`,
          `Read interval: ${meta.readIntervalMs ?? 1000}ms`,
          `Session ID: ${meta.sessionId ?? "—"}`,
          `Started: ${meta.startedAt ?? "—"}`,
          `Ended: ${meta.endedAt ?? "—"}`,
          `Duration: ${meta.duration ?? "—"}`,
          "",
          "--- Face overlay summary ---",
          `Video frames sent: ${meta.clientVideoFrames ?? "—"}`,
          `Emotion updates: ${meta.emotionUpdates ?? "—"}`,
          `Parse success rate: ${meta.parseSuccessRate ?? "—"}`,
          `Est. cost (USD): ${meta.estimatedCostUsd ?? "—"}`,
          "",
          "--- Event log (face only) ---",
        ]
      : [
          "=== Gemini Live Emotion Playground — Session Log ===",
          `Generated: ${ts()}`,
          "",
          "--- Session ---",
          `Mode: ${meta.mode ?? "—"}`,
          `Model: ${meta.model ?? "—"}`,
          `Session ID: ${meta.sessionId ?? "—"}`,
          `Started: ${meta.startedAt ?? "—"}`,
          `Ended: ${meta.endedAt ?? "—"}`,
          `Duration: ${meta.duration ?? "—"}`,
          "",
          "--- Audio summary ---",
          `Client audio chunks sent: ${meta.clientAudioChunks ?? "—"}`,
          `Server audio chunks received: ${meta.serverAudioChunks ?? "—"}`,
          `Video frames sent: ${meta.clientVideoFrames ?? "—"}`,
          `Emotion updates: ${meta.emotionUpdates ?? "—"}`,
          `Parse success rate: ${meta.parseSuccessRate ?? "—"}`,
          `Est. cost (USD): ${meta.estimatedCostUsd ?? "—"}`,
          "",
          "--- Event log ---",
        ];

    const visibleEntries = faceFocus
      ? entries.filter((e) => e.category !== "audio")
      : entries;

    for (const e of visibleEntries) {
      const extra = [];
      if (e.latencyMs != null) extra.push(`latency=${e.latencyMs}ms`);
      if (e.faceDetected != null) extra.push(`faceDetected=${e.faceDetected}`);
      if (e.readIntervalMs != null) extra.push(`readInterval=${e.readIntervalMs}ms`);
      if (e.timeoutMs != null) extra.push(`timeout=${e.timeoutMs}ms`);
      if (!faceFocus && e.micPeak != null) extra.push(`micPeak=${e.micPeak}%`);
      if (e.face) extra.push(`face=[${e.face}]`);
      if (!faceFocus) {
        if (e.voice) extra.push(`voice=[${e.voice}]`);
        if (e.combined) extra.push(`combined=[${e.combined}]`);
        if (e.coaching) extra.push(`coaching=[${e.coaching}]`);
        if (e.serverAudioChunks != null) extra.push(`serverChunks=${e.serverAudioChunks}`);
        if (e.clientAudioChunks != null) extra.push(`clientChunks=${e.clientAudioChunks}`);
      }
      if (e.serverVideoFrames != null) extra.push(`serverFrames=${e.serverVideoFrames}`);
      if (e.parseSuccess != null) extra.push(`parse=${e.parseSuccess ? "ok" : "fail"}`);
      const suffix = extra.length ? ` | ${extra.join(" | ")}` : "";
      lines.push(`[${e.time}] [${e.category}] ${e.message}${suffix}`);
      if (e.rawSnippet) {
        lines.push(`    raw: ${e.rawSnippet}`);
      }
    }

    lines.push("", "--- End log ---");
    return lines.join("\n");
  }

  function toJson() {
    return JSON.stringify({ meta, entries }, null, 2);
  }

  return {
    entries,
    push,
    setMeta,
    formatEmotions,
    toText,
    toJson,
    clear() {
      entries.length = 0;
      meta = {};
    },
  };
}
