import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminCompaniesView from "@/components/admin/AdminCompaniesView";

export default async function AdminCompaniesPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/dashboard");
  }

  return (
    <AuthenticatedLayout>
      <AdminCompaniesView />
    </AuthenticatedLayout>
  );
}
