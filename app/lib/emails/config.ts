import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email functionality will be disabled.");
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const FROM_EMAIL = process.env.FROM_EMAIL || "EnableOS <noreply@enableos.io>";
export const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || process.env.FROM_EMAIL || "EnableOS <noreply@enableos.io>";
// Prefer APP_URL for invite/email links so they always point to production even when
// the API runs on a Vercel preview deployment (where VERCEL_URL is the preview URL).
export const BASE_URL =
  process.env.APP_URL ||
  process.env.NEXTAUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";
