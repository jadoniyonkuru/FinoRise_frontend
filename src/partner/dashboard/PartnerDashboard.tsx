import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";
import s from "./partner-dashboard.module.css";

/* ── Icons ── */
function IconUsers()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function IconDollar()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }
function IconTarget()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>; }
function IconAward()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>; }
function IconBriefcase(){ return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>; }
function IconTrend()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; }

/* ── Charts ── */
const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const W = 380, H_C = 110, yBase = 135, bW = 28;
const sp = (W - months.length * bW) / (months.length + 1);

const donutData = [
  { label: "Youth Financial Literacy", value: 48, color: "#0ea5e9" },
  { label: "Women Entrepreneurs",      value: 62, color: "#8b5cf6" },
  { label: "Rural Savings Initiative", value: 46, color: "#1e40af" },
];

function DonutChart() {
  const r = 55, cx = 80, cy = 80, sw = 18;
  const C = 2 * Math.PI * r;
  const gap = 4;
  const total = donutData.reduce((acc, d) => acc + d.value, 0);
  const drawable = C - gap * donutData.length;
  let offset = C / 4;
  return (
    <svg viewBox="0 0 160 160" style={{ width: 130, height: 130, flexShrink: 0, display: "block" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e4e7f3" strokeWidth={sw} />
      {donutData.map((d) => {
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
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#64748b">learners</text>
    </svg>
  );
}

const enrollValues = [18, 22, 19, 28, 24, 21, 24];

function EnrollBarChart() {
  const max = Math.max(...enrollValues);
  return (
    <svg viewBox={`0 0 ${W} 155`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {enrollValues.map((v, i) => {
        const bh = (v / max) * H_C;
        const x = sp + i * (bW + sp);
        const y = yBase - bh;
        return (
          <g key={months[i]}>
            <rect x={x} y={y} width={bW} height={bh} rx={4}
              fill="url(#pGrad)" opacity={i === enrollValues.length - 1 ? 1 : 0.65} />
            <text x={x + bW / 2} y={y - 4} textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">{v}</text>
            <text x={x + bW / 2} y={150} textAnchor="middle" fontSize="9" fill="#94a3b8">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

const completionValues = [55, 58, 62, 60, 65, 68, 72];

function CompletionLineChart() {
  const max = 80, min = 45;
  const pts = completionValues.map((v, i) => ({
    x: sp + i * (bW + sp) + bW / 2,
    y: yBase - ((v - min) / (max - min)) * H_C,
  }));
  const lineStr = pts.map(p => `${p.x},${p.y}`).join(" ");
  const areaStr = [`${pts[0].x},${yBase}`, ...pts.map(p => `${p.x},${p.y}`), `${pts[pts.length - 1].x},${yBase}`].join(" ");
  return (
    <svg viewBox={`0 0 ${W} 155`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaStr} fill="url(#cGrad)" />
      <polyline points={lineStr} fill="none" stroke="#f59e0b" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={months[i]} cx={p.x} cy={p.y} r={4} fill="#fff" stroke="#f59e0b" strokeWidth="2.5" />
      ))}
      {months.map((m, i) => (
        <text key={m} x={sp + i * (bW + sp) + bW / 2} y={150}
          textAnchor="middle" fontSize="9" fill="#94a3b8">{m}</text>
      ))}
    </svg>
  );
}

/* ── Data ── */
const overviewStats = [
  { label: "Funded learners",   value: "156",      hint: "Across 3 programs"  },
  { label: "Contribution (YTD)",value: "RWF 4.2M", hint: "On track"           },
  { label: "Active programs",   value: "3",        hint: "1 renewal due"      },
  { label: "Impact score",      value: "92%",      hint: "Avg completion rate" },
];

const programs = [
  { name: "Youth Financial Literacy", learners: 48, progress: 72, status: "Active" },
  { name: "Women Entrepreneurs",      learners: 62, progress: 55, status: "Active" },
  { name: "Rural Savings Initiative", learners: 46, progress: 30, status: "Pilot"  },
];

const actions = [
  { label: "View programs",  sub: "3 active",       to: "/partner/programs" },
  { label: "Impact report",  sub: "Latest insights", to: "/partner/impact"  },
  { label: "Profile",        sub: "Update details",  to: "/partner/profile" },
];

type Stat = { label: string; value: string; trend: string; dir: "up" | "down" | "neutral"; iconBg: string; iconColor: string; icon: React.ReactNode };

const analysisStats: Stat[] = [
  { label: "Funded Learners",   value: "156",      trend: "+8",     dir: "up",      iconBg: "rgba(14,165,233,0.1)",  iconColor: "#0ea5e9", icon: <IconUsers /> },
  { label: "Contribution YTD",  value: "RWF 4.2M", trend: "+12.5%", dir: "up",      iconBg: "rgba(30,64,175,0.1)",   iconColor: "#1d4ed8", icon: <IconDollar /> },
  { label: "Avg Completion",    value: "72%",      trend: "+4%",    dir: "up",      iconBg: "rgba(251,191,36,0.1)",  iconColor: "#f59e0b", icon: <IconTarget /> },
  { label: "Impact Score",      value: "92%",      trend: "+1%",    dir: "up",      iconBg: "rgba(139,92,246,0.1)",  iconColor: "#8b5cf6", icon: <IconAward /> },
  { label: "Active Programs",   value: "3",        trend: "stable", dir: "neutral", iconBg: "rgba(14,165,233,0.1)",  iconColor: "#0ea5e9", icon: <IconBriefcase /> },
  { label: "Avg XP / Learner",  value: "2,840",    trend: "+180",   dir: "up",      iconBg: "rgba(249,115,22,0.1)",  iconColor: "#f97316", icon: <IconTrend /> },
];

const metaStats = [
  { label: "Avg completion rate",  value: "72%",               hint: "+4% vs last quarter" },
  { label: "Learner retention",    value: "84%",               hint: "30-day return rate"   },
  { label: "Total XP generated",   value: "442K",              hint: "Across all programs"  },
  { label: "Best program",         value: "Women Entrep.",     hint: "Highest retention"    },
];

/* ── Component ── */
export default function PartnerDashboard() {
  const [tab, setTab] = useState<"overview" | "analysis">("overview");

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

        {/* ── Overview ── */}
        {tab === "overview" && (
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
              <h2>Active programs</h2>
              <div className={x.programList}>
                {programs.map((p) => (
                  <div key={p.name} className={x.programCard}>
                    <div className={x.programBody}>
                      <div className={x.programName}>{p.name}</div>
                      <div className={x.programMeta}><span>{p.learners} learners enrolled</span></div>
                      <div className={x.bar} style={{ maxWidth: 320 }}>
                        <div className={x.fill} style={{ width: `${p.progress}%` }} />
                      </div>
                      <div className={x.programProgressLabel}>{p.progress}% completion rate</div>
                    </div>
                    <span className={`${x.tag} ${p.status === "Active" ? x.tagGreen : x.tagAmber}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className={x.aiInsightBanner}>
              <div className={x.aiInsightLabel}>Impact insight</div>
              <p className={x.aiInsightText}>
                The Women Entrepreneurs program has a 15% drop-off after Module 4. Consider adding a
                motivational nudge or mentorship check-in at that stage to improve retention.
              </p>
            </div>
          </>
        )}

        {/* ── Analysis ── */}
        {tab === "analysis" && (
          <>
            {/* Stat cards */}
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

            {/* Charts */}
            <div className={s.chartsRow}>
              {/* Donut */}
              <div className={s.chartPanel}>
                <div className={s.chartTitle}>Program distribution</div>
                <div className={s.donutWrap}>
                  <DonutChart />
                  <ul className={s.legend}>
                    {donutData.map((d) => (
                      <li key={d.label} className={s.legendItem}>
                        <span className={s.legendDot} style={{ background: d.color }} />
                        <span className={s.legendLabel}>{d.label}</span>
                        <span className={s.legendVal}>{d.value}</span>
                      </li>
                    ))}
                    <li className={s.legendTotal}>
                      <span>Total</span>
                      <span>{donutData.reduce((a, d) => a + d.value, 0)}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bar */}
              <div className={s.chartPanel}>
                <div className={s.chartTitle}>Monthly enrollments</div>
                <EnrollBarChart />
                <div className={s.chartNote}>Current month: <strong>24 new learners</strong></div>
              </div>

              {/* Line */}
              <div className={s.chartPanel}>
                <div className={s.chartTitle}>Completion rate trend</div>
                <CompletionLineChart />
                <div className={s.chartNote}>Current rate: <strong>72% avg</strong></div>
              </div>
            </div>

            {/* Program performance */}
            <div className={s.perfPanel}>
              <h3 className={s.perfTitle}>Program performance breakdown</h3>
              {programs.map((p) => (
                <div key={p.name} className={s.perfItem}>
                  <div className={s.perfHeader}>
                    <span className={s.perfName}>{p.name}</span>
                    <span className={s.perfMeta}>{p.learners} learners · {p.progress}% completion</span>
                  </div>
                  <div className={s.track}>
                    <div className={s.fill} style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Meta stats */}
            <div className={s.metaGrid}>
              {metaStats.map((m) => (
                <div key={m.label} className={s.metaCard}>
                  <div className={s.metaLabel}>{m.label}</div>
                  <div className={s.metaValue}>{m.value}</div>
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
