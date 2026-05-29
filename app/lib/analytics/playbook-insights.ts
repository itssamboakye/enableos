import { getOpenCoachingFlagCount, getCoachingQueue } from "@/lib/coaching/flags";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { getCompanyOverviewMetrics } from "./queries";
import { getRepScoreboard } from "./queries";
import { getScenarioPerformanceReport } from "./scenario-performance";
import type { AnalyticsPeriod } from "./types";

export type PlaybookInsightCategory =
  | "skill_gap"
  | "coaching"
  | "scenario"
  | "engagement"
  | "improvement";

export type PlaybookInsightPriority = "high" | "medium" | "low";

export interface PlaybookInsight {
  id: string;
  category: PlaybookInsightCategory;
  priority: PlaybookInsightPriority;
  title: string;
  description: string;
  recommendedAction: string;
  href?: string;
  metric?: string;
}

export interface PlaybookReport {
  period: AnalyticsPeriod;
  generatedAt: string;
  summary: {
    openFlags: number;
    repsAtRisk: number;
    avgReadiness: number | null;
    sessionsCompleted: number;
    topWeakSkill: string | null;
    readinessChange7d: number | null;
  };
  insights: PlaybookInsight[];
}

function insight(
  partial: Omit<PlaybookInsight, "id"> & { id?: string }
): PlaybookInsight {
  return {
    id: partial.id ?? `insight_${partial.category}_${partial.title.slice(0, 20).replace(/\s+/g, "_").toLowerCase()}`,
    ...partial,
  };
}

export async function getPlaybookReport(
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<PlaybookReport> {
  const [metrics, scoreboard, scenarios, openFlags, flagQueue] = await Promise.all([
    getCompanyOverviewMetrics(companyId, period),
    getRepScoreboard(companyId, period),
    getScenarioPerformanceReport(companyId, period),
    getOpenCoachingFlagCount(companyId),
    getCoachingQueue(companyId, "open"),
  ]);

  const insights: PlaybookInsight[] = [];
  const atRiskReps = scoreboard.filter((r) => r.needsReview);
  const inactiveFlags = flagQueue.filter((f) => f.type === "inactive");
  const weakSkillFlags = flagQueue.filter(
    (f) => f.type === "weak_skill" || f.type === "repeated_weak_skill"
  );

  const topWeak = metrics.weakestSkills[0];
  if (topWeak && topWeak.average > 0 && topWeak.average < 6) {
    const label = SKILL_DEFINITIONS.find((s) => s.key === topWeak.skill)?.label ?? topWeak.skill;
    insights.push(
      insight({
        category: "skill_gap",
        priority: topWeak.average < 5 ? "high" : "medium",
        title: `Team-wide ${label.toLowerCase()} gap`,
        description: `Average ${label.toLowerCase()} score is ${topWeak.average}/10 across the team this period.`,
        recommendedAction: `Run a team coaching session focused on ${label.toLowerCase()} and assign targeted remediation scenarios.`,
        href: "/manager/skills",
        metric: `${topWeak.average}/10`,
      })
    );
  }

  if (metrics.repsAtRisk > 0) {
    insights.push(
      insight({
        category: "coaching",
        priority: "high",
        title: `${metrics.repsAtRisk} rep${metrics.repsAtRisk === 1 ? "" : "s"} need review`,
        description: `${atRiskReps.length} rep${atRiskReps.length === 1 ? " is" : "s are"} inactive 7+ days or below readiness threshold.`,
        recommendedAction: "Review the coaching queue and assign remediation scenarios to at-risk reps.",
        href: "/manager/coaching",
        metric: String(metrics.repsAtRisk),
      })
    );
  }

  if (openFlags > 0) {
    insights.push(
      insight({
        category: "coaching",
        priority: inactiveFlags.length > 0 ? "high" : "medium",
        title: `${openFlags} open coaching flag${openFlags === 1 ? "" : "s"}`,
        description:
          inactiveFlags.length > 0
            ? `${inactiveFlags.length} rep${inactiveFlags.length === 1 ? "" : "s"} flagged for inactivity.`
            : "Reps flagged for score drops or repeated weak skills.",
        recommendedAction: "Work through the coaching queue — assign scenarios and mark flags resolved.",
        href: "/manager/coaching",
        metric: String(openFlags),
      })
    );
  }

  if (weakSkillFlags.length >= 2) {
    const skillCounts = new Map<string, number>();
    for (const f of weakSkillFlags) {
      if (f.skill) skillCounts.set(f.skill, (skillCounts.get(f.skill) || 0) + 1);
    }
    const topSkill = [...skillCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    if (topSkill) {
      const label = SKILL_DEFINITIONS.find((s) => s.key === topSkill[0])?.label ?? topSkill[0];
      insights.push(
        insight({
          category: "coaching",
          priority: "medium",
          title: `Repeated ${label.toLowerCase()} flags`,
          description: `${topSkill[1]} open flags relate to ${label.toLowerCase()} — a recurring team pattern.`,
          recommendedAction: `Add a team playbook drill for ${label.toLowerCase()} and monitor the skill heatmap weekly.`,
          href: "/manager/skills",
          metric: `${topSkill[1]} flags`,
        })
      );
    }
  }

  const strugglingScenarios = scenarios.rows.filter(
    (r) => r.sessionCount >= 2 && r.avgReadiness != null && r.avgReadiness < 5.5
  );
  if (strugglingScenarios.length > 0) {
    const worst = strugglingScenarios.sort(
      (a, b) => (a.avgReadiness ?? 10) - (b.avgReadiness ?? 10)
    )[0];
    insights.push(
      insight({
        category: "scenario",
        priority: "high",
        title: `"${worst.name}" needs attention`,
        description: `Avg readiness ${worst.avgReadiness}/10 across ${worst.sessionCount} sessions with ${worst.strugglingReps} struggling rep${worst.strugglingReps === 1 ? "" : "s"}.`,
        recommendedAction: `Review session transcripts for ${worst.name} and assign it as remediation to struggling reps.`,
        href: `/manager/scenarios`,
        metric: `${worst.avgReadiness}/10`,
      })
    );
  }

  const pendingAssignments = scenarios.rows.filter(
    (r) => r.assignmentsTotal > r.assignmentsCompleted
  );
  if (pendingAssignments.length > 0) {
    const totalPending = pendingAssignments.reduce(
      (sum, r) => sum + (r.assignmentsTotal - r.assignmentsCompleted),
      0
    );
    insights.push(
      insight({
        category: "engagement",
        priority: "medium",
        title: `${totalPending} pending scenario assignment${totalPending === 1 ? "" : "s"}`,
        description: "Reps have assigned remediation scenarios they haven't completed yet.",
        recommendedAction: "Follow up with reps on open assignments and check progress on the scoreboard.",
        href: "/manager/reps",
        metric: String(totalPending),
      })
    );
  }

  if (metrics.activeRepsThisWeek < scoreboard.length * 0.5 && scoreboard.length >= 2) {
    insights.push(
      insight({
        category: "engagement",
        priority: "medium",
        title: "Low weekly practice participation",
        description: `Only ${metrics.activeRepsThisWeek} of ${scoreboard.length} reps practiced in the last 7 days.`,
        recommendedAction: "Set a team practice goal for the week and nudge inactive reps via the coaching queue.",
        href: "/manager/coaching",
        metric: `${metrics.activeRepsThisWeek}/${scoreboard.length}`,
      })
    );
  }

  if (metrics.topImprovingReps.length > 0) {
    const top = metrics.topImprovingReps[0];
    insights.push(
      insight({
        category: "improvement",
        priority: "low",
        title: `${top.name} is improving fastest`,
        description: `Readiness up +${top.readinessDelta} to ${top.currentReadiness}/10 — share their approach with the team.`,
        recommendedAction: "Review their recent sessions as coaching examples for the rest of the team.",
        href: `/manager/reps/${top.userId}`,
        metric: `+${top.readinessDelta}`,
      })
    );
  }

  if (metrics.readinessChange7d != null && metrics.readinessChange7d >= 0.5) {
    insights.push(
      insight({
        category: "improvement",
        priority: "low",
        title: "Team readiness trending up",
        description: `Average readiness increased +${metrics.readinessChange7d} over the last 7 days.`,
        recommendedAction: "Keep current coaching rhythm — reinforce what's working in your next team sync.",
        href: "/manager/overview",
        metric: `+${metrics.readinessChange7d}`,
      })
    );
  }

  if (metrics.readinessChange7d != null && metrics.readinessChange7d <= -0.5) {
    insights.push(
      insight({
        category: "skill_gap",
        priority: "high",
        title: "Team readiness declining",
        description: `Average readiness dropped ${metrics.readinessChange7d} over the last 7 days.`,
        recommendedAction: "Prioritize coaching queue review and schedule extra practice sessions this week.",
        href: "/manager/coaching",
        metric: String(metrics.readinessChange7d),
      })
    );
  }

  if (insights.length === 0) {
    insights.push(
      insight({
        category: "engagement",
        priority: "low",
        title: "Building your playbook",
        description: "Not enough team activity yet to generate coaching patterns. Insights appear as reps complete practice sessions.",
        recommendedAction: "Invite reps and encourage discovery practice sessions to populate your analytics.",
        href: "/manager/team",
      })
    );
  }

  const priorityOrder: Record<PlaybookInsightPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  insights.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return {
    period,
    generatedAt: new Date().toISOString(),
    summary: {
      openFlags,
      repsAtRisk: metrics.repsAtRisk,
      avgReadiness: metrics.avgReadiness,
      sessionsCompleted: metrics.sessionsCompleted,
      topWeakSkill: topWeak
        ? SKILL_DEFINITIONS.find((s) => s.key === topWeak.skill)?.label ?? null
        : null,
      readinessChange7d: metrics.readinessChange7d,
    },
    insights,
  };
}

export function playbookReportToCsv(report: PlaybookReport): string {
  const lines: string[] = [
    "EnableOS Manager Playbook Export",
    `Period,${report.period}`,
    `Generated,${report.generatedAt}`,
    "",
    "Summary Metric,Value",
    `Open coaching flags,${report.summary.openFlags}`,
    `Reps at risk,${report.summary.repsAtRisk}`,
    `Avg readiness,${report.summary.avgReadiness ?? "—"}`,
    `Sessions completed,${report.summary.sessionsCompleted}`,
    `Top weak skill,${report.summary.topWeakSkill ?? "—"}`,
    `Readiness change (7d),${report.summary.readinessChange7d ?? "—"}`,
    "",
    "Priority,Category,Title,Description,Recommended Action,Metric",
  ];

  for (const item of report.insights) {
    const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
    lines.push(
      [
        item.priority,
        item.category,
        escape(item.title),
        escape(item.description),
        escape(item.recommendedAction),
        item.metric ?? "",
      ].join(",")
    );
  }

  return lines.join("\n");
}
