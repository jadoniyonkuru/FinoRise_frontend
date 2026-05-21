import DashboardLayout from "@/components/DashboardLayout";
import styles from "@/components/StatCard.module.css";

const stats = [
  { label: "Courses in progress", value: "3", hint: "+1 this week" },
  { label: "Lessons completed", value: "24", hint: "68% of path" },
  { label: "Certificates", value: "2", hint: "Financial literacy" },
  { label: "Learning streak", value: "7d", hint: "Keep it up!" },
];

const upcoming = [
  { title: "Budgeting basics", meta: "Module 4 · Due Fri" },
  { title: "Savings goals workshop", meta: "Live · Tue 14:00" },
  { title: "Quiz: Credit & debt", meta: "Assessment · Open" },
];

export default function LearnerDashboard() {
  return (
    <DashboardLayout
      role="learner"
      title="Learner dashboard"
      subtitle="Your learning hub"
      accent="var(--learner)"
    >
      <div className={styles.grid}>
        {stats.map((s) => (
          <div
            key={s.label}
            className={styles.card}
            data-accent
            style={{ "--accent": "var(--learner)" } as React.CSSProperties}
          >
            <div className={styles.label}>{s.label}</div>
            <div className={styles.value}>{s.value}</div>
            <div className={styles.hint}>{s.hint}</div>
          </div>
        ))}
      </div>
      <section className={styles.panel}>
        <h2>Up next</h2>
        <ul className={styles.list}>
          {upcoming.map((item) => (
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
