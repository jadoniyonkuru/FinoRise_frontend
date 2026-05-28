import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

const stats = [
  { label: "Published modules", value: "18", hint: "Live on platform" },
  { label: "Draft modules", value: "3", hint: "In review" },
  { label: "Archived", value: "6", hint: "Hidden from learners" },
  { label: "Lessons total", value: "142", hint: "Across modules" },
];

const modules = [
  { title: "Budgeting basics", meta: "Published · 8 lessons" },
  { title: "Investing 101", meta: "Published · 12 lessons" },
  { title: "Credit & debt", meta: "Draft · 6 lessons" },
];

export default function ModuleManagerPage() {
  return (
    <AdminLayout title="Module manager" subtitle="Create, manage">
      <AdminModuleContent stats={stats} panelTitle="Modules" items={modules} />
    </AdminLayout>
  );
}
