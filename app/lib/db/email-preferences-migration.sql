-- Email preferences migration
-- Add email preferences column to users table

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "emailPreferences" JSONB DEFAULT '{
  "sessionCompletion": true,
  "welcome": true,
  "practiceReminders": true,
  "milestones": true,
  "feedbackReady": true,
  "sessionExport": true,
  "accountUpdates": true,
  "reminderFrequency": "weekly"
}'::jsonb;

-- Email unsubscribe tokens table
CREATE TABLE IF NOT EXISTS email_unsubscribes (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  "emailType" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "emailType")
);

CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_user 
ON email_unsubscribes("userId");

CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_token 
ON email_unsubscribes(token);
