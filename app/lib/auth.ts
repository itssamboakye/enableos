/**
 * Auth utilities for getting current user session
 */

import { auth } from "@/api/auth/[...nextauth]/route";
import { queryOne } from "./db";

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  preferredName: string | null;
  image: string | null;
  title: string | null;
  company: string | null;
  companyId?: string | null;
  role?: "user" | "manager" | "admin";
}

/**
 * Get the current user session
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await queryOne<UserProfile>(
    `SELECT id, email, name, "preferredName", image, title, company, "companyId", role
     FROM users 
     WHERE email = $1`,
    [session.user.email]
  );

  return user;
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

/**
 * Require admin access - throws error if user is not admin
 */
export async function requireAdmin(): Promise<UserProfile> {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  if (user.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }
  
  return user;
}

/**
 * Require manager access - throws error if user is not a manager (or admin).
 * Admins can use manager features (team, invites, session transcripts) when they have a company.
 */
export async function requireManager(): Promise<UserProfile> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.role !== "manager" && user.role !== "admin") {
    throw new Error("Forbidden: Manager access required");
  }

  return user;
}

/**
 * Get the display name for the user (preferred name or regular name)
 */
export function getUserDisplayName(user: UserProfile | null): string | null {
  if (!user) return null;
  return user.preferredName || user.name || null;
}
