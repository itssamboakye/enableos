-- Company delete cascade: when a company is deleted, delete all users in that company
-- (and their sessions, progress, practice_sessions, accounts via existing CASCADE from users).
-- Run this in Neon after companies and company_invites exist.

-- Find and drop the existing FK on users.companyId (Postgres names it users_companyId_fkey by default)
ALTER TABLE users
  DROP CONSTRAINT IF EXISTS users_companyId_fkey;

-- Re-add with CASCADE so deleting a company deletes its users
ALTER TABLE users
  ADD CONSTRAINT users_companyId_fkey
  FOREIGN KEY ("companyId") REFERENCES companies(id) ON DELETE CASCADE;
