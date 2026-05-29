import { query, queryOne } from "@/lib/db";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import {
  readinessFromProgress,
  strongestSkill,
  weakestSkill,
} from "@/lib/scores";
import { normalizeScorecardPartial } from "@/lib/scores/normalize";
import { previousPeriodRange, resolveDateRange } from "./date-range";
import { COMPANY_SESSION_JOIN, SCORE_SQL } from "./sql";
import type {
  AnalyticsPeriod,
  CompanyOverviewMetrics,
  DateRange,
  ImprovingRep,
  RepScoreboardRow,
  TeamSkillAverage,
} from "./types";

function companyFilterParams(companyId: string, range: DateRange) {
  return [companyId, range.from.toISOString(), range.to.toISOString()];
}

async function avgReadinessInRange(companyId: string, range: DateRange): Promise<number | null> {
  const row = await queryOne<{ avg: string | null }>(
    `SELECT AVG(${SCORE_SQL.readiness}) as avg
     ${COMPANY_SESSION_JOIN}
       AND ps.scores IS NOT NULL
       AND ps."createdAt" >= $2::timestamptz
       AND ps."createdAt" <= $3::timestamptz`,
    companyFilterParams(companyId, range)
  );
  if (row?.avg == null) return null;
  const n = Number(row.avg);
  return Number.isNaN(n) ? null : Math.round(n * 10) / 10;
}

async function getTeamSkillAverages(
  companyId: string,
  range: DateRange
): Promise<TeamSkillAverage[]> {
  const row = await queryOne<Record<string, string | null>>(
    `SELECT
       AVG(${SCORE_SQL.clarity}) as clarity,
       AVG(${SCORE_SQL.curiosity}) as curiosity,
       AVG(${SCORE_SQL.listening}) as listening,
       AVG(${SCORE_SQL.flowControl}) as "flowControl",
       AVG(${SCORE_SQL.confidence}) as confidence,
       AVG(${SCORE_SQL.nextStep}) as "nextStep"
     ${COMPANY_SESSION_JOIN}
       AND ps.scores IS NOT NULL
       AND ps."createdAt" >= $2::timestamptz
       AND ps."createdAt" <= $3::timestamptz`,
    companyFilterParams(companyId, range)
  );

  if (!row) return [];

  const averages: TeamSkillAverage[] = SKILL_DEFINITIONS.map((def) => ({
    skill: def.key,
    label: def.label,
    average: Math.round(Number(row[def.key] ?? 0) * 10) / 10,
  }));

  return averages.sort((a, b) => a.average - b.average);
}

async function countRepsAtRisk(companyId: string): Promise<number> {
  const row = await queryOne<{ count: string }>(
    `SELECT COUNT(*)::text as count
     FROM users u
     LEFT JOIN progress p ON p."userId" = u.id
     WHERE u."companyId" = $1
       AND u.role = 'user'
       AND (
         p."lastSessionDate" IS NULL
         OR p."lastSessionDate" < NOW() - INTERVAL '7 days'
         OR (
           p."averageClarity" IS NOT NULL
           AND ${readinessAtRiskSql()}
         )
       )`,
    [companyId]
  );
  return parseInt(row?.count || "0", 10);
}

/** SQL helper: true when progress averages imply readiness < 5 */
function readinessAtRiskSql(): string {
  return `(
    COALESCE(p."averageClarity", 0) +
    COALESCE(p."averageCuriosity", 0) +
    COALESCE(p."averageListening", 0) +
    COALESCE(p."averageFlowControl", 0) +
    COALESCE(p."averageConfidence", 0) +
    COALESCE(p."averageNextStep", 0)
  ) / 6.0 < 5`;
}

async function getTopImprovingReps(
  companyId: string,
  limit = 5
): Promise<ImprovingRep[]> {
  const rows = await query<{
    userId: string;
    name: string | null;
    email: string;
    recentAvg: string | null;
    priorAvg: string | null;
  }>(
    `WITH recent AS (
       SELECT ps."userId", AVG(${SCORE_SQL.readiness}) as avg
       ${COMPANY_SESSION_JOIN}
         AND ps.scores IS NOT NULL
         AND ps."createdAt" >= NOW() - INTERVAL '14 days'
       GROUP BY ps."userId"
     ),
     prior AS (
       SELECT ps."userId", AVG(${SCORE_SQL.readiness}) as avg
       ${COMPANY_SESSION_JOIN}
         AND ps.scores IS NOT NULL
         AND ps."createdAt" >= NOW() - INTERVAL '28 days'
         AND ps."createdAt" < NOW() - INTERVAL '14 days'
       GROUP BY ps."userId"
     )
     SELECT
       u.id as "userId",
       u.name,
       u.email,
       recent.avg::text as "recentAvg",
       prior.avg::text as "priorAvg"
     FROM users u
     JOIN recent ON recent."userId" = u.id
     LEFT JOIN prior ON prior."userId" = u.id
     WHERE u."companyId" = $1 AND u.role = 'user'
     ORDER BY (recent.avg - COALESCE(prior.avg, 0)) DESC
     LIMIT $2`,
    [companyId, limit]
  );

  return rows
    .map((r) => {
      const recent = Number(r.recentAvg ?? 0);
      const prior = Number(r.priorAvg ?? 0);
      return {
        userId: r.userId,
        name: r.name || r.email,
        email: r.email,
        readinessDelta: Math.round((recent - prior) * 10) / 10,
        currentReadiness: Math.round(recent * 10) / 10,
      };
    })
    .filter((r) => r.readinessDelta > 0);
}

export async function getCompanyOverviewMetrics(
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<CompanyOverviewMetrics> {
  const range = resolveDateRange(period);
  const range7 = resolveDateRange("7d");
  const prev7 = previousPeriodRange(range7);
  const range30 = resolveDateRange("30d");
  const prev30 = previousPeriodRange(range30);

  const [
    activeRepsThisWeek,
    sessionsCompleted,
    completedInRange,
    totalInRange,
    totalPracticeSeconds,
    avgReadiness,
    readinessNow7,
    readinessPrev7,
    readinessNow30,
    readinessPrev30,
    repsAtRisk,
    topImprovingReps,
    weakestSkills,
  ] = await Promise.all([
    queryOne<{ count: string }>(
      `SELECT COUNT(DISTINCT ps."userId")::text as count
       ${COMPANY_SESSION_JOIN}
         AND ps."createdAt" >= NOW() - INTERVAL '7 days'`,
      [companyId]
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*)::text as count
       ${COMPANY_SESSION_JOIN}
         AND ps.duration IS NOT NULL
         AND ps."createdAt" >= $2::timestamptz
         AND ps."createdAt" <= $3::timestamptz`,
      companyFilterParams(companyId, range)
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*)::text as count
       ${COMPANY_SESSION_JOIN}
         AND ps.duration IS NOT NULL
         AND ps."createdAt" >= $2::timestamptz
         AND ps."createdAt" <= $3::timestamptz`,
      companyFilterParams(companyId, range)
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*)::text as count
       ${COMPANY_SESSION_JOIN}
         AND ps."createdAt" >= $2::timestamptz
         AND ps."createdAt" <= $3::timestamptz`,
      companyFilterParams(companyId, range)
    ),
    queryOne<{ sum: string | null }>(
      `SELECT COALESCE(SUM(ps.duration), 0)::text as sum
       ${COMPANY_SESSION_JOIN}
         AND ps.duration IS NOT NULL
         AND ps."createdAt" >= $2::timestamptz
         AND ps."createdAt" <= $3::timestamptz`,
      companyFilterParams(companyId, range)
    ),
    avgReadinessInRange(companyId, range),
    avgReadinessInRange(companyId, range7),
    avgReadinessInRange(companyId, prev7),
    avgReadinessInRange(companyId, range30),
    avgReadinessInRange(companyId, prev30),
    countRepsAtRisk(companyId),
    getTopImprovingReps(companyId),
    getTeamSkillAverages(companyId, range),
  ]);

  const total = parseInt(totalInRange?.count || "0", 10);
  const completed = parseInt(completedInRange?.count || "0", 10);

  const delta = (now: number | null, prev: number | null) =>
    now != null && prev != null ? Math.round((now - prev) * 10) / 10 : null;

  return {
    activeRepsThisWeek: parseInt(activeRepsThisWeek?.count || "0", 10),
    sessionsCompleted: parseInt(sessionsCompleted?.count || "0", 10),
    avgReadiness,
    readinessChange7d: delta(readinessNow7, readinessPrev7),
    readinessChange30d: delta(readinessNow30, readinessPrev30),
    totalPracticeMinutes: Math.round(Number(totalPracticeSeconds?.sum || 0) / 60),
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    repsAtRisk,
    topImprovingReps,
    weakestSkills: weakestSkills.slice(0, 3),
  };
}

export async function getRepScoreboard(
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<RepScoreboardRow[]> {
  const range = resolveDateRange(period);
  const prevRange = previousPeriodRange(range);

  const users = await query<{
    id: string;
    email: string;
    name: string | null;
    totalSessions: number;
    lastSessionDate: Date | null;
    averageClarity: number | null;
    averageCuriosity: number | null;
    averageListening: number | null;
    averageFlowControl: number | null;
    averageConfidence: number | null;
    averageNextStep: number | null;
  }>(
    `SELECT
       u.id,
       u.email,
       u.name,
       COALESCE(p."totalSessions", 0) as "totalSessions",
       p."lastSessionDate",
       p."averageClarity",
       p."averageCuriosity",
       p."averageListening",
       p."averageFlowControl",
       p."averageConfidence",
       p."averageNextStep"
     FROM users u
     LEFT JOIN progress p ON p."userId" = u.id
     WHERE u."companyId" = $1 AND u.role = 'user'
     ORDER BY u.name NULLS LAST, u.email`,
    [companyId]
  );

  const sessionCounts = await query<{ userId: string; count: string }>(
    `SELECT ps."userId", COUNT(*)::text as count
     ${COMPANY_SESSION_JOIN}
       AND ps."createdAt" >= $2::timestamptz
       AND ps."createdAt" <= $3::timestamptz
     GROUP BY ps."userId"`,
    companyFilterParams(companyId, range)
  );

  const countByUser = new Map(sessionCounts.map((r) => [r.userId, parseInt(r.count, 10)]));

  const [readinessCurrent, readinessPrevious] = await Promise.all([
    query<{ userId: string; avg: string }>(
      `SELECT ps."userId", AVG(${SCORE_SQL.readiness})::text as avg
       ${COMPANY_SESSION_JOIN}
         AND ps.scores IS NOT NULL
         AND ps."createdAt" >= $2::timestamptz
         AND ps."createdAt" <= $3::timestamptz
       GROUP BY ps."userId"`,
      companyFilterParams(companyId, range)
    ),
    query<{ userId: string; avg: string }>(
      `SELECT ps."userId", AVG(${SCORE_SQL.readiness})::text as avg
       ${COMPANY_SESSION_JOIN}
         AND ps.scores IS NOT NULL
         AND ps."createdAt" >= $2::timestamptz
         AND ps."createdAt" <= $3::timestamptz
       GROUP BY ps."userId"`,
      companyFilterParams(companyId, prevRange)
    ),
  ]);

  const readinessNowByUser = new Map(
    readinessCurrent.map((r) => [r.userId, Math.round(Number(r.avg) * 10) / 10])
  );
  const readinessPrevByUser = new Map(
    readinessPrevious.map((r) => [r.userId, Math.round(Number(r.avg) * 10) / 10])
  );

  return users.map((u) => {
    const scores = normalizeScorecardPartial({
      clarity: u.averageClarity,
      curiosity: u.averageCuriosity,
      listening: u.averageListening,
      flowControl: u.averageFlowControl,
      confidence: u.averageConfidence,
      nextStep: u.averageNextStep,
    });

    const readiness =
      readinessFromProgress({
        averageClarity: u.averageClarity,
        averageCuriosity: u.averageCuriosity,
        averageListening: u.averageListening,
        averageFlowControl: u.averageFlowControl,
        averageConfidence: u.averageConfidence,
        averageNextStep: u.averageNextStep,
      }) ?? null;

    const lastPractice = u.lastSessionDate;
    const inactive =
      !lastPractice ||
      Date.now() - new Date(lastPractice).getTime() > 7 * 24 * 60 * 60 * 1000;
    const lowReadiness = readiness != null && readiness < 5;

    const periodReadiness = readinessNowByUser.get(u.id) ?? null;
    const prevPeriodReadiness = readinessPrevByUser.get(u.id) ?? null;
    const readinessDelta =
      periodReadiness != null && prevPeriodReadiness != null
        ? Math.round((periodReadiness - prevPeriodReadiness) * 10) / 10
        : null;

    return {
      userId: u.id,
      name: u.name || u.email,
      email: u.email,
      readiness,
      readinessDelta,
      sessionsCompleted: countByUser.get(u.id) ?? 0,
      lastPracticeDate: lastPractice ? new Date(lastPractice).toISOString() : null,
      strongestSkill: strongestSkill(scores),
      weakestSkill: weakestSkill(scores),
      needsReview: inactive || lowReadiness,
    };
  });
}
