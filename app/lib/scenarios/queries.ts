import { query, queryOne } from "@/lib/db";
import type { Scenario, ScenarioAssignment } from "./types";

function mapScenario(row: {
  id: string;
  companyId: string | null;
  name: string;
  slug: string;
  description: string | null;
  callType: string | null;
  competencies: unknown;
  active: boolean;
}): Scenario {
  const competencies = Array.isArray(row.competencies)
    ? row.competencies
    : typeof row.competencies === "string"
      ? JSON.parse(row.competencies)
      : [];

  return {
    id: row.id,
    companyId: row.companyId,
    name: row.name,
    slug: row.slug,
    description: row.description,
    callType: row.callType,
    competencies,
    active: row.active,
  };
}

/** Global scenarios plus company-specific scenarios. */
export async function listScenariosForCompany(companyId: string): Promise<Scenario[]> {
  const rows = await query<{
    id: string;
    companyId: string | null;
    name: string;
    slug: string;
    description: string | null;
    callType: string | null;
    competencies: unknown;
    active: boolean;
  }>(
    `SELECT id, "companyId", name, slug, description, "callType", competencies, active
     FROM scenarios
     WHERE active = true AND ("companyId" IS NULL OR "companyId" = $1)
     ORDER BY name`,
    [companyId]
  );

  return rows.map(mapScenario);
}

export async function getScenarioById(
  scenarioId: string,
  companyId: string
): Promise<Scenario | null> {
  const row = await queryOne<{
    id: string;
    companyId: string | null;
    name: string;
    slug: string;
    description: string | null;
    callType: string | null;
    competencies: unknown;
    active: boolean;
  }>(
    `SELECT id, "companyId", name, slug, description, "callType", competencies, active
     FROM scenarios
     WHERE id = $1 AND active = true AND ("companyId" IS NULL OR "companyId" = $2)`,
    [scenarioId, companyId]
  );

  return row ? mapScenario(row) : null;
}

export async function resolveScenarioIdForCallType(
  callType: string | null
): Promise<string | null> {
  if (!callType) return "scenario_discovery";

  const row = await queryOne<{ id: string }>(
    `SELECT id FROM scenarios
     WHERE active = true AND ("callType" = $1 OR slug = $2)
     ORDER BY "companyId" NULLS FIRST
     LIMIT 1`,
    [callType, callType.toLowerCase().replace(/\s+/g, "-")]
  );

  return row?.id ?? "scenario_discovery";
}

export async function assignScenarioToUser(params: {
  scenarioId: string;
  userId: string;
  companyId: string;
  assignedBy: string;
  dueAt?: Date | null;
  note?: string | null;
}): Promise<{ assignment: ScenarioAssignment; actionId: string }> {
  const member = await queryOne<{ id: string }>(
    `SELECT id FROM users WHERE id = $1 AND "companyId" = $2 AND role = 'user'`,
    [params.userId, params.companyId]
  );

  if (!member) {
    throw new Error("Rep not found in your company");
  }

  const assignmentId = `assign_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const actionId = `action_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  await query(
    `INSERT INTO scenario_assignments
     (id, "scenarioId", "userId", "assignedBy", "companyId", status, "dueAt", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, 'assigned', $6, NOW(), NOW())`,
    [
      assignmentId,
      params.scenarioId,
      params.userId,
      params.assignedBy,
      params.companyId,
      params.dueAt?.toISOString() ?? null,
    ]
  );

  await query(
    `INSERT INTO coaching_actions
     (id, "userId", "assignedBy", "companyId", "scenarioId", "assignmentId", "actionType", note, status, "createdAt")
     VALUES ($1, $2, $3, $4, $5, $6, 'assign_scenario', $7, 'pending', NOW())`,
    [
      actionId,
      params.userId,
      params.assignedBy,
      params.companyId,
      params.scenarioId,
      assignmentId,
      params.note ?? null,
    ]
  );

  const assignment = await queryOne<ScenarioAssignment>(
    `SELECT sa.id, sa."scenarioId", sa."userId", sa."assignedBy", sa."companyId",
            sa.status, sa."dueAt", sa."completedAt", sa."createdAt",
            s.name as "scenarioName"
     FROM scenario_assignments sa
     JOIN scenarios s ON s.id = sa."scenarioId"
     WHERE sa.id = $1`,
    [assignmentId]
  );

  if (!assignment) {
    throw new Error("Failed to create assignment");
  }

  return { assignment, actionId };
}
