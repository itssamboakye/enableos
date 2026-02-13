"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { History, Clock, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Session {
  id: string;
  createdAt: string;
  duration: number | null;
  callType: string | null;
}

interface SessionsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SessionsSidebar({ isOpen = true, onClose }: SessionsSidebarProps) {
  const pathname = usePathname();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sessions?limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions) {
          setSessions(data.sessions);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffTime / (1000 * 60));
        return diffMins < 1 ? "Just now" : `${diffMins}m ago`;
      }
      return `${diffHours}h ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

  const groupSessionsByDate = (sessions: Session[]) => {
    const groups: { [key: string]: Session[] } = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sessions.forEach((session) => {
      const sessionDate = new Date(session.createdAt);
      sessionDate.setHours(0, 0, 0, 0);
      const diffTime = today.getTime() - sessionDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let groupKey: string;
      if (diffDays === 0) groupKey = "Today";
      else if (diffDays === 1) groupKey = "Yesterday";
      else if (diffDays < 7) groupKey = "Previous 7 days";
      else groupKey = "Older";

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(session);
    });

    return groups;
  };

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <div
      className={cn(
        "flex h-full w-80 flex-col border-l border-border bg-background transition-all duration-300 ease-in-out",
        !isOpen && "hidden"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-sm font-medium text-foreground">Sessions</h2>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-sm text-muted-foreground">Loading sessions...</div>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground mb-2">No sessions yet</p>
            <p className="text-xs text-muted-foreground">
              Start practicing to see your sessions here
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {Object.entries(groupedSessions).map(([groupKey, groupSessions]) => (
              <div key={groupKey}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  {groupKey}
                </h3>
                <div className="space-y-1">
                  {groupSessions.map((session) => {
                    const isActive = pathname === `/sessions/${session.id}`;
                    return (
                      <Link
                        key={session.id}
                        href={`/sessions/${session.id}`}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                          "hover:bg-accent/50 hover:text-accent-foreground",
                          isActive && "bg-accent text-accent-foreground"
                        )}
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate font-medium">
                              {session.callType || "Discovery Practice"}
                            </p>
                            {session.duration && (
                              <span className="flex-shrink-0 text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDuration(session.duration)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(session.createdAt)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
