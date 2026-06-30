# Sprint: Gemini Live API Emotion Playground (Track 1 — True Streaming)

**Status:** Scaffold ready — run Phase 0 research gate, then evaluate  
**Owner:** EnableOS platform  
**Duration:** 1 sprint (research gate + build + evaluation)  
**Repo path:** `playgrounds/gemini-live-emotion-playground/` (throwaway — do not integrate into EnableOS until go/no-go)  
**Playground README:** [`playgrounds/gemini-live-emotion-playground/README.md`](../../playgrounds/gemini-live-emotion-playground/README.md)

---

## Context

Hume's Expression Measurement API was sunset **June 14, 2026** ([Hume FAQ](https://dev.hume.ai/docs/expression-measurement/faq)). EnableOS needs a replacement for real-time facial (+ ideally vocal) emotion feedback during sales coaching video sessions.

**What breaks in EnableOS today:**

| Signal | Current source | Behavior |
|--------|----------------|----------|
| Facial overlay | `app/hooks/useHumeExpressionMeasurement.ts` | Face model only, 1 FPS, browser → Hume WebSocket |
| Vocal/prosody | Hume EVI `user_message` prosody scores | Per utterance, not continuous overlay |

**What is NOT affected:** Hume EVI (ATLAS voice coach) — separate product line, not part of the Expression Measurement sunset.

This sprint validates whether **Gemini Live API** can replace the expression overlay (and optionally improve on EVI prosody granularity) before touching the EnableOS codebase.

Track 2 (polling with `gemini-2.5-flash` + JSON schema) is a separate, simpler sprint — build Track 1 first because it has the real unknowns (latency, cost, session stability, update frequency).

---

## Goal

Stand up a minimal webcam + mic playground that opens a persistent Gemini Live API session, streams video frames + audio continuously, and surfaces a running **top-3 emotions** readout — targeting combined facial + vocal signal, not a deprecation downgrade.

---

## Why Live API over plain polling

Live API uses a persistent WebSocket session rather than discrete request/response calls. It natively processes audio for tone/pace cues and accepts streamed video frames in the same session — closer to what EnableOS wants than a single-image-per-call approach.

---

## Go / no-go criteria (end of sprint)

| Criterion | Pass | Fail |
|-----------|------|------|
| Session duration | ≥15 min audio+video with compression + resumption | Hard stop at 2 min or frequent unrecoverable disconnects |
| Update staleness | Median emotion update ≤3s during active speech | Updates only on long pauses (>10s) or highly unstable flicker |
| Parse reliability | ≥95% of turns parse to valid top-3 JSON | Frequent drift / unparseable output |
| Cost | Document $/10-min session at current pricing | Cost >> Track 2 estimate with no quality gain |
| Face absent | Reports low confidence / `faceDetected: false`, not hallucinated high-confidence emotions | Confident emotions with no face in frame |

Deliver a written **go/no-go recommendation** with CSV/JSON logs attached.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Backend | Node.js + Express + `ws` |
| SDK | `@google/genai` (confirm latest on install) |
| Model (primary) | `gemini-3.1-flash-live-preview` — verify at research time |
| Model (fallback) | `gemini-live-2.5-flash-native-audio` |
| Frontend | Plain HTML/JS (throwaway, not React/EnableOS) |
| Auth | `GEMINI_API_KEY` in `.env` (local dev only) |

**Docs to verify before locking config:**

- [Live API get started](https://ai.google.dev/gemini-api/docs/live-api/get-started-sdk)
- [Live API capabilities](https://ai.google.dev/gemini-api/docs/live-api/capabilities)
- [Session management](https://ai.google.dev/gemini-api/docs/live-api/session-management)
- [Pricing](https://ai.google.dev/gemini-api/docs/pricing)

---

## Architecture

```
[Browser: webcam + mic]
   |
   |  JPEG frame (max 768×768, ~1 FPS)
   |  PCM audio (16-bit, 16 kHz, mono, little-endian) — optional in video-only mode
   v
[Node/Express + WebSocket]
   |
   |  one Gemini Live session per browser connection
   |  session.sendRealtimeInput({ video | audio })
   v
[Gemini Live API]
   |
   |  responseModalities: AUDIO (required for native models)
   |  outputAudioTranscription: {}  → parse text for emotion JSON
   |  contextWindowCompression + sessionResumption for long sessions
   v
[Server: parse + log + relay]
   v
[Browser: emotion badges + latency/staleness + cost estimate + session log download]
```

---

## Critical corrections (from plan review)

### 1. Do NOT use `responseModalities: [TEXT]`

Native audio Live models **only support AUDIO output**. For readable emotion data, use:

```js
{
  responseModalities: [Modality.AUDIO],
  outputAudioTranscription: {},
  thinkingConfig: { thinkingLevel: "minimal" },
}
```

Parse `serverContent.outputTranscription.text`. You still incur audio output token cost even if audio is discarded.

**Research task:** Compare this vs non-native Live models that may support TEXT directly (32k context window per docs).

### 2. Session limits (must test explicitly)

| Mode | Default limit | Mitigation |
|------|---------------|------------|
| Audio + video | **2 minutes** | `contextWindowCompression: { slidingWindow: {} }` |
| Audio only | 15 minutes | Same |
| Connection | ~10 minutes | `sessionResumption` + handle `goAway` |

Playground must log reconnect/resumption events and prove ≥15 min audio+video stability.

### 3. Update frequency ≠ Hume per-frame

Hume face streaming returns scores ~every 1s independent of speech. Live API is **turn/VAD-oriented**. Log:

- `frameSentAt → emotionReceivedAt` (latency)
- `now - lastEmotionUpdateAt` (staleness)

Do not assume 1 FPS video ⇒ 1 Hz emotion updates.

### 4. Emotion taxonomy is a product choice

Fixed coaching labels (not Hume's 48-label set):

`confident | excited | nervous | engaged | flat | frustrated | hesitant | enthusiastic`

Map intentionally for EnableOS coaching UI — document stability/flicker in evaluation.

---

## Build steps

### Phase 0 — Research gate (blocking)

- [ ] Confirm model ID + deprecation status
- [ ] Confirm `responseModalities` + transcription config on chosen model
- [ ] Pull current Live API pricing (audio in/out, image/video in, transcription)
- [ ] Run 5-min smoke test via AI Studio or minimal script before building UI
- [ ] Document chosen model + config in playground README

### Phase 1 — Server (`playgrounds/gemini-live-emotion-playground/server/`)

**`liveSession.js`**

- Wraps `ai.live.connect()` with corrected config (AUDIO + outputAudioTranscription)
- `startSession({ mode, onEmotionUpdate, onSessionEvent })`
- `sendVideoFrame(base64Jpeg)`, `sendAudioChunk(base64Pcm)`
- `endSession()`
- Handles `onopen`, `onmessage`, `onerror`, `onclose`
- Parses `outputTranscription` via `emotionParser.js`
- Implements `contextWindowCompression` + basic `sessionResumption`
- Handles `goAway` → reconnect with stored handle

**`emotionParser.js`**

- Primary: JSON blob `{"emotions":[{"label":"...","confidence":0-100},...],"faceDetected":bool}`
- Fallback: `EMOTIONS: label:NN, ...` regex
- Returns `{ success, method, emotions, raw }`

**`sessionLogger.js`**

- Append JSONL + CSV per session under `logs/`
- Fields: `timestamp`, `event`, `latencyMs`, `stalenessMs`, `rawOutput`, `parsed`, `parseSuccess`, `tokenEstimate`, `sessionHandle`, `reconnectCount`

**`index.js`**

- Express static `public/`
- WebSocket: relay browser ↔ Live session
- Messages: `start`, `stop`, `video`, `audio`, `ping`
- Emits: `emotion`, `status`, `goAway`, `sessionEnded`, `logPath`

### Phase 2 — System instruction

```
You are an emotion-reading assistant. You receive a continuous stream of
webcam video frames and microphone audio from one person.

Your only job: assess observable emotional state from facial expression and
vocal tone. Do not respond conversationally. Do not ask questions.

After each turn, output ONLY a single-line JSON object:
{"emotions":[{"label":"<one of fixed set>","confidence":<0-100>}, ... max 3], "faceDetected":<boolean>}

Fixed labels only: confident, excited, nervous, engaged, flat, frustrated,
hesitant, enthusiastic.

Infer only from face and voice — not conversation content. Lower confidence
when uncertain. If no face visible, set faceDetected false and use low confidences.
```

### Phase 3 — Browser frontend (`public/`)

- `getUserMedia` video + audio
- Canvas JPEG encode, resize max 768×768, 1 FPS
- AudioWorklet → 16 kHz mono PCM chunks (~100ms)
- Modes: **Video + audio** (default) | **Video only** (matches current EnableOS face overlay)
- UI: top-3 badges (green/neutral/red by valence), staleness indicator, latency, cost estimate, reconnect count, Start/Stop
- Download session log button

### Phase 4 — Logging & comparison

- JSONL + CSV in `logs/`
- README section: how to compare against Track 2 (polling) numbers later
- Evaluation template in sprint doc appendix

---

## Out of scope

- EnableOS integration
- Database / persistence beyond log files
- Auth (local dev only)
- Gemini audio output playback (transcription only)
- Replacing Hume EVI voice coach

---

## Deliverable

```bash
cd playgrounds/gemini-live-emotion-playground
cp .env.example .env   # add GEMINI_API_KEY
npm install
npm start              # http://localhost:4040
```

1. Opens webcam + mic  
2. Streams to Gemini Live session  
3. Shows live top-3 emotion badges  
4. Logs latency, staleness, parse rate, reconnects, cost estimate to `logs/`  
5. Produces go/no-go write-up (template below)

---

## Appendix A — Evaluation template

```markdown
## Track 1 evaluation — [date]

**Model used:**  
**Session modes tested:** video+audio / video-only  
**Longest stable session:** X min (reconnects: N)  

| Metric | Result |
|--------|--------|
| Median update staleness | |
| Parse success rate | |
| Est. cost / 10 min | |
| Face-absent behavior | |
| vs Hume face overlay | |
| vs EVI prosody (per-utterance) | |

**Recommendation:** GO / NO-GO / GO with video-only only  
**Notes for Track 2 comparison:**  
```

---

## Appendix B — Track 2 pointer (future sprint)

Simple polling: periodic JPEG (+ optional audio snippet) → `gemini-2.5-flash` with `responseSchema` for structured emotions. Compare cost/latency/stability against Track 1 logs in `logs/`.

---

## Appendix C — EnableOS integration notes (post go/no-go only)

If GO:

- Replace `useHumeExpressionMeasurement` with server-proxied Gemini session (never expose API key to browser — fix current `/api/hume/apikey` pattern)
- Map coaching emotion labels to existing transcript badge UI (`app/components/Transcript.tsx`)
- Keep EVI prosody as secondary signal until Gemini fusion proven stable
- Add session resumption for 15+ min practice calls
