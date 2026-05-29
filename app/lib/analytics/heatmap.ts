import { query } from "@/lib/db";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import { CANONICAL_SKILL_KEYS, type CanonicalSkillKey } from "@/lib/scores";
import { resolveDateRange } from "./date-range";
import { SCORE_SQL } from "./sql";
import type { AnalyticsPeriod } from "./types";

export interface HeatmapCell {
  average: number | null;
  sessionCount: number;
}

export interface HeatmapRow {
  userId: string;
  name: string;
  email: string;
  cells: Record<CanonicalSkillKey, HeatmapCell>;
  readiness: number | null;
}

export interface TeamSkillHeatmap {
  period: AnalyticsPeriod;
  skills: { key: CanonicalSkillKey; label: string }[];
  rows: HeatmapRow[];
  teamAverages: Record<CanonicalSkillKey, number | null>;
}

function emptyCells(): Record<CanonicalSkillKey, HeatmapCell> {
  return Object.fromEntries(
    CANONICAL_SKILL_KEYS.map((key) => [key, { average: null, sessionCount: 0 }])
  ) as Record<CanonicalSkillKey, HeatmapCell>;
}

export async function getTeamSkillHeatmap(
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<TeamSkillHeatmap> {
  const range = resolveDateRange(period);

  const reps = await query<{
    id: string;
    email: string;
    name: string | null;
  }>(
    `SELECT u.id, u.email, u.name
     FROM users u
     WHERE u."companyId" = $1 AND u.role = 'user'
     ORDER BY u.name NULLS LAST, u.email`,
    [companyId]
  );

  const skillAvgs = await query<{
    userId: string;
    clarity: string | null;
    curiosity: string | null;
    listening: string | null;
    flowControl: string | null;
    confidence: string | null;
    nextStep: string | null;
    sessionCount: string;
    readiness: string | null;
  }>(
    `SELECT
       ps."userId",
       AVG(${SCORE_SQL.clarity})::text as clarity,
       AVG(${SCORE_SQL.curiosity})::text as curiosity,
       AVG(${SCORE_SQL.listening})::text as listening,
       AVG(${SCORE_SQL.flowControl})::text as "flowControl",
       AVG(${SCORE_SQL.confidence})::text as confidence,
       AVG(${SCORE_SQL.nextStep})::text as "nextStep",
       COUNT(*)::text as "sessionCount",
       AVG(${SCORE_SQL.readiness})::text as readiness
     FROM practice_sessions ps
     JOIN users u ON u.id = ps."userId"
     WHERE u."companyId" = $1
       AND u.role = 'user'
       AND ps.scores IS NOT NULL
       AND ps."createdAt" >= $2::timestamptz
       AND ps."createdAt" <= $3::timestamptz
     GROUP BY ps."userId"`,
    [companyId, range.from.toISOString(), range.to.toISOString()]
  );

  const byUser = new Map(skillAvgs.map((r) => [r.userId, r]));

  const teamTotals: Record<CanonicalSkillKey, { sum: number; count: number }> =
    Object.fromEntries(
      CANONICAL_SKILL_KEYS.map((k) => [k, { sum: 0, count: 0 }])
    ) as Record<CanonicalSkillKey, { sum: number; count: number }>;

  const rows: HeatmapRow[] = reps.map((rep) => {
    const data = byUser.get(rep.id);
    const cells = emptyCells();

    if (data) {
      for (const key of CANONICAL_SKILL_KEYS) {
        const raw = data[key];
        const avg = raw != null ? Math.round(Number(raw) * 10) / 10 : null;
        const sessionCount = parseInt(data.sessionCount, 10);
        cells[key] = { average: avg && avg > 0 ? avg : null, sessionCount };
        if (avg != null && avg > 0) {
          teamTotals[key].sum += avg;
          teamTotals[key].count += 1;
        }
      }
    }

    const readiness =
      data?.readiness != null ? Math.round(Number(data.readiness) * 10) / 10 : null;

    return {
      userId: rep.id,
      name: rep.name || rep.email,
      email: rep.email,
      cells,
      readiness: readiness && readiness > 0 ? readiness : null,
    };
  });

  const teamAverages = Object.fromEntries(
    CANONICAL_SKILL_KEYS.map((key) => {
      const { sum, count } = teamTotals[key];
      return [
        key,
        count > 0 ? Math.round((sum / count) * 10) / 10 : null,
      ];
    })
  ) as Record<CanonicalSkillKey, number | null>;

  return {
    period,
    skills: SKILL_DEFINITIONS.map((s) => ({ key: s.key, label: s.label })),
    rows,
    teamAverages,
  };
}
