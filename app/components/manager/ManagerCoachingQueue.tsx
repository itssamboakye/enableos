"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  Target,
  User,
} from "lucide-react";
import type { CoachingFlag, CoachingFlagType } from "@/lib/coaching/types";
import type { Scenario } from "@/lib/scenarios/types";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

const FLAG_LABELS: Record<CoachingFlag["type"], string> = {
  inactive: "Inactive",
  score_drop: "Score drop",
  weak_skill: "Weak skill",
  low_readiness: "Low readiness",
  repeated_weak_skill: "Repeated weak skill",
};

const FLAG_TYPES: (CoachingFlagType | "all")[] = [
  "all",
  "inactive",
  "score_drop",
  "weak_skill",
  "low_readiness",
  "repeated_weak_skill",
];

export default function ManagerCoachingQueue() {
  const [flags, setFlags] = useState<CoachingFlag[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"open" | "acknowledged" | "resolved">("open");
  const [typeFilter, setTypeFilter] = useState<CoachingFlagType | "all">("all");
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Record<string, string>>({});
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const skillLabel = (key: string | null) =>
    key ? SKILL_DEFINITIONS.find((s) => s.key === key)?.label ?? key : null;

  const fetchQueue = useCallback(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/manager/coaching/queue?status=${statusFilter}`).then((r) => r.json()),
      fetch("/api/manager/scenarios").then((r) => r.json()),
    ])
      .then(([queueData, scenarioData]) => {
        setFlags(queueData.flags || []);
        setScenarios(scenarioData.scenarios || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const handleAssign = async (flag: CoachingFlag) => {
    const scenarioId = selectedScenario[flag.id];
    if (!scenarioId) return;

    setAssigningId(flag.id);
    try {
      const res = await fetch("/api/manager/coaching/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flagId: flag.id, scenarioId }),
      });
      if (res.ok) {
        fetchQueue();
      }
    } finally {
      setAssigningId(null);
    }
  };

  const handleResolve = async (flagId: string) => {
    setResolvingId(flagId);
    try {
      const res = await fetch(`/api/manager/coaching/flags/${flagId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resolved" }),
      });
      if (res.ok) {
        fetchQueue();
      }
    } finally {
      setResolvingId(null);
    }
  };

  const filteredFlags = useMemo(() => {
    if (typeFilter === "all") return flags;
    return flags.filter((f) => f.type === typeFilter);
  }, [flags, typeFilter]);

  const typeCounts = useMemo(() => {
    const counts: Partial<Record<CoachingFlagType, number>> = {};
    for (const flag of flags) {
      counts[flag.type] = (counts[flag.type] || 0) + 1;
    }
    return counts;
  }, [flags]);

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Coaching queue
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Reps flagged for inactivity, score drops, or repeated weak skills.
              Assign a remediation scenario to coach them.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {(["open", "acknowledged", "resolved"] as const).map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {!loading && flags.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{flags.length} flags</span>
            {Object.entries(typeCounts).map(([type, count]) => (
              <span key={type}>
                · {count} {FLAG_LABELS[type as CoachingFlagType].toLowerCase()}
              </span>
            ))}
          </div>
        )}

        {statusFilter === "open" && !loading && (
          <div className="mb-4 flex flex-wrap gap-2">
            {FLAG_TYPES.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "secondary" : "ghost"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => setTypeFilter(type)}
              >
                {type === "all" ? "All types" : FLAG_LABELS[type]}
              </Button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Loading queue…
          </div>
        ) : filteredFlags.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-medium text-foreground">
              No {statusFilter} coaching flags
              {typeFilter !== "all" ? ` for ${FLAG_LABELS[typeFilter].toLowerCase()}` : ""}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Flags appear when reps go inactive or score below thresholds after practice sessions.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredFlags.map((flag) => (
              <li
                key={flag.id}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_17rem]">
                  {/* Flag details */}
                  <div className="space-y-3 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        {FLAG_LABELS[flag.type]}
                      </span>
                      {flag.skill && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground">
                          <Target className="h-3 w-3 shrink-0 text-muted-foreground" />
                          {skillLabel(flag.skill)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 shrink-0" />
                        {formatDistanceToNow(new Date(flag.createdAt), { addSuffix: true })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <Link
                        href={`/manager/reps/${flag.userId}`}
                        className="text-sm font-medium text-foreground hover:text-primary hover:underline"
                      >
                        {flag.userName}
                      </Link>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {flag.reason}
                    </p>

                    {flag.suggestedAction && (
                      <p className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm leading-relaxed text-foreground">
                        {flag.suggestedAction}
                      </p>
                    )}

                    {flag.evidenceSessionIds.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-0.5">
                        {flag.evidenceSessionIds.slice(0, 3).map((sid) => (
                          <Link
                            key={sid}
                            href={`/manager/sessions?session=${sid}`}
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            View session
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 border-t border-border bg-muted/20 p-4 sm:p-5 lg:border-l lg:border-t-0">
                    {flag.status === "open" ? (
                      <>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Remediation
                        </p>
                        <Select
                          value={selectedScenario[flag.id] || ""}
                          onChange={(e) =>
                            setSelectedScenario((prev) => ({
                              ...prev,
                              [flag.id]: e.target.value,
                            }))
                          }
                          aria-label={`Choose scenario for ${flag.userName}`}
                        >
                          <option value="">Choose scenario…</option>
                          {scenarios.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </Select>
                        <Button
                          className="w-full"
                          size="sm"
                          disabled={
                            !selectedScenario[flag.id] || assigningId === flag.id
                          }
                          onClick={() => handleAssign(flag)}
                        >
                          {assigningId === flag.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Assign remediation"
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-muted-foreground"
                          disabled={resolvingId === flag.id}
                          onClick={() => handleResolve(flag.id)}
                        >
                          Mark resolved
                        </Button>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground capitalize">
                        Status: {flag.status}
                      </p>
                    )}
                    <Link
                      href={`/manager/reps/${flag.userId}`}
                      className="text-center text-xs font-medium text-primary hover:underline"
                    >
                      View rep profile
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
