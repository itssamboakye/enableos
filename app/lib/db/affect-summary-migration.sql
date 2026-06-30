-- Session affect summary (face coaching rollup + voice prosody + alignment)
-- Run in Neon SQL editor after practice_sessions exists.

ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS "affectSummary" JSONB;

CREATE INDEX IF NOT EXISTS idx_practice_sessions_affect_summary
  ON practice_sessions USING GIN ("affectSummary");
