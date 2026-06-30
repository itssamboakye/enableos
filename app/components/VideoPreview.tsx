"use client";

import { useRef, useEffect, useState } from "react";
import { useGeminiFaceOverlay } from "../hooks/useGeminiFaceOverlay";

interface VideoPreviewProps {
  className?: string;
  onStreamReady?: (stream: MediaStream) => void;
}

export default function VideoPreview({
  className = "",
  onStreamReady,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [overlayReady, setOverlayReady] = useState(false);

  const {
    faceDetected,
    coachingPills,
    status,
    diagnostics,
    connect,
    disconnect,
  } = useGeminiFaceOverlay(videoRef);

  useEffect(() => {
    fetch("/api/gemini-face/config")
      .then((res) => res.json())
      .then((data) => setOverlayReady(Boolean(data.enabled)))
      .catch(() => setOverlayReady(false));
  }, []);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const getStream = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream;

          videoRef.current.onloadedmetadata = () => {
            setStream(mediaStream);
            setHasCamera(true);
            onStreamReady?.(mediaStream!);
          };

          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              if (err.name !== "AbortError") {
                console.error("Error playing video:", err);
              }
            });
          }
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCamera(false);
      }
    };

    getStream();

    return () => {
      disconnect();
      mediaStream?.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [disconnect, onStreamReady]);

  useEffect(() => {
    if (overlayReady && stream && videoRef.current && videoRef.current.readyState >= 2) {
      connect();
    }
  }, [overlayReady, stream, connect]);

  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      {!hasCamera && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground mb-2">
              {stream ? "Loading video..." : "Camera access is required for facial expression analysis."}
            </p>
            {!stream && (
              <p className="text-xs text-muted-foreground">Please grant camera permissions</p>
            )}
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
        style={{ backgroundColor: "#000" }}
      />

      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 max-w-[min(100%,20rem)]">
        <div
          className={`flex flex-wrap items-center justify-end gap-1.5 rounded-md px-2 py-1.5 backdrop-blur-sm bg-background/80 border ${
            status === "connected" && faceDetected && coachingPills.length > 0
              ? "border-primary/20"
              : "border-border/50"
          }`}
        >
          {status === "connected" && faceDetected && coachingPills.length > 0 ? (
            <>
              <div
                className={`h-2 w-2 rounded-full flex-shrink-0 ${getStatusColor()} ${
                  status === "connected" ? "animate-pulse" : ""
                }`}
              />
              {coachingPills.map((pill, idx) => (
                <span
                  key={`${pill.name}-${idx}`}
                  className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                    idx === 0
                      ? "bg-primary/15 text-primary border-primary/25 font-medium"
                      : "bg-muted/80 text-muted-foreground border-border/60"
                  }`}
                >
                  <span>{pill.name}</span>
                  {pill.score > 0.35 && (
                    <span className={idx === 0 ? "text-primary/70 ml-1" : "opacity-70 ml-1"}>
                      {(pill.score * 100).toFixed(0)}%
                    </span>
                  )}
                </span>
              ))}
            </>
          ) : (
            <div className="flex items-center gap-1.5 px-1">
              <div
                className={`h-2 w-2 rounded-full ${getStatusColor()} ${
                  status === "connected" ? "animate-pulse" : ""
                }`}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {status === "connecting"
                  ? "Connecting"
                  : status === "error"
                    ? "Error"
                    : overlayReady
                      ? "Disconnected"
                      : "Overlay off"}
              </span>
            </div>
          )}
        </div>
      </div>

      {status === "connected" && !faceDetected && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="rounded-md px-3 py-1.5 backdrop-blur-sm bg-background/80 border border-border/50">
            <p className="text-xs text-muted-foreground">
              {diagnostics || "Position your face in the camera"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
