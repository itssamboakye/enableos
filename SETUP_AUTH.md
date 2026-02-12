# Authentication & User Management Setup Guide

This guide will help you set up user authentication, database, and user profile features for EnableOS.

## Prerequisites

- NeonDB PostgreSQL database (you already have the connection string)
- Google OAuth credentials
- Microsoft Azure AD credentials (for Outlook/Office 365)

## Step 1: Install Dependencies

```bash
pnpm add next-auth@beta pg @types/pg
```

## Step 2: Set Up Database

1. **Run the SQL schema** in your NeonDB SQL editor:
   - Open `lib/db/schema.sql`
   - Copy and paste the entire contents into your NeonDB SQL editor
   - Execute the script to create all tables

2. **Verify tables were created**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   
   You should see: `users`, `accounts`, `sessions`, `verification_tokens`, `practice_sessions`, `progress`

## Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Database (you already have this)
DATABASE_URL='postgresql://neondb_owner:npg_wu7a5bLTCyrH@ep-empty-bush-ah7kyv7e-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here # Generate with: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Microsoft Azure AD (for Outlook)
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id
```

### Getting OAuth Credentials

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

#### Microsoft Azure AD:
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Create new registration
4. Add redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
5. Go to "Certificates & secrets" → Create new client secret
6. Copy Application (client) ID, Directory (tenant) ID, and Client secret

## Step 4: Update Discovery Practice Page

The discovery practice page needs to:
1. Get user context from session
2. Pass user context to SessionOrchestrator
3. Save sessions after completion

See `app/discovery-practice/page.tsx` for the updated implementation.

## Step 5: Test Authentication

1. Start your dev server: `pnpm dev`
2. Navigate to `/discovery-practice`
3. You should be redirected to `/auth/signin`
4. Sign in with Google or Microsoft
5. You should be redirected back to `/discovery-practice`
6. Atlas should now know your name and skip the name question!

## Features Implemented

✅ **User Authentication**
- Google OAuth login
- Microsoft/Outlook OAuth login
- Session management with NextAuth.js

✅ **User Profiles**
- Preferred name support
- Title and company fields
- Profile picture from OAuth

✅ **Memory System**
- Coach knows user name (no name question)
- User context passed to session orchestrator
- Profile data persists across sessions

✅ **Session Saving**
- All practice sessions saved to database
- Transcript, feedback, and scores stored
- Session history accessible via API

✅ **Progress Tracking**
- Automatic progress calculation
- Average scores across all sessions
- Total session count
- Last session date

✅ **Data Retention**
- Sessions kept for 1 year (can be configured)
- Automatic cleanup script (to be implemented)

## API Endpoints

- `GET /api/user/profile` - Get current user profile
- `PATCH /api/user/profile` - Update user profile (preferredName, title, company)
- `GET /api/sessions` - Get all practice sessions for current user
- `POST /api/sessions` - Save a new practice session

## Next Steps

1. Create a user profile page (`/profile`)
2. Create a progress dashboard (`/dashboard`)
3. Create a sessions history page (`/sessions`)
4. Implement data retention cleanup (1 year)

## Troubleshooting

**Database connection errors:**
- Verify `DATABASE_URL` is correct
- Check NeonDB connection settings
- Ensure SSL is enabled

**OAuth errors:**
- Verify redirect URIs match exactly
- Check client IDs and secrets
- Ensure OAuth apps are published (for production)

**Session not persisting:**
- Check `NEXTAUTH_SECRET` is set
- Verify cookies are enabled
- Check browser console for errors
