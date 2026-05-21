import DashboardLayout from "@/components/DashboardLayout";
import styles from "@/components/StatCard.module.css";

const stats = [
  { label: "Funded learners", value: "156", hint: "Across 4 programs" },
  { label: "Contribution (YTD)", value: "RWF 4.2M", hint: "On track" },
  { label: "Active programs", value: "3", hint: "1 renewal due" },
  { label: "Impact score", value: "92%", hint: "Completion rate" },
];

const programs = [
  { title: "Youth financial literacy", meta: "48 learners · Q2" },
  { title: "Women entrepreneurs", meta: "62 learners · Ongoing" },
  { title: "Rural savings initiative", meta: "46 learners · Pilot" },
];

export default function PartnerDashboard() {
  return (
    <DashboardLayout
      role="partner"
      title="Partner dashboard"
      subtitle="Funding and impact"
      accent="var(--partner)"
    >
      <div className={styles.grid}>
        {stats.map((s) => (
          <div
            key={s.label}
            className={styles.card}
            data-accent
            style={{ "--accent": "var(--partner)" } as React.CSSProperties}
          >
            <div className={styles.label}>{s.label}</div>
            <div className={styles.value}>{s.value}</div>
            <div className={styles.hint}>{s.hint}</div>
          </div>
        ))}
      </div>
      <section className={styles.panel}>
        <h2>Your programs</h2>
        <ul className={styles.list}>
          {programs.map((item) => (
            <li key={item.title}>
              <span>{item.title}</span>
              <span>{item.meta}</span>
            </li>
          ))}
        </ul>
      </section>
    </DashboardLayout>
  );
}
