import { useEffect, useState } from "react";
import { partnerService } from "@/api";
import type { PartnerImpact } from "@/api";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";

export default function PartnerImpactPage() {
  const [data, setData] = useState<PartnerImpact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    partnerService.getImpact()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = data ? [
    { label: "Total programs", value: String(data.stats.total_programs), hint: "All programs" },
    { label: "Learners reached", value: String(data.stats.learners_reached), hint: "Across all programs" },
    { label: "Categories covered", value: String(data.stats.categories_covered), hint: "Distinct categories" },
    { label: "Total XP available", value: data.stats.total_xp_available.toLocaleString(), hint: "XP from your programs" },
  ] : [];

  return (
    <DashboardLayout
      role="partner"
      title="Impact"
      subtitle="Measure the difference your funding makes"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading impact data…</p>
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

            {data && Object.keys(data.category_breakdown).length > 0 && (
              <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
                <h2>Category breakdown</h2>
                <div className={x.insightsList}>
                  {Object.entries(data.category_breakdown).map(([cat, count]) => (
                    <div key={cat} className={x.insightItem}>
                      <div className={`${x.insightCategory} ${x.insightCategoryPositive}`}>{cat}</div>
                      <p className={x.insightText}>{count} program{count !== 1 ? "s" : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data && Object.keys(data.difficulty_breakdown).length > 0 && (
              <section className={statStyles.panel} style={{ marginTop: "1rem" }}>
                <h2>Difficulty breakdown</h2>
                <div className={x.insightsList}>
                  {Object.entries(data.difficulty_breakdown).map(([diff, count]) => (
                    <div key={diff} className={x.insightItem}>
                      <div className={`${x.insightCategory} ${x.insightCategoryNeutral}`}>{diff}</div>
                      <p className={x.insightText}>{count} program{count !== 1 ? "s" : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data?.programs && data.programs.length === 0 && (
              <p style={{ color: "#6b7280", marginTop: "1rem" }}>No impact data yet. Create and publish programs to see impact metrics.</p>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
