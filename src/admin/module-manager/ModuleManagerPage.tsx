import { useEffect, useState } from "react";
import { modulesService } from "@/api";
import type { Module } from "@/api";
import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

export default function ModuleManagerPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    modulesService.getAll()
      .then(setModules)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total modules", value: String(modules.length), hint: "On platform" },
    { label: "Categories", value: String(new Set(modules.map(m => m.category).filter(Boolean)).size), hint: "Distinct categories" },
  ];

  const items = modules.map(m => ({
    title: m.title,
    meta: `${m.difficulty ?? "—"} · ${m.xp_reward} XP · ${m.category ?? "—"}`,
  }));

  return (
    <AdminLayout title="Module manager" subtitle="Create and manage learning modules">
      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading modules…</p>
      ) : (
        <AdminModuleContent stats={stats} panelTitle="All modules" items={items} />
      )}
    </AdminLayout>
  );
}
