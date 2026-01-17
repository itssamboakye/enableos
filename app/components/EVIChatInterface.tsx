"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Transcript, { TranscriptEntry } from "./Transcript";
import FeedbackDisplay, { FeedbackData } from "./FeedbackDisplay";
import VideoPreview from "./VideoPreview";
import { Video, VideoOff } from "lucide-react";
import { SessionOrchestrator } from "@/lib/sessionOrchestrator";
import { SessionState } from "@/lib/sessionStateMachine";

type CallState = "idle" | "connecting" | "connected" | "disconnecting" | "error" | "feedback";

interface EVIChatInterfaceProps {
  onCallEnd: () => void;
}

export default function EVIChatInterface({ onCallEnd }: EVIChatInterfaceProps) {
  const router = useRouter();
  const [callState, setCallState] = useState<CallState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [fftData, setFftData] = useState<number[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  
  const chatSocketRef = useRef<any>(null);
  const audioPlayerRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);
  const orchestratorRef = useRef<SessionOrchestrator | null>(null);

  const CONFIG_ID = "088fdee8-4598-4522-81b5-686be1d74faf";

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      cleanup();
    };
  }, []);

  // Also cleanup on page unload/hide to ensure sessions are closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Close socket immediately on page unload
      if (chatSocketRef.current) {
        try {
          chatSocketRef.current.close();
        } catch (err) {
          // Ignore errors during unload
        }
      }
    };

    const handleVisibilityChange = () => {
      // If page becomes hidden and we have an active call, ensure cleanup
      if (document.hidden && callState === "connected" && chatSocketRef.current) {
        try {
          chatSocketRef.current.close();
        } catch (err) {
          console.error("Error closing socket on visibility change:", err);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [callState]);

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
      // Explicitly close the socket with code 1000 (normal closure)
      // This ensures the session is properly marked as ended on the server
      try {
        chatSocketRef.current.close();
      } catch (err) {
        console.error("Error closing chat socket:", err);
      }
      chatSocketRef.current = null;
    }

    if (orchestratorRef.current) {
      orchestratorRef.current.reset();
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
      const audioPlayer = new EVIWebAudioPlayer({ 
        fft: { enabled: true },
        volume: 1.0 // Maximum volume
      });
      await audioPlayer.init();
      audioPlayerRef.current = audioPlayer;
      
      // Ensure volume is set to maximum after initialization
      audioPlayer.setVolume(1.0);

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

      // Get initial prompt from orchestrator (we'll create it after)
      const { getSystemPromptForState } = await import("@/lib/sessionPrompts");
      const { SessionState } = await import("@/lib/sessionStateMachine");
      const initialPrompt = getSystemPromptForState(SessionState.COACH_INTRO, {});

      // Initialize Chat client and connect with initial prompt
      const chatClient = new Chat();
      const chatSocket = chatClient.connect({
        accessToken,
        configId: CONFIG_ID,
        verboseTranscription: true, // Enable verbose transcription for interim messages
        sessionSettings: {
          systemPrompt: initialPrompt, // Set initial prompt on connection
        },
      });

      chatSocketRef.current = chatSocket;

      // Wait for socket to open
      await chatSocket.waitForOpen();

      // Initialize orchestrator AFTER socket is ready
      orchestratorRef.current = new SessionOrchestrator({
        onPromptUpdate: (prompt: string) => {
          // Send session_settings with updated prompt IMMEDIATELY
          if (chatSocketRef.current && chatSocketRef.current.readyState === 1) {
            console.log(`[ORCHESTRATOR] Sending session_settings update`);
            try {
              chatSocketRef.current.sendSessionSettings({
                systemPrompt: prompt,
              });
              console.log(`[ORCHESTRATOR] session_settings sent successfully`);
            } catch (error) {
              console.error(`[ORCHESTRATOR] Error sending session_settings:`, error);
            }
          } else {
            console.warn(`[ORCHESTRATOR] Cannot send session_settings - socket not ready (state: ${chatSocketRef.current?.readyState})`);
          }
        },
        onStateChange: (state: SessionState) => {
          console.log(`[ORCHESTRATOR] State changed to: ${state}`);
          // Note: We'll transition to feedback UI when we detect feedback has been delivered
          // (handled in assistant_message handler above)
        },
      });
      
      // Ensure initial prompt is set (orchestrator constructor already calls updatePrompt, but we already sent it)
      console.log(`[ORCHESTRATOR] Initial prompt set: ${initialPrompt.substring(0, 100)}...`);

      // Set up message handler
      chatSocket.on("message", async (message: any) => {
        console.log("[CHAT_SOCKET] Message received:", {
          type: message.type,
          hasContent: !!message.message?.content,
          contentPreview: message.message?.content?.substring(0, 50),
          interim: message.interim,
        });
        
        if (message.type === "audio_output") {
          if (audioPlayerRef.current) {
            await audioPlayerRef.current.enqueue(message);
          }
        } else if (message.type === "user_message") {
          // Capture user transcript
          const text = message.message?.content || "";
          console.log("[CHAT_SOCKET] User message:", { text, interim: message.interim, hasText: !!text });
          
          if (text && !message.interim) {
            console.log("[CHAT_SOCKET] Processing final user message:", text);
            
            // Handle user message through orchestrator FIRST to update prompt before LLM responds
            if (orchestratorRef.current) {
              const beforeState = orchestratorRef.current.getSession().state;
              orchestratorRef.current.handleUserMessage(text);
              const afterState = orchestratorRef.current.getSession().state;
              
              // Debug logging
              if (beforeState !== afterState) {
                console.log(`[ORCHESTRATOR] State transition: ${beforeState} → ${afterState}`);
                console.log(`[ORCHESTRATOR] User text: "${text}"`);
              }
            }

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
            console.log("[CHAT_SOCKET] Adding user message to transcript");
            setTranscript((prev) => {
              const newTranscript = [
                ...prev,
                {
                  role: "user",
                  text,
                  timestamp: Date.now(),
                  emotions: emotions.length > 0 ? emotions : undefined,
                },
              ];
              console.log("[CHAT_SOCKET] Transcript after adding user message:", newTranscript.length, "entries");
              return newTranscript;
            });
          } else {
            console.log("[CHAT_SOCKET] Skipping user message - empty text or interim:", { text, interim: message.interim });
          }
        } else if (message.type === "assistant_message") {
          // Capture assistant transcript
          const text = message.message?.content || "";
          console.log("[CHAT_SOCKET] Assistant message:", { text, hasText: !!text });
          
          if (text) {
            console.log("[CHAT_SOCKET] Processing assistant message:", text);
            
            // Handle assistant message through orchestrator
            if (orchestratorRef.current) {
              orchestratorRef.current.handleAssistantMessage(text);
            }

            console.log("[CHAT_SOCKET] Adding assistant message to transcript");
            setTranscript((prev) => {
              const newTranscript = [
                ...prev,
                {
                  role: "assistant",
                  text,
                  timestamp: Date.now(),
                },
              ];
              console.log("[CHAT_SOCKET] Transcript after adding assistant message:", newTranscript.length, "entries");
              return newTranscript;
            });
          } else {
            console.log("[CHAT_SOCKET] Skipping assistant message - empty text");
          }
        } else {
          console.log("[CHAT_SOCKET] Unhandled message type:", message.type);
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
    console.log("[END_CALL] Starting endCall process...");
    setCallState("disconnecting");
    
    // CRITICAL: Close the socket FIRST to properly end the session on the server
    // This ensures the session is marked as USER_ENDED, not left as ACTIVE
    if (chatSocketRef.current) {
      try {
        console.log("[END_CALL] Stopping media recorder...");
        // Stop sending audio first
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
        }
        
        console.log("[END_CALL] Closing socket...");
        // Close the socket with code 1000 (normal closure) to signal USER_ENDED status
        // This tells the Hume API that the user intentionally ended the call
        chatSocketRef.current.close();
        
        // Wait a brief moment for the close message to be sent to the server
        await new Promise((resolve) => setTimeout(resolve, 300));
        console.log("[END_CALL] Socket closed");
      } catch (err) {
        console.error("[END_CALL] Error closing socket during endCall:", err);
      }
    }
    
    // Force feedback state in orchestrator (if we're not already in feedback)
    if (orchestratorRef.current) {
      const currentState = orchestratorRef.current.getSession().state;
      console.log("[END_CALL] Current orchestrator state:", currentState);
      if (currentState !== SessionState.COACH_FEEDBACK) {
        orchestratorRef.current.forceFeedbackState();
        // Wait a moment for prompt update to be sent (though socket might be closing)
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    
    // IMPORTANT: Get transcript BEFORE cleanup (cleanup resets orchestrator)
    console.log("[END_CALL] Getting transcript before cleanup...");
    const orchestratorTranscript = orchestratorRef.current?.getTranscript() || [];
    console.log("[END_CALL] Orchestrator transcript length:", orchestratorTranscript.length);
    console.log("[END_CALL] Orchestrator transcript:", orchestratorTranscript);
    console.log("[END_CALL] Component transcript length:", transcript.length);
    console.log("[END_CALL] Component transcript:", transcript);
    
    // Use orchestrator transcript if available, otherwise use component transcript
    const transcriptForFeedback = orchestratorTranscript.length > 0 ? orchestratorTranscript : transcript;
    console.log("[END_CALL] Final transcript for feedback length:", transcriptForFeedback.length);
    console.log("[END_CALL] Final transcript entries:", transcriptForFeedback);
    
    console.log("[END_CALL] Cleaning up resources...");
    await cleanup();
    
    if (transcriptForFeedback.length > 0) {
      console.log("[END_CALL] Setting state to feedback and generating...");
      setCallState("feedback");
      setIsGeneratingFeedback(true);
      
      try {
        const transcriptPayload = transcriptForFeedback.map((entry) => ({
          role: entry.role,
          text: entry.text,
          timestamp: entry.timestamp,
        }));
        
        console.log("[END_CALL] Sending feedback request with transcript:", transcriptPayload);
        
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transcript: transcriptPayload,
          }),
        });

        console.log("[END_CALL] Feedback API response status:", response.status);
        console.log("[END_CALL] Feedback API response ok:", response.ok);

        if (response.ok) {
          const data = await response.json();
          console.log("[END_CALL] Feedback data received:", data);
          setFeedback(data.feedback);
          
          // Navigate to summary page with feedback data
          // Store feedback in sessionStorage to pass to summary page
          const sessionId = `session-${Date.now()}`;
          const storageData = {
            feedback: data.feedback,
            transcript: transcriptForFeedback,
            timestamp: Date.now(),
          };
          
          console.log("[END_CALL] Storing feedback with session ID:", sessionId);
          console.log("[END_CALL] Feedback data structure:", {
            hasFeedback: !!data.feedback,
            feedbackKeys: data.feedback ? Object.keys(data.feedback) : [],
          });
          
          sessionStorage.setItem(`feedback-${sessionId}`, JSON.stringify(storageData));
          
          // Verify it was stored
          const verify = sessionStorage.getItem(`feedback-${sessionId}`);
          console.log("[END_CALL] Verification - data stored:", !!verify);
          if (verify) {
            console.log("[END_CALL] Verification - stored data preview:", verify.substring(0, 200));
          }
          
          // Navigate to summary page
          console.log("[END_CALL] Navigating to summary page:", `/discovery-practice/summary?session=${sessionId}`);
          
          // Use window.location instead of router.push to ensure navigation happens
          // This prevents any React state issues from blocking navigation
          window.location.href = `/discovery-practice/summary?session=${sessionId}`;
          
          // Don't call onCallEnd() here since we're navigating away
          return;
        } else {
          const errorText = await response.text();
          console.error("[END_CALL] Failed to generate feedback. Status:", response.status);
          console.error("[END_CALL] Error response:", errorText);
          setCallState("idle");
          setIsGeneratingFeedback(false);
          onCallEnd();
        }
      } catch (err) {
        console.error("[END_CALL] Error generating feedback:", err);
        console.error("[END_CALL] Error details:", err instanceof Error ? err.message : String(err));
        setCallState("idle");
        setIsGeneratingFeedback(false);
        onCallEnd();
      }
    } else {
      console.warn("[END_CALL] No transcript available for feedback");
      setCallState("idle");
      onCallEnd();
    }
  };

  const handleFeedbackDone = () => {
    setCallState("idle");
    setFeedback(null);
    setTranscript([]);
    if (orchestratorRef.current) {
      orchestratorRef.current.reset();
    }
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
      <div className="space-y-6">
        {/* Video Preview with Facial Expression Analysis */}
        {cameraEnabled && (
          <div className="rounded-lg border bg-card overflow-hidden relative">
            <VideoPreview className="aspect-video" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={() => setCameraEnabled(false)}
              title="Turn off camera"
            >
              <VideoOff className="h-4 w-4" />
            </Button>
          </div>
        )}

        {!cameraEnabled && (
          <div className="rounded-lg border bg-card p-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCameraEnabled(true)}
            >
              <Video className="h-4 w-4 mr-2" />
              Enable Camera & Facial Analysis
            </Button>
          </div>
        )}

        <div className="rounded-lg border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
              <span className="text-base font-medium text-card-foreground">Call in progress</span>
            </div>
          </div>
          
                  {/* Audio Visualizer - Minimal Bars (White) */}
                  <div className="mb-6 rounded-md bg-muted p-4">
                    <div className="h-20 flex items-end justify-center gap-1.5">
                      {(() => {
                        // Convert FFT data to bar values
                        const getBars = (count: number) => {
                          if (fftData.length === 0) return Array(count).fill(0);
                          const result: number[] = [];
                          for (let i = 0; i < count; i++) {
                            const index = Math.min(Math.floor((i / count) * fftData.length), fftData.length - 1);
                            result.push(fftData[index] || 0);
                          }
                          return result;
                        };
                        const bars = getBars(32); // 32 bars for minimal style
                        return bars.map((value, i) => (
                          <div
                            key={i}
                            className="w-1.5 rounded-full transition-all duration-75"
                            style={{
                              height: `${Math.max(value * 90, 5)}%`,
                              minHeight: '4px',
                              backgroundColor: isAudioPlaying ? 'rgb(255, 255, 255)' : 'hsl(var(--primary) / 0.3)',
                            }}
                          />
                        ));
                      })()}
                    </div>
                  </div>

          {/* Transcript */}
          <div className="mb-6">
            <Transcript entries={transcript} />
          </div>

          <Button onClick={endCall} variant="destructive" className="w-full">
            End Call
          </Button>
        </div>
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
