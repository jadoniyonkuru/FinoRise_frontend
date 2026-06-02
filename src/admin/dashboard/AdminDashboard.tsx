import AdminLayout from "@/admin/AdminLayout";
import OverviewDashboard from "@/portal/OverviewDashboard";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Overview" subtitle="Monitor your learning ecosystem performance and financial growth.">
      <OverviewDashboard />
    </AdminLayout>
  );
}
