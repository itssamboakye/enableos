export const GEMINI_FACE_WS_PATH = "/api/gemini-face/ws";

export interface GeminiFacePublicConfig {
  enabled: boolean;
  /** Full WebSocket URL for cross-origin sidecar (production on Vercel). */
  wsUrl: string | null;
  /** Same-origin path when the custom Node server handles upgrades (local dev). */
  wsPath: string | null;
  model: string;
}

/** Browser-safe face overlay config (never exposes API keys). */
export function getGeminiFacePublicConfig(): GeminiFacePublicConfig {
  const model = process.env.GEMINI_LIVE_MODEL ?? "gemini-3.1-flash-live-preview";
  const wsUrl = process.env.GEMINI_FACE_WS_URL?.trim() || null;

  if (wsUrl) {
    return {
      enabled: true,
      wsUrl,
      wsPath: null,
      model,
    };
  }

  if (process.env.GEMINI_API_KEY) {
    return {
      enabled: true,
      wsUrl: null,
      wsPath: GEMINI_FACE_WS_PATH,
      model,
    };
  }

  return {
    enabled: false,
    wsUrl: null,
    wsPath: null,
    model,
  };
}

/** Resolve the WebSocket endpoint in the browser. */
export function resolveGeminiFaceWebSocketUrl(config: {
  wsUrl: string | null;
  wsPath: string | null;
}): string | null {
  if (config.wsUrl) return config.wsUrl;
  if (!config.wsPath || typeof window === "undefined") return null;

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}${config.wsPath}`;
}
