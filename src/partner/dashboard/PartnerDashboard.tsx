import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { partnerService } from "@/api";
import type { PartnerDashboard as DashboardData } from "@/api";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";

const actions = [
  { label: "View programs", sub: "All programs", to: "/partner/programs" },
  { label: "Impact report", sub: "Latest insights", to: "/partner/impact" },
  { label: "Profile", sub: "Update details", to: "/partner/profile" },
];

export default function PartnerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    partnerService.getDashboard()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = data ? [
    { label: "Total programs", value: String(data.stats.total_programs), hint: "All programs" },
    { label: "Published programs", value: String(data.stats.published_programs), hint: "Live" },
    { label: "Draft programs", value: String(data.stats.draft_programs), hint: "In progress" },
  ] : [];

  return (
    <DashboardLayout
      role="partner"
      title="Partner dashboard"
      subtitle="Funding and impact overview"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading dashboard…</p>
        ) : (
          <>
            {/* Stats */}
            <div className={statStyles.grid}>
              {stats.map((s) => (
                <div key={s.label} className={statStyles.card} data-accent style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
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

            {/* Recent programs */}
            {data?.recent_programs && data.recent_programs.length > 0 && (
              <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
                <h2>Recent programs</h2>
                <div className={x.programList}>
                  {data.recent_programs.map((p) => (
                    <div key={p.id} className={x.programCard}>
                      <div className={x.programBody}>
                        <div className={x.programName}>{p.title}</div>
                        <div className={x.programMeta}>
                          <span>{p.category}</span>
                          <span>{p.difficulty}</span>
                          <span>{p.xp_reward} XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* AI Insight */}
            {data?.ai_insight && (
              <div className={x.aiInsightBanner}>
                <div className={x.aiInsightLabel}>Impact insight</div>
                <p className={x.aiInsightText}>{data.ai_insight.insight_text}</p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
