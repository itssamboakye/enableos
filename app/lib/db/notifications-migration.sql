-- Notifications table migration
-- Run this in your NeonDB SQL editor

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('session_complete', 'feedback_ready', 'system', 'achievement')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON notifications("userId", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications("userId", read);
