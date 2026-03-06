-- Manager notes migration
-- Stores private manager notes and labels on individual practice sessions

CREATE TABLE IF NOT EXISTS manager_session_notes (
  id TEXT PRIMARY KEY,
  "sessionId" TEXT NOT NULL REFERENCES practice_sessions(id) ON DELETE CASCADE,
  "managerId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note TEXT,
  label TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("sessionId", "managerId")
);

CREATE INDEX IF NOT EXISTS idx_manager_session_notes_manager
ON manager_session_notes("managerId");

