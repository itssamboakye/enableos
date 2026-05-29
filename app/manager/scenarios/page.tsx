import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ManagerScenarioPerformance from "@/components/manager/ManagerScenarioPerformance";
import { getScenarioPerformanceReport } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagerScenariosPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const manager = await requireManager().catch(() => null);
  if (!manager?.companyId) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const period: AnalyticsPeriod =
    params.period === "7d" || params.period === "90d" ? params.period : "30d";

  const report = await getScenarioPerformanceReport(manager.companyId, period);

  return (
    <AuthenticatedLayout>
      <ManagerScenarioPerformance report={report} />
    </AuthenticatedLayout>
  );
}
