import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect("/dashboard");
  }

  // Fetch platform metrics
  const [
    totalUsers,
    totalSessions,
    activeUsers,
    sessionsThisWeek,
    averageDuration,
    completionRate,
  ] = await Promise.all([
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM users`
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM practice_sessions`
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(DISTINCT "userId") as count 
       FROM practice_sessions 
       WHERE "createdAt" >= NOW() - INTERVAL '7 days'`
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count 
       FROM practice_sessions 
       WHERE "createdAt" >= NOW() - INTERVAL '7 days'`
    ),
    queryOne<{ avg: number | null }>(
      `SELECT AVG(duration) as avg FROM practice_sessions WHERE duration IS NOT NULL`
    ),
    queryOne<{ completed: string; total: string }>(
      `SELECT 
        COUNT(*) FILTER (WHERE duration IS NOT NULL) as completed,
        COUNT(*) as total
       FROM practice_sessions`
    ),
  ]);

  const metrics = {
    totalUsers: parseInt(totalUsers?.count || "0"),
    totalSessions: parseInt(totalSessions?.count || "0"),
    activeUsers: parseInt(activeUsers?.count || "0"),
    sessionsThisWeek: parseInt(sessionsThisWeek?.count || "0"),
    averageDuration: averageDuration?.avg 
      ? Math.round(averageDuration.avg / 60) 
      : 0, // Convert to minutes
    completionRate: completionRate?.total && parseInt(completionRate.total) > 0
      ? Math.round((parseInt(completionRate.completed) / parseInt(completionRate.total)) * 100)
      : 0,
  };

  return (
    <AuthenticatedLayout>
      <AdminDashboard metrics={metrics} />
    </AuthenticatedLayout>
  );
}
