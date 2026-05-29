"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Calendar,
  Clock,
  Loader2,
  MessageSquare,
  Minus,
  Target,
  TrendingUp,
} from "lucide-react";
import type { AnalyticsPeriod } from "@/lib/analytics";
import type { RepProfile } from "@/lib/analytics";
import type { CoachingFlag } from "@/lib/coaching/types";
import type { ScenarioAssignment } from "@/lib/scenarios/types";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

const FLAG_LABELS: Record<CoachingFlag["type"], string> = {
  inactive: "Inactive",
  score_drop: "Score drop",
  weak_skill: "Weak skill",
  low_readiness: "Low readiness",
  repeated_weak_skill: "Repeated weak skill",
};

const FLAG_STATUS_STYLES: Record<CoachingFlag["status"], string> = {
  open: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  acknowledged: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  resolved: "bg-muted text-muted-foreground",
};

interface ManagerRepProfileProps {
  userId: string;
  profile: RepProfile;
  flags: CoachingFlag[];
  assignments: ScenarioAssignment[];
  period: AnalyticsPeriod;
}

function skillLabel(key: string | null) {
  if (!key) return "—";
  return SKILL_DEFINITIONS.find((s) => s.key === key)?.label ?? key;
}

function DeltaText({ delta }: { delta: number | null }) {
  if (delta == null) return <span className="text-muted-foreground">—</span>;
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <ArrowUp className="h-4 w-4" />
        +{delta} vs prior period
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
        <ArrowDown className="h-4 w-4" />
        {delta} vs prior period
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      <Minus className="h-4 w-4" />
      No change vs prior period
    </span>
  );
}

function ReadinessTrend({ points }: { points: RepProfile["sessionTrend"] }) {
  if (points.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center">
        No scored sessions in this period yet.
      </p>
    );
  }

  const max = 10;

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-1.5 h-32">
        {points.map((point) => {
          const height = Math.max(4, (point.readiness / max) * 100);
          return (
            <div
              key={point.sessionId}
              className="group relative flex-1 min-w-0 flex flex-col justify-end"
              title={`${format(new Date(point.date), "MMM d")}: ${point.readiness}/10`}
            >
              <div
                className="w-full rounded-t bg-primary/80 transition-colors group-hover:bg-primary"
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{format(new Date(points[0].date), "MMM d")}</span>
        <span>{format(new Date(points[points.length - 1].date), "MMM d")}</span>
      </div>
    </div>
  );
}

export default function ManagerRepProfile({
  userId,
  profile: initialProfile,
  flags: initialFlags,
  assignments: initialAssignments,
  period: initialPeriod,
}: ManagerRepProfileProps) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [flags] = useState(initialFlags);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [period, setPeriod] = useState(initialPeriod);
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState<{ id: string; name: string }[]>([]);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [assigning, setAssigning] = useState(false);

  const loadScenarios = async () => {
    if (scenarios.length > 0) return;
    const res = await fetch("/api/manager/scenarios");
    const data = await res.json();
    setScenarios(data.scenarios || []);
  };

  const changePeriod = async (next: AnalyticsPeriod) => {
    setPeriod(next);
    setLoading(true);
    router.replace(`/manager/reps/${userId}?period=${next}`);
    try {
      const res = await fetch(`/api/manager/reps/${userId}?period=${next}`);
      const data = await res.json();
      if (data.profile) setProfile(data.profile);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedScenario) return;
    setAssigning(true);
    try {
      const res = await fetch(`/api/manager/scenarios/${selectedScenario}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, note: "Assigned from rep profile" }),
      });
      if (res.ok) {
        setSelectedScenario("");
        const profileRes = await fetch(`/api/manager/reps/${userId}?period=${period}`);
        const data = await profileRes.json();
        if (data.assignments) setAssignments(data.assignments);
      }
    } finally {
      setAssigning(false);
    }
  };

  const openFlags = flags.filter((f) => f.status === "open");

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link
            href="/manager/reps"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to scoreboard
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {profile.name}
              </h2>
              {profile.needsReview && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="h-3 w-3" />
                  Needs review
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{profile.email}</p>
            {profile.title && (
              <p className="mt-0.5 text-sm text-muted-foreground">{profile.title}</p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
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

        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Updating profile…
          </div>
        ) : (
          <>
            {/* KPI row */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Readiness",
                  value: profile.readiness != null ? `${profile.readiness}/10` : "—",
                  icon: Target,
                },
                {
                  label: "Sessions (period)",
                  value: String(profile.sessionsInPeriod),
                  icon: MessageSquare,
                },
                {
                  label: "Total sessions",
                  value: String(profile.totalSessions),
                  icon: TrendingUp,
                },
                {
                  label: "Last practice",
                  value: profile.lastPracticeDate
                    ? formatDistanceToNow(new Date(profile.lastPracticeDate), {
                        addSuffix: true,
                      })
                    : "Never",
                  icon: Clock,
                },
              ].map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={kpi.label}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                      {kpi.label}
                    </div>
                    <p className="text-xl font-semibold text-foreground">{kpi.value}</p>
                  </div>
                );
              })}
            </div>

            <p className="mb-8 text-sm">
              <DeltaText delta={profile.readinessDelta} />
            </p>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Skill breakdown */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-4 text-sm font-medium text-foreground">Skill breakdown</h3>
                <ul className="space-y-3">
                  {profile.skills.map((skill) => (
                    <li key={skill.skill}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-foreground">{skill.label}</span>
                        <span className="font-medium tabular-nums">
                          {skill.average > 0 ? skill.average : "—"}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary/80"
                          style={{ width: `${Math.min(100, (skill.average / 10) * 100)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>
                    Strongest:{" "}
                    <span className="text-foreground font-medium">
                      {skillLabel(profile.strongestSkill)}
                    </span>
                  </span>
                  <span>
                    Weakest:{" "}
                    <span className="text-foreground font-medium">
                      {skillLabel(profile.weakestSkill)}
                    </span>
                  </span>
                </div>
              </div>

              {/* Readiness trend */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-1 text-sm font-medium text-foreground">
                  Readiness trend
                </h3>
                <p className="mb-4 text-xs text-muted-foreground">
                  Session scores over the last {PERIOD_LABELS[period].toLowerCase()}
                </p>
                <ReadinessTrend points={profile.sessionTrend} />
              </div>

              {/* Flag timeline */}
              <div className="rounded-lg border border-border bg-card p-5 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Coaching flag timeline</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {openFlags.length} open · {flags.length} total
                    </p>
                  </div>
                  {openFlags.length > 0 && (
                    <Link href="/manager/coaching">
                      <Button variant="outline" size="sm">
                        Open coaching queue
                      </Button>
                    </Link>
                  )}
                </div>
                {flags.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    No coaching flags recorded for this rep.
                  </p>
                ) : (
                  <ol className="space-y-0">
                    {flags.map((flag, index) => (
                      <li key={flag.id} className="flex gap-4">
                        <div
                          className="relative flex w-5 shrink-0 justify-center"
                          aria-hidden
                        >
                          {index < flags.length - 1 && (
                            <span className="absolute left-1/2 top-[0.875rem] bottom-0 w-px -translate-x-1/2 bg-border" />
                          )}
                          <span className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full border-2 border-card bg-primary shadow-[0_0_0_1px_rgba(128,128,128,0.25)]" />
                        </div>
                        <div
                          className={`min-w-0 flex-1 ${
                            index < flags.length - 1 ? "pb-6" : "pb-0.5"
                          }`}
                        >
                          <div className="mb-1.5 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-foreground">
                              {FLAG_LABELS[flag.type]}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs ${FLAG_STATUS_STYLES[flag.status]}`}
                            >
                              {flag.status}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(flag.createdAt), "MMM d, yyyy")}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {flag.reason}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {/* Recent sessions */}
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">Recent sessions</h3>
                  <Link
                    href={`/manager/sessions?rep=${userId}`}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>
                {profile.recentSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No sessions yet.</p>
                ) : (
                  <ul className="divide-y divide-border">
                    {profile.recentSessions.map((session) => (
                      <li key={session.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {session.callType || "Practice session"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(session.createdAt), "MMM d, yyyy · h:mm a")}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-sm font-medium tabular-nums">
                              {session.readiness ?? "—"}
                            </p>
                            <Link
                              href={`/manager/sessions?session=${session.id}`}
                              className="text-xs text-primary hover:underline"
                            >
                              Review
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Assignments + quick assign */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-4 text-sm font-medium text-foreground">
                  Scenario assignments
                </h3>
                {assignments.length === 0 ? (
                  <p className="mb-4 text-sm text-muted-foreground">
                    No assignments yet.
                  </p>
                ) : (
                  <ul className="mb-4 divide-y divide-border">
                    {assignments.slice(0, 5).map((a) => (
                      <li key={a.id} className="py-3 first:pt-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-foreground">{a.scenarioName}</p>
                          <span className="text-xs capitalize text-muted-foreground">
                            {a.status.replace("_", " ")}
                          </span>
                        </div>
                        {a.dueAt && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Due {format(new Date(a.dueAt), "MMM d")}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Assign scenario
                  </p>
                  <Select
                    value={selectedScenario}
                    onFocus={loadScenarios}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                  >
                    <option value="">Choose scenario…</option>
                    {scenarios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </Select>
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={!selectedScenario || assigning}
                    onClick={handleAssign}
                  >
                    {assigning ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Assign remediation"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
