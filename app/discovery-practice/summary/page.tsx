"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import FeedbackDisplay, { FeedbackData } from "@/components/FeedbackDisplay";
import { Button } from "@/components/ui/button";

function SummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for client-side hydration
    if (typeof window === "undefined") {
      return;
    }

    const sessionId = searchParams.get("session");
    console.log("[SUMMARY] Session ID from URL:", sessionId);
    
    if (sessionId) {
      const storageKey = `feedback-${sessionId}`;
      const storedData = sessionStorage.getItem(storageKey);
      console.log("[SUMMARY] Stored data found:", !!storedData);
      
      if (storedData) {
        try {
          const data = JSON.parse(storedData);
          console.log("[SUMMARY] Parsed data:", data);
          
          if (data.feedback) {
            setFeedback(data.feedback);
            // Don't remove immediately - wait a bit in case of navigation issues
            setTimeout(() => {
              sessionStorage.removeItem(storageKey);
            }, 1000);
          } else {
            console.error("[SUMMARY] No feedback in stored data:", data);
            setError("Feedback data structure is invalid");
          }
        } catch (err) {
          console.error("[SUMMARY] Error parsing feedback data:", err);
          setError("Failed to parse feedback data");
        }
      } else {
        console.warn("[SUMMARY] No stored data found for session:", sessionId);
        setError("No feedback data found for this session. It may have expired or been cleared.");
      }
    } else {
      console.warn("[SUMMARY] No session ID in URL");
      setError("No session ID provided");
    }
    
    setLoading(false);
  }, [searchParams]);

  const handleBackToPractice = () => {
    router.push("/discovery-practice");
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card p-12 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
          <p className="text-base text-muted-foreground">Loading summary...</p>
        </div>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-medium mb-4 text-card-foreground">
            No Summary Available
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            {error || "No feedback data found for this session."}
          </p>
          <Button onClick={handleBackToPractice}>Back to Practice</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 text-foreground">
          Session Summary
        </h1>
        <p className="text-base text-muted-foreground mb-6">
          Review your discovery practice session feedback.
        </p>
      </div>

      <div className="space-y-6">
        <FeedbackDisplay feedback={feedback} />
        
        <div className="flex gap-4">
          <Button onClick={handleBackToPractice} className="flex-1">
            Start New Practice Session
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-8 max-w-3xl mx-auto">
          <div className="rounded-lg border bg-card p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
            <p className="text-base text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <SummaryContent />
    </Suspense>
  );
}
