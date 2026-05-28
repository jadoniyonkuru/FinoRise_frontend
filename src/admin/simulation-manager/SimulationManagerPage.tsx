import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

const stats = [
  { label: "Active simulations", value: "9", hint: "Available to learners" },
  { label: "Scenarios", value: "27", hint: "Across simulations" },
  { label: "Completions (30d)", value: "412", hint: "+18% vs prior" },
  { label: "Avg. score", value: "78%", hint: "All scenarios" },
];

const simulations = [
  { title: "Emergency fund challenge", meta: "3 scenarios · Live" },
  { title: "Small business cash flow", meta: "5 scenarios · Live" },
  { title: "Retirement planning", meta: "4 scenarios · Draft" },
];

export default function SimulationManagerPage() {
  return (
    <AdminLayout title="Simulation mgr" subtitle="Tests, scenario">
      <AdminModuleContent
        stats={stats}
        panelTitle="Simulations"
        items={simulations}
      />
    </AdminLayout>
  );
}
