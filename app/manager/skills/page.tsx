import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ManagerSkillHeatmap from "@/components/manager/ManagerSkillHeatmap";
import { getTeamSkillHeatmap } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagerSkillsPage({
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

  const heatmap = await getTeamSkillHeatmap(manager.companyId, period);

  return (
    <AuthenticatedLayout>
      <ManagerSkillHeatmap heatmap={heatmap} />
    </AuthenticatedLayout>
  );
}
