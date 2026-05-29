"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { SidebarProvider } from "./SidebarContext";
import { cn } from "@/lib/utils";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isPracticeSession = pathname === "/discovery-practice";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-background">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider>
      <div
        className={cn(
          "flex overflow-hidden",
          isPracticeSession
            ? "h-[100dvh] max-h-[100dvh]"
            : "min-h-[100svh]"
        )}
      >
        {/* Left Navigation Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <TopHeader />
          <main
            className={cn(
              "flex min-h-0 flex-1 flex-col bg-background",
              isPracticeSession ? "overflow-hidden" : "overflow-y-auto"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

