"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BookOpen,
  Loader2,
  Minus,
  Users,
} from "lucide-react";
import type { AnalyticsPeriod } from "@/lib/analytics";
import type { ScenarioPerformanceReport } from "@/lib/analytics/scenario-performance";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { Button } from "@/components/ui/button";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

function skillLabel(key: string | null) {
  if (!key) return "—";
  return SKILL_DEFINITIONS.find((s) => s.key === key)?.label ?? key;
}

function scoreColor(score: number | null): string {
  if (score == null || score <= 0) return "text-muted-foreground";
  if (score < 5) return "text-red-600 dark:text-red-400";
  if (score < 7) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}

function DeltaBadge({ delta }: { delta: number | null }) {
  if (delta == null) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
        <Minus className="h-3 w-3" />—
      </span>
    );
  }
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600 dark:text-emerald-400">
        <ArrowUp className="h-3 w-3" />+{delta}
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-red-600 dark:text-red-400">
        <ArrowDown className="h-3 w-3" />{delta}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
      <Minus className="h-3 w-3" />0
    </span>
  );
}

interface ManagerScenarioPerformanceProps {
  report: ScenarioPerformanceReport;
}

export default function ManagerScenarioPerformance({
  report: initialReport,
}: ManagerScenarioPerformanceProps) {
  const router = useRouter();
  const [report, setReport] = useState(initialReport);
  const [period, setPeriod] = useState(initialReport.period);
  const [loading, setLoading] = useState(false);

  const changePeriod = async (next: AnalyticsPeriod) => {
    setPeriod(next);
    setLoading(true);
    router.replace(`/manager/scenarios?period=${next}`);
    try {
      const res = await fetch(`/api/manager/analytics/scenarios?period=${next}`);
      const data = await res.json();
      if (data.report) setReport(data.report);
    } finally {
      setLoading(false);
    }
  };

  const activeRows = report.rows.filter(
    (r) => r.sessionCount > 0 || r.assignmentsTotal > 0
  );

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Scenario performance
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              See which practice scenarios your team runs most, where readiness is lowest,
              and how assigned remediations are completing.
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

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Sessions",
              value: report.summary.totalSessions.toLocaleString(),
              icon: BookOpen,
            },
            {
              label: "Active scenarios",
              value: String(report.summary.scenariosWithActivity),
              icon: BookOpen,
            },
            {
              label: "Most practiced",
              value: report.summary.highestVolumeName ?? "—",
              icon: Users,
            },
            {
              label: "Needs coaching",
              value: report.summary.lowestReadinessName ?? "—",
              icon: AlertTriangle,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {card.label}
                </div>
                <p className="text-sm font-semibold text-foreground truncate" title={card.value}>
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Updating report…
          </div>
        ) : activeRows.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            No scored practice sessions in this period yet.
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-hidden rounded-lg border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Scenario
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Sessions
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Reps
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Avg readiness
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Δ period
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Weakest skill
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Struggling
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Assignments
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {activeRows.map((row) => (
                      <tr key={row.scenarioId} className="hover:bg-muted/10">
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground">{row.name}</p>
                          {row.callType && (
                            <p className="text-xs text-muted-foreground">{row.callType}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 tabular-nums">{row.sessionCount}</td>
                        <td className="px-4 py-3 tabular-nums">{row.uniqueReps}</td>
                        <td className={`px-4 py-3 font-medium tabular-nums ${scoreColor(row.avgReadiness)}`}>
                          {row.avgReadiness ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <DeltaBadge delta={row.readinessDelta} />
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {skillLabel(row.weakestSkill)}
                        </td>
                        <td className="px-4 py-3">
                          {row.strugglingReps > 0 ? (
                            <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              {row.strugglingReps}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">0</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.assignmentsTotal > 0 ? (
                            <span>
                              {row.assignmentsCompleted}/{row.assignmentsTotal}
                              {row.assignmentCompletionRate != null && (
                                <span className="text-xs ml-1">
                                  ({row.assignmentCompletionRate}%)
                                </span>
                              )}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/manager/sessions?scenario=${row.scenarioId}`}
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            Sessions
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <ul className="md:hidden space-y-3">
              {activeRows.map((row) => (
                <li
                  key={row.scenarioId}
                  className="rounded-lg border border-border bg-card p-4 space-y-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{row.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {row.sessionCount} sessions · {row.uniqueReps} reps ·{" "}
                      {row.avgPracticeMinutes}m avg
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Readiness</p>
                      <p className={`font-medium tabular-nums ${scoreColor(row.avgReadiness)}`}>
                        {row.avgReadiness ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Δ period</p>
                      <DeltaBadge delta={row.readinessDelta} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Struggling reps</p>
                      <p className="font-medium">{row.strugglingReps}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Weakest: {skillLabel(row.weakestSkill)}
                  </p>
                  <Link
                    href={`/manager/sessions?scenario=${row.scenarioId}`}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View sessions →
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
