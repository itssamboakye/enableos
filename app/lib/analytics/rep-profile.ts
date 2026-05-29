import { query, queryOne } from "@/lib/db";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import {
  readinessFromProgress,
  strongestSkill,
  weakestSkill,
} from "@/lib/scores";
import { normalizeScorecardPartial } from "@/lib/scores/normalize";
import { previousPeriodRange, resolveDateRange } from "./date-range";
import { SCORE_SQL } from "./sql";
import type {
  AnalyticsPeriod,
  RepProfile,
  RepRecentSession,
  RepSessionTrendPoint,
  RepSkillSnapshot,
} from "./types";

async function assertRepInCompany(userId: string, companyId: string) {
  const user = await queryOne<{
    id: string;
    email: string;
    name: string | null;
    title: string | null;
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
       u.title,
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
     WHERE u.id = $1 AND u."companyId" = $2 AND u.role = 'user'`,
    [userId, companyId]
  );

  return user;
}

export async function getRepProfile(
  userId: string,
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<RepProfile | null> {
  const user = await assertRepInCompany(userId, companyId);
  if (!user) return null;

  const range = resolveDateRange(period);
  const prevRange = previousPeriodRange(range);

  const scores = normalizeScorecardPartial({
    clarity: user.averageClarity,
    curiosity: user.averageCuriosity,
    listening: user.averageListening,
    flowControl: user.averageFlowControl,
    confidence: user.averageConfidence,
    nextStep: user.averageNextStep,
  });

  const readiness = readinessFromProgress({
    averageClarity: user.averageClarity,
    averageCuriosity: user.averageCuriosity,
    averageListening: user.averageListening,
    averageFlowControl: user.averageFlowControl,
    averageConfidence: user.averageConfidence,
    averageNextStep: user.averageNextStep,
  });

  const [sessionsInPeriod, readinessCurrent, readinessPrevious, trendRows, recentRows] =
    await Promise.all([
      queryOne<{ count: string }>(
        `SELECT COUNT(*)::text as count
         FROM practice_sessions
         WHERE "userId" = $1
           AND "createdAt" >= $2::timestamptz
           AND "createdAt" <= $3::timestamptz`,
        [userId, range.from.toISOString(), range.to.toISOString()]
      ),
      queryOne<{ avg: string | null }>(
        `SELECT AVG(${SCORE_SQL.readiness})::text as avg
         FROM practice_sessions ps
         WHERE ps."userId" = $1
           AND ps.scores IS NOT NULL
           AND ps."createdAt" >= $2::timestamptz
           AND ps."createdAt" <= $3::timestamptz`,
        [userId, range.from.toISOString(), range.to.toISOString()]
      ),
      queryOne<{ avg: string | null }>(
        `SELECT AVG(${SCORE_SQL.readiness})::text as avg
         FROM practice_sessions ps
         WHERE ps."userId" = $1
           AND ps.scores IS NOT NULL
           AND ps."createdAt" >= $2::timestamptz
           AND ps."createdAt" <= $3::timestamptz`,
        [userId, prevRange.from.toISOString(), prevRange.to.toISOString()]
      ),
      query<{
        id: string;
        createdAt: Date;
        callType: string | null;
        readiness: string;
      }>(
        `SELECT ps.id, ps."createdAt", ps."callType",
                ${SCORE_SQL.readiness}::text as readiness
         FROM practice_sessions ps
         WHERE ps."userId" = $1
           AND ps.scores IS NOT NULL
           AND ps."createdAt" >= $2::timestamptz
           AND ps."createdAt" <= $3::timestamptz
         ORDER BY ps."createdAt" ASC
         LIMIT 30`,
        [userId, range.from.toISOString(), range.to.toISOString()]
      ),
      query<{
        id: string;
        createdAt: Date;
        duration: number | null;
        callType: string | null;
        readiness: string | null;
      }>(
        `SELECT ps.id, ps."createdAt", ps.duration, ps."callType",
                ${SCORE_SQL.readiness}::text as readiness
         FROM practice_sessions ps
         WHERE ps."userId" = $1
         ORDER BY ps."createdAt" DESC
         LIMIT 10`,
        [userId]
      ),
    ]);

  const periodReadiness =
    readinessCurrent?.avg != null
      ? Math.round(Number(readinessCurrent.avg) * 10) / 10
      : null;
  const prevPeriodReadiness =
    readinessPrevious?.avg != null
      ? Math.round(Number(readinessPrevious.avg) * 10) / 10
      : null;
  const readinessDelta =
    periodReadiness != null && prevPeriodReadiness != null
      ? Math.round((periodReadiness - prevPeriodReadiness) * 10) / 10
      : null;

  const lastPractice = user.lastSessionDate;
  const inactive =
    !lastPractice ||
    Date.now() - new Date(lastPractice).getTime() > 7 * 24 * 60 * 60 * 1000;
  const lowReadiness = readiness != null && readiness < 5;

  const skills: RepSkillSnapshot[] = SKILL_DEFINITIONS.map((def) => ({
    skill: def.key,
    label: def.label,
    average: Math.round((scores[def.key] ?? 0) * 10) / 10,
  }));

  const sessionTrend: RepSessionTrendPoint[] = trendRows.map((row) => ({
    sessionId: row.id,
    date: new Date(row.createdAt).toISOString(),
    readiness: Math.round(Number(row.readiness) * 10) / 10,
    callType: row.callType,
  }));

  const recentSessions: RepRecentSession[] = recentRows.map((row) => ({
    id: row.id,
    createdAt: new Date(row.createdAt).toISOString(),
    duration: row.duration,
    callType: row.callType,
    readiness:
      row.readiness != null ? Math.round(Number(row.readiness) * 10) / 10 : null,
  }));

  return {
    userId: user.id,
    name: user.name || user.email,
    email: user.email,
    title: user.title,
    readiness,
    readinessDelta,
    totalSessions: user.totalSessions,
    sessionsInPeriod: parseInt(sessionsInPeriod?.count || "0", 10),
    lastPracticeDate: lastPractice ? new Date(lastPractice).toISOString() : null,
    strongestSkill: strongestSkill(scores),
    weakestSkill: weakestSkill(scores),
    needsReview: inactive || lowReadiness,
    skills,
    sessionTrend,
    recentSessions,
  };
}
