"use client";

import { useEffect, useRef } from "react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { cn } from "@/lib/utils";

export interface ChatThreadProps {
  messages: ChatMessageProps[];
  className?: string;
}

export default function ChatThread({ messages, className }: ChatThreadProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        "flex-1 overflow-y-auto",
        className
      )}
    >
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Your conversation will appear here
            </p>
            <p className="text-xs text-muted-foreground">
              Start by clicking the microphone or typing a message
            </p>
          </div>
        </div>
      ) : (
        <div className="py-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              emotions={message.emotions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
