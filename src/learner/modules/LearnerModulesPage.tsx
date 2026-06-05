import { useEffect, useState } from "react";
import { Link } from "react-router";
import { modulesService } from "@/api";
import type { Module as ApiModule } from "@/api";
import { useLearnerProgress } from "@/context/LearnerProgressContext";
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

type FilterKey = "All" | "Completed" | string;

function difficultyClass(d: string) {
  if (d?.toLowerCase() === "beginner") return s.badgeBeginner;
  if (d?.toLowerCase() === "intermediate") return s.badgeIntermediate;
  return s.badgeAdvanced;
}

function categoryIcon(category: string): React.ReactNode {
  const cat = category?.toLowerCase() ?? "";
  if (cat.includes("budget")) return <WalletIcon />;
  if (cat.includes("invest") || cat.includes("stock")) return <TrendIcon />;
  if (cat.includes("tax") || cat.includes("security")) return <ShieldIcon />;
  if (cat.includes("credit") || cat.includes("card")) return <CardIcon />;
  if (cat.includes("retire") || cat.includes("education")) return <GradCapIcon />;
  if (cat.includes("crypto")) return <CryptoIcon />;
  if (cat.includes("real estate") || cat.includes("home")) return <HomeIcon />;
  if (cat.includes("debt") || cat.includes("loan")) return <DebtIcon />;
  return <WalletIcon />;
}

export default function LearnerModulesPage() {
  const { progress, isModuleCompleted } = useLearnerProgress();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [search, setSearch] = useState("");
  const [modules, setModules] = useState<ApiModule[]>([]);
  const [loading, setLoading] = useState(true);

  const completedCount = modules.filter((m) => isModuleCompleted(m.id)).length;

  useEffect(() => {
    modulesService.getAll()
      .then(setModules)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(modules.map(m => m.category).filter(Boolean)));
  const filters: FilterKey[] = ["All", ...categories, "Completed"];

  const visible = modules.filter((m) => {
    const matchFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Completed"
        ? isModuleCompleted(m.id)
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
            <div className={s.statLabel}>Available</div>
            <div className={s.statValue}>{modules.length}</div>
          </div>
          <div className={s.headerStat}>
            <div className={s.statLabel}>Completed</div>
            <div className={s.statValue}>{completedCount}</div>
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
        {loading ? (
          <div className={s.empty}>Loading modules…</div>
        ) : visible.length === 0 ? (
          <div className={s.empty}>No modules match your search.</div>
        ) : (
          visible.map((m) => {
            const done = isModuleCompleted(m.id);
            const prog = progress.find((p) => p.module_id === m.id);
            return (
            <div key={m.id} className={s.card} data-completed={String(done)}>
              <div className={s.cardTop}>
                <div className={s.cardIcon}>{categoryIcon(m.category)}</div>
                <span className={`${s.badge} ${difficultyClass(m.difficulty)}`}>
                  {m.difficulty}
                </span>
                {done && <span className={s.completedBadge}>Completed</span>}
              </div>

              <div>
                <h3 className={s.cardTitle}>{m.title}</h3>
                <p className={s.cardDesc}>{m.description}</p>
              </div>

              <div className={s.cardFooter}>
                <div className={s.cardMeta}>
                  <span className={`${s.metaItem} ${s.metaItemXp}`}>
                    <BoltIcon /> {m.xp_reward} XP
                  </span>
                  <span className={s.metaItem}>{m.category}</span>
                </div>
                <Link to={`/learner/modules/${m.id}`} className={s.startBtn}>
                  {done ? "Review" : "Start"}
                </Link>
                {done && prog?.score != null && (
                  <span className={s.scoreHint}>{Math.round(prog.score)}% quiz</span>
                )}
              </div>
            </div>
          );
          })
        )}
      </div>
    </LearnerLayout>
  );
}
