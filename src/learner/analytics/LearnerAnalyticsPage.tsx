import LearnerLayout from "../LearnerLayout";
import s from "./analytics.module.css";

/* ─── Smooth bezier path helper ─── */
function smoothPath(pts: { x: number; y: number }[]): string {
  const t = 0.38;
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x},${p2.y}`;
  }
  return d;
}

/* ─── Financial Growth Score chart ─── */
const growthMonths = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const growthValues = [640, 650, 665, 692, 762, 840];

function GrowthChart() {
  const W = 720, yBase = 230, yTop = 20, chartH = yBase - yTop;
  const minV = 600, maxV = 880;
  const step = W / (growthValues.length - 1);

  const pts = growthValues.map((v, i) => ({
    x: i * step,
    y: yBase - ((v - minV) / (maxV - minV)) * chartH,
  }));

  const linePath = smoothPath(pts);
  const areaPath = `${linePath} L ${pts[pts.length - 1].x},${yBase} L ${pts[0].x},${yBase} Z`;

  return (
    <svg viewBox={`0 0 ${W} 260`} className={s.chartSvg}>
      <defs>
        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" />
          <stop offset="85%" stopColor="#0ea5e9" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizontal grid lines */}
      {[0.25, 0.5, 0.75, 1].map((f) => {
        const gy = yBase - f * chartH;
        return (
          <line key={f} x1={0} y1={gy} x2={W} y2={gy}
            stroke="#f3f4f6" strokeWidth="1" />
        );
      })}
      {/* Area fill */}
      <path d={areaPath} fill="url(#growthGrad)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#0ea5e9" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Data point at last value */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y}
        r={5} fill="#0ea5e9" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y}
        r={9} fill="#0ea5e9" fillOpacity="0.15" />
      {/* X-axis month labels */}
      {pts.map((p, i) => (
        <text key={growthMonths[i]} x={p.x} y={250}
          textAnchor="middle" fontSize="11" fill="#9ca3af">
          {growthMonths[i]}
        </text>
      ))}
    </svg>
  );
}

/* ─── Radar / Risk Profile chart ─── */
const radarDimensions = [
  { label: "Savings",        value: 82 },
  { label: "Debt Repayment", value: 75 },
  { label: "Market Aware.",  value: 65 },
  { label: "Budget Control", value: 88 },
  { label: "Investment",     value: 70 },
  { label: "Risk Mgmt",      value: 58 },
];

function RadarChart() {
  const cx = 140, cy = 130, r = 90;
  const n = radarDimensions.length;

  function pt(i: number, scale: number) {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + scale * r * Math.cos(a),
      y: cy + scale * r * Math.sin(a),
    };
  }

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPts = radarDimensions.map((d, i) => pt(i, d.value / 100));
  const dataStr = dataPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const labelScale = 1.3;
  const textAnchor = (i: number) => {
    if (i === 0 || i === 3) return "middle";
    if (i === 1 || i === 2) return "start";
    return "end";
  };

  return (
    <svg viewBox="0 0 280 260" className={s.chartSvg}>
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* Grid polygons */}
      {gridLevels.map((k) => {
        const gpts = Array.from({ length: n }, (_, i) => pt(i, k));
        const gstr = gpts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
        return (
          <polygon key={k} points={gstr} fill="none"
            stroke="#e0f2fe" strokeWidth={k === 1 ? 1.5 : 1} />
        );
      })}

      {/* Axis lines */}
      {Array.from({ length: n }, (_, i) => {
        const outer = pt(i, 1);
        return (
          <line key={i} x1={cx} y1={cy}
            x2={outer.x.toFixed(1)} y2={outer.y.toFixed(1)}
            stroke="#e0f2fe" strokeWidth="1" />
        );
      })}

      {/* Data area */}
      <polygon points={dataStr} fill="url(#radarFill)" stroke="#0ea5e9" strokeWidth="2" />

      {/* Data dots */}
      {dataPts.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)}
          r={4} fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
      ))}

      {/* Labels */}
      {radarDimensions.map((d, i) => {
        const lp = pt(i, labelScale);
        return (
          <text key={i} x={lp.x.toFixed(1)} y={lp.y.toFixed(1)}
            textAnchor={textAnchor(i)} dominantBaseline="middle"
            fontSize="9" fill="#6b7280" fontWeight="500">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Behavioral insight data ─── */
type Level = "positive" | "neutral" | "warning";
const insights: { category: string; level: Level; text: string }[] = [
  {
    category: "Spending discipline",
    level: "positive",
    text: "You stayed within budget for 5 consecutive weeks. Your discretionary spending is 18% below the platform average — a strong indicator of long-term financial stability.",
  },
  {
    category: "Savings consistency",
    level: "positive",
    text: "Your simulated savings rate improved from 12% to 27% over 6 months. Compound Interest Mastery module directly contributed to this behavioral shift.",
  },
  {
    category: "Investment confidence",
    level: "neutral",
    text: "Simulation scores in investment scenarios improved by 49 points. Consider the Advanced Portfolio module to strengthen risk-adjusted decision-making.",
  },
  {
    category: "Debt management",
    level: "warning",
    text: "Credit & Debt module completion is at 59%. Learners who complete this module reduce simulated debt payoff time by an average of 22%. Recommended: resume this week.",
  },
];

/* ─── Stat cards ─── */
const statCards = [
  { label: "Financial Growth Score", value: "840",  hint: "+12.4% this month", color: "#0ea5e9", bg: "rgba(14,165,233,0.1)" },
  { label: "Behavioral Score",       value: "72%",  hint: "+8% vs last month",  color: "#22c55e", bg: "rgba(34,197,94,0.1)"  },
  { label: "Risk Tolerance",         value: "Mod.", hint: "Well-calibrated",     color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  { label: "Learning Velocity",      value: "4.2×", hint: "Above average",       color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
];

/* ─── Component ─── */
export default function LearnerAnalyticsPage() {
  return (
    <LearnerLayout>
      {/* Page header */}
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Dynamic Analytics</h1>
          <p className={s.pageSubtitle}>
            Deep behavioral analysis of your financial performance.
          </p>
        </div>
        <div className={s.headerActions}>
          <span className={s.periodLabel}>Last 6 Months</span>
          <button type="button" className={s.downloadBtn}>
            Download Report
          </button>
        </div>
      </div>

      {/* Main row: growth chart + radar */}
      <div className={s.mainRow}>
        {/* Financial Growth Score */}
        <div className={s.scoreCard}>
          <div className={s.scoreCardTop}>
            <div className={s.scoreMeta}>
              <div className={s.scoreTitle}>Financial Growth Score</div>
              <div className={s.scoreDesc}>Composite score based on learning &amp; simulations</div>
            </div>
            <div className={s.scoreRight}>
              <div className={s.scoreNumber}>840</div>
              <div className={s.scoreTrend}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                +12.4%
              </div>
            </div>
          </div>
          <GrowthChart />
          <div className={s.chartNote}>
            Score range: <strong>600–1000</strong> · Next milestone: <strong>900</strong> (Expert tier)
          </div>
        </div>

        {/* Risk Profile */}
        <div className={s.radarCard}>
          <div className={s.radarTitle}>Risk Profile</div>
          <div className={s.radarSubtitle}>Behavioral dimensions analysis</div>
          <RadarChart />
          <div className={s.radarLegend}>
            {radarDimensions.map((d) => (
              <div key={d.label} className={s.radarLegendItem}>
                <span className={s.radarLegendLabel}>{d.label}</span>
                <span className={s.radarLegendVal}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards row */}
      <div className={s.statsRow}>
        {statCards.map((st) => (
          <div key={st.label} className={s.statCard}>
            <div className={s.statIcon} style={{ background: st.bg, color: st.color }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className={s.statLabel}>{st.label}</div>
            <div className={s.statValue} style={{ color: st.color }}>{st.value}</div>
            <div className={s.statHint}>{st.hint}</div>
          </div>
        ))}
      </div>

      {/* Behavioral insights */}
      <div className={s.insightsPanel}>
        <div className={s.insightsPanelTitle}>Behavioral Insights</div>
        <div className={s.insightsList}>
          {insights.map((item) => (
            <div key={item.category} className={s.insightItem}>
              <div className={`${s.insightBar} ${
                item.level === "positive" ? s.insightBarPositive
                : item.level === "warning" ? s.insightBarWarning
                : s.insightBarNeutral
              }`} />
              <div className={s.insightBody}>
                <div className={`${s.insightCategory} ${
                  item.level === "positive" ? s.insightCategoryPositive
                  : item.level === "warning" ? s.insightCategoryWarning
                  : s.insightCategoryNeutral
                }`}>
                  {item.category}
                </div>
                <p className={s.insightText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LearnerLayout>
  );
}
