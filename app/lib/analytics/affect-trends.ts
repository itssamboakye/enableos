import { query, queryOne } from "@/lib/db";
import { resolveDateRange } from "./date-range";
import { COMPANY_SESSION_JOIN } from "./sql";
import {
  aggregateTeamAffectTrends,
  type AffectSessionRow,
  type TeamAffectTrends,
} from "./aggregate-affect";
import type { AnalyticsPeriod } from "./types";

export type { TeamAffectTrends } from "./aggregate-affect";
export { formatAffectLabel, topFaceLabels } from "./aggregate-affect";

export async function getTeamAffectTrends(
  companyId: string,
  period: AnalyticsPeriod = "30d"
): Promise<TeamAffectTrends> {
  const range = resolveDateRange(period);
  const params = [companyId, range.from.toISOString(), range.to.toISOString()];

  const totalRow = await queryOne<{ count: string }>(
    `SELECT COUNT(*)::text as count
     ${COMPANY_SESSION_JOIN}
       AND ps."createdAt" >= $2::timestamptz
       AND ps."createdAt" <= $3::timestamptz`,
    params
  );

  const rows = await query<AffectSessionRow>(
    `SELECT
       ps.id as "sessionId",
       ps."userId",
       COALESCE(u.name, u.email) as "userName",
       ps."createdAt"::text as "createdAt",
       ps."callType",
       ps.scores,
       ps."affectSummary"
     ${COMPANY_SESSION_JOIN}
       AND ps."affectSummary" IS NOT NULL
       AND ps."createdAt" >= $2::timestamptz
       AND ps."createdAt" <= $3::timestamptz
     ORDER BY ps."createdAt" DESC`,
    params
  );

  return aggregateTeamAffectTrends(
    rows,
    period,
    parseInt(totalRow?.count ?? "0", 10)
  );
}
