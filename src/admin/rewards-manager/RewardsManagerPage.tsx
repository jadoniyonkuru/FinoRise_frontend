import { useEffect, useState } from "react";
import { rewardsService } from "@/api";
import type { Reward } from "@/api";
import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

export default function RewardsManagerPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    rewardsService.getAll()
      .then(setRewards)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeRewards = rewards.filter(r => r.is_active);

  const stats = [
    { label: "Active rewards", value: String(activeRewards.length), hint: "Open programs" },
    { label: "Total rewards", value: String(rewards.length), hint: "All rewards" },
  ];

  const items = rewards.map(r => ({
    title: r.title,
    meta: `${r.reward_type} · ${r.xp_cost.toLocaleString()} XP · ${r.is_active ? "Active" : "Inactive"}`,
  }));

  return (
    <AdminLayout title="Rewards manager" subtitle="Manage rewards and redemptions">
      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading rewards…</p>
      ) : (
        <AdminModuleContent stats={stats} panelTitle="Reward programs" items={items} />
      )}
    </AdminLayout>
  );
}
