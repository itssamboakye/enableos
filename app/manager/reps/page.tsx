import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ManagerRepScoreboard from "@/components/manager/ManagerRepScoreboard";
import { getRepScoreboard } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagerRepsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const manager = await requireManager().catch(() => null);
  if (!manager?.companyId) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const periodParam = params.period;
  const period: AnalyticsPeriod =
    periodParam === "7d" || periodParam === "90d" ? periodParam : "30d";

  const rows = await getRepScoreboard(manager.companyId, period);

  return (
    <AuthenticatedLayout>
      <ManagerRepScoreboard rows={rows} period={period} />
    </AuthenticatedLayout>
  );
}
