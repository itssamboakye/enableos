"use client";

import EVIChatInterface from "../components/EVIChatInterface";

export default function DiscoveryPracticePage() {
  const handleCallEnd = () => {
    // Call has ended, component will reset to idle state
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
