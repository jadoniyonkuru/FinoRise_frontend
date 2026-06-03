import { useEffect, useState } from "react";
import { behavioralService } from "@/api";
import type { Insight } from "@/api";
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

const insightTypeColors: Record<string, { bg: string; color: string }> = {
  spending:         { bg: "#fff7ed", color: "#ea580c" },
  risk:             { bg: "#eff6ff", color: "#2563eb" },
  consistency:      { bg: "#f0fdf4", color: "#16a34a" },
  decision_pattern: { bg: "#fdf4ff", color: "#9333ea" },
  improvement:      { bg: "#ecfdf5", color: "#059669" },
};

/* ─── Component ─── */
export default function BehavioralInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("All Insights");
  const [search, setSearch] = useState("");

  useEffect(() => {
    behavioralService.getInsights()
      .then(setInsights)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleAnalyze() {
    setAnalyzing(true);
    try {
      const newInsights = await behavioralService.analyze();
      setInsights(newInsights);
    } catch {}
    setAnalyzing(false);
  }

  const tabs = ["All Insights", ...Array.from(new Set(insights.map(i => i.insight_type)))];

  const visible = insights.filter(ins => {
    const matchTab = activeTab === "All Insights" || ins.insight_type === activeTab;
    const matchSearch = search.trim() === "" ||
      ins.insight_text.toLowerCase().includes(search.toLowerCase()) ||
      ins.insight_type.toLowerCase().includes(search.toLowerCase());
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

      {/* ── Generate button ── */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzing}
          style={{ padding: "0.5rem 1.25rem", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}
        >
          {analyzing ? "Analyzing…" : "Generate New Insights"}
        </button>
      </div>

      {/* ── Cards grid ── */}
      <div className={s.grid}>
        {loading ? (
          <div className={s.empty}>Loading insights…</div>
        ) : visible.length === 0 ? (
          <div className={s.empty}>No insights yet. Click "Generate New Insights" to analyze your behavior.</div>
        ) : visible.map(ins => {
          const typeColor = insightTypeColors[ins.insight_type] || { bg: "#f3f4f6", color: "#6b7280" };
          return (
            <div key={ins.id} className={s.card}>
              {/* Card top */}
              <div className={s.cardTop}>
                <span className={s.catTag} style={{ background: typeColor.bg, color: typeColor.color }}>
                  {ins.insight_type.replace("_", " ")}
                </span>
                <span className={s.aiTag}>
                  <IconAI /> AI ANALYSIS
                </span>
              </div>

              {/* Card content */}
              <div className={s.cardContent}>
                <p className={s.cardDesc}>{ins.insight_text}</p>
              </div>

              {/* Mini chart placeholder */}
              <div className={s.chartWrap}>
                <BarMini values={[30, 50, 40, 70, 60, 80]} color="#6366f1" />
              </div>

              {/* Card footer */}
              <div className={s.cardFooter}>
                <span className={`${s.statusBadge} ${ins.is_read ? s.statusNeutral : s.statusPos}`}>
                  {ins.is_read ? "Read" : "New"}
                </span>
                <button
                  type="button"
                  className={s.fullReportBtn}
                  onClick={() => behavioralService.markInsightRead(ins.id).catch(() => {})}
                >
                  Mark as Read <IconChevRight />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </LearnerLayout>
  );
}
