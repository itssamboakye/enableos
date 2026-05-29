import { query, queryOne } from "@/lib/db";
import { SKILL_DEFINITIONS } from "@/lib/scores/constants";
import {
  CANONICAL_SKILL_KEYS,
  type CanonicalScorecard,
  type CanonicalSkillKey,
} from "@/lib/scores";
import { normalizeScorecard, weakestSkill } from "@/lib/scores";
import type { CoachingFlag, CoachingFlagType } from "./types";

const INACTIVE_DAYS = 7;
const WEAK_SKILL_THRESHOLD = 5;
const LOW_READINESS_THRESHOLD = 5;
const REPEATED_WEAK_COUNT = 3;

function skillLabel(skill: CanonicalSkillKey): string {
  return SKILL_DEFINITIONS.find((s) => s.key === skill)?.label ?? skill;
}

function newId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function upsertFlag(params: {
  userId: string;
  companyId: string;
  type: CoachingFlagType;
  skill: CanonicalSkillKey | null;
  reason: string;
  evidenceSessionIds: string[];
  suggestedAction: string;
}): Promise<void> {
  const existing = await queryOne<{ id: string }>(
    `SELECT id FROM coaching_flags
     WHERE "userId" = $1 AND type = $2 AND status = 'open'
       AND (($3::text IS NULL AND skill IS NULL) OR skill = $3)
     LIMIT 1`,
    [params.userId, params.type, params.skill]
  );

  if (existing) {
    await query(
      `UPDATE coaching_flags
       SET reason = $1,
           "evidenceSessionIds" = $2::jsonb,
           "suggestedAction" = $3,
           "updatedAt" = NOW()
       WHERE id = $4`,
      [
        params.reason,
        JSON.stringify(params.evidenceSessionIds),
        params.suggestedAction,
        existing.id,
      ]
    );
    return;
  }

  await query(
    `INSERT INTO coaching_flags
     (id, "userId", "companyId", type, skill, reason, "evidenceSessionIds", "suggestedAction", status, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, 'open', NOW(), NOW())`,
    [
      newId("flag"),
      params.userId,
      params.companyId,
      params.type,
      params.skill,
      params.reason,
      JSON.stringify(params.evidenceSessionIds),
      params.suggestedAction,
    ]
  );
}

/** Run after a practice session is saved. */
export async function evaluateCoachingFlagsOnSession(params: {
  userId: string;
  companyId: string | null | undefined;
  sessionId: string;
  scores: CanonicalScorecard | null;
}): Promise<void> {
  if (!params.companyId || !params.scores) return;

  const { userId, companyId, sessionId, scores } = params;
  const evidence = [sessionId];

  if (scores.readiness < LOW_READINESS_THRESHOLD) {
    await upsertFlag({
      userId,
      companyId,
      type: "low_readiness",
      skill: weakestSkill(scores),
      reason: `Readiness score ${scores.readiness}/10 on latest session — below team coaching threshold.`,
      evidenceSessionIds: evidence,
      suggestedAction: "Review the latest session transcript and assign a focused remediation scenario.",
    });
  }

  const weak = weakestSkill(scores);
  if (weak && scores[weak] < WEAK_SKILL_THRESHOLD && scores[weak] > 0) {
    await upsertFlag({
      userId,
      companyId,
      type: "weak_skill",
      skill: weak,
      reason: `Low ${skillLabel(weak)} score (${scores[weak]}/10) on latest session.`,
      evidenceSessionIds: evidence,
      suggestedAction: `Assign a scenario targeting ${skillLabel(weak).toLowerCase()} and review recent transcripts together.`,
    });
  }

  const recentSessions = await query<{ id: string; scores: unknown }>(
    `SELECT id, scores FROM practice_sessions
     WHERE "userId" = $1 AND scores IS NOT NULL
     ORDER BY "createdAt" DESC LIMIT 6`,
    [userId]
  );

  if (recentSessions.length >= 6) {
    const recent3 = recentSessions.slice(0, 3).map((s) => normalizeScorecard(s.scores as Record<string, unknown>));
    const prior3 = recentSessions.slice(3, 6).map((s) => normalizeScorecard(s.scores as Record<string, unknown>));
    const avg = (items: (CanonicalScorecard | null)[]) => {
      const vals = items.filter(Boolean).map((s) => s!.readiness);
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
    };
    const recentAvg = avg(recent3);
    const priorAvg = avg(prior3);
    if (recentAvg != null && priorAvg != null && priorAvg - recentAvg >= 1.5) {
      await upsertFlag({
        userId,
        companyId,
        type: "score_drop",
        skill: null,
        reason: `Readiness dropped from ${priorAvg.toFixed(1)} to ${recentAvg.toFixed(1)} over the last 3 sessions.`,
        evidenceSessionIds: recentSessions.slice(0, 3).map((s) => s.id),
        suggestedAction: "Schedule a coaching review and assign a remediation scenario.",
      });
    }
  }

  for (const skillKey of CANONICAL_SKILL_KEYS) {
    const lowCount = recentSessions
      .slice(0, REPEATED_WEAK_COUNT)
      .map((s) => normalizeScorecard(s.scores as Record<string, unknown>))
      .filter((s) => s && s[skillKey] > 0 && s[skillKey] < WEAK_SKILL_THRESHOLD).length;

    if (lowCount >= REPEATED_WEAK_COUNT) {
      await upsertFlag({
        userId,
        companyId,
        type: "repeated_weak_skill",
        skill: skillKey,
        reason: `${skillLabel(skillKey)} scored below ${WEAK_SKILL_THRESHOLD} in ${REPEATED_WEAK_COUNT} recent sessions.`,
        evidenceSessionIds: recentSessions.slice(0, REPEATED_WEAK_COUNT).map((s) => s.id),
        suggestedAction: `Assign remediation focused on ${skillLabel(skillKey).toLowerCase()}.`,
      });
    }
  }
}

/** Sync inactive-rep flags when managers load the queue. */
export async function syncInactiveRepFlags(companyId: string): Promise<void> {
  const inactiveReps = await query<{ id: string; name: string | null; email: string }>(
    `SELECT u.id, u.name, u.email
     FROM users u
     LEFT JOIN progress p ON p."userId" = u.id
     WHERE u."companyId" = $1 AND u.role = 'user'
       AND (
         p."lastSessionDate" IS NULL
         OR p."lastSessionDate" < NOW() - ($2 || ' days')::interval
       )`,
    [companyId, String(INACTIVE_DAYS)]
  );

  for (const rep of inactiveReps) {
    const display = rep.name || rep.email;
    await upsertFlag({
      userId: rep.id,
      companyId,
      type: "inactive",
      skill: null,
      reason: `${display} has not practiced in ${INACTIVE_DAYS}+ days.`,
      evidenceSessionIds: [],
      suggestedAction: "Encourage the rep to complete a discovery practice session this week.",
    });
  }
}

function mapFlag(row: {
  id: string;
  userId: string;
  companyId: string;
  type: CoachingFlagType;
  skill: string | null;
  reason: string;
  evidenceSessionIds: unknown;
  suggestedAction: string | null;
  status: CoachingFlag["status"];
  createdAt: Date;
  userName: string | null;
  userEmail: string;
}): CoachingFlag {
  const evidence =
    typeof row.evidenceSessionIds === "string"
      ? JSON.parse(row.evidenceSessionIds)
      : row.evidenceSessionIds;

  return {
    id: row.id,
    userId: row.userId,
    companyId: row.companyId,
    type: row.type,
    skill: row.skill as CanonicalSkillKey | null,
    reason: row.reason,
    evidenceSessionIds: Array.isArray(evidence) ? evidence : [],
    suggestedAction: row.suggestedAction,
    status: row.status,
    createdAt: new Date(row.createdAt).toISOString(),
    userName: row.userName || row.userEmail,
    userEmail: row.userEmail,
  };
}

export async function getCoachingQueue(
  companyId: string,
  status: CoachingFlag["status"] | "all" = "open"
): Promise<CoachingFlag[]> {
  await syncInactiveRepFlags(companyId);

  const params: unknown[] = [companyId];
  let statusClause = "";
  if (status !== "all") {
    params.push(status);
    statusClause = `AND cf.status = $${params.length}`;
  }

  const rows = await query<{
    id: string;
    userId: string;
    companyId: string;
    type: CoachingFlagType;
    skill: string | null;
    reason: string;
    evidenceSessionIds: unknown;
    suggestedAction: string | null;
    status: CoachingFlag["status"];
    createdAt: Date;
    userName: string | null;
    userEmail: string;
  }>(
    `SELECT cf.id, cf."userId", cf."companyId", cf.type, cf.skill, cf.reason,
            cf."evidenceSessionIds", cf."suggestedAction", cf.status, cf."createdAt",
            u.name as "userName", u.email as "userEmail"
     FROM coaching_flags cf
     JOIN users u ON u.id = cf."userId"
     WHERE cf."companyId" = $1 ${statusClause}
     ORDER BY cf."createdAt" DESC`,
    params
  );

  return rows.map(mapFlag);
}

export async function updateCoachingFlagStatus(
  flagId: string,
  companyId: string,
  status: CoachingFlag["status"]
): Promise<boolean> {
  const result = await queryOne<{ id: string }>(
    `UPDATE coaching_flags
     SET status = $1, "updatedAt" = NOW()
     WHERE id = $2 AND "companyId" = $3
     RETURNING id`,
    [status, flagId, companyId]
  );
  return !!result;
}

export async function assignRemediationFromFlag(params: {
  flagId: string;
  scenarioId: string;
  companyId: string;
  assignedBy: string;
  note?: string | null;
}): Promise<{ assignmentId: string; actionId: string }> {
  const flag = await queryOne<{ userId: string }>(
    `SELECT "userId" FROM coaching_flags WHERE id = $1 AND "companyId" = $2`,
    [params.flagId, params.companyId]
  );

  if (!flag) {
    throw new Error("Flag not found");
  }

  const { assignScenarioToUser } = await import("@/lib/scenarios/queries");
  const { assignment, actionId } = await assignScenarioToUser({
    scenarioId: params.scenarioId,
    userId: flag.userId,
    companyId: params.companyId,
    assignedBy: params.assignedBy,
    note: params.note,
  });

  await query(
    `UPDATE coaching_actions SET "flagId" = $1 WHERE id = $2`,
    [params.flagId, actionId]
  );

  await updateCoachingFlagStatus(params.flagId, params.companyId, "acknowledged");

  return { assignmentId: assignment.id, actionId };
}
