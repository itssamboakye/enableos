import type { Server as HttpServer } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import { FaceOverlaySession, getGeminiFaceModel } from "../app/lib/gemini-face/faceOverlaySession";

export const GEMINI_FACE_WS_PATH = "/api/gemini-face/ws";

function send(ws: WebSocket, payload: Record<string, unknown>) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

export function attachGeminiFaceWebSocket(server: HttpServer) {
  const apiKey = process.env.GEMINI_API_KEY;
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req, socket, head) => {
    const url = req.url?.split("?")[0];
    if (url !== GEMINI_FACE_WS_PATH) return;

    if (!apiKey) {
      socket.write("HTTP/1.1 503 Service Unavailable\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  wss.on("connection", (ws) => {
    let faceSession: FaceOverlaySession | null = null;

    ws.on("message", async (raw) => {
      let msg: { type?: string; data?: string };
      try {
        msg = JSON.parse(raw.toString());
      } catch {
        send(ws, { type: "error", message: "Invalid JSON" });
        return;
      }

      if (msg.type === "start") {
        if (faceSession) {
          send(ws, { type: "error", message: "Session already active" });
          return;
        }

        const model = getGeminiFaceModel();
        send(ws, { type: "status", message: "Connecting to Gemini…", model });

        faceSession = new FaceOverlaySession({
          apiKey: apiKey!,
          model,
          onFaceUpdate: (data) => {
            send(ws, {
              type: "face",
              success: data.success,
              faceDetected: data.faceDetected,
              emotions: data.channels.video.emotions,
              latencyMs: data.latencyMs,
            });
          },
          onStatus: (data) => {
            send(ws, { ...data });
          },
          onGoAway: (goAway) => {
            send(ws, { type: "goAway", timeLeft: goAway.timeLeft });
            faceSession?.reconnect().catch((err) => {
              send(ws, { type: "error", message: err.message ?? "Reconnect failed" });
            });
          },
        });

        try {
          await faceSession.start();
          send(ws, { type: "started", model });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Failed to start face session";
          send(ws, { type: "error", message });
          faceSession = null;
        }
        return;
      }

      if (msg.type === "stop") {
        if (faceSession) {
          await faceSession.end();
          faceSession = null;
        }
        send(ws, { type: "stopped" });
        return;
      }

      if (!faceSession) return;

      if (msg.type === "video" && msg.data) {
        faceSession.sendVideoFrame(msg.data);
      }
    });

    ws.on("close", async () => {
      if (faceSession) {
        await faceSession.end();
        faceSession = null;
      }
    });
  });

  return wss;
}
