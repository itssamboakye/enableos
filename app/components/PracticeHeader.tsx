"use client";

import { Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PracticeHeaderProps {
  title: string;
  objective?: string;
  timeElapsed?: number; // in seconds
  className?: string;
}

export default function PracticeHeader({
  title,
  objective,
  timeElapsed,
  className,
}: PracticeHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="mx-auto max-w-3xl px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-medium text-foreground">{title}</h1>
            {objective && (
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{objective}</p>
              </div>
            )}
          </div>
          {timeElapsed !== undefined && (
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{formatTime(timeElapsed)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
