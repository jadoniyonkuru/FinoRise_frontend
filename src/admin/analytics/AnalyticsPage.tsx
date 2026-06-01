import { useState, useMemo } from "react";
import AdminLayout from "@/admin/AdminLayout";
import styles from "./analytics.module.css";

interface ActivityRecord {
  id: number;
  learnerName: string;
  email: string;
  module: string;
  action: string;
  actionType: "completed" | "started" | "progress" | "passed";
  progress: number;
  timeSpent: string;
  lastActive: string;
}

const ACTIVITY_DATA: ActivityRecord[] = [
  { id: 1,  learnerName: "Marie Uwase",          email: "marie.uwase@example.com",      module: "Saving Basics",           action: "Completed lesson 6",  actionType: "completed", progress: 75,  timeSpent: "2h 30m", lastActive: "2026-05-28" },
  { id: 2,  learnerName: "Alice Mukamana",        email: "alice.mukamana@example.com",   module: "Budgeting 101",           action: "Started quiz",        actionType: "started",   progress: 45,  timeSpent: "1h 10m", lastActive: "2026-05-28" },
  { id: 3,  learnerName: "Bob Habimana",          email: "bob.habimana@example.com",     module: "Investment Fundamentals", action: "Watched video",       actionType: "progress",  progress: 30,  timeSpent: "0h 45m", lastActive: "2026-05-27" },
  { id: 4,  learnerName: "Christine Ingabire",    email: "christine.i@example.com",      module: "Emergency Funds",         action: "Completed module",    actionType: "completed", progress: 100, timeSpent: "3h 20m", lastActive: "2026-05-27" },
  { id: 5,  learnerName: "David Nzeyimana",       email: "david.n@example.com",          module: "Budgeting 101",           action: "Completed lesson 3",  actionType: "completed", progress: 30,  timeSpent: "0h 55m", lastActive: "2026-05-26" },
  { id: 6,  learnerName: "Felix Nshimiyimana",    email: "felix.n@example.com",          module: "Saving Basics",           action: "Started module",      actionType: "started",   progress: 10,  timeSpent: "0h 20m", lastActive: "2026-05-25" },
  { id: 7,  learnerName: "Grace Uwimana",         email: "grace.u@example.com",          module: "Credit & Debt Mgmt",      action: "Completed lesson 2",  actionType: "completed", progress: 33,  timeSpent: "1h 05m", lastActive: "2026-05-26" },
  { id: 8,  learnerName: "Henry Mugisha",         email: "henry.m@example.com",          module: "Investment Fundamentals", action: "Passed quiz",         actionType: "passed",    progress: 58,  timeSpent: "2h 00m", lastActive: "2026-05-24" },
  { id: 9,  learnerName: "Irene Mutuyimana",      email: "irene.m@example.com",          module: "Saving Basics",           action: "Completed module",    actionType: "completed", progress: 100, timeSpent: "4h 10m", lastActive: "2026-05-28" },
  { id: 10, learnerName: "Joseph Hakizimana",     email: "joseph.h@example.com",         module: "Budgeting 101",           action: "Watched video",       actionType: "progress",  progress: 70,  timeSpent: "1h 50m", lastActive: "2026-05-23" },
  { id: 11, learnerName: "Kalisa Manzi",          email: "kalisa.m@example.com",         module: "Investment Fundamentals", action: "Completed lesson 5",  actionType: "completed", progress: 42,  timeSpent: "1h 30m", lastActive: "2026-05-22" },
  { id: 12, learnerName: "Lise Uwineza",          email: "lise.u@example.com",           module: "Emergency Funds",         action: "Started module",      actionType: "started",   progress: 20,  timeSpent: "0h 35m", lastActive: "2026-05-21" },
];

const TOP_STATS = [
  { label: "Daily active users",  value: "342",  trend: "+12%",  trendType: "up" as const,      hint: "vs last week",          iconBg: "rgba(34,197,94,0.12)",   iconColor: "#22c55e" },
  { label: "Engagement rate",     value: "64%",  trend: "+3%",   trendType: "up" as const,      hint: "Lessons + simulations", iconBg: "rgba(14,165,233,0.12)",   iconColor: "#0ea5e9" },
  { label: "30-day retention",    value: "71%",  trend: "–",     trendType: "neutral" as const, hint: "Returning learners",    iconBg: "rgba(139,92,246,0.12)",   iconColor: "#8b5cf6" },
  { label: "Avg. session",        value: "18m",  trend: "+3m",   trendType: "up" as const,      hint: "Per visit",             iconBg: "rgba(251,191,36,0.12)",   iconColor: "#f59e0b" },
];

const INSIGHTS = [
  { title: "Peak usage: Tue–Thu 18:00–21:00",   meta: "Engagement pattern", color: "#0ea5e9" },
  { title: "Drop-off after Module 2 quiz",       meta: "Retention risk",     color: "#f87171" },
  { title: "Simulation completions up 18%",      meta: "Positive trend",     color: "#4ade80" },
  { title: "Saving Basics most popular module",  meta: "Content insight",    color: "#a78bfa" },
];

const ACTION_BADGE_CLASS: Record<ActivityRecord["actionType"], string> = {
  completed: styles.actionCompleted,
  started:   styles.actionStarted,
  progress:  styles.actionProgress,
  passed:    styles.actionPassed,
};

function progressColor(pct: number): string {
  if (pct >= 100) return "linear-gradient(90deg, #22c55e, #4ade80)";
  if (pct >= 60)  return "linear-gradient(90deg, #0ea5e9, #38bdf8)";
  if (pct >= 30)  return "linear-gradient(90deg, #f59e0b, #fbbf24)";
  return "linear-gradient(90deg, #ef4444, #f87171)";
}

function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function AnalyticsPage() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");

  const modules = useMemo(
    () => Array.from(new Set(ACTIVITY_DATA.map((a) => a.module))).sort(),
    [],
  );

  const filtered = useMemo(
    () =>
      ACTIVITY_DATA.filter((a) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          a.learnerName.toLowerCase().includes(q) ||
          a.module.toLowerCase().includes(q) ||
          a.action.toLowerCase().includes(q);
        const matchModule = moduleFilter === "all" || a.module === moduleFilter;
        return matchSearch && matchModule;
      }),
    [search, moduleFilter],
  );

  return (
    <AdminLayout title="Analytics" subtitle="Monitor learner engagement and activity across the platform.">
      <div className={styles.root}>
        {/* Stats */}
        <div className={styles.statsGrid}>
          {TOP_STATS.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statTop}>
                <div
                  className={styles.statIconWrap}
                  style={{ background: s.iconBg, color: s.iconColor }}
                />
                <span className={s.trendType === "up" ? styles.trendUp : styles.trendNeutral}>
                  {s.trend}
                </span>
              </div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statHint}>{s.hint}</div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className={styles.insightsRow}>
          {INSIGHTS.map((ins) => (
            <div key={ins.title} className={styles.insightCard}>
              <div className={styles.insightDot} style={{ background: ins.color }} />
              <div className={styles.insightContent}>
                <div className={styles.insightTitle}>{ins.title}</div>
                <div className={styles.insightMeta}>{ins.meta}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>
              <IconSearch />
            </span>
            <input
              className={styles.searchInput}
              placeholder="Search by learner, module, or action…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
          >
            <option value="all">All modules</option>
            {modules.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <button className={styles.exportBtn}>
            <IconDownload /> Export CSV
          </button>
        </div>

        {/* Activity Table */}
        <div className={styles.tablePanel}>
          <div className={styles.tablePanelHeader}>
            <span className={styles.tablePanelTitle}>Learner activity</span>
            <span className={styles.tablePanelCount}>{filtered.length} records</span>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHead}>
                  <th>Learner</th>
                  <th>Module</th>
                  <th>Last action</th>
                  <th>Progress</th>
                  <th>Time spent</th>
                  <th>Last active</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className={styles.emptyRow}>
                    <td colSpan={6}>No activity records found.</td>
                  </tr>
                ) : (
                  filtered.map((a) => (
                    <tr key={a.id} className={styles.tableRow}>
                      <td>
                        <div className={styles.learnerCell}>
                          <div className={styles.learnerName}>{a.learnerName}</div>
                          <div className={styles.learnerEmail}>{a.email}</div>
                        </div>
                      </td>
                      <td className={styles.moduleCell}>{a.module}</td>
                      <td>
                        <span className={`${styles.actionBadge} ${ACTION_BADGE_CLASS[a.actionType]}`}>
                          {a.action}
                        </span>
                      </td>
                      <td>
                        <div className={styles.progressCell}>
                          <div className={styles.progressTrack}>
                            <div
                              className={styles.progressFill}
                              style={{
                                width: `${a.progress}%`,
                                background: progressColor(a.progress),
                              }}
                            />
                          </div>
                          <span className={styles.progressLabel}>{a.progress}%</span>
                        </div>
                      </td>
                      <td className={styles.timeCell}>{a.timeSpent}</td>
                      <td className={styles.dateCell}>{a.lastActive}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
