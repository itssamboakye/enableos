"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Download,
  Lightbulb,
  Loader2,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { AnalyticsPeriod } from "@/lib/analytics";
import type {
  PlaybookInsight,
  PlaybookInsightCategory,
  PlaybookReport,
} from "@/lib/analytics/playbook-insights";
import { Button } from "@/components/ui/button";
import ManagerPageHeader from "@/components/manager/ManagerPageHeader";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

const CATEGORY_LABELS: Record<PlaybookInsightCategory, string> = {
  skill_gap: "Skill gap",
  coaching: "Coaching",
  scenario: "Scenario",
  engagement: "Engagement",
  improvement: "Improvement",
};

const CATEGORY_ICONS: Record<PlaybookInsightCategory, typeof Lightbulb> = {
  skill_gap: Target,
  coaching: AlertTriangle,
  scenario: BookOpen,
  engagement: Users,
  improvement: TrendingUp,
};

const PRIORITY_STYLES = {
  high: "border-red-500/30 bg-red-500/5",
  medium: "border-amber-500/30 bg-amber-500/5",
  low: "border-border bg-card",
};

interface ManagerPlaybookInsightsProps {
  report: PlaybookReport;
}

export default function ManagerPlaybookInsights({
  report: initialReport,
}: ManagerPlaybookInsightsProps) {
  const router = useRouter();
  const [report, setReport] = useState(initialReport);
  const [period, setPeriod] = useState(initialReport.period);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const changePeriod = async (next: AnalyticsPeriod) => {
    setPeriod(next);
    setLoading(true);
    router.replace(`/manager/insights?period=${next}`);
    try {
      const res = await fetch(`/api/manager/analytics/insights?period=${next}`);
      const data = await res.json();
      if (data.report) setReport(data.report);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch(
        `/api/manager/analytics/insights/export?period=${period}`
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enableos-playbook-${period}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const highPriority = report.insights.filter((i) => i.priority === "high");
  const otherInsights = report.insights.filter((i) => i.priority !== "high");

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <ManagerPageHeader
          title="Playbook insights"
          description={`Coaching patterns and recommended team actions based on practice data from the last ${PERIOD_LABELS[period].toLowerCase()}.`}
          actions={
            <>
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
                    Export CSV
                  </>
                )}
              </Button>
            </>
          }
        />

        {/* Summary strip */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Open flags", value: report.summary.openFlags },
            { label: "Reps at risk", value: report.summary.repsAtRisk },
            {
              label: "Avg readiness",
              value: report.summary.avgReadiness ?? "—",
            },
            {
              label: "Sessions",
              value: report.summary.sessionsCompleted,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card px-4 py-3"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Updating insights…
          </div>
        ) : (
          <div className="space-y-8">
            {highPriority.length > 0 && (
              <section>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Priority actions
                </h3>
                <ul className="space-y-3">
                  {highPriority.map((item) => (
                    <InsightCard key={item.id} insight={item} />
                  ))}
                </ul>
              </section>
            )}

            {otherInsights.length > 0 && (
              <section>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {highPriority.length > 0 ? "Additional insights" : "Insights"}
                </h3>
                <ul className="space-y-3">
                  {otherInsights.map((item) => (
                    <InsightCard key={item.id} insight={item} />
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InsightCard({ insight }: { insight: PlaybookInsight }) {
  const Icon = CATEGORY_ICONS[insight.category];

  return (
    <li
      className={`rounded-lg border p-4 sm:p-5 ${PRIORITY_STYLES[insight.priority]}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground">
              <Icon className="h-3 w-3" />
              {CATEGORY_LABELS[insight.category]}
            </span>
            <span className="text-xs capitalize text-muted-foreground">
              {insight.priority} priority
            </span>
            {insight.metric && (
              <span className="text-xs font-semibold tabular-nums text-foreground">
                {insight.metric}
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {insight.description}
          </p>
          <p className="rounded-md border border-border/60 bg-background/50 px-3 py-2 text-sm text-foreground">
            <span className="font-medium">Recommended: </span>
            {insight.recommendedAction}
          </p>
        </div>
        {insight.href && (
          <Link
            href={insight.href}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline sm:mt-1"
          >
            Take action
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </li>
  );
}
