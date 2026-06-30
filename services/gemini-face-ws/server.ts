import { createServer } from "node:http";
import { attachGeminiFaceWebSocket } from "../../server/gemini-face-ws";

const port = parseInt(process.env.PORT ?? "8080", 10);
// Railway sets HOSTNAME to the container id — always bind all interfaces.
const hostname = process.env.BIND_HOST ?? "0.0.0.0";

const server = createServer((req, res) => {
  const path = req.url?.split("?")[0];

  if (path === "/health" || path === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        ok: true,
        service: "gemini-face-ws",
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      })
    );
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

attachGeminiFaceWebSocket(server);

server.listen(port, hostname, () => {
  console.log(`> Gemini face WebSocket service on http://${hostname}:${port}`);
  console.log(`> WebSocket path: /api/gemini-face/ws`);

  if (!process.env.GEMINI_API_KEY) {
    console.warn("> GEMINI_API_KEY not set — connections will be rejected");
  }

  const origins = process.env.ALLOWED_ORIGINS?.trim();
  if (origins) {
    console.log(`> Allowed browser origins: ${origins}`);
  } else {
    console.warn("> ALLOWED_ORIGINS not set — any Origin is accepted (set in production)");
  }
});
