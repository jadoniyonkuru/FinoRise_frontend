import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./simulations.module.css";

/* ── Icons ── */
function SimIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
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
function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
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
function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
function RepeatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="9" height="14" /><rect x="13" y="3" width="9" height="18" />
      <line x1="2" y1="21" x2="22" y2="21" />
      <line x1="6" y1="11" x2="7" y2="11" /><line x1="6" y1="15" x2="7" y2="15" />
      <line x1="17" y1="7" x2="18" y2="7" /><line x1="17" y1="11" x2="18" y2="11" /><line x1="17" y1="15" x2="18" y2="15" />
    </svg>
  );
}
function BotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M12 11V5" /><circle cx="12" cy="4" r="1" />
      <line x1="8" y1="15" x2="8" y2="15" strokeWidth="3" /><line x1="12" y1="15" x2="12" y2="15" strokeWidth="3" /><line x1="16" y1="15" x2="16" y2="15" strokeWidth="3" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── Types ── */
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type Category   = "Budgeting" | "Investing" | "Emergency" | "Business" | "Planning" | "Crisis" | "Retirement" | "Real Estate";
type Status     = "available" | "in-progress" | "completed" | "locked";

type Simulation = {
  id: number;
  category: Category;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  xp: number;
  status: Status;
  progress?: number;
  headerBg: string;
  icon: React.ReactNode;
};

/* ── Data ── */
const simulations: Simulation[] = [
  {
    id: 1,
    category: "Budgeting",
    title: "Monthly Budget Challenge",
    description: "Manage a full month of income and expenses. Allocate funds across needs, savings, and discretionary spending.",
    difficulty: "Beginner",
    duration: "15 mins",
    xp: 400,
    status: "completed",
    headerBg: "linear-gradient(135deg,#16a34a,#4ade80)",
    icon: <WalletIcon />,
  },
  {
    id: 2,
    category: "Budgeting",
    title: "Debt Payoff Strategy",
    description: "Avalanche vs. snowball — choose a debt payoff method and simulate the 24-month outcome across 3 loans.",
    difficulty: "Intermediate",
    duration: "20 mins",
    xp: 600,
    status: "in-progress",
    progress: 65,
    headerBg: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
    icon: <WalletIcon />,
  },
  {
    id: 3,
    category: "Emergency",
    title: "Emergency Fund Crisis",
    description: "An unexpected medical bill arrives. Navigate this financial shock with limited savings — debt, loans, or insurance?",
    difficulty: "Intermediate",
    duration: "25 mins",
    xp: 750,
    status: "available",
    headerBg: "linear-gradient(135deg,#dc2626,#fb923c)",
    icon: <AlertIcon />,
  },
  {
    id: 4,
    category: "Investing",
    title: "Stock Portfolio Builder",
    description: "Allocate RWF 500,000 across stocks, bonds, and ETFs based on your risk profile and a 5-year horizon.",
    difficulty: "Advanced",
    duration: "30 mins",
    xp: 1000,
    status: "available",
    headerBg: "linear-gradient(135deg,#1d4ed8,#38bdf8)",
    icon: <TrendIcon />,
  },
  {
    id: 5,
    category: "Business",
    title: "Business Startup Finance",
    description: "Launch a small business with limited capital. Manage startup costs, cash flow, and decide when to take on debt.",
    difficulty: "Advanced",
    duration: "40 mins",
    xp: 1200,
    status: "locked",
    headerBg: "linear-gradient(135deg,#475569,#94a3b8)",
    icon: <BriefcaseIcon />,
  },
  {
    id: 6,
    category: "Planning",
    title: "Retirement Nest Egg",
    description: "Simulate 30 years of retirement saving. Compare 401(k), pension, and real estate returns to hit your target.",
    difficulty: "Advanced",
    duration: "35 mins",
    xp: 1100,
    status: "locked",
    headerBg: "linear-gradient(135deg,#475569,#94a3b8)",
    icon: <HomeIcon />,
  },
  {
    id: 7,
    category: "Crisis",
    title: "Debt Snowball vs Avalanche",
    description: "You have 4 sources of debt. Strategize the most efficient way to reach zero balance.",
    difficulty: "Beginner",
    duration: "12 mins",
    xp: 350,
    status: "available",
    headerBg: "linear-gradient(135deg,#7c3aed,#a78bfa)",
    icon: <RepeatIcon />,
  },
  {
    id: 8,
    category: "Retirement",
    title: "FIRE: Early Retirement",
    description: "Aggressive saving meets lifestyle choices. Can you reach your target number by age 45?",
    difficulty: "Advanced",
    duration: "25 mins",
    xp: 750,
    status: "available",
    headerBg: "linear-gradient(135deg,#0369a1,#38bdf8)",
    icon: <SparkleIcon />,
  },
  {
    id: 9,
    category: "Real Estate",
    title: "Rental Property Pivot",
    description: "Convert your primary residence into a rental. Calculate ROI and manage tenant risks.",
    difficulty: "Intermediate",
    duration: "18 mins",
    xp: 500,
    status: "available",
    headerBg: "linear-gradient(135deg,#065f46,#34d399)",
    icon: <BuildingIcon />,
  },
];

type FilterKey = "All" | Category | "Completed";
const filters: FilterKey[] = ["All", "Budgeting", "Investing", "Crisis", "Retirement", "Real Estate", "Completed"];

function badgeClass(d: Difficulty) {
  if (d === "Beginner")     return s.badgeBeginner;
  if (d === "Intermediate") return s.badgeIntermediate;
  return s.badgeAdvanced;
}

function statusChipClass(st: Status) {
  if (st === "available")    return s.statusAvailable;
  if (st === "in-progress")  return s.statusInProgress;
  if (st === "completed")    return s.statusCompleted;
  return s.statusLocked;
}

function statusLabel(st: Status) {
  if (st === "available")   return "Available";
  if (st === "in-progress") return "In Progress";
  if (st === "completed")   return "Completed";
  return "Locked";
}

export default function LearnerSimulationsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [search, setSearch] = useState("");

  const completedCount = simulations.filter((s) => s.status === "completed").length;

  const visible = simulations.filter((sim) => {
    const matchFilter =
      activeFilter === "All"       ? true :
      activeFilter === "Completed" ? sim.status === "completed" :
                                     sim.category === activeFilter;

    const matchSearch =
      search.trim() === "" ||
      sim.title.toLowerCase().includes(search.toLowerCase()) ||
      sim.description.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <LearnerLayout>
      {/* Page header */}
      <div className={s.pageTop}>
        <div>
          <div className={s.pathLabel}><SimIcon /> Simulation Center</div>
          <h1 className={s.pageTitle}>Simulations</h1>
          <p className={s.pageSubtitle}>
            Practice real financial decisions in a safe environment. Earn XP and
            level up your money instincts.
          </p>
        </div>
        <div className={s.headerStats}>
          <div className={s.headerStat}>
            <div className={s.statLabel}>Completed</div>
            <div className={s.statValue}>
              {completedCount} / {simulations.length}
            </div>
          </div>
          <div className={s.headerStat}>
            <div className={s.statLabel}>Success Rate</div>
            <div className={`${s.statValue} ${s.statValueGreen}`}>85%</div>
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
            placeholder="Search simulations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className={s.grid}>
        {visible.length === 0 ? (
          <div className={s.empty}>No simulations match your search.</div>
        ) : (
          visible.map((sim) => (
            <div
              key={sim.id}
              className={`${s.card} ${sim.status === "locked" ? s.cardLocked : ""}`}
            >
              {/* Coloured header strip */}
              <div
                className={s.cardHeader}
                style={{ background: sim.headerBg }}
              >
                <div className={s.cardIconCircle}>{sim.icon}</div>
                <span className={`${s.statusChip} ${statusChipClass(sim.status)}`}>
                  {sim.status === "locked" && <LockIcon />}
                  {statusLabel(sim.status)}
                </span>
              </div>

              <div className={s.cardBody}>
                <div className={s.cardTitleRow}>
                  <h3 className={s.cardTitle}>{sim.title}</h3>
                  <span className={`${s.badge} ${badgeClass(sim.difficulty)}`}>
                    {sim.difficulty}
                  </span>
                </div>
                <p className={s.cardDesc}>{sim.description}</p>

                {sim.status === "in-progress" && sim.progress !== undefined && (
                  <div className={s.progressSection}>
                    <div className={s.progressLabelRow}>
                      <span className={s.progressLabel}>Progress</span>
                      <span className={s.progressPct}>{sim.progress}%</span>
                    </div>
                    <div className={s.progressBar}>
                      <div className={s.progressFill} style={{ width: `${sim.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className={s.cardFooter}>
                <div className={s.cardMeta}>
                  <span className={s.metaItem}><ClockIcon /> {sim.duration}</span>
                  <span className={`${s.metaItem} ${s.metaXp}`}>
                    <BoltIcon /> {sim.xp} XP
                  </span>
                </div>

                {sim.status === "available"    && <button type="button" className={s.startBtn} onClick={() => navigate("/learner/simulation-runner")}>Start Simulation</button>}
                {sim.status === "in-progress"  && <button type="button" className={s.resumeBtn} onClick={() => navigate("/learner/simulation-runner")}>Continue</button>}
                {sim.status === "completed"    && <button type="button" className={s.replayBtn} onClick={() => navigate("/learner/simulation-runner")}>Replay</button>}
                {sim.status === "locked"       && <button type="button" className={s.lockedBtn} disabled><LockIcon /> Locked</button>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* AI assistant callout */}
      <div className={s.aiCallout}>
        <div className={s.aiCalloutLeft}>
          <div className={s.aiCalloutBadge}><BotIcon /> New AI Feature</div>
          <h3 className={s.aiCalloutTitle}>Unsure where to start?</h3>
          <p className={s.aiCalloutDesc}>
            Our AI Assistant can analyze your current progress and financial goals to
            suggest the perfect simulation to build your confidence.
          </p>
        </div>
        <button
          type="button"
          className={s.aiCalloutBtn}
          onClick={() => navigate("/learner/ai-coach")}
        >
          Ask AI Assistant <ArrowRightIcon />
        </button>
      </div>
    </LearnerLayout>
  );
}
