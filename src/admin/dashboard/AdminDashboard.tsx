import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/admin/AdminLayout";
import styles from "./admin-dashboard.module.css";

/* ─── Stat icon SVGs ─── */
function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function IconAward() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
function IconDollar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function IconCpu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

/* ─── Donut Chart ─── */
const donutData = [
  { label: "Learners",       value: 846, color: "#22c55e" },
  { label: "Simulations",    value: 312, color: "#3b82f6" },
  { label: "Modules",        value: 61,  color: "#f59e0b" },
  { label: "Certifications", value: 284, color: "#8b5cf6" },
];

function DonutChart() {
  const r = 60, cx = 90, cy = 90, sw = 20;
  const C = 2 * Math.PI * r;
  const gap = 3;
  const total = donutData.reduce((s, d) => s + d.value, 0);
  const drawable = C - gap * donutData.length;
  let offset = C / 4;

  return (
    <svg viewBox="0 0 180 180" className={styles.donutSvg}>
      <circle cx={cx} cy={cy} r={r} fill="none"
        style={{ stroke: "var(--border)" }} strokeWidth={sw} />
      {donutData.map((d) => {
        const len = (d.value / total) * drawable;
        const da = `${len} ${C - len}`;
        const co = offset;
        offset -= (len + gap);
        return (
          <circle key={d.label}
            cx={cx} cy={cy} r={r}
            fill="none" stroke={d.color} strokeWidth={sw}
            strokeDasharray={da} strokeDashoffset={co}
          />
        );
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="18" fontWeight="700"
        style={{ fill: "var(--text)" }}>
        {total.toLocaleString()}
      </text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize="10"
        style={{ fill: "var(--text-muted)" }}>
        Total
      </text>
    </svg>
  );
}

/* ─── Shared x-axis config ─── */
const months7 = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const W7 = 380, H_C = 120, yBase7 = 142;
const bW7 = 28;
const sp7 = (W7 - months7.length * bW7) / (months7.length + 1);

/* ─── Bar Chart ─── */
const barValues = [89, 102, 96, 109, 114, 119, 125];

function BarChart() {
  const max = Math.max(...barValues);
  return (
    <svg viewBox={`0 0 ${W7} 162`} className={styles.chartSvg}>
      <defs>
        <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      {barValues.map((v, i) => {
        const bh = (v / max) * H_C;
        const x = sp7 + i * (bW7 + sp7);
        const y = yBase7 - bh;
        return (
          <g key={months7[i]}>
            <rect x={x} y={y} width={bW7} height={bh} rx={4}
              fill="url(#bGrad)" opacity={i === barValues.length - 1 ? 1 : 0.65} />
            <text x={x + bW7 / 2} y={y - 4} textAnchor="middle"
              fontSize="8" fontWeight="600" style={{ fill: "var(--text-muted)" }}>
              {v}
            </text>
            <text x={x + bW7 / 2} y={157} textAnchor="middle"
              fontSize="9" style={{ fill: "var(--text-muted)" }}>
              {months7[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Line Chart (7-month) ─── */
const lineValues7 = [78, 92, 87, 106, 114, 122, 142];

function LineChart() {
  const max = Math.max(...lineValues7);
  const pts = lineValues7.map((v, i) => ({
    x: sp7 + i * (bW7 + sp7) + bW7 / 2,
    y: yBase7 - (v / max) * H_C,
  }));
  const lineStr = pts.map(p => `${p.x},${p.y}`).join(" ");
  const areaStr = [`${pts[0].x},${yBase7}`, ...pts.map(p => `${p.x},${p.y}`),
    `${pts[pts.length - 1].x},${yBase7}`].join(" ");

  return (
    <svg viewBox={`0 0 ${W7} 162`} className={styles.chartSvg}>
      <defs>
        <linearGradient id="lGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaStr} fill="url(#lGrad)" />
      <polyline points={lineStr} fill="none" stroke="#0ea5e9" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={months7[i]} cx={p.x} cy={p.y} r={4}
          style={{ fill: "var(--surface)" }} stroke="#0ea5e9" strokeWidth="2.5" />
      ))}
      {months7.map((m, i) => {
        const x = sp7 + i * (bW7 + sp7) + bW7 / 2;
        return (
          <text key={m} x={x} y={157} textAnchor="middle"
            fontSize="9" style={{ fill: "var(--text-muted)" }}>
            {m}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Line Chart Wide (12-month) ─── */
const months12 = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const lineValues12 = [45, 52, 61, 58, 74, 89, 102, 96, 109, 114, 122, 142];

function LineChartWide() {
  const W = 740, H_C2 = 120, yBase = 142;
  const bW = 20;
  const sp = (W - months12.length * bW) / (months12.length + 1);
  const max = Math.max(...lineValues12);
  const pts = lineValues12.map((v, i) => ({
    x: sp + i * (bW + sp) + bW / 2,
    y: yBase - (v / max) * H_C2,
  }));
  const lineStr = pts.map(p => `${p.x},${p.y}`).join(" ");
  const areaStr = [`${pts[0].x},${yBase}`, ...pts.map(p => `${p.x},${p.y}`),
    `${pts[pts.length - 1].x},${yBase}`].join(" ");

  return (
    <svg viewBox={`0 0 ${W} 162`} className={styles.chartSvg}>
      <defs>
        <linearGradient id="lGradW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaStr} fill="url(#lGradW)" />
      <polyline points={lineStr} fill="none" stroke="#0ea5e9" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={months12[i]} cx={p.x} cy={p.y} r={3.5}
          style={{ fill: "var(--surface)" }} stroke="#0ea5e9" strokeWidth="2.5" />
      ))}
      {months12.map((m, i) => {
        const x = sp + i * (bW + sp) + bW / 2;
        return (
          <text key={m} x={x} y={157} textAnchor="middle"
            fontSize="8.5" style={{ fill: "var(--text-muted)" }}>
            {m}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Data ─── */
type Stat = {
  label: string;
  value: string;
  trend: string;
  dir: "up" | "down" | "neutral";
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
};

const stats: Stat[] = [
  { label: "Total Learners",    value: "1,284",    trend: "+6.3%",  dir: "up",      icon: <IconUsers />,    iconBg: "rgba(34,197,94,0.12)",   iconColor: "#22c55e" },
  { label: "Active Modules",    value: "18",        trend: "+8.2%",  dir: "up",      icon: <IconBook />,     iconBg: "rgba(59,130,246,0.12)",   iconColor: "#3b82f6" },
  { label: "Active Partners",   value: "12",        trend: "-2.4%",  dir: "down",    icon: <IconBuilding />, iconBg: "rgba(239,68,68,0.12)",    iconColor: "#f87171" },
  { label: "Certified Learners",value: "89",        trend: "+1",     dir: "neutral", icon: <IconAward />,    iconBg: "rgba(139,92,246,0.12)",   iconColor: "#8b5cf6" },
  { label: "Total Funded",      value: "RWF 4.2M",  trend: "+12.5%", dir: "up",      icon: <IconDollar />,   iconBg: "rgba(251,191,36,0.12)",   iconColor: "#fbbf24" },
  { label: "AI Sessions",       value: "1,847",     trend: "+4.1%",  dir: "up",      icon: <IconCpu />,      iconBg: "rgba(14,165,233,0.12)",   iconColor: "#0ea5e9" },
];

const analysisStats = [
  { label: "Avg session duration", value: "24 min", hint: "+3 min vs last month" },
  { label: "Learner retention",    value: "78%",    hint: "30-day return rate"   },
  { label: "XP earned (total)",    value: "2.4M",   hint: "This quarter"         },
  { label: "Completion rate",      value: "64%",    hint: "Platform average"     },
];

const modulePerformance = [
  { name: "Saving Basics",             completion: 88, learners: 342 },
  { name: "Budgeting 101",             completion: 72, learners: 287 },
  { name: "Investment Fundamentals",   completion: 65, learners: 198 },
  { name: "Credit & Debt Management",  completion: 59, learners: 156 },
  { name: "Emergency Funds",           completion: 81, learners: 263 },
];

const partnerContrib = [
  { name: "Rwanda Development Bank", funded: "RWF 1.8M", learners: 62, pct: 43 },
  { name: "KCB Foundation",          funded: "RWF 1.2M", learners: 48, pct: 29 },
  { name: "BPR Bank Rwanda",         funded: "RWF 1.2M", learners: 46, pct: 28 },
];

const adminTools = [
  {
    title: "User management",
    description: "Manage learners, admins, and partners. Add, edit, or deactivate accounts.",
    path: "/admin/user-management",
    stat: "12 users",
    iconBg: "rgba(34,197,94,0.12)",
    iconColor: "#22c55e",
    icon: <IconUsers />,
  },
  {
    title: "Learning modules",
    description: "Create and publish learning content. Upload materials and set lesson counts.",
    path: "/admin/module-manager",
    stat: "7 modules",
    iconBg: "rgba(59,130,246,0.12)",
    iconColor: "#3b82f6",
    icon: <IconBook />,
  },
  {
    title: "Simulation setup",
    description: "Configure market simulations and scenarios for learner practice.",
    path: "/admin/simulation-manager",
    stat: "9 simulations",
    iconBg: "rgba(14,165,233,0.12)",
    iconColor: "#0ea5e9",
    icon: <IconCpu />,
  },
  {
    title: "Reward configuration",
    description: "Set up badges, XP bonuses, and partner scholarship eligibility rules.",
    path: "/admin/rewards-manager",
    stat: "14 rewards",
    iconBg: "rgba(251,191,36,0.12)",
    iconColor: "#fbbf24",
    icon: <IconAward />,
  },
  {
    title: "Analytics dashboard",
    description: "Track learner engagement, activity logs, and platform insights.",
    path: "/admin/analytics",
    stat: "342 DAU",
    iconBg: "rgba(139,92,246,0.12)",
    iconColor: "#8b5cf6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

/* ─── Component ─── */
export default function AdminDashboard() {
  const [tab, setTab] = useState<"overview" | "analysis">("overview");

  return (
    <AdminLayout title="Admin dashboard" subtitle="Manage users, content, simulations, rewards, and analytics.">
      <div className={styles.root}>
        {/* Admin tools */}
        <section className={styles.toolsSection}>
          <h2 className={styles.toolsHeading}>Admin controls</h2>
          <div className={styles.toolsGrid}>
            {adminTools.map((tool) => (
              <Link key={tool.path} to={tool.path} className={styles.toolCard}>
                <div className={styles.toolCardTop}>
                  <div
                    className={styles.toolIcon}
                    style={{ background: tool.iconBg, color: tool.iconColor }}
                  >
                    {tool.icon}
                  </div>
                  <span className={styles.toolArrow} aria-hidden>→</span>
                </div>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDesc}>{tool.description}</p>
                <span className={styles.toolStat}>{tool.stat}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Tab bar */}
        <div className={styles.tabBar}>
          <button
            className={styles.tabBtn}
            data-active={String(tab === "overview")}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            className={styles.tabBtn}
            data-active={String(tab === "analysis")}
            onClick={() => setTab("analysis")}
          >
            Analysis
          </button>
        </div>

        {/* ── Overview tab ── */}
        {tab === "overview" && (
          <>
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <div className={styles.statTop}>
                    <div
                      className={styles.statIconWrap}
                      style={{ background: s.iconBg, color: s.iconColor }}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`${styles.trend} ${
                        s.dir === "up" ? styles.trendUp
                        : s.dir === "down" ? styles.trendDown
                        : styles.trendNeutral
                      }`}
                    >
                      {s.trend}
                    </span>
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statValue}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className={styles.chartsRow}>
              {/* Donut */}
              <div className={styles.chartPanel}>
                <div className={styles.chartTitle}>Distribution overview</div>
                <div className={styles.donutWrap}>
                  <DonutChart />
                  <ul className={styles.legend}>
                    {donutData.map((d) => (
                      <li key={d.label} className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: d.color }} />
                        <span className={styles.legendLabel}>{d.label}</span>
                        <span className={styles.legendVal}>{d.value.toLocaleString()}</span>
                      </li>
                    ))}
                    <li className={styles.legendTotal}>
                      <span>Total</span>
                      <span>{donutData.reduce((s, d) => s + d.value, 0).toLocaleString()}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bar */}
              <div className={styles.chartPanel}>
                <div className={styles.chartTitle}>Monthly enrollments</div>
                <BarChart />
                <div className={styles.chartNote}>
                  Current month: <strong>125 new learners</strong>
                </div>
              </div>

              {/* Line */}
              <div className={styles.chartPanel}>
                <div className={styles.chartTitle}>Learner trend</div>
                <LineChart />
                <div className={styles.chartNote}>
                  Current month: <strong>142 active learners</strong>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Analysis tab ── */}
        {tab === "analysis" && (
          <>
            <div className={styles.statsGrid}>
              {analysisStats.map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statHint}>{s.hint}</div>
                </div>
              ))}
            </div>

            <div className={styles.analysisRow}>
              <div className={styles.analysisPanel}>
                <h3 className={styles.analysisPanelTitle}>Module performance</h3>
                <div className={styles.moduleList}>
                  {modulePerformance.map((m) => (
                    <div key={m.name} className={styles.moduleItem}>
                      <div className={styles.moduleHeader}>
                        <span className={styles.moduleName}>{m.name}</span>
                        <span className={styles.moduleMeta}>
                          {m.learners} learners · {m.completion}%
                        </span>
                      </div>
                      <div className={styles.progressTrack}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${m.completion}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.analysisPanel}>
                <h3 className={styles.analysisPanelTitle}>Partner contributions</h3>
                <div className={styles.partnerList}>
                  {partnerContrib.map((p) => (
                    <div key={p.name} className={styles.partnerItem}>
                      <div className={styles.partnerHeader}>
                        <span className={styles.partnerName}>{p.name}</span>
                        <span className={styles.partnerFunded}>{p.funded}</span>
                      </div>
                      <div className={styles.partnerMeta}>
                        {p.learners} learners · {p.pct}% of total
                      </div>
                      <div className={styles.progressTrack}>
                        <div
                          className={styles.progressFillPartner}
                          style={{ width: `${p.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.chartPanelWide}>
              <div className={styles.chartTitle}>Full year enrollment trend</div>
              <LineChartWide />
              <div className={styles.chartNote}>
                Annual total: <strong>1,284 learners</strong> · Growth:{" "}
                <strong>+6.3%</strong> vs last year
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
