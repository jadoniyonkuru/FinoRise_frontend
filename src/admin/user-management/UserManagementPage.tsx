import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

const stats = [
  { label: "Total users", value: "1,284", hint: "All roles" },
  { label: "Learners", value: "1,102", hint: "86%" },
  { label: "Admins", value: "8", hint: "System staff" },
  { label: "Partners", value: "12", hint: "Verified" },
];

const users = [
  { title: "Marie Uwase", meta: "Learner · Active" },
  { title: "Jean Paul N.", meta: "Admin · Active" },
  { title: "Kigali Savings Co.", meta: "Partner · Active" },
];

export default function UserManagementPage() {
  return (
    <AdminLayout title="User management" subtitle="Users, roles">
      <AdminModuleContent stats={stats} panelTitle="Recent users" items={users} />
    </AdminLayout>
  );
}
