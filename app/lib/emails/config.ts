import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email functionality will be disabled.");
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const FROM_EMAIL = process.env.FROM_EMAIL || "EnableOS <noreply@enableos.io>";
export const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || process.env.FROM_EMAIL || "EnableOS <noreply@enableos.io>";
export const BASE_URL = process.env.NEXTAUTH_URL || process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL || "enableos.io"}`
  : "http://localhost:3000";
