"use client";

import { useState, useRef, useEffect } from "react";

type RecordingState = "recording" | "processing";

interface RecordingInterfaceProps {
  state: RecordingState;
  onComplete: () => void;
}

export default function RecordingInterface({
  state,
  onComplete,
}: RecordingInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state === "recording" && !isRecording) {
      startRecording();
    }

    return () => {
      if (state !== "recording") {
        stopRecording();
      }
    };
  }, [state]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMediaStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9,opus",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        // In Phase 2, we'll process this blob with Hume SDK
        console.log("Recording stopped, blob size:", blob.size);
        chunksRef.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      
      // Set isRecording to true after successfully starting
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert(
        "Unable to access camera/microphone. Please check permissions and try again."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsRecording(false);
  };

  const handleStop = () => {
    stopRecording();
    onComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (state === "processing") {
    return (
      <div
        style={{
          backgroundColor: "var(--color-surface-default)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--spacing-12)",
          textAlign: "center",
        }}
      >
        <div
          className="spinner"
          style={{
            width: "48px",
            height: "48px",
            border: "3px solid var(--color-border-default)",
            borderTopColor: "var(--color-accent-primary)",
            borderRadius: "50%",
            margin: "0 auto var(--spacing-4)",
          }}
        />
        <p
          style={{
            fontSize: "16px",
            color: "var(--color-text-secondary)",
          }}
        >
          Processing feedback...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-default)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-6)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          backgroundColor: "var(--color-background-secondary)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          marginBottom: "var(--spacing-6)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {isRecording && (
          <div
            style={{
              position: "absolute",
              top: "var(--spacing-4)",
              left: "var(--spacing-4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "var(--spacing-2) var(--spacing-3)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div
              className="recording-pulse"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "rgba(255, 100, 100, 0.85)",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: 500,
              }}
            >
              Recording
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-4)",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
          }}
        >
          {formatTime(recordingTime)}
        </div>
        <button
          onClick={handleStop}
          style={{
            padding: "var(--spacing-4) var(--spacing-8)",
            backgroundColor: "var(--color-surface-hover)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            fontSize: "15px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Complete Session
        </button>
      </div>

    </div>
  );
}
