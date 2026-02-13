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
  sessionStartTime,
  scenarioTitle = "Discovery Practice",
  scenarioObjective = "Practice your discovery conversations in a safe, private environment. Focus on uncovering pain points, understanding impact, and identifying urgency.",
}: PracticeSessionViewProps) {
  const { collapseSidebar, expandSidebar } = useSidebar();
  const { data: session } = useSession();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const transcriptScrollRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);

  // Get user initials for transcript sidebar
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

  // Handle camera toggle
  const handleCameraToggle = (enabled: boolean) => {
    setCameraEnabled(enabled);
    if (enabled) {
      collapseSidebar();
    } else {
      expandSidebar();
    }
    onToggleCamera?.(enabled);
  };

  // Calculate elapsed time
  useEffect(() => {
    if (!sessionStartTime) return;

    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Convert transcript entries to chat messages
  const chatMessages: ChatMessageProps[] = transcript.map((entry) => ({
    role: entry.role === "user" ? "user" : "assistant",
    content: entry.text,
    timestamp: entry.timestamp,
    emotions: entry.emotions,
  }));

  // Auto-scroll transcript to bottom when new messages arrive (unless user scrolled up)
  useEffect(() => {
    if (transcriptScrollRef.current && !userScrolled) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcript, userScrolled]);

  // Detect user scroll
  const handleTranscriptScroll = () => {
    if (transcriptScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = transcriptScrollRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px threshold
      setUserScrolled(!isAtBottom);
    }
  };

  // Helper function to format emotion names
  const formatEmotionName = (name: string): string => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // If camera is enabled, show video-focused layout
  if (cameraEnabled) {
    return (
      <div className="flex h-full bg-background relative">
        {/* Video takes ~80% of screen */}
        <div className="flex-[0.80] flex flex-col bg-background relative">
          <VideoPreview className="w-full h-full object-cover" />

          {/* Sticky Composer - Rounded, within video width */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="mx-auto max-w-4xl">
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
                isVideoMode={true}
              />
            </div>
          </div>
        </div>

        {/* Transcript sidebar on the right - ~20% width */}
        <div className="flex-[0.20] bg-secondary/5 flex flex-col min-w-[240px]">
          <div className="px-4 py-3">
            <h3 className="text-sm font-medium text-foreground">Transcript</h3>
          </div>
          <div
            ref={transcriptScrollRef}
            onScroll={handleTranscriptScroll}
            className="flex-1 overflow-y-auto px-3 py-2 space-y-3"
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
                  <div className="flex flex-col gap-1.5 max-w-[85%]">
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 text-xs leading-relaxed",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {message.content}
                    </div>
                    {/* Emotions with percentages - only for user messages */}
                    {message.role === "user" && message.emotions && message.emotions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {message.emotions.map((emotion, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            <span className="font-medium">{formatEmotionName(emotion.name)}</span>
                            <span className="text-primary/70 ml-1">{(emotion.score * 100).toFixed(0)}%</span>
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
      </div>
    );
  }

  // Normal chat layout when camera is disabled
  return (
    <div className="flex h-full flex-col bg-background relative">
      {/* Chat Thread */}
      <ChatThread messages={chatMessages} />

      {/* Sticky Composer */}
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
      />
    </div>
  );
}
