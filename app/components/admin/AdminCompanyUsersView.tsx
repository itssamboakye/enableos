"use client";

import React, { useState, useEffect } from "react";
import { Building, Users, Mail, Calendar, MessageSquare, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface CompanyUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  totalSessions: number;
  lastSessionDate: string | null;
}

interface Props {
  companyId: string;
}

export default function AdminCompanyUsersView({ companyId }: Props) {
  const [company, setCompany] = useState<{ id: string; name: string } | null>(null);
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/companies/${companyId}/users`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setCompany(data.company || null);
        setUsers(data.users || []);
      })
      .catch(() => {
        setCompany(null);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, [companyId]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <Link href="/admin/companies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Companies
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground mb-2">
            {company ? (
              <>
                <Building className="h-8 w-8 inline-block mr-2 align-middle text-muted-foreground" />
                {company.name}
              </>
            ) : (
              "Company users"
            )}
          </h1>
          <p className="text-muted-foreground">
            {company ? `Users and managers in this company (${users.length})` : "Loading…"}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading users…</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No users in this company yet. Invite managers or have managers invite reps.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Sessions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last session</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-accent/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{u.name || "—"}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {u.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm capitalize ${u.role === "manager" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          {u.totalSessions}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {u.lastSessionDate
                          ? formatDistanceToNow(new Date(u.lastSessionDate), { addSuffix: true })
                          : "Never"}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
