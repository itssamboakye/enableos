"use client";

import { useState, useEffect, useRef } from "react";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { TranscriptEntry } from "./Transcript";
import VideoPreview from "./VideoPreview";
import { useSidebar } from "./SidebarContext";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

/** Space reserved above the fixed bottom dock so scrollable content stays visible */
const SESSION_DOCK_PADDING = "pb-[7.5rem]";

export interface PracticeSessionViewProps {
  transcript: TranscriptEntry[];
  isRecording: boolean;
  isProcessing?: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onEndCall?: () => void;
  onSendMessage?: (text: string) => void;
  onToggleCamera?: (enabled: boolean) => void;
  sessionStartTime?: number;
  scenarioTitle?: string;
  scenarioObjective?: string;
  chatSocket?: any; // WebSocket connection for sending text messages
}

export default function PracticeSessionView({
  transcript,
  isRecording,
  isProcessing = false,
  onStartRecording,
  onStopRecording,
  onEndCall,
  onSendMessage,
  onToggleCamera,
}: PracticeSessionViewProps) {
  const { collapseSidebar, expandSidebar } = useSidebar();
  const { data: session } = useSession();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const transcriptScrollRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);

  const getUserInitials = () => {
    const user = session?.user;
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return "U";
  };

  const handleCameraToggle = (enabled: boolean) => {
    setCameraEnabled(enabled);
    if (enabled) {
      collapseSidebar();
    } else {
      expandSidebar();
    }
    onToggleCamera?.(enabled);
  };

  const chatMessages: ChatMessageProps[] = transcript.map((entry) => ({
    role: entry.role === "user" ? "user" : "assistant",
    content: entry.text,
    timestamp: entry.timestamp,
    emotions: entry.emotions,
  }));

  useEffect(() => {
    if (transcriptScrollRef.current && !userScrolled) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcript, userScrolled]);

  const handleTranscriptScroll = () => {
    if (transcriptScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = transcriptScrollRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setUserScrolled(!isAtBottom);
    }
  };

  const formatEmotionName = (name: string): string => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const sessionDock = (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-30",
        "border-t border-border/60 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full px-4 py-3 sm:px-6",
          cameraEnabled ? "max-w-5xl" : "max-w-3xl"
        )}
      >
        <ChatComposer
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onEndCall={onEndCall}
          onSendMessage={onSendMessage}
          onToggleCamera={handleCameraToggle}
          cameraEnabled={cameraEnabled}
          isRecording={isRecording}
          isProcessing={isProcessing}
          placeholder="Type your response or click the microphone to speak..."
          isVideoMode={cameraEnabled}
          isDocked
        />
      </div>
    </div>
  );

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-background">
      {/* Main session area — scroll happens inside panels only */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {cameraEnabled ? (
          <>
            <div className="relative min-h-0 min-w-0 flex-[1] overflow-hidden bg-black sm:flex-[0.72]">
              <div className="absolute inset-0">
                <VideoPreview className="h-full w-full" />
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-background/90 via-background/40 to-transparent"
                aria-hidden
              />
            </div>

            <div className="flex min-h-0 min-w-[220px] max-w-[320px] flex-col border-l border-border/60 bg-secondary/5 sm:flex-[0.28] sm:max-w-none">
              <div className="shrink-0 border-b border-border/40 px-4 py-2.5">
                <h3 className="text-sm font-medium text-foreground">Transcript</h3>
              </div>
              <div
                ref={transcriptScrollRef}
                onScroll={handleTranscriptScroll}
                className={cn("flex-1 overflow-y-auto px-3 py-3 space-y-3", SESSION_DOCK_PADDING)}
              >
                {chatMessages.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    Your conversation will appear here
                  </p>
                ) : (
                  chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-2",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5 max-w-[90%]">
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 text-xs leading-relaxed break-words",
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {message.content}
                        </div>
                        {message.role === "user" &&
                          message.emotions &&
                          message.emotions.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {message.emotions.map((emotion, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                                >
                                  <span className="font-medium">
                                    {formatEmotionName(emotion.name)}
                                  </span>
                                  <span className="text-primary/70 ml-1">
                                    {(emotion.score * 100).toFixed(0)}%
                                  </span>
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                      {message.role === "user" && (
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-medium">
                          {getUserInitials()}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <ChatThread
            messages={chatMessages}
            className={cn("flex-1 min-h-0", SESSION_DOCK_PADDING)}
          />
        )}
      </div>

      {sessionDock}
    </div>
  );
}
