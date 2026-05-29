"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  AlertTriangle,
  Download,
  Loader2,
  Mail,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import type { AnalyticsPeriod } from "@/lib/analytics";
import type { ExecutiveSummary } from "@/lib/analytics/exec-summary";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { Button } from "@/components/ui/button";
import ManagerPageHeader from "@/components/manager/ManagerPageHeader";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

interface ManagerExecutiveSummaryProps {
  summary: ExecutiveSummary;
}

export default function ManagerExecutiveSummary({
  summary: initialSummary,
}: ManagerExecutiveSummaryProps) {
  const router = useRouter();
  const [summary, setSummary] = useState(initialSummary);
  const [period, setPeriod] = useState(initialSummary.period);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [sendingDigest, setSendingDigest] = useState(false);
  const [digestMessage, setDigestMessage] = useState<string | null>(null);

  const m = summary.metrics;

  const changePeriod = async (next: AnalyticsPeriod) => {
    setPeriod(next);
    setLoading(true);
    router.replace(`/manager/executive?period=${next}`);
    try {
      const res = await fetch(`/api/manager/analytics/executive?period=${next}`);
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch(
        `/api/manager/analytics/executive/export?period=${period}`
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enableos-executive-${period}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const handleSendDigest = async () => {
    setSendingDigest(true);
    setDigestMessage(null);
    try {
      const res = await fetch("/api/manager/analytics/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ period }),
      });
      const data = await res.json();
      if (res.ok) {
        setDigestMessage(`Digest sent to ${data.sentTo}`);
      } else {
        setDigestMessage(data.error || "Failed to send digest");
      }
    } finally {
      setSendingDigest(false);
    }
  };

  const skillLabel = (key: string) =>
    SKILL_DEFINITIONS.find((s) => s.key === key)?.label ?? key;

  return (
    <div className="min-h-full bg-background print:bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 print:py-4">
        <ManagerPageHeader
          eyebrow="Executive summary"
          title={summary.companyName}
          description={`Last ${PERIOD_LABELS[period].toLowerCase()} · Generated ${format(new Date(summary.generatedAt), "MMM d, yyyy 'at' h:mm a")}`}
          actions={
            <div className="print:hidden flex flex-wrap items-center gap-2">
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
              <Button
                variant="outline"
                size="sm"
                disabled={exporting || loading}
                onClick={handleExport}
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Download className="mr-1.5 h-4 w-4" />
                    Export
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={sendingDigest || loading}
                onClick={handleSendDigest}
              >
                {sendingDigest ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="mr-1.5 h-4 w-4" />
                    Email digest
                  </>
                )}
              </Button>
            </div>
          }
        />

        {digestMessage && (
          <p className="mb-4 text-sm text-muted-foreground print:hidden">
            {digestMessage}
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Updating summary…
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Sessions", value: m.sessionsCompleted },
                { label: "Active reps", value: m.activeRepsThisWeek, icon: Users },
                {
                  label: "Avg readiness",
                  value: m.avgReadiness != null ? `${m.avgReadiness}/10` : "—",
                },
                {
                  label: "At risk",
                  value: m.repsAtRisk,
                  icon: AlertTriangle,
                  warn: m.repsAtRisk > 0,
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {kpi.label}
                  </p>
                  <p
                    className={`mt-1 text-2xl font-semibold tabular-nums ${
                      kpi.warn ? "text-amber-600 dark:text-amber-400" : "text-foreground"
                    }`}
                  >
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Readiness trends
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">7-day change</span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      {m.readinessChange7d != null && m.readinessChange7d >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      {m.readinessChange7d ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">30-day change</span>
                    <span className="font-medium tabular-nums">
                      {m.readinessChange30d ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Practice time</span>
                    <span className="font-medium">{m.totalPracticeMinutes}m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Completion rate</span>
                    <span className="font-medium">{m.completionRate}%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Weakest skills
                </h3>
                {m.weakestSkills.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {m.weakestSkills.map((s) => (
                      <li
                        key={s.skill}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{skillLabel(s.skill)}</span>
                        <span className="font-medium tabular-nums">{s.average}/10</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {summary.topInsights.length > 0 && (
              <div className="mb-8 rounded-lg border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">
                    Priority playbook actions
                  </h3>
                  <Link
                    href="/manager/insights"
                    className="text-xs font-medium text-primary hover:underline print:hidden"
                  >
                    View all insights →
                  </Link>
                </div>
                <ol className="space-y-3">
                  {summary.topInsights.map((insight, i) => (
                    <li key={insight.id} className="flex gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{insight.title}</p>
                        <p className="text-muted-foreground">{insight.recommendedAction}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {m.topImprovingReps.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Top improving reps
                </h3>
                <ul className="space-y-2">
                  {m.topImprovingReps.map((rep) => (
                    <li
                      key={rep.userId}
                      className="flex items-center justify-between text-sm"
                    >
                      <Link
                        href={`/manager/reps/${rep.userId}`}
                        className="text-foreground hover:text-primary hover:underline print:no-underline"
                      >
                        {rep.name}
                      </Link>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        +{rep.readinessDelta} → {rep.currentReadiness}/10
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
