# Quick Start Guide - Authentication Setup

## 🚀 Quick Setup (5 Steps)

### 1. Install Dependencies
```bash
pnpm add next-auth@beta pg @types/pg
```

### 2. Set Up Database
1. Open your NeonDB SQL editor
2. Copy contents from `lib/db/schema.sql`
3. Paste and execute in NeonDB
4. Verify tables are created

### 3. Configure Environment Variables
Add to `.env.local`:
```bash
DATABASE_URL='your-neondb-connection-string'
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id
```

### 4. Get OAuth Credentials
- **Google**: [Google Cloud Console](https://console.cloud.google.com/)
  - Redirect URI: `http://localhost:3000/api/auth/callback/google`
- **Microsoft**: [Azure Portal](https://portal.azure.com/)
  - Redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`

### 5. Test It!
```bash
pnpm dev
```
Visit `/discovery-practice` - you'll be redirected to sign in!

## ✅ What's Working Now

- ✅ User login with Google/Microsoft
- ✅ Coach knows your name (no name question!)
- ✅ Sessions automatically saved
- ✅ Progress tracking
- ✅ User profiles with preferred name

## 📚 Full Documentation

See `SETUP_AUTH.md` for detailed setup instructions.

See `IMPLEMENTATION_SUMMARY.md` for technical details.
