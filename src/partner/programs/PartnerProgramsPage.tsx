import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";

const stats = [
  { label: "Total programs", value: "3", hint: "All active or pilot" },
  { label: "Total learners", value: "156", hint: "Across all programs" },
  { label: "Avg completion", value: "52%", hint: "+8% this quarter" },
  { label: "Total funded", value: "RWF 4.2M", hint: "Year to date" },
];

const programs = [
  {
    id: 1,
    name: "Youth Financial Literacy",
    learners: 48,
    funded: "RWF 1.2M",
    progress: 72,
    status: "Active",
    quarter: "Q2 2025",
    modules: 6,
  },
  {
    id: 2,
    name: "Women Entrepreneurs",
    learners: 62,
    funded: "RWF 1.8M",
    progress: 55,
    status: "Active",
    quarter: "Ongoing",
    modules: 8,
  },
  {
    id: 3,
    name: "Rural Savings Initiative",
    learners: 46,
    funded: "RWF 1.2M",
    progress: 30,
    status: "Pilot",
    quarter: "Q3 2025",
    modules: 5,
  },
];

export default function PartnerProgramsPage() {
  return (
    <DashboardLayout
      role="partner"
      title="Programs"
      subtitle="Manage your funded learning programs"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        <div className={statStyles.grid}>
          {stats.map((s) => (
            <div
              key={s.label}
              className={statStyles.card}
              data-accent
              style={{ "--accent": "var(--partner)" } as React.CSSProperties}
            >
              <div className={statStyles.label}>{s.label}</div>
              <div className={statStyles.value}>{s.value}</div>
              <div className={statStyles.hint}>{s.hint}</div>
            </div>
          ))}
        </div>

        <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
          <h2>All programs</h2>
          <div className={x.programList}>
            {programs.map((p) => (
              <div key={p.id} className={x.programCard}>
                <div className={x.programBody}>
                  <div className={x.programName}>{p.name}</div>
                  <div className={x.programMeta}>
                    <span>{p.learners} learners</span>
                    <span>{p.funded} funded</span>
                    <span>{p.modules} modules</span>
                    <span>{p.quarter}</span>
                  </div>
                  <div className={x.bar} style={{ maxWidth: 340 }}>
                    <div
                      className={x.fill}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <div className={x.programProgressLabel}>
                    {p.progress}% average completion
                  </div>
                </div>
                <span
                  className={`${x.tag} ${
                    p.status === "Active" ? x.tagGreen : x.tagAmber
                  }`}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
