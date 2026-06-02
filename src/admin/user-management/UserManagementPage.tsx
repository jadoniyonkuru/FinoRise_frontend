import { useEffect, useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";
import { adminService } from "@/api";
import type { User, AdminAnalytics } from "@/api";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminService.getUsers(), adminService.getAnalytics()])
      .then(([u, a]) => { setUsers(u); setAnalytics(a); })
      .finally(() => setLoading(false));
  }, []);

  const partners = analytics
    ? analytics.total_users - analytics.total_learners - analytics.total_admins
    : 0;

  const stats = [
    { label: "Total users", value: analytics ? analytics.total_users.toLocaleString() : "—", hint: "All roles" },
    { label: "Learners", value: analytics ? analytics.total_learners.toLocaleString() : "—", hint: analytics ? `${Math.round((analytics.total_learners / (analytics.total_users || 1)) * 100)}%` : "" },
    { label: "Admins", value: analytics ? analytics.total_admins.toString() : "—", hint: "System staff" },
    { label: "Partners", value: analytics ? partners.toString() : "—", hint: "Verified" },
  ];

  const items = users.map((u) => ({
    title: u.full_name,
    meta: `${u.role.charAt(0).toUpperCase() + u.role.slice(1)} · Level ${u.level}`,
  }));

  if (loading) {
    return (
      <AdminLayout title="User management" subtitle="Users, roles">
        <p>Loading…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="User management" subtitle="Users, roles">
      <AdminModuleContent stats={stats} panelTitle="All users" items={items} />
    </AdminLayout>
  );
}
