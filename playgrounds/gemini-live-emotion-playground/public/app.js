import { VALENCE, formatLabel } from "./emotionTaxonomy.js";
import { createSessionLog } from "./sessionLog.js";

const video = document.getElementById("video");
const videoWrap = document.querySelector(".video-wrap");
const audioOnlyPlaceholder = document.getElementById("audioOnlyPlaceholder");
const videoBadgesEl = document.getElementById("videoBadges");
const audioBadgesEl = document.getElementById("audioBadges");
const combinedBadgesEl = document.getElementById("combinedBadges");
const coachingBadgesEl = document.getElementById("coachingBadges");
const statusBar = document.getElementById("statusBar");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const modeSelect = document.getElementById("mode");
const fastFaceModeCheckbox = document.getElementById("fastFaceMode");
const fastFaceWrap = document.getElementById("fastFaceWrap");
const channelGrid = document.getElementById("channelGrid");
const secondaryChannels = document.getElementById("secondaryChannels");
const coachingSection = document.getElementById("coachingSection");
const audioTestTip = document.getElementById("audioTestTip");
const audioChunksMetric = document.getElementById("audioChunksMetric");
const readIntervalMetric = document.getElementById("readIntervalMetric");
const readIntervalEl = document.getElementById("readInterval");
const disclaimerEl = document.querySelector(".disclaimer");

const latencyEl = document.getElementById("latency");
const stalenessEl = document.getElementById("staleness");
const parseRateEl = document.getElementById("parseRate");
const costEl = document.getElementById("cost");
const durationEl = document.getElementById("duration");
const updatesEl = document.getElementById("updates");
const videoFramesEl = document.getElementById("videoFrames");
const audioChunksEl = document.getElementById("audioChunks");
const audioMeterWrap = document.getElementById("audioMeterWrap");
const audioMeterFill = document.getElementById("audioMeterFill");
const rawOutputEl = document.getElementById("rawOutput");
const logPathsEl = document.getElementById("logPaths");
const sessionLogText = document.getElementById("sessionLogText");
const copyLogBtn = document.getElementById("copyLogBtn");
const clearLogBtn = document.getElementById("clearLogBtn");

const sessionLog = createSessionLog();
let lastMicPeak = 0;
let clientAudioLogTimer = null;
let sessionId = null;
let activeFastFaceMode = false;

function isFastFaceMode() {
  return modeSelect.value === "video-only" && fastFaceModeCheckbox.checked;
}

function applyFastFaceUi() {
  const fast = isFastFaceMode();
  fastFaceWrap.classList.toggle("disabled", modeSelect.value !== "video-only");
  fastFaceModeCheckbox.disabled = modeSelect.value !== "video-only";
  if (modeSelect.value !== "video-only") {
    fastFaceModeCheckbox.checked = false;
  }
  secondaryChannels.hidden = fast;
  coachingSection.hidden = fast;
  audioTestTip.hidden = fast;
  audioChunksMetric.hidden = fast;
  readIntervalMetric.hidden = !fast;
  channelGrid.classList.toggle("fast-face-mode", fast);
  disclaimerEl.classList.toggle("fast-face-mode", fast);
  disclaimerEl.textContent = fast
    ? "Fast face overlay — 1 FPS video, 1s reads. Compare latency/staleness to Hume Expression Measurement. EVI prosody unchanged in production."
    : "Face / voice / combined are model-estimated splits in one session — useful for comparison, not lab-grade separation.";
}

let ws = null;
let stream = null;
let frameInterval = null;
let audioContext = null;
let sessionStart = null;
let lastEmotionAt = null;
let parseAttempts = 0;
let parseSuccesses = 0;
let emotionUpdates = 0;
let videoFramesSent = 0;
let audioChunksSent = 0;
let durationTimer = null;
let meterTimer = null;
let analyser = null;
let canvas = null;

function refreshSessionLogText() {
  const minutes = sessionStart ? (Date.now() - sessionStart) / 60000 : 0;
  sessionLog.setMeta({
    mode: modeSelect.value,
    fastFaceMode: activeFastFaceMode,
    logFocus: activeFastFaceMode ? "face" : undefined,
    readIntervalMs: activeFastFaceMode ? 1000 : 1500,
    clientAudioChunks: audioChunksSent,
    clientVideoFrames: videoFramesSent,
    emotionUpdates,
    parseSuccessRate:
      parseAttempts > 0 ? `${Math.round((parseSuccesses / parseAttempts) * 100)}%` : "—",
    estimatedCostUsd: sessionStart ? `$${estimateCost(minutes)}` : "—",
    duration: sessionStart ? durationEl.textContent : "—",
    endedAt: sessionStart && !ws ? new Date().toISOString() : sessionLog.entries.length ? undefined : "—",
  });
  sessionLogText.value = sessionLog.toText();
  const hasEntries = sessionLog.entries.length > 0;
  copyLogBtn.disabled = !hasEntries;
  clearLogBtn.disabled = !hasEntries;
}

function logClient(category, message, data = {}) {
  sessionLog.push(category, message, data);
  refreshSessionLogText();
}

function handleSessionLogMessage(msg) {
  if (activeFastFaceMode && msg.category === "audio") return;
  const { type: _t, category, message, ...rest } = msg;
  sessionLog.push(category ?? "server", message ?? "", rest);
  if (rest.serverAudioChunks != null && !activeFastFaceMode) {
    sessionLog.setMeta({ serverAudioChunks: rest.serverAudioChunks });
  }
  refreshSessionLogText();
}

function setStatus(text, isError = false) {
  statusBar.textContent = text;
  statusBar.classList.toggle("error", isError);
}

function formatMs(ms) {
  if (ms == null || Number.isNaN(ms)) return "—";
  return `${Math.round(ms)} ms`;
}

function updateDuration() {
  if (!sessionStart) return;
  const sec = Math.floor((Date.now() - sessionStart) / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  durationEl.textContent = `${m}:${String(s).padStart(2, "0")}`;
}

function updateParseRate() {
  if (parseAttempts === 0) {
    parseRateEl.textContent = "—";
    return;
  }
  parseRateEl.textContent = `${Math.round((parseSuccesses / parseAttempts) * 100)}%`;
}

function estimateCost(minutes) {
  const mode = modeSelect.value;
  const hasAudio = mode === "video+audio" || mode === "audio-only";
  const hasVideo = mode === "video+audio" || mode === "video-only";
  const audioIn = hasAudio ? 0.005 * minutes : 0;
  const videoIn = hasVideo ? 0.002 * minutes : 0;
  const audioOut = 0.018 * minutes;
  return (audioIn + videoIn + audioOut).toFixed(4);
}

function usesAudio() {
  const mode = modeSelect.value;
  return mode === "video+audio" || mode === "audio-only";
}

function usesVideo() {
  const mode = modeSelect.value;
  return mode === "video+audio" || mode === "video-only";
}

function renderBadgeList(container, emotions, emptyText) {
  container.innerHTML = "";
  if (!emotions?.length) {
    const empty = document.createElement("div");
    empty.className = "badge empty";
    empty.textContent = emptyText;
    container.appendChild(empty);
    return;
  }
  for (const e of emotions.slice(0, 3)) {
    const div = document.createElement("div");
    const valence = VALENCE[e.label] ?? "neutral";
    div.className = `badge ${valence}`;
    const name = formatLabel(e.label);
    div.innerHTML = `<span>${name}</span><strong>${e.confidence}%</strong>`;
    if (e.known === false) {
      div.title = "Unlisted label from model";
    }
    container.appendChild(div);
  }
}

function renderChannels(msg) {
  const channels = msg.channels ?? {};
  const mode = modeSelect.value;
  const fast = activeFastFaceMode;

  let videoEmpty = "Waiting for face read…";
  if (mode === "audio-only") {
    videoEmpty = "N/A (audio-only mode)";
  } else if (channels.video?.faceDetected === false) {
    videoEmpty = "No face detected";
  }

  renderBadgeList(videoBadgesEl, channels.video?.emotions, videoEmpty);

  if (fast) return;

  let audioEmpty = "Waiting for voice read…";
  if (mode === "video-only") {
    audioEmpty = "N/A (video-only mode)";
  }

  renderBadgeList(audioBadgesEl, channels.audio?.emotions, audioEmpty);
  renderBadgeList(
    combinedBadgesEl,
    channels.combined?.emotions,
    "Waiting for combined read…"
  );
  renderBadgeList(
    coachingBadgesEl,
    msg.coaching,
    "Coaching rollup appears when combined channel parses"
  );
}

function captureFrame(maxSize = 768) {
  if (!canvas) canvas = document.createElement("canvas");
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return null;

  let w = vw;
  let h = vh;
  if (w > maxSize || h > maxSize) {
    const scale = maxSize / Math.max(w, h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.75).split(",")[1];
}

function float32ToPcm16Base64(float32, inputRate) {
  const targetRate = 16000;
  const ratio = inputRate / targetRate;
  const outLen = Math.floor(float32.length / ratio);
  const pcm = new Int16Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const srcIdx = Math.floor(i * ratio);
    const s = Math.max(-1, Math.min(1, float32[srcIdx] ?? 0));
    pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const bytes = new Uint8Array(pcm.buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function startAudioPipeline() {
  if (!usesAudio()) {
    audioMeterWrap.hidden = true;
    return;
  }

  audioMeterWrap.hidden = false;
  audioContext = new AudioContext({ sampleRate: 48000 });
  await audioContext.audioWorklet.addModule("/pcm-processor.js");
  const source = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const worklet = new AudioWorkletNode(audioContext, "pcm-processor");
  worklet.port.onmessage = (evt) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(
      JSON.stringify({
        type: "audio",
        data: float32ToPcm16Base64(evt.data, audioContext.sampleRate),
      })
    );
    audioChunksSent += 1;
    audioChunksEl.textContent = String(audioChunksSent);
    if (audioChunksSent === 1) {
      logClient("audio", "First PCM chunk sent from browser", { clientAudioChunks: 1 });
    }
  };

  source.connect(analyser);
  analyser.connect(worklet);
  const silent = audioContext.createGain();
  silent.gain.value = 0;
  worklet.connect(silent);
  silent.connect(audioContext.destination);

  const data = new Uint8Array(analyser.frequencyBinCount);
  meterTimer = setInterval(() => {
    if (!analyser) return;
    analyser.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const peak = Math.min(100, Math.round((avg / 128) * 100));
    lastMicPeak = Math.max(lastMicPeak, peak);
    audioMeterFill.style.width = `${peak}%`;
  }, 100);

  clientAudioLogTimer = setInterval(() => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    logClient("audio", "Client audio summary (5s)", {
      clientAudioChunks: audioChunksSent,
      micPeak: lastMicPeak,
    });
    lastMicPeak = 0;
  }, 5000);
}

async function startSession() {
  const mode = modeSelect.value;
  const fastFace = isFastFaceMode();
  activeFastFaceMode = fastFace;
  const wantsVideo = usesVideo();
  const wantsAudio = usesAudio() && !fastFace;

  stream = await navigator.mediaDevices.getUserMedia({
    video: wantsVideo
      ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }
      : false,
    audio: wantsAudio,
  });

  if (mode === "audio-only") {
    videoWrap.classList.add("audio-only-mode");
    audioOnlyPlaceholder.hidden = false;
    video.srcObject = null;
  } else {
    videoWrap.classList.remove("audio-only-mode");
    audioOnlyPlaceholder.hidden = true;
    video.srcObject = stream;
    await video.play();
  }

  ws = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws`);

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: "start",
        mode: modeSelect.value,
        fastFaceMode: fastFace,
      })
    );
  };

  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);

    if (msg.type === "connected") {
      setStatus(`Gemini connected (${msg.model}, ${msg.mode})`);
    } else if (msg.type === "sessionLog") {
      handleSessionLogMessage(msg);
    } else if (msg.type === "read_requested") {
      setStatus(msg.message ?? "Requesting emotion read…");
    } else if (msg.type === "disconnected") {
      setStatus(`Disconnected: ${msg.reason ?? "session ended"}`);
    } else if (msg.type === "status" && msg.message) {
      setStatus(msg.message);
    }

    if (msg.type === "started") {
      sessionStart = Date.now();
      activeFastFaceMode = Boolean(msg.fastFaceMode);
      sessionId = msg.sessionId ?? `local-${sessionStart}`;
      sessionLog.clear();
      sessionLog.setMeta({
        mode: msg.mode ?? modeSelect.value,
        model: msg.model,
        sessionId,
        startedAt: new Date(sessionStart).toISOString(),
        logFocus: activeFastFaceMode ? "face" : undefined,
        readIntervalMs: msg.readIntervalMs ?? (activeFastFaceMode ? 1000 : 1500),
        fastFaceMode: activeFastFaceMode,
      });
      if (activeFastFaceMode) {
        readIntervalEl.textContent = `${msg.readIntervalMs ?? 1000} ms`;
      }
      logClient(
        "session",
        activeFastFaceMode
          ? `Fast face overlay session started (${msg.model}, 1s reads)`
          : `Session started (${msg.mode}, ${msg.model})`
      );
      lastEmotionAt = null;
      parseAttempts = 0;
      parseSuccesses = 0;
      emotionUpdates = 0;
      videoFramesSent = 0;
      audioChunksSent = 0;
      videoFramesEl.textContent = "0";
      audioChunksEl.textContent = "0";
      durationTimer = setInterval(updateDuration, 1000);
      startBtn.disabled = true;
      stopBtn.disabled = false;
      modeSelect.disabled = true;
      fastFaceModeCheckbox.disabled = true;
      logPathsEl.textContent = msg.logPaths
        ? `Logs: ${msg.logPaths.jsonl} | ${msg.logPaths.csv}`
        : "";
      setStatus(
        activeFastFaceMode
          ? `Fast face overlay active (${msg.model}, 1s reads)`
          : `Live session active (${msg.model}, ${msg.mode})`
      );

      if (usesVideo()) {
        const sendFrame = () => {
          const frame = captureFrame();
          if (frame && ws?.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "video", data: frame }));
            videoFramesSent += 1;
            videoFramesEl.textContent = String(videoFramesSent);
            if (videoFramesSent === 1) {
              logClient("video", "First video frame sent from browser");
            }
          }
        };
        sendFrame();
        frameInterval = setInterval(sendFrame, 1000);
      } else {
        videoFramesEl.textContent = "—";
      }

      if (usesAudio()) {
        startAudioPipeline().catch((err) =>
          setStatus(`Audio pipeline error: ${err.message}`, true)
        );
      }
    }

    if (msg.type === "emotion") {
      parseAttempts += 1;
      if (msg.success) {
        parseSuccesses += 1;
        emotionUpdates += 1;
        lastEmotionAt = Date.now();
      }
      updatesEl.textContent = String(emotionUpdates);
      latencyEl.textContent = formatMs(msg.latencyMs);
      stalenessEl.textContent = lastEmotionAt ? formatMs(Date.now() - lastEmotionAt) : "—";
      updateParseRate();
      costEl.textContent = `$${estimateCost((Date.now() - sessionStart) / 60000)}`;
      rawOutputEl.textContent = msg.transcription ?? msg.raw ?? "(empty)";

      if (msg.success) {
        renderChannels(msg);
        setStatus(activeFastFaceMode ? "Live face read" : "Live read — face · voice · combined");
      } else if (msg.raw) {
        setStatus("Parse failed — see raw JSON below");
      }
    }

    if (msg.type === "goAway") {
      setStatus(`GoAway — reconnecting (${msg.timeLeft ?? "?"})`);
    }

    if (msg.type === "stopped" && msg.summary) {
      sessionLog.setMeta({ endedAt: new Date().toISOString() });
      logClient("session", "Session ended", {
        emotionUpdates: msg.summary.emotionUpdates,
        parseSuccessRate: `${msg.summary.parseSuccessRate}%`,
      });
      setStatus(
        `Ended — ${msg.summary.emotionUpdates} updates, ${msg.summary.parseSuccessRate}% parse rate`
      );
    }

    if (msg.type === "error") {
      setStatus(msg.message ?? "Error", true);
    }
  };

  ws.onclose = () => cleanup(false);
  ws.onerror = () => setStatus("WebSocket error", true);
}

function cleanup(sendStop = true) {
  if (frameInterval) clearInterval(frameInterval);
  if (durationTimer) clearInterval(durationTimer);
  if (meterTimer) clearInterval(meterTimer);
  if (clientAudioLogTimer) clearInterval(clientAudioLogTimer);
  frameInterval = null;
  durationTimer = null;
  meterTimer = null;
  clientAudioLogTimer = null;
  analyser = null;
  audioMeterFill.style.width = "0%";

  if (sendStop && ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "stop" }));
  }
  ws?.close();
  ws = null;
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
  video.srcObject = null;
  videoWrap.classList.remove("audio-only-mode");
  audioOnlyPlaceholder.hidden = true;

  audioContext?.close();
  audioContext = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  modeSelect.disabled = false;
  fastFaceModeCheckbox.disabled = modeSelect.value !== "video-only";
  applyFastFaceUi();
  if (sessionLog.entries.length > 0) {
    sessionLog.setMeta({ endedAt: new Date().toISOString() });
    refreshSessionLogText();
  }
}

copyLogBtn.addEventListener("click", async () => {
  const text = sessionLog.toText();
  try {
    await navigator.clipboard.writeText(text);
    setStatus("Session log copied to clipboard");
  } catch {
    sessionLogText.select();
    document.execCommand("copy");
    setStatus("Session log copied (fallback)");
  }
});

clearLogBtn.addEventListener("click", () => {
  sessionLog.clear();
  sessionLogText.value = "";
  copyLogBtn.disabled = true;
  clearLogBtn.disabled = true;
  setStatus("Session log cleared");
});

startBtn.addEventListener("click", () => {
  startSession().catch((err) => setStatus(err.message ?? "Failed to start", true));
});

stopBtn.addEventListener("click", () => {
  cleanup(true);
  setStatus("Stopped");
});

window.addEventListener("beforeunload", () => cleanup(true));

modeSelect.addEventListener("change", applyFastFaceUi);
fastFaceModeCheckbox.addEventListener("change", () => {
  if (fastFaceModeCheckbox.checked && modeSelect.value !== "video-only") {
    modeSelect.value = "video-only";
  }
  applyFastFaceUi();
});

applyFastFaceUi();
