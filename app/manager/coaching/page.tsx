import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ManagerCoachingQueue from "@/components/manager/ManagerCoachingQueue";
import { requireManager } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagerCoachingPage() {
  const manager = await requireManager().catch(() => null);
  if (!manager?.companyId) {
    redirect("/dashboard");
  }

  return (
    <AuthenticatedLayout>
      <ManagerCoachingQueue />
    </AuthenticatedLayout>
  );
}
