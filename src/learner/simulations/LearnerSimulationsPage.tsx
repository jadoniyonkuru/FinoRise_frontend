import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LearnerLayout from "../LearnerLayout";
import { simulationsService } from "@/api";
import type { Simulation, SimulationAttempt } from "@/api";
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
function RepeatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
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

/* ── UI helpers ── */
type Status = "available" | "in-progress" | "completed";

type UISimulation = {
  id: string;
  category: string;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  status: Status;
  headerBg: string;
  icon: React.ReactNode;
};

function categoryBg(cat: string): string {
  const map: Record<string, string> = {
    budgeting:  "linear-gradient(135deg,#16a34a,#4ade80)",
    loan:       "linear-gradient(135deg,#0ea5e9,#38bdf8)",
    emergency:  "linear-gradient(135deg,#dc2626,#fb923c)",
    debt:       "linear-gradient(135deg,#7c3aed,#a78bfa)",
    investing:  "linear-gradient(135deg,#1d4ed8,#38bdf8)",
  };
  return map[cat] ?? "linear-gradient(135deg,#475569,#94a3b8)";
}

function categoryIcon(cat: string): React.ReactNode {
  if (cat === "emergency") return <AlertIcon />;
  if (cat === "investing")  return <TrendIcon />;
  if (cat === "debt")       return <RepeatIcon />;
  if (cat === "loan")       return <BriefcaseIcon />;
  return <WalletIcon />;
}

function toUISimulation(sim: Simulation, completedIds: Set<string>): UISimulation {
  return {
    id: sim.id,
    category: sim.category,
    title: sim.title,
    description: sim.description,
    difficulty: sim.difficulty.charAt(0).toUpperCase() + sim.difficulty.slice(1),
    xp: sim.xp_reward,
    status: completedIds.has(sim.id) ? "completed" : "available",
    headerBg: categoryBg(sim.category),
    icon: categoryIcon(sim.category),
  };
}

function badgeClass(d: string) {
  if (d === "Beginner")     return s.badgeBeginner;
  if (d === "Intermediate") return s.badgeIntermediate;
  return s.badgeAdvanced;
}

function statusChipClass(st: Status) {
  if (st === "available")   return s.statusAvailable;
  if (st === "in-progress") return s.statusInProgress;
  return s.statusCompleted;
}

function statusLabel(st: Status) {
  if (st === "available")   return "Available";
  if (st === "in-progress") return "In Progress";
  return "Completed";
}

export default function LearnerSimulationsPage() {
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState<UISimulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([simulationsService.getAll(), simulationsService.getHistory()])
      .then(([sims, history]: [Simulation[], SimulationAttempt[]]) => {
        const completedIds = new Set(history.map((a) => a.simulation_id));
        setSimulations(sims.map((s) => toUISimulation(s, completedIds)));
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(simulations.map((s) => s.category))), "Completed"];
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
          {categories.map((f) => (
            <button
              key={f}
              type="button"
              className={`${s.filterTab} ${activeFilter === f ? s.filterTabActive : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
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
        {loading ? (
          <div className={s.empty}>Loading simulations…</div>
        ) : visible.length === 0 ? (
          <div className={s.empty}>No simulations match your search.</div>
        ) : (
          visible.map((sim) => (
            <div
              key={sim.id}
              className={s.card}
            >
              {/* Coloured header strip */}
              <div
                className={s.cardHeader}
                style={{ background: sim.headerBg }}
              >
                <div className={s.cardIconCircle}>{sim.icon}</div>
                <span className={`${s.statusChip} ${statusChipClass(sim.status)}`}>
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

              </div>

              <div className={s.cardFooter}>
                <div className={s.cardMeta}>
                  <span className={`${s.metaItem} ${s.metaXp}`}>
                    <BoltIcon /> {sim.xp} XP
                  </span>
                </div>

                {sim.status === "available"   && <button type="button" className={s.startBtn}  onClick={() => navigate(`/learner/simulation-runner?id=${sim.id}`)}>Start Simulation</button>}
                {sim.status === "in-progress" && <button type="button" className={s.resumeBtn} onClick={() => navigate(`/learner/simulation-runner?id=${sim.id}`)}>Continue</button>}
                {sim.status === "completed"   && <button type="button" className={s.replayBtn} onClick={() => navigate(`/learner/simulation-runner?id=${sim.id}`)}>Replay</button>}
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
