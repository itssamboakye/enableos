"use client";

import { useRouter } from "next/navigation";
import EVIChatInterface from "../components/EVIChatInterface";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

export default function DiscoveryPracticePage() {
  const router = useRouter();

  const handleCallEnd = () => {
    // After feedback is shown and user clicks "Done", refresh the page to reset
    router.refresh();
  };

  return (
    <AuthenticatedLayout>
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        <EVIChatInterface onCallEnd={handleCallEnd} />
      </div>
    </AuthenticatedLayout>
  );
}
