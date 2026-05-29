"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Loader2,
  Minus,
  Search,
  Target,
} from "lucide-react";
import type { AnalyticsPeriod } from "@/lib/analytics";
import type { RepScoreboardRow } from "@/lib/analytics";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ManagerRepScoreboardProps {
  rows: RepScoreboardRow[];
  period: AnalyticsPeriod;
}

type SortKey = "name" | "readiness" | "sessions" | "delta" | "lastPractice";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

function skillLabel(key: string | null) {
  if (!key) return "—";
  return SKILL_DEFINITIONS.find((s) => s.key === key)?.label ?? key;
}

function DeltaBadge({ delta }: { delta: number | null }) {
  if (delta == null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Minus className="h-3 w-3" />
        —
      </span>
    );
  }
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <ArrowUp className="h-3 w-3" />
        +{delta}
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
        <ArrowDown className="h-3 w-3" />
        {delta}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Minus className="h-3 w-3" />
      0
    </span>
  );
}

export default function ManagerRepScoreboard({
  rows: initialRows,
  period: initialPeriod,
}: ManagerRepScoreboardProps) {
  const router = useRouter();
  const [rows, setRows] = useState(initialRows);
  const [period, setPeriod] = useState(initialPeriod);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("readiness");
  const [sortAsc, setSortAsc] = useState(false);
  const [needsReviewOnly, setNeedsReviewOnly] = useState(false);

  const changePeriod = async (next: AnalyticsPeriod) => {
    setPeriod(next);
    setLoading(true);
    router.replace(`/manager/reps?period=${next}`);
    try {
      const res = await fetch(`/api/manager/analytics/scoreboard?period=${next}`);
      const data = await res.json();
      setRows(data.rows || []);
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let list = rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
    );
    if (needsReviewOnly) {
      list = list.filter((r) => r.needsReview);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "readiness":
          cmp = (a.readiness ?? -1) - (b.readiness ?? -1);
          break;
        case "sessions":
          cmp = a.sessionsCompleted - b.sessionsCompleted;
          break;
        case "delta":
          cmp = (a.readinessDelta ?? -999) - (b.readinessDelta ?? -999);
          break;
        case "lastPractice": {
          const aTime = a.lastPracticeDate ? new Date(a.lastPracticeDate).getTime() : 0;
          const bTime = b.lastPracticeDate ? new Date(b.lastPracticeDate).getTime() : 0;
          cmp = aTime - bTime;
          break;
        }
      }
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [rows, searchQuery, needsReviewOnly, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "name");
    }
  };

  const sortIndicator = (key: SortKey) =>
    sortKey === key ? (sortAsc ? " ↑" : " ↓") : "";

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Rep scoreboard
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Compare readiness, practice volume, and trends across your team for the
              last {PERIOD_LABELS[period]}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(["7d", "30d", "90d"] as const).map((p) => (
              <Button
                key={p}
                variant={period === p ? "default" : "outline"}
                size="sm"
                disabled={loading}
                onClick={() => changePeriod(p)}
              >
                {PERIOD_LABELS[p]}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search reps…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={needsReviewOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setNeedsReviewOnly(!needsReviewOnly)}
          >
            <AlertTriangle className="mr-1.5 h-4 w-4" />
            Needs review only
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Updating scoreboard…
          </div>
        ) : filteredRows.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            No reps match your filters.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-lg border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <button type="button" onClick={() => toggleSort("name")} className="hover:text-foreground">
                          Rep{sortIndicator("name")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <button type="button" onClick={() => toggleSort("readiness")} className="hover:text-foreground">
                          Readiness{sortIndicator("readiness")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <button type="button" onClick={() => toggleSort("delta")} className="hover:text-foreground">
                          Δ period{sortIndicator("delta")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <button type="button" onClick={() => toggleSort("sessions")} className="hover:text-foreground">
                          Sessions{sortIndicator("sessions")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Skills
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <button type="button" onClick={() => toggleSort("lastPractice")} className="hover:text-foreground">
                          Last practice{sortIndicator("lastPractice")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRows.map((row) => (
                      <tr key={row.userId} className="hover:bg-muted/20">
                        <td className="px-4 py-3">
                          <Link
                            href={`/manager/reps/${row.userId}`}
                            className="font-medium text-foreground hover:text-primary hover:underline"
                          >
                            {row.name}
                          </Link>
                          <div className="text-xs text-muted-foreground">{row.email}</div>
                          {row.needsReview && (
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-400">
                              <AlertTriangle className="h-3 w-3" />
                              Needs review
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {row.readiness != null ? row.readiness : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <DeltaBadge delta={row.readinessDelta} />
                        </td>
                        <td className="px-4 py-3">{row.sessionsCompleted}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          <div>
                            <span className="text-foreground">Strong:</span>{" "}
                            {skillLabel(row.strongestSkill)}
                          </div>
                          <div>
                            <span className="text-foreground">Weak:</span>{" "}
                            {skillLabel(row.weakestSkill)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.lastPracticeDate
                            ? formatDistanceToNow(new Date(row.lastPracticeDate), {
                                addSuffix: true,
                              })
                            : "Never"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <Link
                              href={`/manager/reps/${row.userId}`}
                              className="text-xs font-medium text-primary hover:underline"
                            >
                              Profile
                            </Link>
                            <Link
                              href={`/manager/sessions?rep=${row.userId}`}
                              className="text-xs font-medium text-primary hover:underline"
                            >
                              Sessions
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <ul className="md:hidden space-y-3">
              {filteredRows.map((row) => (
                <li
                  key={row.userId}
                  className="rounded-lg border border-border bg-card p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/manager/reps/${row.userId}`}
                        className="font-medium text-foreground truncate hover:text-primary hover:underline block"
                      >
                        {row.name}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">{row.email}</p>
                    </div>
                    {row.needsReview && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-400">
                        <AlertTriangle className="h-3 w-3" />
                        Review
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Readiness</p>
                      <p className="font-medium">{row.readiness ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Δ period</p>
                      <DeltaBadge delta={row.readinessDelta} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                      <p className="font-medium">{row.sessionsCompleted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last practice</p>
                      <p className="text-sm text-muted-foreground">
                        {row.lastPracticeDate
                          ? formatDistanceToNow(new Date(row.lastPracticeDate), {
                              addSuffix: true,
                            })
                          : "Never"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Target className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      {skillLabel(row.weakestSkill)} needs work ·{" "}
                      {skillLabel(row.strongestSkill)} strongest
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={`/manager/reps/${row.userId}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View profile →
                    </Link>
                    <Link
                      href={`/manager/sessions?rep=${row.userId}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Sessions →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
