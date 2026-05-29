/**
 * Backfill practice_sessions.scores with canonical keys + readiness.
 * Run: pnpm exec tsx scripts/backfill-session-scores.ts
 */
import { query } from "../app/lib/db";
import { normalizeScorecard } from "../app/lib/scores";

async function main() {
  const rows = await query<{ id: string; scores: unknown; feedback: unknown }>(
    `SELECT id, scores, feedback FROM practice_sessions WHERE scores IS NOT NULL OR feedback IS NOT NULL`
  );

  let updated = 0;
  for (const row of rows) {
    const scores =
      typeof row.scores === "string" ? JSON.parse(row.scores) : row.scores;
    const feedback =
      typeof row.feedback === "string" ? JSON.parse(row.feedback) : row.feedback;
    const normalized =
      normalizeScorecard(scores) ??
      normalizeScorecard(
        feedback && typeof feedback === "object" && "scorecard" in feedback
          ? (feedback as { scorecard: Record<string, unknown> }).scorecard
          : null
      );

    if (!normalized) continue;

    await query(`UPDATE practice_sessions SET scores = $1::jsonb WHERE id = $2`, [
      JSON.stringify(normalized),
      row.id,
    ]);
    updated++;
  }

  console.log(`Updated ${updated} of ${rows.length} sessions.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
