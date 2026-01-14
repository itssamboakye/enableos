"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import WaveVisualizer from "./WaveVisualizer";
import Transcript, { TranscriptEntry } from "./Transcript";
import FeedbackDisplay, { FeedbackData } from "./FeedbackDisplay";

type CallState = "idle" | "connecting" | "connected" | "disconnecting" | "error" | "feedback";

interface EVIChatInterfaceProps {
  onCallEnd: () => void;
}

export default function EVIChatInterface({ onCallEnd }: EVIChatInterfaceProps) {
  const [callState, setCallState] = useState<CallState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [fftData, setFftData] = useState<number[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  
  const chatSocketRef = useRef<any>(null);
  const audioPlayerRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);

  const CONFIG_ID = "088fdee8-4598-4522-81b5-686be1d74faf";

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop();
      audioPlayerRef.current.dispose();
      audioPlayerRef.current = null;
    }

    if (chatSocketRef.current) {
      chatSocketRef.current.close();
      chatSocketRef.current = null;
    }
  };

  const startCall = async () => {
    try {
      setCallState("connecting");
      setError(null);
      setTranscript([]);
      setFftData([]);
      setIsAudioPlaying(false);

      // Dynamically import the SDK modules
      const { Chat } = await import("../../dist/esm/api/resources/empathicVoice/resources/chat/client/index.mjs");
      const { EVIWebAudioPlayer } = await import("../../dist/esm/wrapper/EVIWebAudioPlayer.mjs");
      const { convertBlobToBase64 } = await import("../../dist/esm/wrapper/convertBlobToBase64.mjs");
      const { getAudioStream } = await import("../../dist/esm/wrapper/getAudioStream.mjs");

      // Get access token
      const tokenResponse = await fetch("/api/evi-token");
      if (!tokenResponse.ok) {
        throw new Error("Failed to get access token");
      }
      const { accessToken } = await tokenResponse.json();

      // Initialize audio player with FFT enabled for visualization
      const audioPlayer = new EVIWebAudioPlayer({ fft: { enabled: true } });
      await audioPlayer.init();
      audioPlayerRef.current = audioPlayer;

      // Set up FFT event handler for wave visualizer
      audioPlayer.on("fft", (event: any) => {
        setFftData(event.detail.fft || []);
      });

      audioPlayer.on("play", () => {
        setIsAudioPlaying(true);
      });

      audioPlayer.on("stop", () => {
        setIsAudioPlaying(false);
      });

      // Get audio stream
      const stream = await getAudioStream();
      mediaStreamRef.current = stream;

      // Create AudioContext for recording
      const audioContext = new AudioContext({ sampleRate: 48000 });
      audioContextRef.current = audioContext;

      // Create MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported("audio/webm") 
        ? "audio/webm" 
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "audio/webm";
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      // Initialize Chat client and connect
      const chatClient = new Chat();
      const chatSocket = chatClient.connect({
        accessToken,
        configId: CONFIG_ID,
        verboseTranscription: true, // Enable verbose transcription for interim messages
      });

      chatSocketRef.current = chatSocket;

      // Wait for socket to open
      await chatSocket.waitForOpen();

      // Set up message handler
      chatSocket.on("message", async (message: any) => {
        if (message.type === "audio_output") {
          if (audioPlayerRef.current) {
            await audioPlayerRef.current.enqueue(message);
          }
        } else if (message.type === "user_message") {
          // Capture user transcript
          const text = message.message?.content || "";
          if (text && !message.interim) {
            // Extract top emotions from prosody scores
            const emotions: Array<{ name: string; score: number }> = [];
            if (message.models?.prosody?.scores) {
              const scores = message.models.prosody.scores;
              // Convert emotion scores object to array and sort by score
              const emotionEntries = Object.entries(scores)
                .map(([name, score]) => ({ name, score: typeof score === "number" ? score : 0 }))
                .filter(({ score }) => score > 0.1) // Only include emotions with score > 0.1
                .sort((a, b) => b.score - a.score)
                .slice(0, 3); // Top 3 emotions
              emotions.push(...emotionEntries);
            }

            // Only add final transcripts (not interim)
            setTranscript((prev) => [
              ...prev,
              {
                role: "user",
                text,
                timestamp: Date.now(),
                emotions: emotions.length > 0 ? emotions : undefined,
              },
            ]);
          }
        } else if (message.type === "assistant_message") {
          // Capture assistant transcript
          const text = message.message?.content || "";
          if (text) {
            setTranscript((prev) => [
              ...prev,
              {
                role: "assistant",
                text,
                timestamp: Date.now(),
              },
            ]);
          }
        }
      });

      chatSocket.on("error", (error: Error) => {
        console.error("Chat socket error:", error);
        setError(error.message);
        setCallState("error");
      });

      // Start recording and streaming audio
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && chatSocketRef.current) {
          try {
            // Check if socket is open before sending
            // ReconnectingWebSocket.OPEN = 1
            if (chatSocketRef.current.readyState === 1) {
              const base64Audio = await convertBlobToBase64(event.data);
              chatSocketRef.current.sendAudioInput({
                data: base64Audio,
              });
            }
            // Silently skip if socket is not open - it will reconnect and we'll send future chunks
          } catch (err) {
            console.error("Error sending audio:", err);
          }
        }
      };

      // Start recording with 100ms timeslice (recommended for web apps)
      // Only start after socket is confirmed open
      mediaRecorder.start(100);

      setCallState("connected");
      isInitializedRef.current = true;
    } catch (err) {
      console.error("Error starting call:", err);
      setError(err instanceof Error ? err.message : "Failed to start call");
      setCallState("error");
      await cleanup();
    }
  };

  const endCall = async () => {
    setCallState("disconnecting");
    await cleanup();
    
    // Generate feedback from transcript
    if (transcript.length > 0) {
      setCallState("feedback");
      setIsGeneratingFeedback(true);
      
      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transcript: transcript.map((entry) => ({
              role: entry.role,
              text: entry.text,
              timestamp: entry.timestamp,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setFeedback(data.feedback);
        } else {
          console.error("Failed to generate feedback");
        }
      } catch (err) {
        console.error("Error generating feedback:", err);
      } finally {
        setIsGeneratingFeedback(false);
      }
    } else {
      setCallState("idle");
      onCallEnd();
    }
  };

  const handleFeedbackDone = () => {
    setCallState("idle");
    setFeedback(null);
    setTranscript([]);
    onCallEnd();
  };

  if (callState === "connecting") {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="text-base text-muted-foreground">Connecting to call...</p>
      </div>
    );
  }

  if (callState === "error") {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-medium text-card-foreground">Error</h2>
        <p className="mb-6 text-base text-muted-foreground">{error || "An error occurred"}</p>
        <Button onClick={endCall} variant="secondary">
          Close
        </Button>
      </div>
    );
  }

  if (callState === "feedback") {
    return (
      <div className="space-y-6">
        {isGeneratingFeedback ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
            <p className="text-base text-muted-foreground">Generating feedback...</p>
          </div>
        ) : feedback ? (
          <>
            <FeedbackDisplay feedback={feedback} />
            <div className="flex gap-4">
              <Button onClick={handleFeedbackDone} className="flex-1">
                Done
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-lg border bg-card p-6">
            <p className="text-base text-muted-foreground mb-4">
              No feedback available for this session.
            </p>
            <Button onClick={handleFeedbackDone}>Close</Button>
          </div>
        )}
      </div>
    );
  }

  if (callState === "connected") {
    return (
      <div className="rounded-lg border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
            <span className="text-base font-medium text-card-foreground">Call in progress</span>
          </div>
        </div>
        
        {/* Wave Visualizer */}
        <div className="mb-6 rounded-md bg-muted p-4">
          <WaveVisualizer fftData={fftData} isActive={isAudioPlaying} className="w-full" />
        </div>

        {/* Transcript */}
        <div className="mb-6">
          <Transcript entries={transcript} />
        </div>

        <Button onClick={endCall} variant="destructive" className="w-full">
          End Call
        </Button>
      </div>
    );
  }

  // Idle state should not be reached due to auto-start, but show button as fallback
  // Idle state - show scenario and start button
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-8">
        <h2 className="text-xl font-medium mb-4 text-card-foreground">
          Scenario
        </h2>
        <p className="text-base text-muted-foreground leading-6 mb-6">
          You&apos;re meeting with a prospect who has expressed interest in
          improving their sales team&apos;s performance. Your goal is to
          uncover their pain points, understand the impact, and identify
          urgency.
        </p>
        <h3 className="text-base font-medium mb-3 text-card-foreground">
          Discovery Objectives
        </h3>
        <ul className="list-none p-0 mb-6">
          <li className="py-2 text-base text-muted-foreground">
            • Uncover pain points
          </li>
          <li className="py-2 text-base text-muted-foreground">
            • Understand impact
          </li>
          <li className="py-2 text-base text-muted-foreground">
            • Identify urgency
          </li>
        </ul>
        <Button onClick={startCall} className="w-full">
          Start Call
        </Button>
      </div>
    </div>
  );
}
