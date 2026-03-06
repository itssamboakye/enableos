-- Database schema for EnableOS Discovery Practice
-- Run this in your NeonDB SQL editor to create the tables

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  "preferredName" TEXT,
  image TEXT,
  title TEXT,
  company TEXT,
  "companyId" TEXT REFERENCES companies(id) ON DELETE SET NULL,
  "emailVerified" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Accounts table (for OAuth providers)
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, "providerAccountId")
);

-- Sessions table (for NextAuth.js)
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  "sessionToken" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);

-- Verification tokens table (for NextAuth.js)
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,
  UNIQUE(identifier, token)
);

-- Practice sessions table
CREATE TABLE IF NOT EXISTS practice_sessions (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transcript JSONB NOT NULL,
  feedback JSONB,
  scores JSONB,
  duration INTEGER,
  "buyerContext" TEXT,
  "buyerRole" TEXT,
  "callType" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_created 
ON practice_sessions("userId", "createdAt" DESC);

-- Progress table
CREATE TABLE IF NOT EXISTS progress (
  id TEXT PRIMARY KEY,
  "userId" TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "totalSessions" INTEGER NOT NULL DEFAULT 0,
  "averageClarity" REAL,
  "averageCuriosity" REAL,
  "averageListening" REAL,
  "averageFlowControl" REAL,
  "averageConfidence" REAL,
  "averageNextStep" REAL,
  "lastSessionDate" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Function to automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for progress table
CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON progress
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
