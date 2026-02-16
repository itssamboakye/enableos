# EnableOS Email System

This directory contains the email infrastructure for EnableOS using Resend and React Email.

## Setup

1. **Get Resend API Key**
   - Sign up at https://resend.com
   - Create an API key
   - Add to `.env.local`:
     ```
     RESEND_API_KEY=re_xxxxxxxxxxxxx
     FROM_EMAIL=EnableOS <noreply@enableos.io>
     REPLY_TO_EMAIL=EnableOS <noreply@enableos.io>  # Optional: Set to a valid email if you want replies
     ```

2. **Run Database Migration**
   - Execute `app/lib/db/email-preferences-migration.sql` in your NeonDB SQL editor
   - This adds email preferences column and unsubscribe tokens table

3. **Verify Domain (Production)**
   - In Resend dashboard, verify your sending domain (enableos.io)
   - Add DNS records as instructed by Resend

## Email Types

1. **Session Completion** - Sent after each practice session
2. **Welcome** - Sent on first sign-up
3. **Practice Reminders** - Sent to users who haven't practiced in 3/7/14 days
4. **Milestones** - Sent when users reach 5, 10, 25, 50, 100 sessions
5. **Feedback Ready** - Sent when feedback processing completes (if async)
6. **Session Export** - Sent when user requests session export
7. **Account Updates** - Sent for email verification, profile changes, etc.

## Usage

### Sending Emails

```typescript
import { sendSessionCompletionEmail } from "@/lib/emails/senders";

await sendSessionCompletionEmail(userId, userEmail, {
  userName: "John",
  sessionId: "session_123",
  sessionDate: new Date().toISOString(),
  // ... other data
});
```

### Checking Preferences

```typescript
import { canSendEmail } from "@/lib/emails/utils";

if (await canSendEmail(userId, "sessionCompletion")) {
  // Send email
}
```

## Scheduled Jobs

### Practice Reminders

Set up a cron job to call `/api/emails/reminders`:

```bash
# Example cron (daily at 9 AM)
0 9 * * * curl -X POST https://enableos.io/api/emails/reminders \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Or use Vercel Cron Jobs:
```json
{
  "crons": [{
    "path": "/api/emails/reminders",
    "schedule": "0 9 * * *"
  }]
}
```

## Unsubscribe

Users can unsubscribe via links in emails:
- Link format: `/api/emails/unsubscribe?token=xxx&type=sessionCompletion`
- Users are redirected to `/unsubscribed` page
- Preferences are automatically updated

## Email Preferences API

- `GET /api/emails/preferences` - Get user preferences
- `PUT /api/emails/preferences` - Update user preferences

## Templates

All templates are in `app/lib/emails/templates/`:
- `base.tsx` - Base email wrapper with EnableOS styling
- `session-completion.tsx` - Session completion email
- `welcome.tsx` - Welcome email
- `practice-reminder.tsx` - Practice reminder email
- `milestone.tsx` - Milestone achievement email
- `feedback-ready.tsx` - Feedback ready notification
- `session-export.tsx` - Session export email
- `account-update.tsx` - Account update emails

## Styling

All emails match EnableOS design system:
- Dark background (#0D0D0D, #151515)
- Soft blue-purple accent (#5E6AD2)
- Calm, non-judgmental tone
- Clear hierarchy and spacing
