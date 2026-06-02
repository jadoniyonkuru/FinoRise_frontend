import { useEffect, useState } from "react";
import { partnerService } from "@/api";
import type { PartnerPrograms } from "@/api";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";

export default function PartnerProgramsPage() {
  const [data, setData] = useState<PartnerPrograms | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    partnerService.getPrograms()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = data ? [
    { label: "Total programs", value: String(data.stats.total), hint: "All" },
    { label: "Published", value: String(data.stats.published), hint: "Live" },
    { label: "Drafts", value: String(data.stats.drafts), hint: "In progress" },
  ] : [];

  return (
    <DashboardLayout
      role="partner"
      title="Programs"
      subtitle="Manage your funded learning programs"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading programs…</p>
        ) : (
          <>
            <div className={statStyles.grid}>
              {stats.map((s) => (
                <div key={s.label} className={statStyles.card} data-accent style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
                  <div className={statStyles.label}>{s.label}</div>
                  <div className={statStyles.value}>{s.value}</div>
                  <div className={statStyles.hint}>{s.hint}</div>
                </div>
              ))}
            </div>

            <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
              <h2>All programs</h2>
              <div className={x.programList}>
                {(data?.programs ?? []).map((p) => (
                  <div key={p.id} className={x.programCard}>
                    <div className={x.programBody}>
                      <div className={x.programName}>{p.title}</div>
                      <div className={x.programMeta}>
                        <span>{p.category}</span>
                        <span>{p.difficulty}</span>
                        <span>{p.xp_reward} XP reward</span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.25rem 0 0" }}>{p.description}</p>
                    </div>
                  </div>
                ))}
                {(data?.programs ?? []).length === 0 && (
                  <p style={{ color: "#6b7280" }}>No programs yet.</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
