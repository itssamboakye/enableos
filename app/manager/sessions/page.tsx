import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManagerSessionsView from "@/components/manager/ManagerSessionsView";

export default async function ManagerSessionsPage() {
  const manager = await requireManager().catch(() => null);

  if (!manager) {
    redirect("/dashboard");
  }

  if (!manager.companyId) {
    redirect("/dashboard");
  }

  return (
    <AuthenticatedLayout>
      <ManagerSessionsView />
    </AuthenticatedLayout>
  );
}

