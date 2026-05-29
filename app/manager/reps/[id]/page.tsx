import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ManagerRepProfile from "@/components/manager/ManagerRepProfile";
import { getRepProfile } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";
import { getCoachingFlagsForUser } from "@/lib/coaching/flags";
import { listAssignmentsForUser } from "@/lib/scenarios/queries";
import { queryOne } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function ManagerRepDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ period?: string }>;
}) {
  const manager = await requireManager().catch(() => null);
  if (!manager?.companyId) {
    redirect("/dashboard");
  }

  const { id: userId } = await params;
  const sp = await searchParams;
  const period: AnalyticsPeriod =
    sp.period === "7d" || sp.period === "90d" ? sp.period : "30d";

  const member = await queryOne<{ id: string }>(
    `SELECT id FROM users WHERE id = $1 AND "companyId" = $2 AND role = 'user'`,
    [userId, manager.companyId]
  );

  if (!member) {
    notFound();
  }

  const [profile, flags, assignments] = await Promise.all([
    getRepProfile(userId, manager.companyId, period),
    getCoachingFlagsForUser(userId, manager.companyId),
    listAssignmentsForUser(userId, manager.companyId),
  ]);

  if (!profile) {
    notFound();
  }

  return (
    <AuthenticatedLayout>
      <ManagerRepProfile
        userId={userId}
        profile={profile}
        flags={flags}
        assignments={assignments}
        period={period}
      />
    </AuthenticatedLayout>
  );
}
