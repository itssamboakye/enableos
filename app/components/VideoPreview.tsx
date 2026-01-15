"use client";

import { useRef, useEffect, useState } from "react";
import { useHumeExpressionMeasurement } from "../hooks/useHumeExpressionMeasurement";

interface VideoPreviewProps {
  className?: string;
  onStreamReady?: (stream: MediaStream) => void;
}

export default function VideoPreview({
  className = "",
  onStreamReady,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);

  const {
    faceDetected,
    topEmotion,
    status,
    diagnostics,
    connect,
    disconnect,
  } = useHumeExpressionMeasurement(videoRef, apiKey);

  // Fetch API key on mount
  useEffect(() => {
    fetch("/api/hume/apikey")
      .then((res) => res.json())
      .then((data) => {
        if (data.apiKey) {
          setApiKey(data.apiKey);
        }
      })
      .catch((error) => {
        console.error("Error fetching API key:", error);
      });
  }, []);

  // Get webcam stream
  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const getStream = async () => {
      try {
        console.log("Requesting camera access...");
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
          audio: false, // We're only using video for face detection
        });

        console.log("Camera access granted, stream:", mediaStream);
        console.log("Video tracks:", mediaStream.getVideoTracks());

        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream;
          console.log("Set video srcObject");
          
          // Wait for video to load
          videoRef.current.onloadedmetadata = () => {
            console.log("Video metadata loaded, readyState:", videoRef.current?.readyState);
            setStream(mediaStream);
            setHasCamera(true);
            onStreamReady?.(mediaStream!);

            // Connect when API key is available
            if (apiKey) {
              console.log("API key available, connecting...");
              connect();
            }
          };

          videoRef.current.oncanplay = () => {
            console.log("Video can play");
          };

          // Handle video play with better error handling
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              // Ignore abort errors (they happen when video is quickly changed)
              if (err.name !== 'AbortError') {
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
      console.log("Cleaning up video stream");
      disconnect();
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
          console.log("Stopped track:", track.label);
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []); // Only run once on mount

  // Reconnect when API key becomes available
  useEffect(() => {
    if (apiKey && stream && videoRef.current && videoRef.current.readyState >= 2) {
      console.log("API key available, connecting to Hume...");
      connect();
    }
  }, [apiKey, stream, connect]);

  // Format emotion name for display
  const formatEmotionName = (name: string): string => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Get status color
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

  // Always show video element, even if hasCamera is false (might be loading)
  // This helps debug the issue

  return (
    <div className={`relative rounded-lg border bg-card overflow-hidden ${className}`}>
      {!hasCamera && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground mb-2">
              {stream ? "Loading video..." : "Camera access is required for facial expression analysis."}
            </p>
            {!stream && (
              <p className="text-xs text-muted-foreground">
                Please grant camera permissions
              </p>
            )}
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover min-h-[200px]"
        style={{ backgroundColor: "#000" }}
      />

      {/* Emotion Overlay - Top Right */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <div
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 backdrop-blur-sm bg-background/80 border ${
            status === "connected" && faceDetected
              ? "border-primary/20"
              : "border-border/50"
          }`}
        >
          {/* Status Indicator and Emotion */}
          {status === "connected" && faceDetected && topEmotion ? (
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${getStatusColor()} ${
                  status === "connected" ? "animate-pulse" : ""
                }`}
              />
              <span className="text-xs font-medium text-foreground">
                {formatEmotionName(topEmotion.name)}
              </span>
              {topEmotion.score > 0.5 && (
                <span className="text-xs text-muted-foreground">
                  {(topEmotion.score * 100).toFixed(0)}%
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
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
                  : "Disconnected"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Face Detection Feedback - Bottom */}
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
