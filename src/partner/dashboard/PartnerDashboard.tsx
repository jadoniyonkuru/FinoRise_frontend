import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import { partnerService } from "@/api/services/partner.service";
import type { PartnerDashboard as PartnerDashboardData, PartnerImpact } from "@/api/types";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";
import s from "./partner-dashboard.module.css";

/* ── Icons ── */
function IconUsers()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function IconDollar()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }
function IconTarget()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>; }
function IconAward()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>; }
function IconBriefcase(){ return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>; }

/* ── Constants ── */
const CATEGORY_COLORS: Record<string, string> = {
  budgeting:  "#0ea5e9",
  investing:  "#8b5cf6",
  emergency:  "#f59e0b",
  debt:       "#1e40af",
  loan:       "#10b981",
  general:    "#6b7280",
};

const W = 380, H_C = 110, yBase = 135, bW = 28;

/* ── Charts ── */
function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const r = 55, cx = 80, cy = 80, sw = 18;
  const C = 2 * Math.PI * r;
  const gap = 4;
  const total = data.reduce((acc, d) => acc + d.value, 0);
  if (total === 0) return <svg viewBox="0 0 160 160" style={{ width: 130, height: 130 }}><circle cx={cx} cy={cy} r={r} fill="none" stroke="#e4e7f3" strokeWidth={sw} /></svg>;
  const drawable = C - gap * data.length;
  let offset = C / 4;
  return (
    <svg viewBox="0 0 160 160" style={{ width: 130, height: 130, flexShrink: 0, display: "block" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e4e7f3" strokeWidth={sw} />
      {data.map((d) => {
        const len = (d.value / total) * drawable;
        const da = `${len} ${C - len}`;
        const co = offset;
        offset -= (len + gap);
        return (
          <circle key={d.label} cx={cx} cy={cy} r={r} fill="none"
            stroke={d.color} strokeWidth={sw}
            strokeDasharray={da} strokeDashoffset={co} />
        );
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#64748b">programs</text>
    </svg>
  );
}

function DifficultyBarChart({ breakdown }: { breakdown: Record<string, number> }) {
  const labels = ["beginner", "intermediate", "advanced"];
  const values = labels.map((l) => breakdown[l] ?? 0);
  const max = Math.max(...values, 1);
  const sp = (W - labels.length * bW) / (labels.length + 1);
  return (
    <svg viewBox={`0 0 ${W} 155`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {values.map((v, i) => {
        const bh = (v / max) * H_C;
        const xPos = sp + i * (bW + sp);
        const yPos = yBase - bh;
        return (
          <g key={labels[i]}>
            <rect x={xPos} y={yPos} width={bW} height={bh} rx={4} fill="url(#pGrad)" />
            <text x={xPos + bW / 2} y={yPos - 4} textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">{v}</text>
            <text x={xPos + bW / 2} y={150} textAnchor="middle" fontSize="9" fill="#94a3b8">{labels[i].slice(0, 5)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function XpBarChart({ programs }: { programs: { title: string; xp_reward: number }[] }) {
  const shown = programs.slice(0, 7);
  const max = Math.max(...shown.map((p) => p.xp_reward), 1);
  const sp = (W - shown.length * bW) / (shown.length + 1);
  return (
    <svg viewBox={`0 0 ${W} 155`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {shown.map((p, i) => {
        const bh = (p.xp_reward / max) * H_C;
        const xPos = sp + i * (bW + sp);
        const yPos = yBase - bh;
        return (
          <g key={p.title}>
            <rect x={xPos} y={yPos} width={bW} height={bh} rx={4} fill="url(#xpGrad)" />
            <text x={xPos + bW / 2} y={yPos - 4} textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">{p.xp_reward}</text>
            <text x={xPos + bW / 2} y={150} textAnchor="middle" fontSize="9" fill="#94a3b8">{p.title.slice(0, 4)}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Component ── */
export default function PartnerDashboard() {
  const [tab, setTab] = useState<"overview" | "analysis">("overview");
  const [dashboard, setDashboard] = useState<PartnerDashboardData | null>(null);
  const [impact, setImpact] = useState<PartnerImpact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([partnerService.getDashboard(), partnerService.getImpact()])
      .then(([dash, imp]) => {
        setDashboard(dash);
        setImpact(imp);
      })
      .catch(() => setError("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  const impactStats = impact?.stats;
  const dashStats = dashboard?.stats;

  const overviewStats = [
    { label: "Published programs", value: String(dashStats?.published_programs ?? "—"), hint: `${dashStats?.draft_programs ?? 0} in draft` },
    { label: "Learners reached",   value: String(impactStats?.learners_reached ?? "—"),  hint: "Enrolled in programs" },
    { label: "Total XP available", value: (impactStats?.total_xp_available ?? 0).toLocaleString(), hint: "Across all modules" },
    { label: "Categories covered", value: String(impactStats?.categories_covered ?? "—"), hint: "Financial topics" },
  ];

  const donutData = Object.entries(impact?.category_breakdown ?? {}).map(([label, value]) => ({
    label,
    value: value as number,
    color: CATEGORY_COLORS[label] ?? "#6b7280",
  }));

  const topCategory = donutData.length
    ? donutData.reduce((a, b) => (a.value >= b.value ? a : b)).label
    : "—";

  const analysisStats = [
    { label: "Published Programs", value: String(dashStats?.published_programs ?? "—"), trend: `${dashStats?.total_programs ?? 0} total`, dir: "neutral" as const, iconBg: "rgba(14,165,233,0.1)",  iconColor: "#0ea5e9", icon: <IconBriefcase /> },
    { label: "Draft Programs",     value: String(dashStats?.draft_programs ?? "—"),     trend: "unpublished",                                                    dir: "neutral" as const, iconBg: "rgba(100,116,139,0.1)", iconColor: "#64748b", icon: <IconBriefcase /> },
    { label: "Learners Reached",   value: String(impactStats?.learners_reached ?? "—"), trend: "enrolled",                                                       dir: "up"      as const, iconBg: "rgba(14,165,233,0.1)",  iconColor: "#0ea5e9", icon: <IconUsers /> },
    { label: "Total XP Available", value: (impactStats?.total_xp_available ?? 0).toLocaleString(), trend: "XP",                                                 dir: "up"      as const, iconBg: "rgba(249,115,22,0.1)",  iconColor: "#f97316", icon: <IconDollar /> },
    { label: "Categories Covered", value: String(impactStats?.categories_covered ?? "—"), trend: "topics",                                                      dir: "up"      as const, iconBg: "rgba(139,92,246,0.1)",  iconColor: "#8b5cf6", icon: <IconTarget /> },
    { label: "Total Programs",     value: String(impactStats?.total_programs ?? "—"),   trend: "all programs",                                                   dir: "neutral" as const, iconBg: "rgba(251,191,36,0.1)",  iconColor: "#f59e0b", icon: <IconAward /> },
  ];

  const metaStats = [
    { label: "Total programs",      value: String(impactStats?.total_programs ?? "—"),            hint: "All time" },
    { label: "Published",           value: String(dashStats?.published_programs ?? "—"),           hint: "Live on platform" },
    { label: "Learners reached",    value: String(impactStats?.learners_reached ?? "—"),           hint: "Enrolled users" },
    { label: "Top category",        value: topCategory,                                            hint: "Most programs" },
  ];

  const actions = [
    { label: "View programs",  sub: `${impactStats?.total_programs ?? 0} programs`,   to: "/partner/programs" },
    { label: "Impact report",  sub: "Latest insights",                                 to: "/partner/impact"   },
    { label: "Profile",        sub: "Update details",                                  to: "/partner/profile"  },
  ];

  const recentPrograms = dashboard?.recent_programs ?? [];
  const allPrograms    = impact?.programs ?? [];

  return (
    <DashboardLayout
      role="partner"
      title="Partner dashboard"
      subtitle="Funding and impact overview"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        {/* Tab bar */}
        <div className={s.tabBar}>
          <button className={s.tabBtn} data-active={String(tab === "overview")} onClick={() => setTab("overview")}>Overview</button>
          <button className={s.tabBtn} data-active={String(tab === "analysis")} onClick={() => setTab("analysis")}>Analysis</button>
        </div>

        {loading && <p style={{ color: "var(--text-2)", padding: "2rem 0" }}>Loading dashboard…</p>}
        {error   && <p style={{ color: "var(--danger)", padding: "2rem 0" }}>{error}</p>}

        {/* ── Overview ── */}
        {!loading && !error && tab === "overview" && (
          <>
            <div className={statStyles.grid}>
              {overviewStats.map((st) => (
                <div key={st.label} className={statStyles.card} data-accent
                  style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
                  <div className={statStyles.label}>{st.label}</div>
                  <div className={statStyles.value}>{st.value}</div>
                  <div className={statStyles.hint}>{st.hint}</div>
                </div>
              ))}
            </div>

            <div className={x.quickActions}>
              {actions.map((a) => (
                <Link key={a.label} to={a.to} className={x.actionCard}>
                  <span className={x.actionLabel}>{a.label}</span>
                  <span className={x.actionSub}>{a.sub}</span>
                </Link>
              ))}
            </div>

            <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
              <h2>Recent programs</h2>
              {recentPrograms.length === 0 && (
                <p style={{ color: "var(--text-2)", fontSize: "0.875rem" }}>No programs yet.</p>
              )}
              <div className={x.programList}>
                {recentPrograms.map((p) => (
                  <div key={p.id} className={x.programCard}>
                    <div className={x.programBody}>
                      <div className={x.programName}>{p.title}</div>
                      <div className={x.programMeta}>
                        <span style={{ textTransform: "capitalize" }}>{p.category}</span>
                        {" · "}
                        <span style={{ textTransform: "capitalize" }}>{p.difficulty}</span>
                        {" · "}
                        <span>{p.xp_reward} XP</span>
                      </div>
                    </div>
                    <span className={`${x.tag} ${p.is_published ? x.tagGreen : x.tagAmber}`}>
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {dashboard?.ai_insight && (
              <div className={x.aiInsightBanner}>
                <div className={x.aiInsightLabel}>AI impact insight</div>
                <p className={x.aiInsightText}>{dashboard.ai_insight.insight_text}</p>
              </div>
            )}
          </>
        )}

        {/* ── Analysis ── */}
        {!loading && !error && tab === "analysis" && (
          <>
            <div className={s.analysisGrid}>
              {analysisStats.map((st) => (
                <div key={st.label} className={s.aStatCard}>
                  <div className={s.aStatTop}>
                    <div className={s.aStatIcon} style={{ background: st.iconBg, color: st.iconColor }}>{st.icon}</div>
                    <span className={`${s.aTrend} ${st.dir === "up" ? s.aTrendUp : st.dir === "down" ? s.aTrendDown : s.aTrendNeutral}`}>{st.trend}</span>
                  </div>
                  <div className={s.aStatLabel}>{st.label}</div>
                  <div className={s.aStatValue}>{st.value}</div>
                </div>
              ))}
            </div>

            <div className={s.chartsRow}>
              {/* Donut — category distribution */}
              <div className={s.chartPanel}>
                <div className={s.chartTitle}>Programs by category</div>
                <div className={s.donutWrap}>
                  <DonutChart data={donutData} />
                  <ul className={s.legend}>
                    {donutData.map((d) => (
                      <li key={d.label} className={s.legendItem}>
                        <span className={s.legendDot} style={{ background: d.color }} />
                        <span className={s.legendLabel} style={{ textTransform: "capitalize" }}>{d.label}</span>
                        <span className={s.legendVal}>{d.value}</span>
                      </li>
                    ))}
                    {donutData.length > 0 && (
                      <li className={s.legendTotal}>
                        <span>Total</span>
                        <span>{donutData.reduce((a, d) => a + d.value, 0)}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Bar — difficulty breakdown */}
              <div className={s.chartPanel}>
                <div className={s.chartTitle}>Programs by difficulty</div>
                <DifficultyBarChart breakdown={impact?.difficulty_breakdown ?? {}} />
                <div className={s.chartNote}>
                  Beginner · Intermediate · Advanced
                </div>
              </div>

              {/* Bar — XP reward per program */}
              <div className={s.chartPanel}>
                <div className={s.chartTitle}>XP reward per program</div>
                {allPrograms.length > 0
                  ? <XpBarChart programs={allPrograms} />
                  : <p style={{ color: "var(--text-2)", fontSize: "0.875rem", paddingTop: "1rem" }}>No programs yet.</p>
                }
                {allPrograms.length > 0 && (
                  <div className={s.chartNote}>
                    Max: <strong>{Math.max(...allPrograms.map((p) => p.xp_reward))} XP</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Program performance */}
            <div className={s.perfPanel}>
              <h3 className={s.perfTitle}>All programs</h3>
              {allPrograms.length === 0 && (
                <p style={{ color: "var(--text-2)", fontSize: "0.875rem" }}>No programs yet.</p>
              )}
              {allPrograms.map((p) => (
                <div key={p.id} className={s.perfItem}>
                  <div className={s.perfHeader}>
                    <span className={s.perfName}>{p.title}</span>
                    <span className={s.perfMeta} style={{ textTransform: "capitalize" }}>
                      {p.category} · {p.difficulty} · {p.xp_reward} XP · {p.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className={s.track}>
                    <div className={s.fill} style={{ width: `${Math.min((p.xp_reward / 500) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Meta stats */}
            <div className={s.metaGrid}>
              {metaStats.map((m) => (
                <div key={m.label} className={s.metaCard}>
                  <div className={s.metaLabel}>{m.label}</div>
                  <div className={s.metaValue} style={{ textTransform: "capitalize" }}>{m.value}</div>
                  <div className={s.metaHint}>{m.hint}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
