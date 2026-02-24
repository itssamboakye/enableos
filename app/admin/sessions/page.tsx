import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSessionsView from "@/components/admin/AdminSessionsView";

export default async function AdminSessionsPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect("/dashboard");
  }

  return (
    <AuthenticatedLayout>
      <AdminSessionsView />
    </AuthenticatedLayout>
  );
}

