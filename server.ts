import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";
import { attachGeminiFaceWebSocket } from "./server/gemini-face-ws";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME ?? "localhost";
const port = parseInt(process.env.PORT ?? "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? "", true);
    handle(req, res, parsedUrl);
  });

  attachGeminiFaceWebSocket(server);

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    if (process.env.GEMINI_API_KEY) {
      console.log(`> Gemini face overlay WebSocket: ws://${hostname}:${port}/api/gemini-face/ws`);
    } else {
      console.warn("> GEMINI_API_KEY not set — face overlay disabled");
    }
  });
});
