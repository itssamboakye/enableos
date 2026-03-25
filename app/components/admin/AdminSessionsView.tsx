"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Transcript, { TranscriptEntry } from "@/components/Transcript";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, User as UserIcon, Clock, Search } from "lucide-react";

interface AdminSessionSummary {
  id: string;
  userId: string;
  userEmail: string;
  userName: string | null;
  createdAt: string;
  duration: number | null;
  callType: string | null;
  buyerContext: string | null;
  buyerRole: string | null;
}

interface AdminSessionDetail extends AdminSessionSummary {
  transcript: TranscriptEntry[];
  feedback: any;
  scores: any;
}

export default function AdminSessionsView() {
  const [sessions, setSessions] = useState<AdminSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessionDetail, setSessionDetail] = useState<AdminSessionDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/sessions")
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions) {
          setSessions(data.sessions);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedSessionId) {
      setSessionDetail(null);
      return;
    }

    setDetailLoading(true);
    fetch(`/api/admin/sessions/${selectedSessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSessionDetail(data);
        }
        setDetailLoading(false);
      })
      .catch(() => setDetailLoading(false));
  }, [selectedSessionId]);

  const filteredSessions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return sessions;

    return sessions.filter((session) => {
      return (
        session.userEmail.toLowerCase().includes(query) ||
        (session.userName || "").toLowerCase().includes(query) ||
        (session.callType || "").toLowerCase().includes(query) ||
        (session.buyerContext || "").toLowerCase().includes(query) ||
        (session.buyerRole || "").toLowerCase().includes(query)
      );
    });
  }, [sessions, searchQuery]);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium text-foreground mb-1">
              Session Transcripts
            </h1>
            <p className="text-sm text-muted-foreground">
              Review transcripts from practice sessions across all users.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 min-h-[calc(100dvh-8rem)]">
          {/* Sessions list */}
          <div className="rounded-lg border border-border bg-card flex flex-col min-h-[400px] min-h-0">
            <div className="border-b border-border px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, email, role, context..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-sm text-muted-foreground">
                  Loading sessions...
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground text-center">
                  No sessions found.
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {filteredSessions.map((session) => (
                    <li key={session.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedSessionId(session.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-accent/40 transition-colors ${
                          selectedSessionId === session.id ? "bg-accent/20" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <UserIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">
                                {session.userName || session.userEmail}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {session.callType || "Discovery Practice"}
                              {session.buyerRole && ` · Role: ${session.buyerRole}`}
                            </p>
                            {session.buyerContext && (
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                Context: {session.buyerContext}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(session.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDuration(session.duration)}
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Transcript viewer */}
          <div className="rounded-lg border border-border bg-card p-4 flex flex-col min-h-[400px] min-h-0">
            {!selectedSessionId ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-3">
                <MessageSquare className="h-8 w-8" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Select a session to view its transcript
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Choose a session from the list on the left to see the full conversation.
                  </p>
                </div>
              </div>
            ) : detailLoading || !sessionDetail ? (
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
                Loading transcript...
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {sessionDetail.userName || sessionDetail.userEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {sessionDetail.callType || "Discovery Practice"}
                      {sessionDetail.buyerRole && ` · Role: ${sessionDetail.buyerRole}`}
                    </p>
                    {sessionDetail.buyerContext && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Context: {sessionDetail.buyerContext}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(sessionDetail.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDuration(sessionDetail.duration)}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-h-0">
                  <Transcript
                    entries={sessionDetail.transcript || []}
                    className="h-full"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

