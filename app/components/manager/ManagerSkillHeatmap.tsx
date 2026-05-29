"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { AnalyticsPeriod } from "@/lib/analytics";
import type { TeamSkillHeatmap } from "@/lib/analytics/heatmap";
import type { CanonicalSkillKey } from "@/lib/scores";
import { Button } from "@/components/ui/button";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

function scoreColor(score: number | null): string {
  if (score == null || score <= 0) {
    return "bg-muted/60 text-muted-foreground";
  }
  if (score < 5) {
    return "bg-red-500/20 text-red-700 dark:text-red-300";
  }
  if (score < 7) {
    return "bg-amber-500/20 text-amber-800 dark:text-amber-300";
  }
  return "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300";
}

interface ManagerSkillHeatmapProps {
  heatmap: TeamSkillHeatmap;
}

export default function ManagerSkillHeatmap({
  heatmap: initialHeatmap,
}: ManagerSkillHeatmapProps) {
  const router = useRouter();
  const [heatmap, setHeatmap] = useState(initialHeatmap);
  const [period, setPeriod] = useState(initialHeatmap.period);
  const [loading, setLoading] = useState(false);

  const changePeriod = async (next: AnalyticsPeriod) => {
    setPeriod(next);
    setLoading(true);
    router.replace(`/manager/skills?period=${next}`);
    try {
      const res = await fetch(`/api/manager/analytics/heatmap?period=${next}`);
      const data = await res.json();
      if (data.heatmap) setHeatmap(data.heatmap);
    } finally {
      setLoading(false);
    }
  };

  const shortLabel = (label: string) => {
    const map: Record<string, string> = {
      "Discovery questioning": "Discovery",
      "Listening & follow-ups": "Listening",
      "Flow control": "Flow",
      "Confidence & tone": "Confidence",
      "Next-step effectiveness": "Next step",
    };
    return map[label] ?? label.split(" ")[0];
  };

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Team skill heatmap
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Average skill scores by rep for the last {PERIOD_LABELS[period].toLowerCase()}.
              Darker greens indicate stronger performance; reds highlight coaching opportunities.
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

        {/* Legend */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Scale:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded bg-red-500/30" /> &lt; 5
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded bg-amber-500/30" /> 5–6.9
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded bg-emerald-500/30" /> 7+
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded bg-muted" /> No data
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Updating heatmap…
          </div>
        ) : heatmap.rows.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            No reps on your team yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="sticky left-0 z-10 bg-muted/95 px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
                      Rep
                    </th>
                    {heatmap.skills.map((skill) => (
                      <th
                        key={skill.key}
                        className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground min-w-[4.5rem]"
                        title={skill.label}
                      >
                        <span className="hidden sm:inline">{shortLabel(skill.label)}</span>
                        <span className="sm:hidden">{skill.key.slice(0, 4)}</span>
                      </th>
                    ))}
                    <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Ready
                    </th>
                  </tr>
                  <tr className="border-b border-border bg-muted/20">
                    <td className="sticky left-0 z-10 bg-muted/90 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
                      Team avg
                    </td>
                    {heatmap.skills.map((skill) => {
                      const avg = heatmap.teamAverages[skill.key as CanonicalSkillKey];
                      return (
                        <td key={skill.key} className="px-2 py-2 text-center">
                          <span
                            className={`inline-flex min-w-[2.25rem] items-center justify-center rounded px-1.5 py-0.5 text-xs font-semibold tabular-nums ${scoreColor(avg)}`}
                          >
                            {avg ?? "—"}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {heatmap.rows.map((row) => (
                    <tr key={row.userId} className="hover:bg-muted/10">
                      <td className="sticky left-0 z-10 bg-card px-4 py-2.5 backdrop-blur">
                        <Link
                          href={`/manager/reps/${row.userId}`}
                          className="font-medium text-foreground hover:text-primary hover:underline truncate block max-w-[10rem] sm:max-w-[14rem]"
                          title={row.email}
                        >
                          {row.name}
                        </Link>
                      </td>
                      {heatmap.skills.map((skill) => {
                        const cell = row.cells[skill.key as CanonicalSkillKey];
                        return (
                          <td key={skill.key} className="px-2 py-2.5 text-center">
                            <span
                              className={`inline-flex min-w-[2.25rem] items-center justify-center rounded px-1.5 py-1 text-xs font-semibold tabular-nums ${scoreColor(cell.average)}`}
                              title={
                                cell.average != null
                                  ? `${skill.label}: ${cell.average}/10 (${cell.sessionCount} sessions)`
                                  : "No scored sessions in period"
                              }
                            >
                              {cell.average ?? "—"}
                            </span>
                          </td>
                        );
                      })}
                      <td className="px-3 py-2.5 text-center">
                        <span
                          className={`inline-flex min-w-[2.25rem] items-center justify-center rounded px-1.5 py-1 text-xs font-semibold tabular-nums ${scoreColor(row.readiness)}`}
                        >
                          {row.readiness ?? "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
