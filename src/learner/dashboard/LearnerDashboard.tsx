import { useEffect, useState } from "react";
import { Link } from "react-router";
import LearnerLayout from "../LearnerLayout";
import { analyticsService, modulesService } from "@/api";
import { useAuth } from "@/context/AuthContext";
import type { LearnerAnalytics, ModuleProgress } from "@/api";
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

/* ── Chart config ── */
const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const W = 380, H_C = 110, yBase = 135, bW = 28;
const sp = (W - months.length * bW) / (months.length + 1);

const CATEGORY_COLORS: Record<string, string> = {
  budgeting: "#0ea5e9",
  investing: "#8b5cf6",
  emergency: "#f59e0b",
  debt:      "#1e40af",
  loan:      "#10b981",
  general:   "#6b7280",
};

/* ── Dynamic Donut chart ── */
function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const r = 55, cx = 80, cy = 80, sw = 18;
  const C = 2 * Math.PI * r;
  const gap = 3;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const drawable = C - gap * Math.max(data.length, 1);
  let offset = C / 4;
  return (
    <svg viewBox="0 0 160 160" className={s.chartSvg} style={{ width: 130, height: 130, flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={sw} />
      {total > 0 && data.map((d) => {
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
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#6b7280">completed</text>
    </svg>
  );
}

/* ── Decorative bar chart (XP trend) ── */
const xpValues = [1200, 1450, 980, 1680, 1920, 2100, 2340];
function XpBarChart({ currentXp }: { currentXp: number }) {
  const displayValues = [...xpValues.slice(0, 6), currentXp || xpValues[6]];
  const max = Math.max(...displayValues);
  return (
    <svg viewBox={`0 0 ${W} 155`} className={s.chartSvg}>
      <defs>
        <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {displayValues.map((v, i) => {
        const bh = (v / max) * H_C;
        const x = sp + i * (bW + sp);
        const y = yBase - bh;
        return (
          <g key={months[i]}>
            <rect x={x} y={y} width={bW} height={bh} rx={4}
              fill="url(#xpGrad)" opacity={i === displayValues.length - 1 ? 1 : 0.65} />
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

/* ── Decorative line chart (quiz score trend) ── */
const scoreValues = [62, 65, 70, 72, 78, 82, 87];
function ScoreLineChart({ currentScore }: { currentScore: number }) {
  const displayValues = [...scoreValues.slice(0, 6), currentScore || scoreValues[6]];
  const max = 100, min = 40;
  const pts = displayValues.map((v, i) => ({
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

/* ── Component ── */
export default function LearnerDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"overview" | "analysis">("overview");
  const [analytics, setAnalytics] = useState<LearnerAnalytics | null>(null);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsService.getLearnerAnalytics(),
      modulesService.getMyProgress(),
    ])
      .then(([a, mp]) => { setAnalytics(a); setModuleProgress(mp); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* ── Derived values ── */
  const firstName = (user?.full_name ?? "").split(" ")[0] || "Learner";
  const streakDays = analytics?.overview.streak_days ?? user?.streak_days ?? 0;
  const xpTotal = analytics?.overview.xp_total ?? user?.xp_total ?? 0;
  const completedCount = analytics?.modules.completed ?? 0;
  const totalCount = analytics?.modules.total_available ?? 0;
  const completionRate = analytics ? Math.round(analytics.modules.completion_rate) : 0;
  const quizAvg = analytics?.modules.average_quiz_score;
  const latestInsight = analytics?.insights[0]?.insight_text;
  const nextModule = moduleProgress.find(m => !m.completed);

  const categoryBreakdown = analytics?.modules.category_breakdown ?? {};
  const donutData = Object.entries(categoryBreakdown)
    .filter(([, v]) => v > 0)
    .map(([label, value]) => ({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value,
      color: CATEGORY_COLORS[label] ?? "#6b7280",
    }));

  const simCount = analytics?.recent_activity.filter(
    e => e.event_type === "simulation_decision"
  ).length ?? 0;

  const topCategory = Object.entries(categoryBreakdown).sort(([, a], [, b]) => b - a)[0]?.[0];
  const topCategoryLabel = topCategory
    ? topCategory.charAt(0).toUpperCase() + topCategory.slice(1)
    : "—";

  const quizRating = quizAvg == null ? "—"
    : quizAvg >= 86 ? "Excellent"
    : quizAvg >= 70 ? "Good"
    : quizAvg >= 50 ? "Fair"
    : "Needs work";

  const scoreTone = quizAvg == null ? "low"
    : quizAvg >= 86 ? "peak"
    : quizAvg >= 70 ? "high"
    : quizAvg >= 50 ? "mid"
    : "low";

  type StatDir = "up" | "down" | "neutral";
  type Stat = { label: string; value: string; trend: string; dir: StatDir; iconBg: string; iconColor: string; icon: React.ReactNode };

  const analysisStats: Stat[] = [
    { label: "Total XP",           value: xpTotal.toLocaleString(), trend: `Level ${analytics?.overview.level ?? user?.level ?? 1}`, dir: "up", iconBg: "rgba(14,165,233,0.1)", iconColor: "#0ea5e9", icon: <LightningIcon size={17} /> },
    { label: "Modules Completed",  value: `${completedCount} / ${totalCount}`, trend: `${completionRate}%`, dir: "up", iconBg: "rgba(139,92,246,0.1)", iconColor: "#8b5cf6", icon: <TrendUpIcon /> },
    { label: "Simulations Run",    value: String(simCount),          trend: simCount > 0 ? "recent" : "start now", dir: "neutral", iconBg: "rgba(30,64,175,0.1)",  iconColor: "#1d4ed8", icon: <TargetIcon /> },
    { label: "Quiz Average",       value: quizAvg != null ? `${Math.round(quizAvg)}%` : "—", trend: quizRating, dir: "up", iconBg: "rgba(251,191,36,0.1)", iconColor: "#f59e0b", icon: <TargetIcon /> },
    { label: "Insights",           value: String(analytics?.insights.length ?? 0), trend: "AI generated", dir: "neutral", iconBg: "rgba(14,165,233,0.1)", iconColor: "#0ea5e9", icon: <TrendUpIcon /> },
    { label: "Daily Streak",       value: `${streakDays} day${streakDays !== 1 ? "s" : ""}`, trend: "active", dir: "neutral", iconBg: "rgba(249,115,22,0.1)", iconColor: "#f97316", icon: <LightningIcon size={17} /> },
  ];

  const metaStats = [
    { label: "Completion rate",  value: `${completionRate}%`,                       hint: `${completedCount} of ${totalCount} modules done` },
    { label: "Quiz average",     value: quizAvg != null ? `${Math.round(quizAvg)}%` : "—", hint: quizRating },
    { label: "Active insights",  value: String(analytics?.insights.length ?? 0),    hint: "From AI behavioral analysis" },
    { label: "Top subject",      value: topCategoryLabel,                            hint: "Most modules completed" },
  ];

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
              <h1 className={s.heroTitle}>Welcome back, <span>{firstName}</span></h1>
              <p className={s.heroText}>
                {completionRate >= 70
                  ? `You're in great shape — ${completionRate}% completion rate. Keep up the momentum!`
                  : completedCount === 0
                  ? "Start your first module to begin earning XP and building your financial knowledge."
                  : `You've completed ${completedCount} module${completedCount !== 1 ? "s" : ""}. Keep going to reach the next level!`}
              </p>
              <div className={s.heroActions}>
                <Link to="/learner/simulations" className={s.btnPrimary}>Run a Simulation</Link>
                <Link to="/learner/analytics" className={s.btnSecondary}>View Progress</Link>
              </div>
            </div>
            <div className={s.streakPanel}>
              <span className={s.streakLabel}>Daily Streak</span>
              <div className={s.streakValue}>
                <LightningIcon size={22} />
                <span>{streakDays} Day{streakDays !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </section>

          <div className={s.statsRow}>
            <article className={s.statCard}>
              <div className={s.statHeader}>
                <span className={s.statLabel}>Learning Progress</span>
                <span className={s.statIcon}><TrendUpIcon /></span>
              </div>
              {loading ? (
                <div className={s.statMain}><span className={s.statNumber}>—</span></div>
              ) : (
                <>
                  <div className={s.statMain}>
                    <span className={s.statNumber}>{completionRate}%</span>
                  </div>
                  <div className={s.progressBar}>
                    <div className={s.progressFill} style={{ width: `${completionRate}%` }} />
                  </div>
                  <div className={s.statFooter}>
                    <span>{completedCount} / {totalCount} Modules</span>
                    <span>{totalCount - completedCount} left</span>
                  </div>
                </>
              )}
            </article>

            <article className={s.statCard}>
              <div className={s.statHeader}>
                <span className={s.statLabel}>Quiz Performance</span>
                <span className={s.statIcon}><TargetIcon /></span>
              </div>
              {loading ? (
                <div className={s.statMain}><span className={s.statNumber}>—</span></div>
              ) : (
                <>
                  <div className={s.statMain}>
                    <span className={s.statNumber}>
                      {quizAvg != null ? `${Math.round(quizAvg)}%` : "—"}
                    </span>
                    {quizAvg != null && <span className={s.statBadge}>{quizRating}</span>}
                  </div>
                  <div className={s.scoreBar}>
                    <span className={s.scoreSeg} data-tone="low"    data-active={String(scoreTone === "low")} />
                    <span className={s.scoreSeg} data-tone="mid"    data-active={String(scoreTone === "mid")} />
                    <span className={s.scoreSeg} data-tone="high"   data-active={String(scoreTone === "high")} />
                    <span className={s.scoreSeg} data-tone="peak"   data-active={String(scoreTone === "peak")} />
                  </div>
                  <p className={s.statDesc}>
                    {quizAvg != null
                      ? `Average score across ${completedCount} completed module${completedCount !== 1 ? "s" : ""}.`
                      : "Complete your first quiz to see your performance score."}
                  </p>
                </>
              )}
            </article>

            <article className={`${s.statCard} ${s.insightCard}`}>
              <div className={s.insightHead}>
                <h2 className={s.insightTitle}>AI Behavioral Insights</h2>
                <p className={s.insightSub}>
                  {loading ? "Loading…" : latestInsight ? "Latest insight for you" : "No insights yet"}
                </p>
              </div>
              <blockquote className={s.insightQuote}>
                {loading
                  ? "Loading your insights…"
                  : latestInsight
                  ?? "Complete modules and simulations to generate personalized AI insights about your financial behavior."}
              </blockquote>
              <Link to="/learner/ai-coach" className={s.insightBtn}>Talk to AI Coach</Link>
            </article>
          </div>

          {nextModule && (
            <section className={s.recommended}>
              <div className={s.recommendedHeader}>
                <h2 className={s.recommendedTitle}>Recommended Next</h2>
                <Link to="/learner/modules" className={s.viewAll}>View All Modules</Link>
              </div>
              <Link to={`/learner/modules/${nextModule.module_id}`} className={s.moduleCard}>
                <div className={s.moduleThumb}>
                  <span className={s.moduleTag}>{nextModule.category.toUpperCase()}</span>
                </div>
                <div className={s.moduleBody}>
                  <span className={s.moduleLevel}>{nextModule.difficulty.toUpperCase()}</span>
                  <h3 className={s.moduleName}>{nextModule.title}</h3>
                  <span className={s.moduleMeta}>
                    <ClockIcon /> +{nextModule.xp_reward} XP on completion
                  </span>
                </div>
              </Link>
            </section>
          )}
        </>
      )}

      {/* ── Analysis ── */}
      {tab === "analysis" && (
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
            <div className={s.chartPanel}>
              <div className={s.chartTitle}>Modules by category</div>
              <div className={s.donutWrap}>
                <DonutChart data={donutData.length > 0 ? donutData : [{ label: "No data", value: 1, color: "#e5e7eb" }]} />
                <ul className={s.legend}>
                  {donutData.length > 0 ? donutData.map((d) => (
                    <li key={d.label} className={s.legendItem}>
                      <span className={s.legendDot} style={{ background: d.color }} />
                      <span className={s.legendLabel}>{d.label}</span>
                      <span className={s.legendVal}>{d.value}</span>
                    </li>
                  )) : (
                    <li className={s.legendItem} style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                      Complete modules to see breakdown
                    </li>
                  )}
                  {donutData.length > 0 && (
                    <li className={s.legendTotal}>
                      <span>Total</span>
                      <span>{completedCount}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className={s.chartPanel}>
              <div className={s.chartTitle}>XP earned (trend)</div>
              <XpBarChart currentXp={xpTotal} />
              <div className={s.chartNote}>Total XP: <strong>{xpTotal.toLocaleString()}</strong></div>
            </div>

            <div className={s.chartPanel}>
              <div className={s.chartTitle}>Quiz score trend</div>
              <ScoreLineChart currentScore={Math.round(quizAvg ?? 0)} />
              <div className={s.chartNote}>
                Current avg: <strong>{quizAvg != null ? `${Math.round(quizAvg)}% — ${quizRating}` : "No quizzes yet"}</strong>
              </div>
            </div>
          </div>

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
