import { useEffect, useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";
import { adminService } from "@/api";
import type { AdminAnalytics } from "@/api";

export default function AnalyticsPage() {
  const [data, setData] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAnalytics()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total users", value: data ? data.total_users.toLocaleString() : "—", hint: "Registered" },
    { label: "Learners", value: data ? data.total_learners.toLocaleString() : "—", hint: "Active learners" },
    { label: "Badges awarded", value: data ? data.total_badges_awarded.toLocaleString() : "—", hint: "All time" },
    { label: "Admins", value: data ? data.total_admins.toString() : "—", hint: "Platform staff" },
  ];

  const items = data
    ? data.top_users.map((u) => ({
        title: u.full_name,
        meta: `${u.xp_total.toLocaleString()} XP · Level ${u.level}`,
      }))
    : [];

  if (loading) {
    return (
      <AdminLayout title="Analytics" subtitle="Engagement, retention">
        <p>Loading…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics" subtitle="Engagement, retention">
      <AdminModuleContent stats={stats} panelTitle="Top learners by XP" items={items} />
    </AdminLayout>
  );
}
