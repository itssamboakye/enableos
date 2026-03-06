-- Company invites migration
-- Tracks email invites to companies without creating users up front.

CREATE TABLE IF NOT EXISTS company_invites (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  "companyId" TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'manager', 'admin')),
  "acceptedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Ensure we can upsert invites per email+company
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = current_schema()
      AND indexname = 'idx_company_invites_email_company'
  ) THEN
    CREATE UNIQUE INDEX idx_company_invites_email_company
      ON company_invites(email, "companyId");
  END IF;
END
$$;

