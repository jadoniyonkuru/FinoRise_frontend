import { Link } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./learner-dashboard.module.css";

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
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

function LightningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" />
      <path d="M5 4H3a2 2 0 0 0-2 2v3a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V6a2 2 0 0 0-2-2h-2" />
      <rect x="5" y="2" width="14" height="6" rx="2" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ── Data ── */
const modules = [
  {
    id: 1,
    tag: "Savings",
    name: "Compound Interest Mastery",
    time: "12 mins remaining",
    progress: 65,
    bg: "linear-gradient(135deg, #92400e 0%, #d97706 60%, #fbbf24 100%)",
  },
  {
    id: 2,
    tag: "Investing",
    name: "Stock Market Fundamentals",
    time: "45 mins remaining",
    progress: 20,
    bg: "linear-gradient(135deg, #1e2d5c 0%, #1d4ed8 70%, #3b82f6 100%)",
  },
];

const leaderboard = [
  { rank: 1, name: "Sarah K.", xp: "12,400 XP", bg: "#0284c7", initials: "SK" },
  { rank: 2, name: "Michael R.", xp: "11,250 XP", bg: "#38bdf8", initials: "MR" },
  { rank: 3, name: "You", xp: "2,450 XP", bg: "#0ea5e9", initials: "AL", isMe: true },
];

const streakDays = [
  { label: "M", active: true },
  { label: "T", active: true },
  { label: "W", active: true },
  { label: "T", active: true },
  { label: "F", active: true },
  { label: "S", active: false },
  { label: "S", active: false },
];

export default function LearnerDashboard() {
  return (
    <LearnerLayout>
      {/* Welcome row */}
      <div className={s.welcomeRow}>
        <div className={s.welcomeText}>
          <h1>Welcome back, Alexander!</h1>
          <p>You're in the top 5% of learners this week. Keep the momentum!</p>
        </div>
        <div className={s.welcomeActions}>
          <button type="button" className={s.reportBtn}>
            <ArrowUpRight /> View Reports
          </button>
          <Link to="/learner/modules" className={s.continueBtn} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            Continue Learning
          </Link>
        </div>
      </div>

      {/* XP Progress card */}
      <div className={s.xpCard}>
        <div className={s.levelBadge}>12</div>
        <div className={s.xpMain}>
          <div className={s.xpTitle}>Financial Apprentice</div>
          <div className={s.xpUnlock}>Level 13 unlock: Advanced Investment Simulation</div>
          <div className={s.xpBarLabel}>
            <span className={s.xpBarText}>XP Progress</span>
            <span className={s.xpBarValue}>2,450 / 3,000 XP</span>
          </div>
          <div className={s.xpBar}>
            <div className={s.xpFill} style={{ width: "81.7%" }} />
          </div>
        </div>
        <div className={s.xpStats}>
          <div className={s.xpStat}>
            <div className={s.xpStatLabel}>Today's XP</div>
            <div className={s.xpStatValue}>+350</div>
          </div>
          <div className={s.xpStat}>
            <div className={s.xpStatLabel}>Global Rank</div>
            <div className={s.xpStatValue}>#142</div>
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className={s.twoCol}>
        {/* Left: modules + insight */}
        <div>
          <div className={s.sectionHeader}>
            <span className={s.sectionTitle}><BookIcon /> Active Learning Modules</span>
            <Link to="/learner/modules" className={s.viewAll}>
              View All Modules <ChevronRight />
            </Link>
          </div>

          <div className={s.moduleCards}>
            {modules.map((m) => (
              <div key={m.id} className={s.moduleCard}>
                <div
                  className={s.moduleThumbnail}
                  style={{ background: m.bg }}
                >
                  <span className={s.moduleTag}>{m.tag}</span>
                </div>
                <div className={s.moduleBody}>
                  <div className={s.moduleName}>{m.name}</div>
                  <div className={s.moduleTime}>
                    <ClockIcon /> {m.time}
                  </div>
                  <div className={s.moduleProgressRow}>
                    <span className={s.moduleProgressPct}>{m.progress}%</span>
                  </div>
                  <div className={s.moduleBar}>
                    <div className={s.moduleBarFill} style={{ width: `${m.progress}%` }} />
                  </div>
                  <button type="button" className={s.resumeBtn}>Resume Lesson</button>
                </div>
              </div>
            ))}
          </div>

          {/* Insight card */}
          <div className={s.insightCard}>
            <div className={s.insightIconWrap}>
              <LightningIcon />
            </div>
            <div>
              <div className={s.insightBadge}>New Insight</div>
              <p className={s.insightTitle}>Behavioral Analysis</p>
            </div>
          </div>
        </div>

        {/* Right: achievements */}
        <div className={s.achievePanel}>
          <div className={s.achieveCard}>
            <div className={s.achieveTitle}><TrophyIcon /> Achievements</div>

            {/* Streak */}
            <div className={s.streakLabel}>Daily Streak</div>
            <div className={s.streakDots}>
              {streakDays.map((d, i) => (
                <div
                  key={i}
                  className={`${s.streakDot} ${!d.active ? s.streakDotEmpty : ""}`}
                >
                  {d.label}
                </div>
              ))}
            </div>
            <p className={s.streakHint}>
              Maintain your streak for{" "}
              <span>2 more days</span> to get a bonus!
            </p>
          </div>

          {/* Leaderboard */}
          <div className={s.achieveCard}>
            <div className={s.achieveTitle}><TrophyIcon /> Top Learners</div>
            <div className={s.leaderList}>
              {leaderboard.map((l) => (
                <div
                  key={l.rank}
                  className={`${s.leaderRow} ${l.isMe ? s.leaderRowMe : ""}`}
                >
                  <span className={s.leaderRank}>{l.rank}</span>
                  <div
                    className={s.leaderAvatar}
                    style={{ background: l.bg }}
                  >
                    {l.initials}
                  </div>
                  <span className={s.leaderName}>{l.name}</span>
                  <span className={s.leaderXp}>{l.xp}</span>
                </div>
              ))}
            </div>
            <Link to="/learner/insights" className={s.viewLeaderboard}>
              View Full Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
