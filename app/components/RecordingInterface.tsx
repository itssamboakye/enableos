"use client";

import { useState, useRef, useEffect } from "react";

type RecordingState = "recording" | "processing";

interface RecordingInterfaceProps {
  state: RecordingState;
  onComplete: (videoBlob: Blob) => void;
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
        // onstop fires when recorder stops, chunks are already collected
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
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    
    // Stop tracks first
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsRecording(false);
    
    // Create blob from collected chunks and send to parent
    const blob = new Blob(chunksRef.current, { type: "video/webm" });
    chunksRef.current = []; // Clear chunks after creating blob
    onComplete(blob);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (state === "processing") {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <div
          className="spinner mx-auto mb-4 w-12 h-12 border-[3px] border-border border-t-primary rounded-full"
        />
        <p className="text-base text-muted-foreground">
          Processing feedback...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden mb-6">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-2 rounded-md">
            <div className="recording-pulse w-2 h-2 bg-red-500/85 rounded-full" />
            <span className="text-xs font-medium text-white/90">
              Recording
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-medium text-foreground">
          {formatTime(recordingTime)}
        </div>
        <button
          onClick={handleStop}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-8 py-2 border border-border"
        >
          Complete Session
        </button>
      </div>
    </div>
  );
}
