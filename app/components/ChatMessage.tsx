"use client";

import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

export interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  emotions?: Array<{ name: string; score: number }>;
  className?: string;
}

function formatEmotionName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export default function ChatMessage({
  role,
  content,
  timestamp,
  emotions,
  className,
}: ChatMessageProps) {
  const { data: session } = useSession();
  const isUser = role === "user";
  const isSystem = role === "system";
  
  // Get user initials
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

  if (isSystem) {
    return (
      <div className={cn("flex justify-center py-4", className)}>
        <div className="rounded-lg bg-muted/50 px-4 py-2">
          <p className="text-sm text-muted-foreground text-center">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-3 px-6 py-4 transition-colors duration-300 hover:bg-accent/20",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      {!isUser && (
        <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
          <User className="h-4 w-4 relative z-10" />
        </div>
      )}

      <div className={cn("flex flex-col gap-2", isUser ? "items-end max-w-[80%]" : "items-start max-w-[80%]")}>
        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            "transition-colors duration-300",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
        </div>

        {/* Emotions (only for user messages) */}
        {isUser && emotions && emotions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {emotions.map((emotion, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                title={`${formatEmotionName(emotion.name)}: ${(emotion.score * 100).toFixed(1)}% confidence`}
              >
                <span className="font-medium">{formatEmotionName(emotion.name)}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium">
          <span>{getUserInitials()}</span>
        </div>
      )}
    </div>
  );
}
