import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { query, queryOne } from "@/lib/db";
import type { NextRequest } from "next/server";
import { sendWelcomeEmail } from "@/lib/emails/senders";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      // Note: tenantId is not directly supported in NextAuth v5 beta AzureADProvider
      // If you need a specific tenant, configure it via the issuer URL in your Azure AD app registration
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      try {
        // Check if user exists, if not create them
        const existingUser = await queryOne(
          "SELECT id FROM users WHERE email = $1",
          [user.email]
        );

      if (!existingUser) {
        // Create new user
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        // Set admin role for specific emails
        const isAdmin = user.email === "luis@nson.ai" || user.email === "sam@nson.ai";
        await query(
          `INSERT INTO users (id, email, name, image, "emailVerified", role, "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
          [
            userId,
            user.email,
            user.name || null,
            user.image || null,
            new Date(),
            isAdmin ? "admin" : "user",
          ]
        );

        // Create account record
        if (account) {
          await query(
            `INSERT INTO accounts (id, "userId", type, provider, "providerAccountId", access_token, refresh_token, expires_at, token_type, scope, id_token, session_state)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
              `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              userId,
              account.type,
              account.provider,
              account.providerAccountId,
              account.access_token || null,
              account.refresh_token || null,
              account.expires_at || null,
              account.token_type || null,
              account.scope || null,
              account.id_token || null,
              account.session_state || null,
            ]
          );
        }

        // Initialize progress record
        await query(
          `INSERT INTO progress (id, "userId", "totalSessions", "createdAt", "updatedAt")
           VALUES ($1, $2, 0, NOW(), NOW())`,
          [
            `prog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId,
          ]
        );

        // Send welcome email (non-blocking)
        try {
          const userName = user.name?.split(" ")[0] || "there";
          sendWelcomeEmail(userId, {
            userName,
            userEmail: user.email,
          }).catch((err) => {
            console.error("Failed to send welcome email:", err);
            // Don't fail sign-in if email fails
          });
        } catch (emailError) {
          console.error("Error preparing welcome email:", emailError);
          // Don't fail sign-in if email preparation fails
        }
      } else {
        // Update account if it exists
        if (account) {
          const existingAccount = await queryOne(
            `SELECT id FROM accounts WHERE provider = $1 AND "providerAccountId" = $2`,
            [account.provider, account.providerAccountId]
          );

          if (!existingAccount) {
            await query(
              `INSERT INTO accounts (id, "userId", type, provider, "providerAccountId", access_token, refresh_token, expires_at, token_type, scope, id_token, session_state)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
              [
                `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                existingUser.id,
                account.type,
                account.provider,
                account.providerAccountId,
                account.access_token || null,
                account.refresh_token || null,
                account.expires_at || null,
                account.token_type || null,
                account.scope || null,
                account.id_token || null,
                account.session_state || null,
              ]
            );
          }
        }
      }

      // Attach user to a company and role if there is a pending invite for their email.
      if (user.email) {
        try {
          const invite = await queryOne<{ companyId: string; role: string }>(
            `SELECT "companyId", role
             FROM company_invites
             WHERE email = $1 AND "acceptedAt" IS NULL
             ORDER BY "createdAt" DESC
             LIMIT 1`,
            [user.email.toLowerCase()]
          );

          if (invite?.companyId) {
            const roleToSet = invite.role === "manager" || invite.role === "user" ? invite.role : "user";
            await query(
              `UPDATE users
               SET "companyId" = $1,
                   role = $2,
                   "updatedAt" = NOW()
               WHERE email = $3`,
              [invite.companyId, roleToSet, user.email.toLowerCase()]
            );

            await query(
              `UPDATE company_invites
               SET "acceptedAt" = NOW()
               WHERE email = $1 AND "companyId" = $2 AND "acceptedAt" IS NULL`,
              [user.email.toLowerCase(), invite.companyId]
            );
          }
        } catch (inviteError) {
          console.error("Error applying company invite on sign-in:", inviteError);
        }
      }

      return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        // Allow sign-in to proceed even if DB operations fail
        // This prevents auth from breaking if DB is temporarily unavailable
        return true;
      }
    },
    async session({ session, token }) {
      // Use email from token (more reliable than session.user.email)
      const email = (token.email as string) || session.user?.email;
      
      if (email) {
        const user = await queryOne<{
          id: string;
          email: string;
          name: string | null;
          preferredName: string | null;
          image: string | null;
          title: string | null;
          company: string | null;
          role: string | null;
        }>(
          `SELECT id, email, name, "preferredName", image, title, company, role FROM users WHERE email = $1`,
          [email]
        );

        if (user) {
          session.user.id = user.id;
          session.user.email = user.email;
          session.user.name = user.preferredName || user.name || session.user.name;
          (session.user as any).preferredName = user.preferredName;
          (session.user as any).title = user.title;
          (session.user as any).company = user.company;
          (session.user as any).role = user.role || "user";
        }
      }

      return session;
    },
    async jwt({ token, user, account }) {
      // Initial sign in - user object is available
      if (user && user.email) {
        try {
          // Fetch user ID from database (user object from OAuth doesn't have our DB id)
          const dbUser = await queryOne<{ id: string }>(
            "SELECT id FROM users WHERE email = $1",
            [user.email]
          );
          
          if (dbUser) {
            token.id = dbUser.id;
          }
        } catch (error) {
          console.error("[JWT] Error fetching user from database:", error);
          // Don't throw - allow token creation to proceed
        }
        
        // Store email in token for session callback (critical for session to work)
        token.email = user.email;
        token.name = user.name || undefined;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after OAuth sign in
      // This provides a consistent landing experience regardless of entry point
      if (url.includes("/api/auth/callback") || url.startsWith(baseUrl + "/auth")) {
        return `${baseUrl}/dashboard`;
      }
      
      // For other redirects, allow relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      
      // Allow same-origin URLs
      try {
        const urlParsed = new URL(url, baseUrl);
        if (urlParsed.origin === new URL(baseUrl).origin) {
          return url;
        }
      } catch (e) {
        // Invalid URL, fallback to dashboard
      }
      
      // Default fallback: dashboard
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Required for Vercel deployments - tells NextAuth to trust the host header
  trustHost: true,
  // Explicit cookie configuration for production
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Don't set domain explicitly - let browser handle it
        // This ensures cookies work across www and non-www domains
      },
    },
    pkceCodeVerifier: {
      name: `next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15, // 15 minutes
      },
    },
  },
};

// NextAuth v5 beta - NextAuth returns an object with handlers and auth function
const { handlers, auth } = NextAuth(authOptions);

// Export GET and POST from handlers
export const { GET, POST } = handlers;

// Export auth function for use in server components/API routes
export { auth };
