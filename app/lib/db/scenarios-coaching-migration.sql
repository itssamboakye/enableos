-- Phase 1: Scenarios, assignments, and coaching platform entities
-- Run in Neon after analytics-foundation-migration.sql

CREATE TABLE IF NOT EXISTS scenarios (
  id TEXT PRIMARY KEY,
  "companyId" TEXT REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "callType" TEXT,
  competencies JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scenarios_company ON scenarios("companyId");
CREATE UNIQUE INDEX IF NOT EXISTS idx_scenarios_slug_global
  ON scenarios(slug) WHERE "companyId" IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_scenarios_slug_company
  ON scenarios(slug, "companyId") WHERE "companyId" IS NOT NULL;

CREATE TABLE IF NOT EXISTS scenario_assignments (
  id TEXT PRIMARY KEY,
  "scenarioId" TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "assignedBy" TEXT REFERENCES users(id) ON DELETE SET NULL,
  "companyId" TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'assigned'
    CHECK (status IN ('assigned', 'in_progress', 'completed', 'passed')),
  "dueAt" TIMESTAMP,
  "completedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scenario_assignments_user ON scenario_assignments("userId", status);
CREATE INDEX IF NOT EXISTS idx_scenario_assignments_company ON scenario_assignments("companyId");

CREATE TABLE IF NOT EXISTS coaching_flags (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "companyId" TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL
    CHECK (type IN ('inactive', 'score_drop', 'weak_skill', 'low_readiness', 'repeated_weak_skill')),
  skill TEXT,
  reason TEXT NOT NULL,
  "evidenceSessionIds" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "suggestedAction" TEXT,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'acknowledged', 'resolved')),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coaching_flags_company_status
  ON coaching_flags("companyId", status);
CREATE INDEX IF NOT EXISTS idx_coaching_flags_user ON coaching_flags("userId", status);

CREATE TABLE IF NOT EXISTS coaching_actions (
  id TEXT PRIMARY KEY,
  "flagId" TEXT REFERENCES coaching_flags(id) ON DELETE SET NULL,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "assignedBy" TEXT REFERENCES users(id) ON DELETE SET NULL,
  "companyId" TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  "scenarioId" TEXT REFERENCES scenarios(id) ON DELETE SET NULL,
  "assignmentId" TEXT REFERENCES scenario_assignments(id) ON DELETE SET NULL,
  "actionType" TEXT NOT NULL DEFAULT 'assign_scenario',
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'completed', 'cancelled')),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "completedAt" TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_coaching_actions_company ON coaching_actions("companyId", status);

ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS "scenarioId" TEXT REFERENCES scenarios(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_practice_sessions_scenario
  ON practice_sessions("scenarioId");

-- Global scenario catalog (companyId NULL = available to all companies)
INSERT INTO scenarios (id, "companyId", name, slug, description, "callType", competencies, active)
VALUES
  (
    'scenario_discovery',
    NULL,
    'Discovery Practice',
    'discovery-practice',
    'Practice discovery conversations: pain, impact, and urgency.',
    'Discovery Practice',
    '["curiosity","listening","clarity","nextStep"]'::jsonb,
    true
  ),
  (
    'scenario_pricing_defense',
    NULL,
    'Pricing Defense',
    'pricing-defense',
    'Handle pricing objections and defend value.',
    'Pricing Defense',
    '["confidence","clarity","flowControl"]'::jsonb,
    true
  ),
  (
    'scenario_objection_handling',
    NULL,
    'Objection Handling',
    'objection-handling',
    'Respond to common buyer objections with confidence.',
    'Objection Handling',
    '["confidence","listening","flowControl"]'::jsonb,
    true
  ),
  (
    'scenario_demo',
    NULL,
    'Demo Execution',
    'demo-execution',
    'Run a focused product demo tied to buyer pain.',
    'Demo Execution',
    '["clarity","confidence","nextStep"]'::jsonb,
    true
  ),
  (
    'scenario_cold_outbound',
    NULL,
    'Cold Outbound Call',
    'cold-outbound',
    'Open cold calls with a strong hook and ICP alignment.',
    'Cold Outbound',
    '["clarity","curiosity","confidence"]'::jsonb,
    true
  )
ON CONFLICT (id) DO NOTHING;
