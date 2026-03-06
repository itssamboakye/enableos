import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";
import { queryOne } from "@/lib/db";
import ManagerDashboard from "@/components/manager/ManagerDashboard";

export default async function ManagerPage() {
  const manager = await requireManager().catch(() => null);

  if (!manager) {
    redirect("/dashboard");
  }

  if (!manager.companyId) {
    redirect("/dashboard");
  }

  const companyId = manager.companyId;

  const [
    totalUsers,
    totalSessions,
    activeUsers,
    sessionsThisWeek,
    averageDuration,
    completionRate,
  ] = await Promise.all([
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM users WHERE "companyId" = $1 AND role = 'user'`,
      [companyId]
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count 
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       WHERE u."companyId" = $1`,
      [companyId]
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(DISTINCT ps."userId") as count 
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       WHERE u."companyId" = $1
         AND ps."createdAt" >= NOW() - INTERVAL '7 days'`,
      [companyId]
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count 
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       WHERE u."companyId" = $1
         AND ps."createdAt" >= NOW() - INTERVAL '7 days'`,
      [companyId]
    ),
    queryOne<{ avg: number | null }>(
      `SELECT AVG(ps.duration) as avg 
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       WHERE u."companyId" = $1
         AND ps.duration IS NOT NULL`,
      [companyId]
    ),
    queryOne<{ completed: string; total: string }>(
      `SELECT 
        COUNT(*) FILTER (WHERE ps.duration IS NOT NULL) as completed,
        COUNT(*) as total
       FROM practice_sessions ps
       JOIN users u ON u.id = ps."userId"
       WHERE u."companyId" = $1`,
      [companyId]
    ),
  ]);

  const metrics = {
    totalUsers: parseInt(totalUsers?.count || "0"),
    totalSessions: parseInt(totalSessions?.count || "0"),
    activeUsers: parseInt(activeUsers?.count || "0"),
    sessionsThisWeek: parseInt(sessionsThisWeek?.count || "0"),
    averageDuration: averageDuration?.avg
      ? Math.round(averageDuration.avg / 60)
      : 0,
    completionRate:
      completionRate?.total && parseInt(completionRate.total) > 0
        ? Math.round(
            (parseInt(completionRate.completed) /
              parseInt(completionRate.total)) *
              100
          )
        : 0,
  };

  return (
    <AuthenticatedLayout>
      <ManagerDashboard metrics={metrics} />
    </AuthenticatedLayout>
  );
}

