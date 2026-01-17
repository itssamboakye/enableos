"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EVIChatInterface from "../components/EVIChatInterface";

export default function DiscoveryPracticePage() {
  const router = useRouter();

  const handleCallEnd = () => {
    // After feedback is shown and user clicks "Done", refresh the page to reset
    // This will show the practice page in a fresh state, ready for a new session
    router.refresh();
    
    // Alternative: Could navigate to a dedicated report/summary page like:
    // router.push(`/discovery-practice/report/${sessionId}`);
  };

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-medium mb-2 text-foreground">
        Discovery Practice
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        Practice your discovery conversations in a safe, private environment.
      </p>

      <EVIChatInterface onCallEnd={handleCallEnd} />
    </div>
  );
}
