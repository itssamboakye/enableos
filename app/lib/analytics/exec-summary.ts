import { queryOne } from "@/lib/db";
import { getCompanyOverviewMetrics } from "./queries";
import { getPlaybookReport, type PlaybookInsight } from "./playbook-insights";
import type { AnalyticsPeriod, CompanyOverviewMetrics } from "./types";

export interface ExecutiveSummary {
  period: AnalyticsPeriod;
  generatedAt: string;
  companyName: string;
  metrics: CompanyOverviewMetrics;
  topInsights: PlaybookInsight[];
}

export async function getExecutiveSummary(
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<ExecutiveSummary> {
  const [company, metrics, playbook] = await Promise.all([
    queryOne<{ name: string }>(`SELECT name FROM companies WHERE id = $1`, [
      companyId,
    ]),
    getCompanyOverviewMetrics(companyId, period),
    getPlaybookReport(companyId, period),
  ]);

  return {
    period,
    generatedAt: new Date().toISOString(),
    companyName: company?.name ?? "Your team",
    metrics,
    topInsights: playbook.insights.slice(0, 5),
  };
}

export function executiveSummaryToCsv(summary: ExecutiveSummary): string {
  const m = summary.metrics;
  const lines = [
    "EnableOS Executive Summary",
    `Company,${summary.companyName}`,
    `Period,${summary.period}`,
    `Generated,${summary.generatedAt}`,
    "",
    "Metric,Value",
    `Active reps (7d),${m.activeRepsThisWeek}`,
    `Sessions completed,${m.sessionsCompleted}`,
    `Avg readiness,${m.avgReadiness ?? "—"}`,
    `Readiness change (7d),${m.readinessChange7d ?? "—"}`,
    `Readiness change (30d),${m.readinessChange30d ?? "—"}`,
    `Practice time (minutes),${m.totalPracticeMinutes}`,
    `Completion rate,${m.completionRate}%`,
    `Reps at risk,${m.repsAtRisk}`,
    "",
    "Weakest Skills,Average",
    ...m.weakestSkills.map((s) => `${s.label},${s.average}`),
    "",
    "Top Improving Reps,Delta,Current Readiness",
    ...m.topImprovingReps.map(
      (r) => `${r.name},+${r.readinessDelta},${r.currentReadiness}`
    ),
    "",
    "Priority,Title,Recommended Action",
    ...summary.topInsights.map((i) =>
      [i.priority, `"${i.title.replace(/"/g, '""')}"`, `"${i.recommendedAction.replace(/"/g, '""')}"`].join(",")
    ),
  ];
  return lines.join("\n");
}
