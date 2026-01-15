"use client";

import { Collapsible } from "@/components/ui/collapsible";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

export interface TranscriptEntry {
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  emotions?: Array<{ name: string; score: number }>; // Top emotions for user messages
}

interface TranscriptProps {
  entries: TranscriptEntry[];
  className?: string;
}

// Helper function to format emotion names (convert camelCase to Title Case)
function formatEmotionName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export default function Transcript({ entries, className }: TranscriptProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <Collapsible
      defaultOpen={false}
      trigger={
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>Transcript ({entries.length} messages)</span>
        </div>
      }
      className={className}
    >
      <div ref={scrollContainerRef} className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No transcript available yet.
          </p>
        ) : (
          entries.map((entry, index) => (
            <div
              key={index}
              className={entry.role === "user" ? "text-right" : "text-left"}
            >
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  entry.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{entry.text}</p>
              </div>
              {entry.role === "user" && entry.emotions && entry.emotions.length > 0 && (
                <div className={`mt-1.5 ${entry.role === "user" ? "text-right" : "text-left"}`}>
                  <div className={`inline-flex flex-wrap gap-1.5 ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
                    {entry.emotions.map((emotion, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                        title={`${formatEmotionName(emotion.name)}: ${(emotion.score * 100).toFixed(1)}% confidence`}
                      >
                        <span className="font-medium">{formatEmotionName(emotion.name)}</span>
                        <span className="text-primary/60 ml-1.5">{(emotion.score * 100).toFixed(0)}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Collapsible>
  );
}
