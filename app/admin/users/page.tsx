import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import UsersList from "@/components/admin/UsersList";

export default async function AdminUsersPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect("/dashboard");
  }

  const users = await query<{
    id: string;
    email: string;
    name: string | null;
    company: string | null;
    title: string | null;
    createdAt: string;
    totalSessions: number;
    lastSessionDate: string | null;
    averageClarity: number | null;
    averageCuriosity: number | null;
    averageListening: number | null;
    averageFlowControl: number | null;
    averageConfidence: number | null;
  }>(
    `SELECT 
      u.id,
      u.email,
      u.name,
      u.company,
      u.title,
      u."createdAt",
      COALESCE(p."totalSessions", 0) as "totalSessions",
      p."lastSessionDate",
      p."averageClarity",
      p."averageCuriosity",
      p."averageListening",
      p."averageFlowControl",
      p."averageConfidence"
    FROM users u
    LEFT JOIN progress p ON u.id = p."userId"
    ORDER BY u."createdAt" DESC
    LIMIT 100`
  );

  return (
    <AuthenticatedLayout>
      <UsersList users={users} />
    </AuthenticatedLayout>
  );
}
