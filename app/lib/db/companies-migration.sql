-- Companies migration
-- Adds companies table and companyId relation on users for team scoping

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "trialEndsAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add companyId to users
ALTER TABLE users
ADD COLUMN IF NOT EXISTS "companyId" TEXT REFERENCES companies(id) ON DELETE SET NULL;

-- Index for faster lookups by company
CREATE INDEX IF NOT EXISTS idx_users_companyId ON users("companyId");

