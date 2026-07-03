"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ScanFace, Mic } from "lucide-react";
import type { AnalyticsPeriod } from "@/lib/analytics";
import type { TeamAffectTrends } from "@/lib/analytics/affect-trends";
import { formatAffectLabel, topFaceLabels } from "@/lib/analytics/affect-trends";
import { Button } from "@/components/ui/button";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

function DistributionBars({
  items,
  emptyLabel,
}: {
  items: Array<{ label: string; share: number }>;
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-foreground">{item.label}</span>
            <span className="text-muted-foreground">{Math.round(item.share * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary/70"
              style={{ width: `${Math.max(item.share * 100, 4)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

interface ManagerAffectTrendsProps {
  trends: TeamAffectTrends;
}

export default function ManagerAffectTrends({ trends: initialTrends }: ManagerAffectTrendsProps) {
  const router = useRouter();
  const [trends, setTrends] = useState(initialTrends);
  const [period, setPeriod] = useState(initialTrends.period);
  const [loading, setLoading] = useState(false);

  const changePeriod = async (next: AnalyticsPeriod) => {
    setPeriod(next);
    setLoading(true);
    router.replace(`/manager/overview?period=${next}`);
    try {
      const res = await fetch(`/api/manager/analytics/affect?period=${next}`);
      const data = await res.json();
      if (data.trends) setTrends(data.trends);
    } finally {
      setLoading(false);
    }
  };

  const faceItems = topFaceLabels(trends.facePrimaryDistribution);
  const voiceItems = topFaceLabels(trends.voiceEmotionDistribution);

  const hasData = trends.sessionsWithAffect > 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-sm font-medium text-foreground">Delivery & affect trends</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Face coaching reads and voice prosody across practice sessions (camera + speech
            required).
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {(["7d", "30d", "90d"] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "outline"}
              size="sm"
              onClick={() => changePeriod(p)}
              disabled={loading}
            >
              {PERIOD_LABELS[p]}
            </Button>
          ))}
        </div>
      </div>

      {!hasData ? (
        <p className="text-sm text-muted-foreground">
          No affect data yet for the last {PERIOD_LABELS[period].toLowerCase()}. Reps need camera
          on and spoken turns during practice.{" "}
          {trends.sessionsTotal > 0 && (
            <span>
              ({trends.sessionsTotal} session{trends.sessionsTotal === 1 ? "" : "s"} without
              affect capture.)
            </span>
          )}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Sessions w/ affect
              </p>
              <p className="text-lg font-medium text-foreground">
                {trends.sessionsWithAffect}
                <span className="text-sm text-muted-foreground font-normal">
                  {" "}
                  / {trends.sessionsTotal}
                </span>
              </p>
            </div>
            <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Face–voice match
              </p>
              <p className="text-lg font-medium text-foreground">
                {trends.avgFaceVoiceAgreement != null
                  ? `${Math.round(trends.avgFaceVoiceAgreement * 100)}%`
                  : "—"}
              </p>
            </div>
            <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Misaligned sessions
              </p>
              <p className="text-lg font-medium text-foreground">
                {trends.misalignedSessions}
              </p>
            </div>
            <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Weeks tracked
              </p>
              <p className="text-lg font-medium text-foreground">{trends.weeklyTrend.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ScanFace className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">
                  Dominant face coaching (team)
                </h3>
              </div>
              <DistributionBars
                items={faceItems}
                emptyLabel="No face reads in this period."
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mic className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">
                  Dominant voice prosody (team)
                </h3>
              </div>
              <DistributionBars
                items={voiceItems}
                emptyLabel="No voice prosody in this period."
              />
            </div>
          </div>

          {trends.skillCorrelations.some((c) => c.insight) && (
            <div className="mb-6 rounded-md border border-primary/20 bg-primary/5 px-4 py-3">
              <h3 className="text-xs font-medium text-foreground uppercase tracking-wide mb-2">
                Scorecard correlations
              </h3>
              <ul className="space-y-2">
                {trends.skillCorrelations
                  .filter((c) => c.insight)
                  .map((c) => (
                    <li key={c.skill} className="text-sm text-foreground">
                      {c.insight}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {trends.repHighlights.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-foreground uppercase tracking-wide mb-3">
                By rep
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="pb-2 pr-4 font-medium">Rep</th>
                      <th className="pb-2 pr-4 font-medium">Sessions</th>
                      <th className="pb-2 pr-4 font-medium">Face</th>
                      <th className="pb-2 pr-4 font-medium">Voice</th>
                      <th className="pb-2 pr-4 font-medium">Listening</th>
                      <th className="pb-2 font-medium">Mismatch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trends.repHighlights.map((rep) => (
                      <tr key={rep.userId} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 pr-4">
                          <Link
                            href={`/manager/reps/${rep.userId}`}
                            className="text-foreground hover:text-primary truncate max-w-[140px] inline-block"
                          >
                            {rep.name}
                          </Link>
                        </td>
                        <td className="py-2.5 pr-4 text-muted-foreground">{rep.sessions}</td>
                        <td className="py-2.5 pr-4">
                          {rep.dominantFace ? formatAffectLabel(rep.dominantFace) : "—"}
                        </td>
                        <td className="py-2.5 pr-4">
                          {rep.dominantVoice ? formatAffectLabel(rep.dominantVoice) : "—"}
                        </td>
                        <td className="py-2.5 pr-4 text-muted-foreground">
                          {rep.avgListening ?? "—"}
                        </td>
                        <td className="py-2.5 text-muted-foreground">
                          {rep.misalignmentRate != null
                            ? `${Math.round(rep.misalignmentRate * 100)}%`
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
