import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManagerSessionsView from "@/components/manager/ManagerSessionsView";

export default async function ManagerSessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ rep?: string; session?: string }>;
}) {
  const manager = await requireManager().catch(() => null);

  if (!manager) {
    redirect("/dashboard");
  }

  if (!manager.companyId) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <AuthenticatedLayout>
      <ManagerSessionsView
        initialRepId={params.rep}
        initialSessionId={params.session}
      />
    </AuthenticatedLayout>
  );
}
