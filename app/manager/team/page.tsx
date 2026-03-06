import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManagerTeamView from "@/components/manager/ManagerTeamView";

export default async function ManagerTeamPage() {
  const manager = await requireManager().catch(() => null);

  if (!manager || !manager.companyId) {
    redirect("/dashboard");
  }

  return (
    <AuthenticatedLayout>
      <ManagerTeamView />
    </AuthenticatedLayout>
  );
}

