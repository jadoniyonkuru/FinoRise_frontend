import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

const stats = [
  { label: "Daily active users", value: "342", hint: "+12% vs last week" },
  { label: "Engagement rate", value: "64%", hint: "Lessons + simulations" },
  { label: "30-day retention", value: "71%", hint: "Returning learners" },
  { label: "Avg. session", value: "18m", hint: "Per visit" },
];

const insights = [
  { title: "Peak usage: Tue–Thu 18:00–21:00", meta: "Engagement" },
  { title: "Drop-off after Module 2 quiz", meta: "Retention risk" },
  { title: "Simulation completions up 18%", meta: "Positive trend" },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout title="Analytics" subtitle="Engagement, retention">
      <AdminModuleContent stats={stats} panelTitle="Insights" items={insights} />
    </AdminLayout>
  );
}
