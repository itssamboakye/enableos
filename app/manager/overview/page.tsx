import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ManagerOverview from "@/components/manager/ManagerOverview";
import { getCompanyOverviewMetrics } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagerOverviewPage({
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

  const metrics = await getCompanyOverviewMetrics(manager.companyId, period);

  const periodLabel =
    period === "7d" ? "7 days" : period === "90d" ? "90 days" : "30 days";

  return (
    <AuthenticatedLayout>
      <ManagerOverview metrics={metrics} period={periodLabel} />
    </AuthenticatedLayout>
  );
}
