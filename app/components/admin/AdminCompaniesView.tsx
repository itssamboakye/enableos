"use client";

import React, { useState, useEffect } from "react";
import { Building, Users, Calendar, ChevronLeft, UserPlus, Plus, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format, isPast } from "date-fns";

interface CompanyRow {
  id: string;
  name: string;
  trialEndsAt: string | null;
  createdAt: string;
  memberCount: number;
}

export default function AdminCompaniesView() {
  const [companies, setCompanies] = useState<CompanyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);
  const [addCompanyOpen, setAddCompanyOpen] = useState(false);
  const [addCompanyName, setAddCompanyName] = useState("");
  const [addCompanyTrialDays, setAddCompanyTrialDays] = useState(30);
  const [addCompanySubmitting, setAddCompanySubmitting] = useState(false);
  const [inviteManagersCompany, setInviteManagersCompany] = useState<{ id: string; name: string } | null>(null);
  const [inviteManagersEmails, setInviteManagersEmails] = useState("");
  const [inviteManagersSubmitting, setInviteManagersSubmitting] = useState(false);
  const [inviteManagersResult, setInviteManagersResult] = useState<{ invited: number; failed: { email: string; reason: string }[] } | null>(null);
  const [deleteCompany, setDeleteCompany] = useState<{ id: string; name: string; memberCount: number } | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const fetchCompanies = () => {
    setLoading(true);
    fetch("/api/admin/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.companies || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleTrialAction = async (companyId: string, action: "extend" | "end") => {
    setActingId(companyId);
    try {
      const res = await fetch(`/api/admin/companies/${companyId}/trial`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      fetchCompanies();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Request failed");
    } finally {
      setActingId(null);
    }
  };

  const handleAddCompany = async () => {
    const name = addCompanyName.trim();
    if (!name) return;
    setAddCompanySubmitting(true);
    try {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, trialDays: addCompanyTrialDays }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create company");
      setAddCompanyOpen(false);
      setAddCompanyName("");
      setAddCompanyTrialDays(30);
      fetchCompanies();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to create company");
    } finally {
      setAddCompanySubmitting(false);
    }
  };

  const handleInviteManagersSubmit = async () => {
    if (!inviteManagersCompany) return;
    const emails = inviteManagersEmails
      .split(/[\n,]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (emails.length === 0) return;
    setInviteManagersSubmitting(true);
    setInviteManagersResult(null);
    try {
      const res = await fetch(`/api/admin/companies/${inviteManagersCompany.id}/invite-managers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send invites");
      setInviteManagersResult({ invited: data.invited ?? 0, failed: data.failed ?? [] });
      fetchCompanies();
      if (data.failed?.length === 0) {
        setInviteManagersEmails("");
        setTimeout(() => {
          setInviteManagersCompany(null);
          setInviteManagersResult(null);
        }, 2000);
      }
    } catch (e) {
      setInviteManagersResult({
        invited: 0,
        failed: [{ email: "", reason: e instanceof Error ? e.message : "Request failed" }],
      });
    } finally {
      setInviteManagersSubmitting(false);
    }
  };

  const handleDeleteCompany = async () => {
    if (!deleteCompany) return;
    setDeleteSubmitting(true);
    try {
      const res = await fetch(`/api/admin/companies/${deleteCompany.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete company");
      setDeleteCompany(null);
      fetchCompanies();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete company");
    } finally {
      setDeleteSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Admin
          </Link>
        </div>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-medium text-foreground mb-2">
              Companies & Trials
            </h1>
            <p className="text-muted-foreground">
              View companies, add new ones, invite managers, and manage trials.
            </p>
          </div>
          <Button onClick={() => { setAddCompanyOpen(true); setAddCompanyName(""); setAddCompanyTrialDays(30); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add company
          </Button>
        </div>

        {/* Add company modal */}
        {addCompanyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !addCompanySubmitting && setAddCompanyOpen(false)}>
            <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">Add company</h2>
                <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => !addCompanySubmitting && setAddCompanyOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <label className="block text-sm font-medium text-foreground mb-1">Company name</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm mb-4"
                placeholder="Acme Inc"
                value={addCompanyName}
                onChange={(e) => setAddCompanyName(e.target.value)}
                disabled={addCompanySubmitting}
              />
              <label className="block text-sm font-medium text-foreground mb-1">Trial length (days)</label>
              <input
                type="number"
                min={1}
                max={365}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm mb-4"
                value={addCompanyTrialDays}
                onChange={(e) => setAddCompanyTrialDays(Number(e.target.value) || 30)}
                disabled={addCompanySubmitting}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => !addCompanySubmitting && setAddCompanyOpen(false)} disabled={addCompanySubmitting}>Cancel</Button>
                <Button onClick={handleAddCompany} disabled={addCompanySubmitting || !addCompanyName.trim()}>
                  {addCompanySubmitting ? "Creating…" : "Create company"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Invite managers modal */}
        {inviteManagersCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !inviteManagersSubmitting && setInviteManagersCompany(null)}>
            <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">Invite managers</h2>
                <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => !inviteManagersSubmitting && setInviteManagersCompany(null)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Invite people to manage <strong>{inviteManagersCompany.name}</strong>. Enter email addresses (one per line or comma-separated).
              </p>
              <textarea
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm resize-y mb-4"
                placeholder="manager@company.com"
                value={inviteManagersEmails}
                onChange={(e) => setInviteManagersEmails(e.target.value)}
                disabled={inviteManagersSubmitting}
              />
              {inviteManagersResult && (
                <div className={`mb-4 text-sm ${inviteManagersResult.failed.length > 0 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}`}>
                  {inviteManagersResult.invited > 0 && <p>Invites sent: {inviteManagersResult.invited}</p>}
                  {inviteManagersResult.failed.length > 0 && (
                    <p>Failed: {inviteManagersResult.failed.map((f) => f.email ? `${f.email} (${f.reason})` : f.reason).join("; ")}</p>
                  )}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => !inviteManagersSubmitting && setInviteManagersCompany(null)} disabled={inviteManagersSubmitting}>Cancel</Button>
                <Button onClick={handleInviteManagersSubmit} disabled={inviteManagersSubmitting || !inviteManagersEmails.trim()}>
                  {inviteManagersSubmitting ? "Sending…" : "Send invites"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete company confirmation */}
        {deleteCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !deleteSubmitting && setDeleteCompany(null)}>
            <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">Delete company</h2>
                <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => !deleteSubmitting && setDeleteCompany(null)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Permanently delete <strong>{deleteCompany.name}</strong>? This will also delete all {deleteCompany.memberCount} user{deleteCompany.memberCount !== 1 ? "s" : ""} in this company, including their sessions and data. This cannot be undone.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => !deleteSubmitting && setDeleteCompany(null)} disabled={deleteSubmitting}>Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteCompany} disabled={deleteSubmitting}>
                  {deleteSubmitting ? "Deleting…" : "Delete company"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">
              Loading companies...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Trial ends
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        No companies found
                      </td>
                    </tr>
                  ) : (
                    companies.map((c) => {
                      const trialPast = c.trialEndsAt ? isPast(new Date(c.trialEndsAt)) : false;
                      const busy = actingId === c.id;
                      return (
                        <tr key={c.id} className="hover:bg-accent/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <Link href={`/admin/companies/${c.id}/users`} className="font-medium text-foreground hover:text-primary hover:underline">
                                {c.name}
                              </Link>
                              <span className="text-xs text-muted-foreground">({c.id})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Link href={`/admin/companies/${c.id}/users`} className="flex items-center gap-1 text-sm text-foreground hover:text-primary hover:underline">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {c.memberCount}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            {c.trialEndsAt ? (
                              <span className={`text-sm ${trialPast ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
                                <Calendar className="h-4 w-4 inline mr-1" />
                                {format(new Date(c.trialEndsAt), "MMM d, yyyy")}
                                {trialPast && " (ended)"}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {format(new Date(c.createdAt), "MMM d, yyyy")}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex flex-wrap items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => { setInviteManagersCompany({ id: c.id, name: c.name }); setInviteManagersEmails(""); setInviteManagersResult(null); }}
                              >
                                <UserPlus className="h-4 w-4 mr-1" />
                                Invite managers
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTrialAction(c.id, "extend")}
                                disabled={busy}
                              >
                                {busy ? "…" : "Extend 30 days"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTrialAction(c.id, "end")}
                                disabled={busy}
                              >
                                End trial
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => setDeleteCompany({ id: c.id, name: c.name, memberCount: c.memberCount })}
                                disabled={busy}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
