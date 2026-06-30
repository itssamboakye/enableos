"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaceOverlayStabilizer,
  type RawFaceEmotion,
} from "@/lib/gemini-face/overlayStabilizer";
import { resolveGeminiFaceWebSocketUrl } from "@/lib/gemini-face/publicConfig";
import { useAffectSessionOptional } from "@/contexts/AffectSessionContext";

export type FaceOverlayStatus = "disconnected" | "connecting" | "connected" | "error";

export interface FaceOverlayHook {
  faceDetected: boolean;
  emotions: Record<string, number>;
  topEmotion: { name: string; score: number } | null;
  coachingPills: Array<{ name: string; score: number }>;
  status: FaceOverlayStatus;
  diagnostics: string;
  connect: () => void;
  disconnect: () => void;
}

interface FaceEmotion {
  label: string;
  confidence: number;
}

const FRAME_INTERVAL_MS = 1000;

export function useGeminiFaceOverlay(
  videoRef: React.RefObject<HTMLVideoElement | null>
): FaceOverlayHook {
  const [state, setState] = useState({
    faceDetected: false,
    emotions: {} as Record<string, number>,
    topEmotion: null as { name: string; score: number } | null,
    coachingPills: [] as Array<{ name: string; score: number }>,
    status: "disconnected" as FaceOverlayStatus,
    diagnostics: "",
  });

  const wsRef = useRef<WebSocket | null>(null);
  const captureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const enabledRef = useRef(false);
  const wsEndpointRef = useRef<string | null>(null);
  const stabilizerRef = useRef(new FaceOverlayStabilizer());
  const affectSession = useAffectSessionOptional();

  useEffect(() => {
    fetch("/api/gemini-face/config")
      .then((res) => res.json())
      .then((data) => {
        enabledRef.current = Boolean(data.enabled);
        wsEndpointRef.current = resolveGeminiFaceWebSocketUrl(data);
        if (!data.enabled) {
          setState((prev) => ({
            ...prev,
            diagnostics: "Face overlay unavailable (GEMINI_FACE_WS_URL not configured)",
          }));
        }
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          diagnostics: "Could not load face overlay config",
        }));
      });
  }, []);

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!canvasRef.current) canvasRef.current = document.createElement("canvas");
    const canvas = canvasRef.current;

    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) return null;

    const maxSize = 768;
    let w = video.videoWidth;
    let h = video.videoHeight;
    if (!w || !h) return null;

    if (w > maxSize || h > maxSize) {
      const scale = maxSize / Math.max(w, h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.75).split(",")[1] ?? null;
  }, [videoRef]);

  const disconnect = useCallback(() => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "stop" }));
    }
    wsRef.current?.close();
    wsRef.current = null;
    stabilizerRef.current.reset();

    setState({
      faceDetected: false,
      emotions: {},
      topEmotion: null,
      coachingPills: [],
      status: "disconnected",
      diagnostics: "",
    });
  }, []);

  const connect = useCallback(() => {
    if (!enabledRef.current) {
      setState((prev) => ({
        ...prev,
        status: "error",
        diagnostics: "Face overlay unavailable",
      }));
      return;
    }

    const endpoint = wsEndpointRef.current;
    if (!endpoint) {
      setState((prev) => ({
        ...prev,
        status: "error",
        diagnostics: "Face overlay WebSocket URL not configured",
      }));
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setState((prev) => ({
      ...prev,
      status: "connecting",
      diagnostics: "Connecting face overlay…",
    }));

    const ws = new WebSocket(endpoint);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "start" }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "started") {
        setState((prev) => ({
          ...prev,
          status: "connected",
          diagnostics: "Analyzing facial expression…",
        }));

        const sendFrame = () => {
          const frame = captureFrame();
          if (frame && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "video", data: frame }));
          }
        };

        sendFrame();
        captureIntervalRef.current = setInterval(sendFrame, FRAME_INTERVAL_MS);
      }

      if (msg.type === "face" && msg.success) {
        const emotionsList: FaceEmotion[] = msg.emotions ?? [];
        const rawFaceDetected = msg.faceDetected !== false && emotionsList.length > 0;

        const stabilized = stabilizerRef.current.update(
          emotionsList as RawFaceEmotion[],
          rawFaceDetected
        );

        const emotionsRecord: Record<string, number> = {};
        for (const e of emotionsList) {
          emotionsRecord[e.label] = e.confidence / 100;
        }

        setState((prev) => ({
          ...prev,
          faceDetected: stabilized.faceDetected,
          emotions: emotionsRecord,
          topEmotion: stabilized.topEmotion
            ? { name: stabilized.topEmotion.name, score: stabilized.topEmotion.score }
            : null,
          coachingPills: stabilized.coachingPills.map((p) => ({
            name: p.name,
            score: p.score,
          })),
          status: "connected",
          diagnostics: stabilized.topEmotion ? "Face detected" : "Reading expression…",
        }));

        affectSession?.recordFaceSample(
          stabilized.topEmotion?.name ?? stabilized.coachingPills[0]?.name,
          stabilized.coachingPills.map((p) => ({ name: p.name, score: p.score })),
          stabilized.faceDetected
        );
      }

      if (msg.type === "error") {
        setState((prev) => ({
          ...prev,
          status: "error",
          diagnostics: msg.message ?? "Face overlay error",
        }));
      }

      if (msg.type === "goAway") {
        setState((prev) => ({
          ...prev,
          diagnostics: `Reconnecting (${msg.timeLeft ?? "?"})…`,
        }));
      }
    };

    ws.onerror = () => {
      setState((prev) => ({
        ...prev,
        status: "error",
        diagnostics: "Face overlay connection error",
      }));
    };

    ws.onclose = () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
        captureIntervalRef.current = null;
      }
      setState((prev) => ({
        ...prev,
        status: prev.status === "error" ? "error" : "disconnected",
        faceDetected: false,
        emotions: {},
        topEmotion: null,
        coachingPills: [],
      }));
    };

    wsRef.current = ws;
  }, [captureFrame]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return {
    ...state,
    connect,
    disconnect,
  };
}
