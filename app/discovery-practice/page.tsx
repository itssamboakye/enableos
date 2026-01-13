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
    <div
      style={{
        minHeight: "100vh",
        padding: "var(--spacing-8)",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: 500,
          marginBottom: "var(--spacing-2)",
          color: "var(--color-text-primary)",
        }}
      >
        Discovery Practice
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "var(--color-text-secondary)",
          marginBottom: "var(--spacing-8)",
        }}
      >
        Practice your discovery conversations in a safe, private environment.
      </p>

      {sessionState === "idle" && (
        <div
          style={{
            backgroundColor: "var(--color-surface-default)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-8)",
            marginBottom: "var(--spacing-8)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 500,
              marginBottom: "var(--spacing-4)",
              color: "var(--color-text-primary)",
            }}
          >
            Scenario
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--color-text-secondary)",
              lineHeight: "24px",
              marginBottom: "var(--spacing-6)",
            }}
          >
            You&apos;re meeting with a prospect who has expressed interest in
            improving their sales team&apos;s performance. Your goal is to
            uncover their pain points, understand the impact, and identify
            urgency.
          </p>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 500,
              marginBottom: "var(--spacing-3)",
              color: "var(--color-text-primary)",
            }}
          >
            Discovery Objectives
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginBottom: "var(--spacing-6)",
            }}
          >
            <li
              style={{
                padding: "var(--spacing-2) 0",
                color: "var(--color-text-secondary)",
                fontSize: "15px",
              }}
            >
              • Uncover pain points
            </li>
            <li
              style={{
                padding: "var(--spacing-2) 0",
                color: "var(--color-text-secondary)",
                fontSize: "15px",
              }}
            >
              • Understand impact
            </li>
            <li
              style={{
                padding: "var(--spacing-2) 0",
                color: "var(--color-text-secondary)",
                fontSize: "15px",
              }}
            >
              • Identify urgency
            </li>
          </ul>
          <button
            onClick={handleSessionStart}
            style={{
              padding: "var(--spacing-3) var(--spacing-5)",
              backgroundColor: "var(--color-accent-primary)",
              color: "#ffffff",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
              width: "100%",
            }}
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
            style={{
              padding: "var(--spacing-3) var(--spacing-5)",
              backgroundColor: "var(--color-surface-default)",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-md)",
              fontSize: "15px",
              fontWeight: 400,
              cursor: "pointer",
              width: "100%",
              marginTop: "var(--spacing-6)",
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
