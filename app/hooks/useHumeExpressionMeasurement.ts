"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Emotion {
  name: string;
  score: number;
}

interface ExpressionMeasurementState {
  faceDetected: boolean;
  emotions: Record<string, number>;
  topEmotion: { name: string; score: number } | null;
  status: "disconnected" | "connecting" | "connected" | "error";
  diagnostics: string;
}

interface HumeExpressionMeasurementHook {
  faceDetected: boolean;
  emotions: Record<string, number>;
  topEmotion: { name: string; score: number } | null;
  status: "disconnected" | "connecting" | "connected" | "error";
  diagnostics: string;
  connect: () => void;
  disconnect: () => void;
}

export function useHumeExpressionMeasurement(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  apiKey: string | null
): HumeExpressionMeasurementHook {
  const [state, setState] = useState<ExpressionMeasurementState>({
    faceDetected: false,
    emotions: {},
    topEmotion: null,
    status: "disconnected",
    diagnostics: "",
  });

  const wsRef = useRef<WebSocket | null>(null);
  const captureIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Create canvas for frame capture
  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
  }, []);

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return null;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64 JPEG
    return canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
  }, [videoRef]);

  const connect = useCallback(() => {
    if (!apiKey) {
      setState((prev) => ({
        ...prev,
        status: "error",
        diagnostics: "API key not available",
      }));
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    setState((prev) => ({
      ...prev,
      status: "connecting",
      diagnostics: "Connecting to Hume API...",
    }));

    try {
      const ws = new WebSocket(
        `wss://api.hume.ai/v0/stream/models?apikey=${apiKey}`
      );

      ws.onopen = () => {
        setState((prev) => ({
          ...prev,
          status: "connected",
          diagnostics: "Connected to Hume API",
        }));

        // Start capturing frames every 1 second
        captureIntervalRef.current = setInterval(() => {
          const base64Frame = captureFrame();
          if (base64Frame && ws.readyState === WebSocket.OPEN) {
            const payload = {
              data: base64Frame,
              models: {
                face: {},
              },
            };
            ws.send(JSON.stringify(payload));
          }
        }, 1000);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.face?.predictions && data.face.predictions.length > 0) {
            const prediction = data.face.predictions[0];
            
            if (prediction.emotions && prediction.emotions.length > 0) {
              // Convert emotions array to record
              const emotionsRecord: Record<string, number> = {};
              prediction.emotions.forEach((emotion: Emotion) => {
                emotionsRecord[emotion.name] = emotion.score;
              });

              // Find top emotion
              const topEmotion = prediction.emotions.reduce(
                (top: Emotion, current: Emotion) =>
                  current.score > top.score ? current : top,
                prediction.emotions[0]
              );

              setState((prev) => ({
                ...prev,
                faceDetected: true,
                emotions: emotionsRecord,
                topEmotion: {
                  name: topEmotion.name,
                  score: topEmotion.score,
                },
                diagnostics: "Face detected, analyzing...",
              }));
            }
          } else {
            setState((prev) => ({
              ...prev,
              faceDetected: false,
              emotions: {},
              topEmotion: null,
              diagnostics: "No face detected",
            }));
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
          setState((prev) => ({
            ...prev,
            diagnostics: "Error processing response",
          }));
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setState((prev) => ({
          ...prev,
          status: "error",
          diagnostics: "Connection error",
        }));
      };

      ws.onclose = () => {
        setState((prev) => ({
          ...prev,
          status: "disconnected",
          diagnostics: "Disconnected from Hume API",
          faceDetected: false,
          emotions: {},
          topEmotion: null,
        }));

        if (captureIntervalRef.current) {
          clearInterval(captureIntervalRef.current);
          captureIntervalRef.current = null;
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Error creating WebSocket:", error);
      setState((prev) => ({
        ...prev,
        status: "error",
        diagnostics: "Failed to create connection",
      }));
    }
  }, [apiKey, captureFrame]);

  const disconnect = useCallback(() => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setState({
      faceDetected: false,
      emotions: {},
      topEmotion: null,
      status: "disconnected",
      diagnostics: "",
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    faceDetected: state.faceDetected,
    emotions: state.emotions,
    topEmotion: state.topEmotion,
    status: state.status,
    diagnostics: state.diagnostics,
    connect,
    disconnect,
  };
}
