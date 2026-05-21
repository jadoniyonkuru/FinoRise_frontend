import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

const stats = [
  { label: "Total users", value: "1,284", hint: "+42 this month" },
  { label: "Active courses", value: "18", hint: "3 drafts" },
  { label: "Reports generated", value: "24", hint: "This quarter" },
  { label: "Support tickets", value: "5", hint: "2 urgent" },
];

const activity = [
  { title: "Monthly summary report", meta: "Ready · PDF" },
  { title: "Learner growth report", meta: "Updated today" },
  { title: "Partner contribution report", meta: "Scheduled Fri" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Admin dashboard" subtitle="All statistics, reports">
      <AdminModuleContent
        stats={stats}
        panelTitle="Recent reports"
        items={activity}
      />
    </AdminLayout>
  );
}
