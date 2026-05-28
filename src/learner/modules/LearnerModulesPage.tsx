import { useState } from "react";
import { Link } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./modules.module.css";

/* ── Icons ── */
function PathIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}
function GradCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}
function CryptoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function DebtIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" />
    </svg>
  );
}

/* ── Types ── */
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type Category = "Essentials" | "Investing" | "Advanced";

type Module = {
  id: number;
  category: Category;
  title: string;
  description: string;
  difficulty: Difficulty;
  progress: number;
  duration: string;
  xp: number;
  icon: React.ReactNode;
};

/* ── Data ── */
const modules: Module[] = [
  {
    id: 1,
    category: "Essentials",
    title: "Budgeting 101",
    description: "Master the 50/30/20 rule and learn how to track your spending without the headache.",
    difficulty: "Beginner",
    progress: 75,
    duration: "45 mins",
    xp: 500,
    icon: <WalletIcon />,
  },
  {
    id: 2,
    category: "Investing",
    title: "Stock Market Basics",
    description: "Understand bulls, bears, and how to start your first portfolio with confidence.",
    difficulty: "Intermediate",
    progress: 0,
    duration: "1.5 hours",
    xp: 850,
    icon: <TrendIcon />,
  },
  {
    id: 3,
    category: "Advanced",
    title: "Tax Optimization",
    description: "Advanced strategies for legally minimizing your tax burden through smart deductions.",
    difficulty: "Advanced",
    progress: 0,
    duration: "2 hours",
    xp: 1200,
    icon: <ShieldIcon />,
  },
  {
    id: 4,
    category: "Essentials",
    title: "Credit Score Mastery",
    description: "The hidden algorithms behind credit scores and how to repair or boost your rating fast.",
    difficulty: "Beginner",
    progress: 100,
    duration: "1 hour",
    xp: 600,
    icon: <CardIcon />,
  },
  {
    id: 5,
    category: "Investing",
    title: "Retirement Planning",
    description: "Comparing 401(k)s, IRAs, and why starting in your 20s is the ultimate cheat code.",
    difficulty: "Intermediate",
    progress: 15,
    duration: "1.5 hours",
    xp: 900,
    icon: <GradCapIcon />,
  },
  {
    id: 6,
    category: "Advanced",
    title: "Crypto Fundamentals",
    description: "Beyond the hype: Understanding blockchain technology and risk management.",
    difficulty: "Advanced",
    progress: 0,
    duration: "2 hours",
    xp: 1100,
    icon: <CryptoIcon />,
  },
  {
    id: 7,
    category: "Essentials",
    title: "Emergency Fund Planning",
    description: "Build a bulletproof safety net that keeps you out of debt when life gets unpredictable.",
    difficulty: "Beginner",
    progress: 100,
    duration: "30 mins",
    xp: 400,
    icon: <HomeIcon />,
  },
  {
    id: 8,
    category: "Essentials",
    title: "Debt Elimination Strategy",
    description: "Avalanche vs. snowball — find the debt payoff method that actually works for your life.",
    difficulty: "Intermediate",
    progress: 0,
    duration: "1 hour",
    xp: 750,
    icon: <DebtIcon />,
  },
  {
    id: 9,
    category: "Investing",
    title: "Real Estate Investing",
    description: "From house hacking to REITs — how to build wealth through property without millions.",
    difficulty: "Advanced",
    progress: 0,
    duration: "2.5 hours",
    xp: 1300,
    icon: <HomeIcon />,
  },
];

type FilterKey = "All" | Category | "Completed";

const filters: FilterKey[] = ["All", "Essentials", "Investing", "Advanced", "Completed"];

function badgeClass(d: Difficulty) {
  if (d === "Beginner") return s.badgeBeginner;
  if (d === "Intermediate") return s.badgeIntermediate;
  return s.badgeAdvanced;
}

export default function LearnerModulesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [search, setSearch] = useState("");

  const completed = modules.filter((m) => m.progress === 100).length;

  const visible = modules.filter((m) => {
    const matchFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Completed"
        ? m.progress === 100
        : m.category === activeFilter;

    const matchSearch =
      search.trim() === "" ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <LearnerLayout>
      {/* Page header */}
      <div className={s.pageTop}>
        <div>
          <div className={s.pathLabel}>
            <PathIcon /> Learning Path
          </div>
          <h1 className={s.pageTitle}>Modules</h1>
          <p className={s.pageSubtitle}>
            Elevate your financial IQ through curated lessons. Level up your
            knowledge and earn XP to unlock rewards.
          </p>
        </div>
        <div className={s.headerStats}>
          <div className={s.headerStat}>
            <div className={s.statLabel}>Completed</div>
            <div className={s.statValue}>
              {completed} / {modules.length}
            </div>
          </div>
          <div className={s.headerStat}>
            <div className={s.statLabel}>Skill Points</div>
            <div className={`${s.statValue} ${s.statValueAccent}`}>2,450</div>
          </div>
        </div>
      </div>

      {/* Filter + search */}
      <div className={s.filterRow}>
        <div className={s.filterTabs}>
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`${s.filterTab} ${activeFilter === f ? s.filterTabActive : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className={s.searchWrap}>
          <span className={s.searchIcon}><SearchIcon /></span>
          <input
            className={s.searchInput}
            placeholder="Search modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className={s.grid}>
        {visible.length === 0 ? (
          <div className={s.empty}>No modules match your search.</div>
        ) : (
          visible.map((m) => (
            <div key={m.id} className={s.card}>
              <div className={s.cardTop}>
                <div className={s.cardIcon}>{m.icon}</div>
                <span className={`${s.badge} ${badgeClass(m.difficulty)}`}>
                  {m.difficulty}
                </span>
              </div>

              <div>
                <h3 className={s.cardTitle}>{m.title}</h3>
                <p className={s.cardDesc}>{m.description}</p>
              </div>

              <div className={s.progressSection}>
                <div className={s.progressLabelRow}>
                  <span className={s.progressLabel}>Progress</span>
                  <span className={s.progressPct}>{m.progress}%</span>
                </div>
                <div className={s.progressBar}>
                  <div
                    className={`${s.progressFill} ${m.progress === 100 ? s.progressFillGreen : ""}`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </div>

              <div className={s.cardFooter}>
                <div className={s.cardMeta}>
                  <span className={s.metaItem}>
                    <ClockIcon /> {m.duration}
                  </span>
                  <span className={`${s.metaItem} ${s.metaItemXp}`}>
                    <BoltIcon /> {m.xp} XP
                  </span>
                </div>

                {m.progress === 100 ? (
                  <Link to={`/learner/modules/${m.id}`} className={s.reviewBtn}>Review</Link>
                ) : m.progress > 0 ? (
                  <Link to={`/learner/modules/${m.id}`} className={s.resumeBtn}>Resume</Link>
                ) : (
                  <Link to={`/learner/modules/${m.id}`} className={s.startBtn}>Start</Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </LearnerLayout>
  );
}
