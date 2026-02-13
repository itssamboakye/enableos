"use client";

import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Session {
  id: string;
  createdAt: string;
  duration: number | null;
  callType: string | null;
  buyerContext: string | null;
  buyerRole: string | null;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sessions")
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions) {
          setSessions(data.sessions);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-base text-muted-foreground mb-8">
            Review your past discovery practice sessions.
          </p>

          {loading ? (
            <div className="text-muted-foreground">Loading sessions...</div>
          ) : sessions.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't completed any practice sessions yet.
              </p>
              <Link href="/discovery-practice">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Start your first session
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/discovery-practice/summary?session=${session.id}`}
                  className="block rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {session.callType || "Discovery Practice"}
                        </span>
                        {session.duration && (
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(session.duration)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      {session.buyerRole && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Role: {session.buyerRole}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
