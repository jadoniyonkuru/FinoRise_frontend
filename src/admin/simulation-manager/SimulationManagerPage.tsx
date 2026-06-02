import { useEffect, useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";
import { simulationsService } from "@/api";
import type { Simulation } from "@/api";

export default function SimulationManagerPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    simulationsService.getAll()
      .then(setSimulations)
      .finally(() => setLoading(false));
  }, []);

  const published = simulations.filter((s) => s.is_published).length;
  const drafts = simulations.length - published;

  const stats = [
    { label: "Active simulations", value: published.toString(), hint: "Available to learners" },
    { label: "Total", value: simulations.length.toString(), hint: "Including drafts" },
    { label: "Drafts", value: drafts.toString(), hint: "Not yet published" },
    { label: "Categories", value: String(new Set(simulations.map((s) => s.category)).size), hint: "Distinct topics" },
  ];

  const items = simulations.map((sim) => ({
    title: sim.title,
    meta: `${sim.category} · ${sim.difficulty} · ${sim.is_published ? "Live" : "Draft"}`,
  }));

  if (loading) {
    return (
      <AdminLayout title="Simulation mgr" subtitle="Tests, scenarios">
        <p>Loading…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Simulation mgr" subtitle="Tests, scenarios">
      <AdminModuleContent stats={stats} panelTitle="All simulations" items={items} />
    </AdminLayout>
  );
}
