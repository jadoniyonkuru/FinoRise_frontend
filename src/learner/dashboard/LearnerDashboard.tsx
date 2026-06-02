import { useState } from "react";
import { Link } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./learner-dashboard.module.css";

/* ── Icons ── */
function LightningIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}
function TrendUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ── Chart helpers ── */
const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const W = 380, H_C = 110, yBase = 135, bW = 28;
const sp = (W - months.length * bW) / (months.length + 1);

const donutData = [
  { label: "Modules",     value: 8,  color: "#0ea5e9" },
  { label: "Simulations", value: 14, color: "#8b5cf6" },
  { label: "AI Sessions", value: 23, color: "#f59e0b" },
  { label: "Quizzes",     value: 11, color: "#1e40af" },
];

function DonutChart() {
  const r = 55, cx = 80, cy = 80, sw = 18;
  const C = 2 * Math.PI * r;
  const gap = 3;
  const total = donutData.reduce((s, d) => s + d.value, 0);
  const drawable = C - gap * donutData.length;
  let offset = C / 4;
  return (
    <svg viewBox="0 0 160 160" className={s.chartSvg} style={{ width: 130, height: 130, flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={sw} />
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
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="16" fontWeight="700" fill="#111827">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#6b7280">activities</text>
    </svg>
  );
}

const xpValues = [1200, 1450, 980, 1680, 1920, 2100, 2340];

function XpBarChart() {
  const max = Math.max(...xpValues);
  return (
    <svg viewBox={`0 0 ${W} 155`} className={s.chartSvg}>
      <defs>
        <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {xpValues.map((v, i) => {
        const bh = (v / max) * H_C;
        const x = sp + i * (bW + sp);
        const y = yBase - bh;
        return (
          <g key={months[i]}>
            <rect x={x} y={y} width={bW} height={bh} rx={4}
              fill="url(#xpGrad)" opacity={i === xpValues.length - 1 ? 1 : 0.65} />
            <text x={x + bW / 2} y={y - 4} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#6b7280">
              {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
            </text>
            <text x={x + bW / 2} y={150} textAnchor="middle" fontSize="9" fill="#9ca3af">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

const scoreValues = [720, 740, 750, 770, 790, 820, 840];

function ScoreLineChart() {
  const max = 900, min = 650;
  const pts = scoreValues.map((v, i) => ({
    x: sp + i * (bW + sp) + bW / 2,
    y: yBase - ((v - min) / (max - min)) * H_C,
  }));
  const lineStr = pts.map(p => `${p.x},${p.y}`).join(" ");
  const areaStr = [`${pts[0].x},${yBase}`, ...pts.map(p => `${p.x},${p.y}`), `${pts[pts.length - 1].x},${yBase}`].join(" ");
  return (
    <svg viewBox={`0 0 ${W} 155`} className={s.chartSvg}>
      <defs>
        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaStr} fill="url(#scoreGrad)" />
      <polyline points={lineStr} fill="none" stroke="#8b5cf6" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={months[i]} cx={p.x} cy={p.y} r={4} fill="#fff" stroke="#8b5cf6" strokeWidth="2.5" />
      ))}
      {months.map((m, i) => (
        <text key={m} x={sp + i * (bW + sp) + bW / 2} y={150}
          textAnchor="middle" fontSize="9" fill="#9ca3af">{m}</text>
      ))}
    </svg>
  );
}

/* ── Data ── */
const recommendedModule = {
  tag: "INVESTING BASICS",
  level: "INTERMEDIATE",
  title: "Understanding Market Volatility",
  duration: "15 mins",
  to: "/learner/modules",
};

type Stat = { label: string; value: string; trend: string; dir: "up" | "down" | "neutral"; iconBg: string; iconColor: string; icon: React.ReactNode };

const analysisStats: Stat[] = [
  { label: "XP This Month",       value: "2,340",  trend: "+18%",  dir: "up",      iconBg: "rgba(14,165,233,0.1)",  iconColor: "#0ea5e9", icon: <LightningIcon size={17} /> },
  { label: "Modules Completed",   value: "8 / 12", trend: "+1",    dir: "up",      iconBg: "rgba(139,92,246,0.1)",  iconColor: "#8b5cf6", icon: <TrendUpIcon /> },
  { label: "Simulations Run",     value: "14",     trend: "+2",    dir: "up",      iconBg: "rgba(30,64,175,0.1)",   iconColor: "#1d4ed8", icon: <TargetIcon /> },
  { label: "Financial Score",     value: "840",    trend: "+20",   dir: "up",      iconBg: "rgba(251,191,36,0.1)",  iconColor: "#f59e0b", icon: <TargetIcon /> },
  { label: "Quiz Average",        value: "87%",    trend: "+3%",   dir: "up",      iconBg: "rgba(14,165,233,0.1)",  iconColor: "#0ea5e9", icon: <TrendUpIcon /> },
  { label: "Daily Streak",        value: "7 days", trend: "active",dir: "neutral", iconBg: "rgba(249,115,22,0.1)",  iconColor: "#f97316", icon: <LightningIcon size={17} /> },
];

const metaStats = [
  { label: "Avg session duration", value: "32 min",    hint: "+4 min vs last month" },
  { label: "Completion rate",      value: "72%",       hint: "8 of 12 modules done"  },
  { label: "Quiz pass rate",       value: "87%",       hint: "Above platform avg"     },
  { label: "Top subject",          value: "Investing", hint: "Most time spent"        },
];

/* ── Component ── */
export default function LearnerDashboard() {
  const [tab, setTab] = useState<"overview" | "analysis">("overview");

  return (
    <LearnerLayout>
      {/* Tab bar */}
      <div className={s.tabBar}>
        <button className={s.tabBtn} data-active={String(tab === "overview")} onClick={() => setTab("overview")}>Overview</button>
        <button className={s.tabBtn} data-active={String(tab === "analysis")} onClick={() => setTab("analysis")}>Analysis</button>
      </div>

      {/* ── Overview ── */}
      {tab === "overview" && (
        <>
          <section className={s.hero}>
            <div className={s.heroContent}>
              <h1 className={s.heroTitle}>Welcome back, <span>Alex</span></h1>
              <p className={s.heroText}>
                You&apos;re currently in the top 15% of users this week. Complete your next simulation to maintain your streak!
              </p>
              <div className={s.heroActions}>
                <Link to="/learner/simulations" className={s.btnPrimary}>Continue Simulation</Link>
                <Link to="/learner/analytics"   className={s.btnSecondary}>View Progress</Link>
              </div>
            </div>
            <div className={s.streakPanel}>
              <span className={s.streakLabel}>Daily Streak</span>
              <div className={s.streakValue}><LightningIcon size={22} /><span>7 Days</span></div>
            </div>
          </section>

          <div className={s.statsRow}>
            <article className={s.statCard}>
              <div className={s.statHeader}>
                <span className={s.statLabel}>Learning Progress</span>
                <span className={s.statIcon}><TrendUpIcon /></span>
              </div>
              <div className={s.statMain}>
                <span className={s.statNumber}>72%</span>
                <span className={s.statDelta}>+5% from last week</span>
              </div>
              <div className={s.progressBar}><div className={s.progressFill} style={{ width: "72%" }} /></div>
              <div className={s.statFooter}><span>8 / 12 Modules</span><span>4 lessons left</span></div>
            </article>

            <article className={s.statCard}>
              <div className={s.statHeader}>
                <span className={s.statLabel}>Financial Score</span>
                <span className={s.statIcon}><TargetIcon /></span>
              </div>
              <div className={s.statMain}>
                <span className={s.statNumber}>840</span>
                <span className={s.statBadge}>Excellent</span>
              </div>
              <div className={s.scoreBar}>
                <span className={s.scoreSeg} data-tone="low" />
                <span className={s.scoreSeg} data-tone="mid" />
                <span className={s.scoreSeg} data-tone="high" />
                <span className={s.scoreSeg} data-tone="peak" />
              </div>
              <p className={s.statDesc}>Your behavioral score shows high risk awareness in budgeting simulations.</p>
            </article>

            <article className={`${s.statCard} ${s.insightCard}`}>
              <div className={s.insightHead}>
                <h2 className={s.insightTitle}>AI Behavioral Insights</h2>
                <p className={s.insightSub}>Based on your last simulation</p>
              </div>
              <blockquote className={s.insightQuote}>
                You showed strong resilience during the market dip scenario. Consider diversifying your simulated portfolio to reduce volatility exposure.
              </blockquote>
              <Link to="/learner/ai-coach" className={s.insightBtn}>Talk to AI Coach</Link>
            </article>
          </div>

          <section className={s.recommended}>
            <div className={s.recommendedHeader}>
              <h2 className={s.recommendedTitle}>Recommended Next</h2>
              <Link to="/learner/modules" className={s.viewAll}>View All Modules</Link>
            </div>
            <Link to={recommendedModule.to} className={s.moduleCard}>
              <div className={s.moduleThumb}>
                <span className={s.moduleTag}>{recommendedModule.tag}</span>
              </div>
              <div className={s.moduleBody}>
                <span className={s.moduleLevel}>{recommendedModule.level}</span>
                <h3 className={s.moduleName}>{recommendedModule.title}</h3>
                <span className={s.moduleMeta}><ClockIcon /> {recommendedModule.duration}</span>
              </div>
            </Link>
          </section>
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

          {/* Charts row */}
          <div className={s.chartsRow}>
            {/* Donut */}
            <div className={s.chartPanel}>
              <div className={s.chartTitle}>Activity breakdown</div>
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
              <div className={s.chartTitle}>Monthly XP earned</div>
              <XpBarChart />
              <div className={s.chartNote}>Current month: <strong>2,340 XP</strong></div>
            </div>

            {/* Line */}
            <div className={s.chartPanel}>
              <div className={s.chartTitle}>Financial score trend</div>
              <ScoreLineChart />
              <div className={s.chartNote}>Current score: <strong>840 — Excellent</strong></div>
            </div>
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
    </LearnerLayout>
  );
}
