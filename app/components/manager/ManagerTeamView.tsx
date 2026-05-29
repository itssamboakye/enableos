"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Users, Search, Mail, Building, Briefcase, Calendar, MessageSquare, ChevronLeft, ChevronRight, UserPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ManagerPageHeader from "@/components/manager/ManagerPageHeader";
import { formatDistanceToNow } from "date-fns";

interface TeamUser {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  title: string | null;
  createdAt: string;
  totalSessions: number;
  lastSessionDate: string | null;
  averageClarity: number | null;
  averageCuriosity: number | null;
  averageListening: number | null;
  averageFlowControl: number | null;
  averageConfidence: number | null;
}

export default function ManagerTeamView() {
  const [users, setUsers] = useState<TeamUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteSubmitting, setInviteSubmitting] = useState(false);
  const [inviteResult, setInviteResult] = useState<{ invited: number; failed: { email: string; reason: string }[] } | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchTeam = () => {
    setLoading(true);
    fetch("/api/manager/team")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleInviteSubmit = async () => {
    const emails = inviteEmails
      .split(/[\n,]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (emails.length === 0) return;
    setInviteSubmitting(true);
    setInviteResult(null);
    try {
      const res = await fetch("/api/manager/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send invites");
      setInviteResult({ invited: data.invited ?? 0, failed: data.failed ?? [] });
      fetchTeam();
      if (data.failed?.length === 0) {
        setInviteEmails("");
        setTimeout(() => {
          setInviteOpen(false);
          setInviteResult(null);
        }, 2000);
      }
    } catch (e) {
      setInviteResult({
        invited: 0,
        failed: [{ email: "", reason: e instanceof Error ? e.message : "Request failed" }],
      });
    } finally {
      setInviteSubmitting(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter((user) => {
      return (
        user.email.toLowerCase().includes(query) ||
        (user.name || "").toLowerCase().includes(query) ||
        (user.company || "").toLowerCase().includes(query) ||
        (user.title || "").toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const formatScore = (score: number | null) => {
    if (score === null) return "—";
    return Math.round(score).toString();
  };

  const handleRemoveUser = async (user: TeamUser) => {
    const confirmed = window.confirm(
      `Remove ${user.email} from your team? This won't delete their account, but they will no longer appear in your team list.`
    );
    if (!confirmed) return;

    setRemovingId(user.id);
    try {
      const res = await fetch(`/api/manager/team/${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to remove user from team");
      }
      fetchTeam();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to remove user from team");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <ManagerPageHeader
          title="Team members"
          description={`Overview of your reps and their practice activity (${filteredUsers.length} of ${users.length} total).`}
          actions={
            <Button
              size="sm"
              onClick={() => {
                setInviteOpen(true);
                setInviteResult(null);
                setInviteEmails("");
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite team members
            </Button>
          }
        />

        {inviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !inviteSubmitting && setInviteOpen(false)}>
            <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Invite team members</h2>
                  <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => !inviteSubmitting && setInviteOpen(false)} aria-label="Close">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter email addresses (one per line or comma-separated). They will receive an invite to sign in and join your team.
                </p>
                <textarea
                  className="w-full min-h-[120px] px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm resize-y mb-4"
                  placeholder="colleague@company.com&#10;other@company.com"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  disabled={inviteSubmitting}
                />
                {inviteResult && (
                  <div className={`mb-4 text-sm ${inviteResult.failed.length > 0 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}`}>
                    {inviteResult.invited > 0 && <p>Invites sent: {inviteResult.invited}</p>}
                    {inviteResult.failed.length > 0 && (
                      <p>
                        Failed: {inviteResult.failed.map((f) => f.email ? `${f.email} (${f.reason})` : f.reason).join("; ")}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => !inviteSubmitting && setInviteOpen(false)} disabled={inviteSubmitting}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteSubmit} disabled={inviteSubmitting || !inviteEmails.trim()}>
                    {inviteSubmitting ? "Sending…" : "Send invites"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Page Size */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, email, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="w-20"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Select>
            </div>
          </div>

        {/* Users Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">
              Loading team members...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-muted/50 border-b border-border">
                  <tr className="align-middle">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[28%]">
                      Rep
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[12%]">
                      Sessions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[18%]">
                      Last Session
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Avg Scores
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[14%]">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-[14%]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        No team members found
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-accent/5 transition-colors align-middle"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {user.name || "No name"}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </p>
                              {(user.company || user.title) && (
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                  {user.company && (
                                    <span className="flex items-center gap-1">
                                      <Building className="h-3 w-3" />
                                      {user.company}
                                    </span>
                                  )}
                                  {user.title && (
                                    <span className="flex items-center gap-1">
                                      <Briefcase className="h-3 w-3" />
                                      {user.title}
                                    </span>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {user.totalSessions}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {user.lastSessionDate ? (
                            <span className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(user.lastSessionDate), {
                                addSuffix: true,
                              })}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">Never</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs text-muted-foreground leading-relaxed space-y-0.5">
                            <div>
                              Clarity: {formatScore(user.averageClarity)} · Curiosity: {formatScore(user.averageCuriosity)} · Listening: {formatScore(user.averageListening)}
                            </div>
                            <div>
                              Flow: {formatScore(user.averageFlowControl)} · Confidence: {formatScore(user.averageConfidence)}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(user.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-3"
                            onClick={() => handleRemoveUser(user)}
                            disabled={removingId === user.id}
                          >
                            {removingId === user.id ? "Removing..." : "Remove"}
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} team members
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    );
                  })
                  .map((page, index, array) => {
                    const showEllipsisBefore = index > 0 && array[index] - array[index - 1] > 1;
                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="min-w-[40px]"
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    );
                  })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

