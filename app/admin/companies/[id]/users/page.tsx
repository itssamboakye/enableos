import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminCompanyUsersView from "@/components/admin/AdminCompanyUsersView";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminCompanyUsersPage({ params }: PageProps) {
  try {
    await requireAdmin();
  } catch {
    redirect("/dashboard");
  }

  const { id } = await params;

  return (
    <AuthenticatedLayout>
      <AdminCompanyUsersView companyId={id} />
    </AuthenticatedLayout>
  );
}
