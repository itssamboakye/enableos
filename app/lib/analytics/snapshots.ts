import { query } from "@/lib/db";
import { CANONICAL_SKILL_KEYS, type CanonicalScorecard } from "@/lib/scores";

function weekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function newId() {
  return `snap_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Upsert weekly skill snapshots after a scored session (Phase 4 heatmap foundation). */
export async function syncRepSkillSnapshots(params: {
  userId: string;
  companyId: string | null | undefined;
  sessionDate: Date;
  scores: CanonicalScorecard;
}): Promise<void> {
  if (!params.companyId) return;

  const week = weekStart(params.sessionDate);

  for (const skill of CANONICAL_SKILL_KEYS) {
    const score = params.scores[skill];
    if (score <= 0) continue;

    await query(
      `INSERT INTO rep_skill_snapshots
       (id, "userId", "companyId", week_start, skill, avg_score, session_count, "createdAt")
       VALUES ($1, $2, $3, $4::date, $5, $6, 1, NOW())
       ON CONFLICT ("userId", week_start, skill)
       DO UPDATE SET
         avg_score = (
           rep_skill_snapshots.avg_score * rep_skill_snapshots.session_count + EXCLUDED.avg_score
         ) / (rep_skill_snapshots.session_count + 1),
         session_count = rep_skill_snapshots.session_count + 1`,
      [newId(), params.userId, params.companyId, week, skill, score]
    );
  }
}
