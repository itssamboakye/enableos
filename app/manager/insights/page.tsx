import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ManagerPlaybookInsights from "@/components/manager/ManagerPlaybookInsights";
import { getPlaybookReport } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagerInsightsPage({
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

  const report = await getPlaybookReport(manager.companyId, period);

  return (
    <AuthenticatedLayout>
      <ManagerPlaybookInsights report={report} />
    </AuthenticatedLayout>
  );
}
