import { query } from "@/lib/db";
import { listScenariosForCompany } from "@/lib/scenarios/queries";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import {
  type CanonicalSkillKey,
  weakestSkill,
} from "@/lib/scores";
import { normalizeScorecardPartial } from "@/lib/scores/normalize";
import { previousPeriodRange, resolveDateRange } from "./date-range";
import { SCORE_SQL } from "./sql";
import type { AnalyticsPeriod } from "./types";

export interface ScenarioPerformanceRow {
  scenarioId: string;
  name: string;
  callType: string | null;
  sessionCount: number;
  uniqueReps: number;
  avgReadiness: number | null;
  readinessDelta: number | null;
  strugglingReps: number;
  assignmentsTotal: number;
  assignmentsCompleted: number;
  assignmentCompletionRate: number | null;
  avgPracticeMinutes: number;
  weakestSkill: CanonicalSkillKey | null;
}

export interface ScenarioPerformanceReport {
  period: AnalyticsPeriod;
  rows: ScenarioPerformanceRow[];
  summary: {
    totalSessions: number;
    scenariosWithActivity: number;
    lowestReadinessName: string | null;
    highestVolumeName: string | null;
  };
}

const SESSION_SCENARIO_MATCH = `
  (ps."scenarioId" = s.id
   OR (ps."scenarioId" IS NULL AND ps."callType" IS NOT NULL AND ps."callType" = s."callType"))
`;

function round1(n: number | null): number | null {
  if (n == null || Number.isNaN(n)) return null;
  return Math.round(n * 10) / 10;
}

async function getScenarioSessionStats(
  companyId: string,
  from: string,
  to: string
) {
  return query<{
    scenarioId: string;
    name: string;
    callType: string | null;
    sessionCount: string;
    uniqueReps: string;
    avgReadiness: string | null;
    avgPracticeSeconds: string | null;
    clarity: string | null;
    curiosity: string | null;
    listening: string | null;
    flowControl: string | null;
    confidence: string | null;
    nextStep: string | null;
  }>(
    `SELECT
       s.id as "scenarioId",
       s.name,
       s."callType",
       COUNT(ps.id)::text as "sessionCount",
       COUNT(DISTINCT ps."userId")::text as "uniqueReps",
       AVG(${SCORE_SQL.readiness})::text as "avgReadiness",
       AVG(ps.duration)::text as "avgPracticeSeconds",
       AVG(${SCORE_SQL.clarity})::text as clarity,
       AVG(${SCORE_SQL.curiosity})::text as curiosity,
       AVG(${SCORE_SQL.listening})::text as listening,
       AVG(${SCORE_SQL.flowControl})::text as "flowControl",
       AVG(${SCORE_SQL.confidence})::text as confidence,
       AVG(${SCORE_SQL.nextStep})::text as "nextStep"
     FROM scenarios s
     LEFT JOIN practice_sessions ps ON ${SESSION_SCENARIO_MATCH}
     LEFT JOIN users u ON u.id = ps."userId"
       AND u."companyId" = $1
       AND u.role = 'user'
     WHERE s.active = true
       AND (s."companyId" IS NULL OR s."companyId" = $1)
       AND ps.id IS NOT NULL
       AND ps.scores IS NOT NULL
       AND ps."createdAt" >= $2::timestamptz
       AND ps."createdAt" <= $3::timestamptz
     GROUP BY s.id, s.name, s."callType"
     ORDER BY COUNT(ps.id) DESC, s.name`,
    [companyId, from, to]
  );
}

async function getStrugglingRepCounts(
  companyId: string,
  from: string,
  to: string
): Promise<Map<string, number>> {
  const rows = await query<{ scenarioId: string; count: string }>(
    `SELECT sub."scenarioId", COUNT(*)::text as count
     FROM (
       SELECT s.id as "scenarioId", ps."userId",
              AVG(${SCORE_SQL.readiness}) as avg_readiness
       FROM scenarios s
       JOIN practice_sessions ps ON ${SESSION_SCENARIO_MATCH}
       JOIN users u ON u.id = ps."userId"
         AND u."companyId" = $1
         AND u.role = 'user'
       WHERE s.active = true
         AND (s."companyId" IS NULL OR s."companyId" = $1)
         AND ps.scores IS NOT NULL
         AND ps."createdAt" >= $2::timestamptz
         AND ps."createdAt" <= $3::timestamptz
       GROUP BY s.id, ps."userId"
       HAVING AVG(${SCORE_SQL.readiness}) < 5
     ) sub
     GROUP BY sub."scenarioId"`,
    [companyId, from, to]
  );

  return new Map(rows.map((r) => [r.scenarioId, parseInt(r.count, 10)]));
}

async function getAssignmentStats(companyId: string) {
  const rows = await query<{
    scenarioId: string;
    total: string;
    completed: string;
  }>(
    `SELECT
       "scenarioId",
       COUNT(*)::text as total,
       COUNT(*) FILTER (WHERE status IN ('completed', 'passed'))::text as completed
     FROM scenario_assignments
     WHERE "companyId" = $1
     GROUP BY "scenarioId"`,
    [companyId]
  );

  return new Map(
    rows.map((r) => [
      r.scenarioId,
      {
        total: parseInt(r.total, 10),
        completed: parseInt(r.completed, 10),
      },
    ])
  );
}

function weakestFromAverages(row: {
  clarity: string | null;
  curiosity: string | null;
  listening: string | null;
  flowControl: string | null;
  confidence: string | null;
  nextStep: string | null;
}): CanonicalSkillKey | null {
  const partial = normalizeScorecardPartial({
    clarity: row.clarity != null ? Number(row.clarity) : null,
    curiosity: row.curiosity != null ? Number(row.curiosity) : null,
    listening: row.listening != null ? Number(row.listening) : null,
    flowControl: row.flowControl != null ? Number(row.flowControl) : null,
    confidence: row.confidence != null ? Number(row.confidence) : null,
    nextStep: row.nextStep != null ? Number(row.nextStep) : null,
  });
  return weakestSkill(partial);
}

export async function getScenarioPerformanceReport(
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<ScenarioPerformanceReport> {
  const range = resolveDateRange(period);
  const prevRange = previousPeriodRange(range);
  const from = range.from.toISOString();
  const to = range.to.toISOString();

  const [currentStats, prevStats, struggling, assignments] = await Promise.all([
    getScenarioSessionStats(companyId, from, to),
    getScenarioSessionStats(companyId, prevRange.from.toISOString(), prevRange.to.toISOString()),
    getStrugglingRepCounts(companyId, from, to),
    getAssignmentStats(companyId),
  ]);

  const prevReadiness = new Map(
    prevStats.map((r) => [r.scenarioId, round1(r.avgReadiness ? Number(r.avgReadiness) : null)])
  );

  const statsById = new Map(currentStats.map((r) => [r.scenarioId, r]));
  const allScenarios = await listScenariosForCompany(companyId);

  const rows: ScenarioPerformanceRow[] = allScenarios.map((scenario) => {
    const row = statsById.get(scenario.id);
    if (!row) {
      const assign = assignments.get(scenario.id) ?? { total: 0, completed: 0 };
      const assignmentCompletionRate =
        assign.total > 0 ? Math.round((assign.completed / assign.total) * 100) : null;
      return {
        scenarioId: scenario.id,
        name: scenario.name,
        callType: scenario.callType,
        sessionCount: 0,
        uniqueReps: 0,
        avgReadiness: null,
        readinessDelta: null,
        strugglingReps: 0,
        assignmentsTotal: assign.total,
        assignmentsCompleted: assign.completed,
        assignmentCompletionRate,
        avgPracticeMinutes: 0,
        weakestSkill: null,
      };
    }

    const sessionCount = parseInt(row.sessionCount, 10);
    const avgReadiness = round1(row.avgReadiness ? Number(row.avgReadiness) : null);
    const prev = prevReadiness.get(row.scenarioId) ?? null;
    const readinessDelta =
      avgReadiness != null && prev != null ? round1(avgReadiness - prev) : null;

    const assign = assignments.get(row.scenarioId) ?? { total: 0, completed: 0 };
    const assignmentCompletionRate =
      assign.total > 0 ? Math.round((assign.completed / assign.total) * 100) : null;

    return {
      scenarioId: row.scenarioId,
      name: row.name,
      callType: row.callType,
      sessionCount,
      uniqueReps: parseInt(row.uniqueReps, 10),
      avgReadiness,
      readinessDelta,
      strugglingReps: struggling.get(row.scenarioId) ?? 0,
      assignmentsTotal: assign.total,
      assignmentsCompleted: assign.completed,
      assignmentCompletionRate,
      avgPracticeMinutes: Math.round(Number(row.avgPracticeSeconds || 0) / 60),
      weakestSkill: weakestFromAverages(row),
    };
  }).sort((a, b) => b.sessionCount - a.sessionCount || a.name.localeCompare(b.name));

  const totalSessions = rows.reduce((sum, r) => sum + r.sessionCount, 0);
  const withActivity = rows.filter((r) => r.sessionCount > 0);

  const lowestReadiness = [...withActivity]
    .filter((r) => r.avgReadiness != null)
    .sort((a, b) => (a.avgReadiness ?? 10) - (b.avgReadiness ?? 10))[0];

  const highestVolume = withActivity[0] ?? null;

  return {
    period,
    rows,
    summary: {
      totalSessions,
      scenariosWithActivity: withActivity.length,
      lowestReadinessName: lowestReadiness?.name ?? null,
      highestVolumeName: highestVolume?.name ?? null,
    },
  };
}
