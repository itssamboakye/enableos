"use client";

import { useState } from "react";
import RecordingInterface from "../components/RecordingInterface";
import FeedbackDisplay from "../components/FeedbackDisplay";

type SessionState = "idle" | "recording" | "processing" | "complete";

export default function DiscoveryPracticePage() {
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [feedback, setFeedback] = useState<string[] | null>(null);

  const handleSessionStart = () => {
    setSessionState("recording");
    setFeedback(null);
  };

  const handleSessionComplete = () => {
    setSessionState("processing");
    // Simulate processing delay
    setTimeout(() => {
      setFeedback([
        "Covered pain and impact areas well",
        "Asked several open-ended questions",
        "Could explore urgency in more depth",
      ]);
      setSessionState("complete");
    }, 2000);
  };

  const handleRetry = () => {
    setSessionState("idle");
    setFeedback(null);
  };

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-medium mb-2 text-foreground">
        Discovery Practice
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        Practice your discovery conversations in a safe, private environment.
      </p>

      {sessionState === "idle" && (
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-xl font-medium mb-4 text-foreground">
            Scenario
          </h2>
          <p className="text-sm text-muted-foreground leading-6 mb-6">
            You&apos;re meeting with a prospect who has expressed interest in
            improving their sales team&apos;s performance. Your goal is to
            uncover their pain points, understand the impact, and identify
            urgency.
          </p>
          <h3 className="text-base font-medium mb-3 text-foreground">
            Discovery Objectives
          </h3>
          <ul className="list-none p-0 mb-6">
            <li className="py-2 text-muted-foreground text-sm">
              • Uncover pain points
            </li>
            <li className="py-2 text-muted-foreground text-sm">
              • Understand impact
            </li>
            <li className="py-2 text-muted-foreground text-sm">
              • Identify urgency
            </li>
          </ul>
          <button
            onClick={handleSessionStart}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Start Practice Session
          </button>
        </div>
      )}

      {(sessionState === "recording" || sessionState === "processing") && (
        <RecordingInterface
          state={sessionState}
          onComplete={handleSessionComplete}
        />
      )}

      {sessionState === "complete" && feedback && (
        <div>
          <FeedbackDisplay feedback={feedback} />
          <button
            onClick={handleRetry}
            className="w-full mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 border border-border"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
