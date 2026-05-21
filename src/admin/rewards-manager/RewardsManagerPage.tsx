import AdminLayout from "@/admin/AdminLayout";
import AdminModuleContent from "@/admin/components/AdminModuleContent";

const stats = [
  { label: "Active rewards", value: "14", hint: "Open programs" },
  { label: "Eligible learners", value: "856", hint: "This cycle" },
  { label: "Redeemed (30d)", value: "124", hint: "Certificates & badges" },
  { label: "Pending review", value: "7", hint: "Eligibility checks" },
];

const rewards = [
  { title: "Completion badge — Module 1", meta: "Eligibility: 100% lessons" },
  { title: "Streak bonus — 7 days", meta: "Eligibility: Active learners" },
  { title: "Partner scholarship slot", meta: "Eligibility: Top 10%" },
];

export default function RewardsManagerPage() {
  return (
    <AdminLayout title="Rewards manager" subtitle="Rewards, eligibility">
      <AdminModuleContent stats={stats} panelTitle="Reward programs" items={rewards} />
    </AdminLayout>
  );
}
