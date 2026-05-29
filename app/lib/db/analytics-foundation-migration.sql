-- Phase 0: Manager analytics foundation
-- Run in Neon SQL editor after prior migrations.

-- Weekly skill snapshots for heatmap / trends (Phase 4)
CREATE TABLE IF NOT EXISTS rep_skill_snapshots (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "companyId" TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  skill TEXT NOT NULL,
  avg_score REAL NOT NULL,
  session_count INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE ("userId", week_start, skill)
);

CREATE INDEX IF NOT EXISTS idx_rep_skill_snapshots_company_week
  ON rep_skill_snapshots ("companyId", week_start);

-- Faster company-scoped session analytics
CREATE INDEX IF NOT EXISTS idx_practice_sessions_created
  ON practice_sessions ("createdAt" DESC);

CREATE INDEX IF NOT EXISTS idx_users_company_role
  ON users ("companyId", role);
