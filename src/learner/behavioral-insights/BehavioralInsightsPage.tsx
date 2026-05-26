import { useState } from "react";
import LearnerLayout from "../LearnerLayout";
import s from "./behavioral-insights.module.css";

/* ─── Icons ─── */
function IconAI() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconFilter() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function IconChevRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ─── Mini chart helpers ─── */
function BarMini({ values, color = "#6366f1" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  const w = 200; const h = 72;
  const bw = Math.floor((w - (values.length - 1) * 6) / values.length);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={s.miniChart}>
      <defs>
        <linearGradient id={`bg${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {values.map((v, i) => {
        const bh = Math.max(4, (v / max) * (h - 8));
        const x = i * (bw + 6);
        const y = h - bh;
        return <rect key={i} x={x} y={y} width={bw} height={bh} rx="4" fill={`url(#bg${color.replace("#","")})`} />;
      })}
    </svg>
  );
}

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

function LineMini({ values, color = "#6366f1" }: { values: number[]; color?: string }) {
  const w = 200; const h = 72;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * w,
    y: h - 8 - ((v - min) / range) * (h - 16),
  }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1].x},${h} L ${pts[0].x},${h} Z`;
  const gradId = `lg${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={s.miniChart}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="4" fill={color} />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2" fill="#fff" />
    </svg>
  );
}

/* ─── Insight data ─── */
type InsightCategory = "All Insights" | "Risk Profile" | "Spending" | "Investing" | "Psychology";
type StatusType = "Positive" | "Neutral" | "Action Required";

type Insight = {
  id: number;
  category: Exclude<InsightCategory, "All Insights">;
  title: string;
  description: string;
  chartType: "bar" | "line";
  chartValues: number[];
  status: StatusType;
};

const insights: Insight[] = [
  {
    id: 1,
    category: "Risk Profile",
    title: "Aggressive Risk Appetite",
    description: "You consistently favor high-volatility assets in simulations. This suggests a high tolerance for short-term losses in pursuit of higher long-term gains. Monitor this in bear markets.",
    chartType: "bar",
    chartValues: [30, 48, 42, 72, 60, 88],
    status: "Neutral",
  },
  {
    id: 2,
    category: "Spending",
    title: "Impulse Spending Pattern",
    description: "AI detected a pattern of 'reward spending' immediately after earning XP. You tend to allocate 15% more to luxury items in the week following a financial win.",
    chartType: "line",
    chartValues: [40, 55, 45, 70, 50, 80, 60, 75],
    status: "Action Required",
  },
  {
    id: 3,
    category: "Investing",
    title: "Emergency Fund Discipline",
    description: "Outstanding! You prioritize 6 months of liquidity before any high-risk investment. This behavioral trait significantly lowers your vulnerability to financial shocks.",
    chartType: "line",
    chartValues: [30, 38, 50, 55, 65, 72, 85, 92],
    status: "Positive",
  },
  {
    id: 4,
    category: "Psychology",
    title: "Loss Aversion Bias",
    description: "You are 2.5x more likely to sell a winning stock early to avoid a potential dip than to hold for maximum profit. This is a common bias that limits compounding gains.",
    chartType: "bar",
    chartValues: [70, 55, 80, 40, 65, 35],
    status: "Action Required",
  },
  {
    id: 5,
    category: "Psychology",
    title: "Compound Interest Patience",
    description: "Your simulation choices show you understand the value of time. You deferred gratification in 80% of scenarios requiring a long-term savings commitment of 5+ years.",
    chartType: "line",
    chartValues: [20, 28, 35, 45, 58, 72, 88, 98],
    status: "Positive",
  },
  {
    id: 6,
    category: "Spending",
    title: "Budget Allocation Accuracy",
    description: "Your estimated vs. actual expenses in the 'Living Alone' simulation were within 5%. You demonstrate high financial self-awareness when planning monthly budgets.",
    chartType: "line",
    chartValues: [60, 65, 62, 70, 68, 74, 72, 78],
    status: "Positive",
  },
  {
    id: 7,
    category: "Risk Profile",
    title: "Diversification Tendency",
    description: "You naturally spread investments across 4+ asset classes in 90% of portfolio simulations, reducing concentration risk and demonstrating sound diversification instincts.",
    chartType: "bar",
    chartValues: [20, 45, 35, 60, 55, 80],
    status: "Positive",
  },
  {
    id: 8,
    category: "Investing",
    title: "Market Timing Attempts",
    description: "You attempted to time the market in 3 of 5 simulations, which historically underperforms dollar-cost averaging by 1.5% annually. Consider a consistent DCA strategy.",
    chartType: "line",
    chartValues: [80, 60, 75, 50, 65, 40, 55, 45],
    status: "Neutral",
  },
  {
    id: 9,
    category: "Psychology",
    title: "Overconfidence in Bull Markets",
    description: "During simulated bull markets, you over-allocated to equities by an average of 22%, exceeding your stated risk profile. Awareness of this bias is your first line of defense.",
    chartType: "bar",
    chartValues: [35, 50, 60, 75, 85, 70],
    status: "Action Required",
  },
];

const tabs: InsightCategory[] = ["All Insights", "Risk Profile", "Spending", "Investing", "Psychology"];

const categoryColors: Record<string, { bg: string; color: string }> = {
  "Risk Profile": { bg: "#eff6ff", color: "#2563eb" },
  "Spending":     { bg: "#fff7ed", color: "#ea580c" },
  "Investing":    { bg: "#f0fdf4", color: "#16a34a" },
  "Psychology":   { bg: "#fdf4ff", color: "#9333ea" },
};

/* ─── Component ─── */
export default function BehavioralInsightsPage() {
  const [activeTab, setActiveTab] = useState<InsightCategory>("All Insights");
  const [search, setSearch] = useState("");

  const visible = insights.filter(ins => {
    const matchTab = activeTab === "All Insights" || ins.category === activeTab;
    const matchSearch = search.trim() === "" ||
      ins.title.toLowerCase().includes(search.toLowerCase()) ||
      ins.category.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <LearnerLayout>
      {/* ── Page header ── */}
      <div className={s.pageHeader}>
        <div className={s.headerLeft}>
          <h1 className={s.pageTitle}>Behavioral Insights</h1>
          <p className={s.pageSubtitle}>
            Our AI engine analyzes your simulation decisions to decode your financial psychology.
            Learn your biases, master your risks, and build lasting wealth habits.
          </p>
        </div>
        <div className={s.aiEngineBadge}>
          <span className={s.aiDot} />
          AI Engine Active
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className={s.filterBar}>
        <div className={s.tabs}>
          {tabs.map(t => (
            <button
              key={t}
              type="button"
              className={`${s.tab} ${activeTab === t ? s.tabActive : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={s.searchRow}>
          <div className={s.searchWrap}>
            <span className={s.searchIcon}><IconSearch /></span>
            <input
              className={s.searchInput}
              placeholder="Search traits..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button type="button" className={s.filterIconBtn}><IconFilter /></button>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className={s.grid}>
        {visible.map(ins => {
          const catColor = categoryColors[ins.category] || { bg: "#f3f4f6", color: "#6b7280" };
          return (
            <div key={ins.id} className={s.card}>
              {/* Card top */}
              <div className={s.cardTop}>
                <span className={s.catTag} style={{ background: catColor.bg, color: catColor.color }}>
                  {ins.category}
                </span>
                <span className={s.aiTag}>
                  <IconAI /> AI ANALYSIS
                </span>
              </div>

              {/* Card content */}
              <div className={s.cardContent}>
                <h3 className={s.cardTitle}>{ins.title}</h3>
                <p className={s.cardDesc}>{ins.description}</p>
              </div>

              {/* Mini chart */}
              <div className={s.chartWrap}>
                {ins.chartType === "bar"
                  ? <BarMini values={ins.chartValues} color="#6366f1" />
                  : <LineMini values={ins.chartValues} color="#6366f1" />
                }
              </div>

              {/* Card footer */}
              <div className={s.cardFooter}>
                <span className={`${s.statusBadge} ${
                  ins.status === "Positive" ? s.statusPos :
                  ins.status === "Action Required" ? s.statusAction : s.statusNeutral
                }`}>
                  {ins.status}
                </span>
                <button type="button" className={s.fullReportBtn}>
                  Full Report <IconChevRight />
                </button>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div className={s.empty}>No insights match your search.</div>
        )}
      </div>
    </LearnerLayout>
  );
}
