"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import Transcript, { TranscriptEntry } from "@/components/Transcript";
import FeedbackDisplay, { FeedbackData } from "@/components/FeedbackDisplay";
import { Collapsible } from "@/components/ui/collapsible";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, User as UserIcon, Clock, Search } from "lucide-react";

function normalizeFeedback(raw: any): FeedbackData | null {
  if (!raw || !Array.isArray(raw.summary) || !raw.scorecard || typeof raw.drill !== "string") {
    return null;
  }
  const sc = raw.scorecard;
  return {
    summary: raw.summary,
    scorecard: {
      clarity: sc.clarity ?? 0,
      curiosity: sc.curiosity ?? 0,
      listening: sc.listening ?? 0,
      flow: sc.flow ?? sc.flowControl ?? 0,
      confidence: sc.confidence ?? 0,
      nextSteps: sc.nextSteps ?? sc.nextStep ?? 0,
    },
    strengths: Array.isArray(raw.strengths) ? raw.strengths : [],
    improvements: Array.isArray(raw.improvements) ? raw.improvements : [],
    drill: raw.drill,
    insufficientData: Boolean(raw.insufficientData),
  };
}

interface ManagerSessionSummary {
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

interface ManagerSessionDetail extends ManagerSessionSummary {
  transcript: TranscriptEntry[];
  feedback: any;
  scores: any;
  managerNote?: string | null;
  managerLabel?: string | null;
}

export default function ManagerSessionsView() {
  const [sessions, setSessions] = useState<ManagerSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessionDetail, setSessionDetail] = useState<ManagerSessionDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [note, setNote] = useState("");
  const [label, setLabel] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/manager/sessions")
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
    fetch(`/api/manager/sessions/${selectedSessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSessionDetail(data);
          setNote(data.managerNote || "");
          setLabel(data.managerLabel || "");
        } else {
          setSessionDetail(null);
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
              Team Session Transcripts
            </h1>
            <p className="text-sm text-muted-foreground">
              Review transcripts from practice sessions across your team.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
          {/* Sessions list */}
          <div className="rounded-lg border border-border bg-card flex flex-col min-h-[400px] max-h-[calc(100dvh-12rem)]">
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
          <div className="rounded-lg border border-border bg-card p-4 flex flex-col min-h-[400px] max-h-[calc(100dvh-12rem)] overflow-y-auto gap-4">
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

                <div className="flex-1 min-h-0 flex flex-col gap-4">
                  {sessionDetail.scores && (
                    <Collapsible
                      defaultOpen
                      trigger={
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-medium text-foreground">
                            Session Scores
                          </span>
                        </div>
                      }
                    >
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Clarity</span>
                          <span className="font-medium text-foreground">
                            {sessionDetail.scores.clarity ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Curiosity</span>
                          <span className="font-medium text-foreground">
                            {sessionDetail.scores.curiosity ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Listening</span>
                          <span className="font-medium text-foreground">
                            {sessionDetail.scores.listening ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Flow Control</span>
                          <span className="font-medium text-foreground">
                            {sessionDetail.scores.flowControl ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Confidence</span>
                          <span className="font-medium text-foreground">
                            {sessionDetail.scores.confidence ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Next Step</span>
                          <span className="font-medium text-foreground">
                            {sessionDetail.scores.nextStep ?? "—"}
                          </span>
                        </div>
                      </div>
                    </Collapsible>
                  )}

                  {(() => {
                    const feedback = normalizeFeedback(sessionDetail.feedback);
                    if (!feedback) return null;
                    return (
                      <Collapsible
                        defaultOpen
                        trigger={
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm font-medium text-foreground">
                              Session Summary
                            </span>
                          </div>
                        }
                      >
                        <FeedbackDisplay feedback={feedback} />
                      </Collapsible>
                    );
                  })()}

                  <Collapsible
                    defaultOpen={false}
                    trigger={
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium text-foreground">
                          Transcript
                        </span>
                      </div>
                    }
                  >
                    <Transcript
                      entries={sessionDetail.transcript || []}
                      className="w-full"
                    />
                  </Collapsible>

                  <div className="border border-border rounded-lg p-3 bg-card/80 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-medium text-foreground">
                        Manager Notes
                      </h3>
                      <select
                        className="text-xs border border-border rounded-md bg-background text-foreground pl-3 pr-9 py-1.5 min-w-[140px] appearance-none bg-no-repeat bg-[length:14px_14px] bg-[right_0.75rem_center] [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                      >
                        <option value="">No label</option>
                        <option value="needs_follow_up">Needs follow-up</option>
                        <option value="great_example">Great example</option>
                        <option value="coaching_given">Coaching given</option>
                      </select>
                    </div>
                    <textarea
                      className="w-full min-h-[80px] text-sm rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Add private coaching notes for this session (only you can see this)."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        disabled={saving}
                        onClick={async () => {
                          if (!selectedSessionId) return;
                          setSaving(true);
                          try {
                            await fetch(`/api/manager/sessions/${selectedSessionId}/note`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                note: note.trim() === "" ? null : note,
                                label: label || null,
                              }),
                            });
                          } finally {
                            setSaving(false);
                          }
                        }}
                      >
                        {saving ? "Saving..." : "Save note"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

