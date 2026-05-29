"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  Clock,
  MessageSquare,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import type { CompanyOverviewMetrics } from "@/lib/analytics";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { Button } from "@/components/ui/button";

interface ManagerOverviewProps {
  metrics: CompanyOverviewMetrics;
  period: string;
}

function formatDelta(delta: number | null) {
  if (delta == null) return "—";
  const prefix = delta > 0 ? "+" : "";
  return `${prefix}${delta}`;
}

export default function ManagerOverview({ metrics, period }: ManagerOverviewProps) {
  const skillLabel = (key: string) =>
    SKILL_DEFINITIONS.find((s) => s.key === key)?.label ?? key;

  const kpiCards = [
    {
      title: "Active reps (7d)",
      value: metrics.activeRepsThisWeek.toLocaleString(),
      icon: Users,
    },
    {
      title: "Sessions completed",
      value: metrics.sessionsCompleted.toLocaleString(),
      sub: `Last ${period}`,
      icon: MessageSquare,
    },
    {
      title: "Avg readiness",
      value: metrics.avgReadiness != null ? metrics.avgReadiness.toString() : "—",
      sub: "0–10 scale",
      icon: Target,
    },
    {
      title: "Readiness Δ (7d)",
      value: formatDelta(metrics.readinessChange7d),
      icon: metrics.readinessChange7d != null && metrics.readinessChange7d >= 0 ? TrendingUp : TrendingDown,
    },
    {
      title: "Readiness Δ (30d)",
      value: formatDelta(metrics.readinessChange30d),
      icon: metrics.readinessChange30d != null && metrics.readinessChange30d >= 0 ? TrendingUp : TrendingDown,
    },
    {
      title: "Time practicing",
      value: `${metrics.totalPracticeMinutes}m`,
      icon: Clock,
    },
    {
      title: "Completion rate",
      value: `${metrics.completionRate}%`,
      icon: Activity,
    },
    {
      title: "Reps at risk",
      value: metrics.repsAtRisk.toLocaleString(),
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium text-foreground mb-1">
              Team overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Readiness and practice activity for your team. Phase 0 foundation — more views ship weekly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/manager/reps">
              <Button variant="outline" size="sm">
                View scoreboard
              </Button>
            </Link>
            <Link href="/manager/sessions">
              <Button variant="outline" size="sm">
                Review sessions
              </Button>
            </Link>
            <Link href="/manager/coaching">
              <Button variant="outline" size="sm">
                Coaching queue
              </Button>
            </Link>
            <Link href="/manager/skills">
              <Button variant="outline" size="sm">
                Skill heatmap
              </Button>
            </Link>
            <Link href="/manager/scenarios">
              <Button variant="outline" size="sm">
                Scenario performance
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {card.title}
                  </h3>
                </div>
                <p className="text-2xl font-medium text-foreground">{card.value}</p>
                {card.sub && (
                  <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-medium text-foreground mb-4">
              Top 3 weakest skills
            </h2>
            {metrics.weakestSkills.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No scored sessions in this period yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {metrics.weakestSkills.map((skill) => (
                  <li key={skill.skill} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      {skillLabel(skill.skill)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {skill.average} / 10
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-medium text-foreground mb-4">
              Top improving reps
            </h2>
            {metrics.topImprovingReps.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Not enough session history to show improvement yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {metrics.topImprovingReps.map((rep) => (
                  <li
                    key={rep.userId}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-sm text-foreground truncate">{rep.name}</span>
                    <span className="text-sm font-medium text-primary shrink-0">
                      +{rep.readinessDelta} (now {rep.currentReadiness})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Readiness = average of clarity, curiosity, listening, flow control, confidence, and
          next-step scores (0–10). Reps at risk: inactive 7+ days or avg readiness below 5.
        </p>
      </div>
    </div>
  );
}
