import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";

const stats = [
  { label: "Funded learners", value: "156", hint: "Across 3 programs" },
  { label: "Contribution (YTD)", value: "RWF 4.2M", hint: "On track" },
  { label: "Active programs", value: "3", hint: "1 renewal due" },
  { label: "Impact score", value: "92%", hint: "Avg completion rate" },
];

const programs = [
  { name: "Youth Financial Literacy", learners: 48, progress: 72, status: "Active" },
  { name: "Women Entrepreneurs", learners: 62, progress: 55, status: "Active" },
  { name: "Rural Savings Initiative", learners: 46, progress: 30, status: "Pilot" },
];

const actions = [
  { label: "View programs", sub: "3 active", to: "/partner/programs" },
  { label: "Impact report", sub: "Latest insights", to: "/partner/impact" },
  { label: "Profile", sub: "Update details", to: "/partner/profile" },
];

export default function PartnerDashboard() {
  return (
    <DashboardLayout
      role="partner"
      title="Partner dashboard"
      subtitle="Funding and impact overview"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        {/* Stats */}
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

        {/* Quick actions */}
        <div className={x.quickActions}>
          {actions.map((a) => (
            <Link key={a.label} to={a.to} className={x.actionCard}>
              <span className={x.actionLabel}>{a.label}</span>
              <span className={x.actionSub}>{a.sub}</span>
            </Link>
          ))}
        </div>

        {/* Active programs */}
        <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
          <h2>Active programs</h2>
          <div className={x.programList}>
            {programs.map((p) => (
              <div key={p.name} className={x.programCard}>
                <div className={x.programBody}>
                  <div className={x.programName}>{p.name}</div>
                  <div className={x.programMeta}>
                    <span>{p.learners} learners enrolled</span>
                  </div>
                  <div className={x.bar} style={{ maxWidth: 320 }}>
                    <div className={x.fill} style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className={x.programProgressLabel}>
                    {p.progress}% completion rate
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

        {/* AI Insight */}
        <div className={x.aiInsightBanner}>
          <div className={x.aiInsightLabel}>Impact insight</div>
          <p className={x.aiInsightText}>
            The Women Entrepreneurs program has a 15% drop-off after Module 4.
            Consider adding a motivational nudge or mentorship check-in at that
            stage to improve retention.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
