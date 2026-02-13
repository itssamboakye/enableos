"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import TopHeader from "./TopHeader";
import SessionsSidebar from "./SessionsSidebar";
import { ThemeToggle } from "./ThemeToggle";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sessionsSidebarOpen, setSessionsSidebarOpen] = useState(true);

  // Hide sessions sidebar on practice page
  const showSessionsSidebar = !pathname.startsWith("/discovery-practice");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sessions Sidebar (replaces old navigation sidebar) */}
      {showSessionsSidebar && (
        <SessionsSidebar 
          isOpen={sessionsSidebarOpen}
          onClose={() => setSessionsSidebarOpen(false)}
        />
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
