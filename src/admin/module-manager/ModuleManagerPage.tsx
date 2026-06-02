import { useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import s from "./module-manager.module.css";

/* ── Icons ── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function BookIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>; }
function DraftIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }
function ArchiveIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>; }
function LessonIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>; }

/* ── Types ── */
type Status = "Published" | "Draft" | "Archived";

type Module = {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  tagBg: string;
  status: Status;
  lessons: number;
  learners: number;
  completion: number;
  accentColor: string;
};

/* ── Sample data ── */
const SAMPLE_MODULES: Module[] = [
  {
    id: "1",
    title: "Saving Basics",
    description: "Foundational strategies for building consistent savings habits, setting goals, and understanding the psychology behind spending.",
    category: "Personal Finance",
    categoryColor: "#0ea5e9",
    tagBg: "rgba(14,165,233,0.1)",
    status: "Published",
    lessons: 6,
    learners: 342,
    completion: 88,
    accentColor: "#0ea5e9",
  },
  {
    id: "2",
    title: "Budgeting 101",
    description: "Learn to create realistic budgets using the 50/30/20 rule, track expenses, and identify areas to cut spending.",
    category: "Budgeting",
    categoryColor: "#22c55e",
    tagBg: "rgba(34,197,94,0.1)",
    status: "Published",
    lessons: 8,
    learners: 287,
    completion: 72,
    accentColor: "#22c55e",
  },
  {
    id: "3",
    title: "Investment Fundamentals",
    description: "Introduction to stocks, bonds, mutual funds and ETFs. Understand risk tolerance, diversification, and long-term wealth building.",
    category: "Investing",
    categoryColor: "#8b5cf6",
    tagBg: "rgba(139,92,246,0.1)",
    status: "Published",
    lessons: 10,
    learners: 198,
    completion: 65,
    accentColor: "#8b5cf6",
  },
  {
    id: "4",
    title: "Credit & Debt Management",
    description: "Understand credit scores, how debt compounds, and proven strategies to pay off loans while protecting your financial health.",
    category: "Debt",
    categoryColor: "#f59e0b",
    tagBg: "rgba(245,158,11,0.1)",
    status: "Published",
    lessons: 7,
    learners: 156,
    completion: 59,
    accentColor: "#f59e0b",
  },
  {
    id: "5",
    title: "Emergency Funds",
    description: "Why every household needs 3–6 months of expenses saved, how to build the fund step-by-step, and where to keep it.",
    category: "Personal Finance",
    categoryColor: "#0ea5e9",
    tagBg: "rgba(14,165,233,0.1)",
    status: "Published",
    lessons: 5,
    learners: 263,
    completion: 81,
    accentColor: "#0ea5e9",
  },
  {
    id: "6",
    title: "Understanding Market Volatility",
    description: "Explore how markets fluctuate, the psychology of fear and greed, and how to stay calm and invested during downturns.",
    category: "Investing",
    categoryColor: "#8b5cf6",
    tagBg: "rgba(139,92,246,0.1)",
    status: "Draft",
    lessons: 9,
    learners: 0,
    completion: 0,
    accentColor: "#8b5cf6",
  },
  {
    id: "7",
    title: "Cryptocurrency Basics",
    description: "A balanced introduction to digital assets — how blockchain works, the risks involved, and how to approach crypto responsibly.",
    category: "Digital Assets",
    categoryColor: "#f97316",
    tagBg: "rgba(249,115,22,0.1)",
    status: "Draft",
    lessons: 4,
    learners: 0,
    completion: 0,
    accentColor: "#f97316",
  },
  {
    id: "8",
    title: "Retirement Planning",
    description: "Planning for retirement with pension schemes, voluntary savings accounts, and compound interest simulations.",
    category: "Long-term Planning",
    categoryColor: "#64748b",
    tagBg: "rgba(100,116,139,0.1)",
    status: "Archived",
    lessons: 6,
    learners: 45,
    completion: 54,
    accentColor: "#94a3b8",
  },
];

/* ── Derived stats ── */
const published = SAMPLE_MODULES.filter(m => m.status === "Published").length;
const drafts     = SAMPLE_MODULES.filter(m => m.status === "Draft").length;
const archived   = SAMPLE_MODULES.filter(m => m.status === "Archived").length;
const totalLessons = SAMPLE_MODULES.reduce((a, m) => a + m.lessons, 0);

const PAGE_STATS = [
  { label: "Published modules", value: String(published), hint: "Live learning content",   iconBg: "rgba(34,197,94,0.1)",   iconColor: "#22c55e", badge: "+2 this month", badgeCls: "badgeGreen", icon: <BookIcon /> },
  { label: "Draft modules",     value: String(drafts),    hint: "Being created",           iconBg: "rgba(251,191,36,0.1)",  iconColor: "#d97706", badge: "In progress",  badgeCls: "badgeAmber", icon: <DraftIcon /> },
  { label: "Archived",          value: String(archived),  hint: "Hidden from learners",    iconBg: "rgba(100,116,139,0.1)", iconColor: "#64748b", badge: "Inactive",     badgeCls: "badgeGray",  icon: <ArchiveIcon /> },
  { label: "Lessons total",     value: String(totalLessons), hint: "Across learning paths", iconBg: "rgba(14,165,233,0.1)", iconColor: "#0ea5e9", badge: "All paths",    badgeCls: "badgeBlue",  icon: <LessonIcon /> },
];

type Filter = "All" | Status;

/* ── Component ── */
export default function ModuleManagerPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [modules, setModules] = useState<Module[]>(SAMPLE_MODULES);

  const visible = modules.filter((m) => {
    const matchFilter = filter === "All" || m.status === filter;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  function handlePublish(id: string) {
    setModules((prev) => prev.map((m) => m.id === id ? { ...m, status: "Published" as Status } : m));
  }

  function handleArchive(id: string) {
    setModules((prev) => prev.map((m) => m.id === id ? { ...m, status: "Archived" as Status } : m));
  }

  return (
    <AdminLayout title="Learning module creation" subtitle="Create, publish, and maintain financial learning modules.">
      {/* Top bar */}
      <div className={s.topBar}>
        <label className={s.searchWrap}>
          <span className={s.searchIcon}><SearchIcon /></span>
          <input
            className={s.searchInput}
            type="search"
            placeholder="Search modules or categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className={s.newBtn}>
          <PlusIcon /> New Module
        </button>
      </div>

      {/* Stats */}
      <div className={s.statsGrid}>
        {PAGE_STATS.map((st) => (
          <div key={st.label} className={s.statCard}>
            <div className={s.statTop}>
              <div className={s.statIcon} style={{ background: st.iconBg, color: st.iconColor }}>{st.icon}</div>
              <span className={`${s.statBadge} ${s[st.badgeCls as keyof typeof s] as string}`}>{st.badge}</span>
            </div>
            <div className={s.statLabel}>{st.label}</div>
            <div className={s.statValue}>{st.value}</div>
            <div className={s.statHint}>{st.hint}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className={s.filterRow}>
        {(["All", "Published", "Draft", "Archived"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={s.filterTab}
            data-active={String(filter === f)}
            onClick={() => setFilter(f)}
          >
            {f} {f !== "All" && `(${modules.filter(m => m.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Module cards */}
      {visible.length === 0 ? (
        <div className={s.empty}>No modules match your search or filter.</div>
      ) : (
        <div className={s.moduleGrid}>
          {visible.map((m) => (
            <div key={m.id} className={s.moduleCard}>
              <div className={s.moduleStripe} style={{ background: m.accentColor }} />
              <div className={s.moduleBody}>
                <div className={s.moduleHead}>
                  <div className={s.moduleTitleWrap}>
                    <h3 className={s.moduleTitle}>{m.title}</h3>
                    <p className={s.moduleDesc}>{m.description}</p>
                  </div>
                  <span className={`${s.statusBadge} ${
                    m.status === "Published" ? s.statusPublished :
                    m.status === "Draft"     ? s.statusDraft     : s.statusArchived
                  }`}>{m.status}</span>
                </div>

                <div className={s.tagsRow}>
                  <span className={s.tag} style={{ background: m.tagBg, color: m.categoryColor }}>
                    {m.category}
                  </span>
                  <span className={s.tag} style={{ background: "rgba(100,116,139,0.08)", color: "#64748b" }}>
                    {m.lessons} lessons
                  </span>
                </div>

                <div className={s.metricsRow}>
                  <div className={s.metric}>
                    <span className={s.metricVal}>{m.learners.toLocaleString()}</span>
                    <span className={s.metricLbl}>learners</span>
                  </div>
                  <div className={s.metric} style={{ flex: 1 }}>
                    <span className={s.metricVal}>{m.completion}%</span>
                    <span className={s.metricLbl}>completion</span>
                    <div className={s.progressWrap}>
                      <div className={s.progressTrack}>
                        <div className={s.progressFill} style={{ width: `${m.completion}%`, background: m.accentColor }} />
                      </div>
                    </div>
                  </div>
                  <div className={s.metric}>
                    <span className={s.metricVal}>{m.lessons}</span>
                    <span className={s.metricLbl}>lessons</span>
                  </div>
                </div>
              </div>

              <div className={s.actions}>
                <button type="button" className={s.btnEdit}>Edit</button>
                {m.status === "Draft" && (
                  <button type="button" className={s.btnPublish} onClick={() => handlePublish(m.id)}>
                    Publish
                  </button>
                )}
                {m.status === "Published" && (
                  <button type="button" className={s.btnPublish}>View Live</button>
                )}
                <button type="button" className={s.btnArchive} onClick={() => handleArchive(m.id)}>
                  {m.status === "Archived" ? "Restore" : "Archive"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
