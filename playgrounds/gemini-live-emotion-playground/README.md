# Gemini Live Emotion Playground (Track 1b)

Throwaway validation repo for replacing Hume Expression Measurement with Gemini Live API streaming.

**Sprint doc:** [`docs/sprints/track-1-gemini-live-emotion-playground.md`](../../docs/sprints/track-1-gemini-live-emotion-playground.md)

## Track 1b (current)

- **Three columns:** Face (video) · Voice (audio) · Combined
- **Full expression taxonomy:** interest, joy, concentration, nervousness, reserved, etc.
- **Coaching rollup:** maps expressions → engaged, confident, reserved… for scorecard-style readouts
- **No more "flat"** — uses `reserved` / `neutral` instead

## Quick start

```bash
cd playgrounds/gemini-live-emotion-playground
cp .env.example .env
# Add GEMINI_API_KEY from https://aistudio.google.com/apikey

npm install
npm run research   # Phase 0 gate — verify model + API before UI
npm start          # http://localhost:4040
```

## What it does

1. Captures webcam (1 FPS JPEG, max 768×768) + mic (16 kHz PCM) in **video+audio** mode
2. Proxies through Node → Gemini Live API (API key never sent to browser)
3. Parses emotion JSON from `outputAudioTranscription`
4. Shows top-3 coaching labels + latency/staleness/cost estimates
5. Writes session logs to `logs/*.jsonl` and `logs/*.csv`

## Modes

| Mode | Use case |
|------|----------|
| **Video + audio** | Full Track 1 — face + vocal tone |
| **Video only** | Face / combined from expression only |
| **Audio only** | Voice / combined from mic only (no camera) |

## Go / no-go

Complete the evaluation template in the sprint doc after running ≥15 min sessions with compression/resumption enabled.

## Key config notes

- Uses `responseModalities: AUDIO` + `outputAudioTranscription` (not TEXT-only)
- Model default: `gemini-3.1-flash-live-preview` — verify in `.env` against current docs
- Session limits: enable `contextWindowCompression` + `sessionResumption` for long calls

## Out of scope

Not integrated into EnableOS. Do not ship to production without go/no-go sign-off.
