/**
 * SQL fragments for reading scores JSON with legacy key aliases.
 * Use in SELECT lists with table alias `ps` for practice_sessions.
 */
export const SCORE_SQL = {
  clarity: `COALESCE((ps.scores->>'clarity')::numeric, 0)`,
  curiosity: `COALESCE((ps.scores->>'curiosity')::numeric, 0)`,
  listening: `COALESCE((ps.scores->>'listening')::numeric, 0)`,
  flowControl: `COALESCE((ps.scores->>'flowControl')::numeric, (ps.scores->>'flow')::numeric, 0)`,
  confidence: `COALESCE((ps.scores->>'confidence')::numeric, 0)`,
  nextStep: `COALESCE((ps.scores->>'nextStep')::numeric, (ps.scores->>'nextSteps')::numeric, 0)`,
  readiness: `COALESCE(
    (ps.scores->>'readiness')::numeric,
    (
      COALESCE((ps.scores->>'clarity')::numeric, 0) +
      COALESCE((ps.scores->>'curiosity')::numeric, 0) +
      COALESCE((ps.scores->>'listening')::numeric, 0) +
      COALESCE((ps.scores->>'flowControl')::numeric, (ps.scores->>'flow')::numeric, 0) +
      COALESCE((ps.scores->>'confidence')::numeric, 0) +
      COALESCE((ps.scores->>'nextStep')::numeric, (ps.scores->>'nextSteps')::numeric, 0)
    ) / NULLIF(
      (CASE WHEN COALESCE((ps.scores->>'clarity')::numeric, 0) > 0 THEN 1 ELSE 0 END) +
      (CASE WHEN COALESCE((ps.scores->>'curiosity')::numeric, 0) > 0 THEN 1 ELSE 0 END) +
      (CASE WHEN COALESCE((ps.scores->>'listening')::numeric, 0) > 0 THEN 1 ELSE 0 END) +
      (CASE WHEN COALESCE((ps.scores->>'flowControl')::numeric, (ps.scores->>'flow')::numeric, 0) > 0 THEN 1 ELSE 0 END) +
      (CASE WHEN COALESCE((ps.scores->>'confidence')::numeric, 0) > 0 THEN 1 ELSE 0 END) +
      (CASE WHEN COALESCE((ps.scores->>'nextStep')::numeric, (ps.scores->>'nextSteps')::numeric, 0) > 0 THEN 1 ELSE 0 END),
      0
    )
  )`,
} as const;

export const COMPANY_SESSION_JOIN = `
  FROM practice_sessions ps
  JOIN users u ON u.id = ps."userId"
  WHERE u."companyId" = $1
`;
