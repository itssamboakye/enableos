# Gemini face WebSocket sidecar

Runs the face-overlay WebSocket handler outside Vercel. The main EnableOS app on Vercel only needs `GEMINI_FACE_WS_URL`; the API key stays on this service.

## Railway (recommended)

1. Create a **new Railway project** from this repo (`itssamboakye/enableos`).
2. **Start command:** `pnpm run start:gemini-face-ws`
3. **Build command:** `pnpm install` (no Next build required)
4. **Environment variables:**

   | Variable | Example |
   |----------|---------|
   | `GEMINI_API_KEY` | your Google AI key |
   | `ALLOWED_ORIGINS` | `https://www.enableos.io,https://enableos.io` |
   | `GEMINI_LIVE_MODEL` | `gemini-3.1-flash-live-preview` (optional) |

5. Generate a public domain in Railway (e.g. `gemini-face-ws-production.up.railway.app`).
6. In **Vercel** project env, set:

   ```
   GEMINI_FACE_WS_URL=wss://gemini-face-ws-production.up.railway.app/api/gemini-face/ws
   ```

7. Redeploy Vercel (no `GEMINI_API_KEY` needed on Vercel).

## Verify

```bash
curl https://YOUR-RAILWAY-DOMAIN/health
# {"ok":true,"service":"gemini-face-ws","geminiConfigured":true}
```

Open EnableOS practice session — overlay should connect without a WebSocket error in DevTools.

## Local dev

With `pnpm dev` (custom `server.ts`), you do **not** need `GEMINI_FACE_WS_URL`. Set only `GEMINI_API_KEY` in `.env.local` and the app uses same-origin `/api/gemini-face/ws`.

To test this sidecar locally:

```bash
GEMINI_API_KEY=... pnpm run start:gemini-face-ws
# ws://localhost:8080/api/gemini-face/ws
```
