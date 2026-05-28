import { useNavigate } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./gamification.module.css";

/* ─── Icons ─── */
function IconHistory() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  );
}
function IconGift() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconMultiplier() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}
function IconChevRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function IconTrophy() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" />
      <path d="M5 4H3a2 2 0 0 0-2 2v3a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V6a2 2 0 0 0-2-2h-2" />
      <rect x="5" y="2" width="14" height="6" rx="2" />
    </svg>
  );
}

/* Badge icon components */
function BadgeClock()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function BadgeWallet() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor"/></svg>; }
function BadgeArrow()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>; }
function BadgeSparkle(){ return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>; }
function BadgeShield() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function BadgeCrown()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 4 7 14 12 6 17 14 22 4"/><line x1="2" y1="20" x2="22" y2="20"/></svg>; }
function BadgeTarget() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>; }
function BadgeStar()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }

/* ─── Data ─── */
const XP_CURRENT = 2450;
const XP_NEXT    = 3000;
const LEVEL      = 12;

type Badge = {
  id: number;
  icon: React.ReactNode;
  name: string;
  desc: string;
  earned: boolean;
  gradient: string;
  iconColor: string;
};

const badges: Badge[] = [
  { id: 1, icon: <BadgeClock />,   name: "Early Bird",    desc: "Login 5 days in a row before 8 AM",    earned: true,  gradient: "linear-gradient(135deg,#0d9488,#34d399)", iconColor: "#fff" },
  { id: 2, icon: <BadgeWallet />,  name: "Budget Master", desc: "Complete the Basic Budgeting module",   earned: true,  gradient: "linear-gradient(135deg,#4f46e5,#818cf8)", iconColor: "#fff" },
  { id: 3, icon: <BadgeArrow />,   name: "Risk Taker",    desc: "Complete a high-risk simulation",       earned: true,  gradient: "linear-gradient(135deg,#db2777,#f472b6)", iconColor: "#fff" },
  { id: 4, icon: <BadgeSparkle />, name: "Wealth Builder",desc: "Save over RWF 10,000 in simulations",   earned: true,  gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)", iconColor: "#fff" },
  { id: 5, icon: <BadgeShield />,  name: "Security Pro",  desc: "Ace the Fraud Prevention quiz",         earned: false, gradient: "", iconColor: "#9ca3af" },
  { id: 6, icon: <BadgeCrown />,   name: "Compound King", desc: "Use compound interest for 10 simulated years", earned: false, gradient: "", iconColor: "#9ca3af" },
  { id: 7, icon: <BadgeTarget />,  name: "Goal Setter",   desc: "Reach your first financial goal",       earned: false, gradient: "", iconColor: "#9ca3af" },
  { id: 8, icon: <BadgeStar />,    name: "Smart Spender", desc: "Keep expenses under 30% for 3 months", earned: false, gradient: "", iconColor: "#9ca3af" },
];

const leaderboard = [
  { rank: 1, name: "Alex Rivera",  xp: "15,400", initials: "AR", bg: "#f59e0b" },
  { rank: 2, name: "Sarah Chen",   xp: "12,250", initials: "SC", bg: "#6366f1" },
  { rank: 3, name: "Marcus Bell",  xp: "9,870",  initials: "MB", bg: "#0ea5e9" },
  { rank: 4, name: "Amina T.",     xp: "7,450",  initials: "AT", bg: "#22c55e" },
  { rank: 5, name: "You",          xp: "2,450",  initials: "AL", bg: "#ec4899", isMe: true },
];

const streakDays = [
  { label: "MON", active: true },
  { label: "TUE", active: true },
  { label: "WED", active: true },
  { label: "THU", active: true },
  { label: "FRI", active: true },
  { label: "SAT", active: false },
  { label: "SUN", active: false },
];

/* ─── Level Ring SVG ─── */
function LevelRing() {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const fill = circ * (XP_CURRENT / XP_NEXT);
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" className={s.levelRingSvg}>
      <circle cx="65" cy="65" r={r} fill="none" stroke="#e5e7eb" strokeWidth="9" />
      <circle
        cx="65" cy="65" r={r} fill="none"
        stroke="url(#ringGrad)" strokeWidth="9"
        strokeDasharray={`${fill} ${circ}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <text x="65" y="57" textAnchor="middle" style={{ fill: "#111827", fontSize: 28, fontWeight: 800, fontFamily: "inherit" }}>{LEVEL}</text>
      <text x="65" y="72" textAnchor="middle" style={{ fill: "#9ca3af", fontSize: 8.5, fontWeight: 700, fontFamily: "inherit", letterSpacing: 1 }}>CURRENT LEVEL</text>
    </svg>
  );
}

/* ─── Component ─── */
export default function GamificationPage() {
  const navigate = useNavigate();
  const xpPct = Math.round((XP_CURRENT / XP_NEXT) * 100);

  return (
    <LearnerLayout>
      {/* ── Page header ── */}
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Gamification Panel</h1>
          <p className={s.pageSubtitle}>Track your progress, view achievements, and see how you rank among the FinoRise community.</p>
        </div>
        <div className={s.headerActions}>
          <button type="button" className={s.historyBtn}>
            <IconHistory /> Transaction History
          </button>
          <button type="button" className={s.catalogBtn} onClick={() => navigate("/learner/reward-catalog")}>
            <IconGift /> Go to Reward Catalog
          </button>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className={s.body}>
        {/* ── Left / Main ── */}
        <div className={s.mainCol}>

          {/* Level card */}
          <div className={s.levelCard}>
            <LevelRing />
            <div className={s.levelInfo}>
              <h2 className={s.levelTitle}>Financial Voyager</h2>
              <p className={s.levelHint}>Keep going! You're only <strong>{(XP_NEXT - XP_CURRENT).toLocaleString()} XP</strong> away from Level {LEVEL + 1}.</p>
              <div className={s.xpBarRow}>
                <div className={s.xpBar}>
                  <div className={s.xpFill} style={{ width: `${xpPct}%` }} />
                </div>
                <span className={s.xpLabel}>{XP_CURRENT.toLocaleString()} / {XP_NEXT.toLocaleString()} XP</span>
              </div>
              <div className={s.levelChips}>
                <span className={s.chip}><IconMultiplier /> 1.2x Multiplier Active</span>
                <span className={s.chip}><IconStar /> 15 Lessons Completed</span>
              </div>
            </div>
            <div className={s.levelBg} />
          </div>

          {/* Achievement Hall */}
          <div className={s.achieveSection}>
            <div className={s.achieveHeader}>
              <div>
                <h3 className={s.achieveTitle}>Achievement Hall</h3>
                <p className={s.achieveSub}>Your earned badges and upcoming challenges.</p>
              </div>
              <button type="button" className={s.viewAllBtn}>
                View All Achievements <IconChevRight />
              </button>
            </div>
            <div className={s.badgeGrid}>
              {badges.map(b => (
                <div key={b.id} className={`${s.badgeCard} ${!b.earned ? s.badgeCardLocked : ""}`}>
                  <div
                    className={s.badgeIconWrap}
                    style={b.earned ? { background: b.gradient } : { background: "#f3f4f6" }}
                  >
                    <span style={{ color: b.iconColor, display: "flex" }}>{b.icon}</span>
                  </div>
                  <div className={s.badgeName}>{b.name}</div>
                  <div className={s.badgeDesc}>{b.desc}</div>
                  {!b.earned && <div className={s.lockedTag}>Locked</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className={s.sideCol}>
          {/* Streak */}
          <div className={s.streakCard}>
            <div className={s.streakHeader}>
              <span className={s.streakFlame}>🔥</span>
              <span className={s.streakTitle}>5 Day Streak</span>
            </div>
            <div className={s.streakDots}>
              {streakDays.map((d, i) => (
                <div key={i} className={s.streakDay}>
                  <div className={`${s.streakCircle} ${d.active ? s.streakCircleActive : ""}`}>
                    {d.active && <span className={s.streakDotFire}>🔥</span>}
                  </div>
                  <span className={s.streakDayLabel}>{d.label}</span>
                </div>
              ))}
            </div>
            <p className={s.streakMsg}>Come back tomorrow to keep the flame alive!</p>
          </div>

          {/* Leaderboard */}
          <div className={s.leaderCard}>
            <div className={s.leaderHeader}>
              <IconTrophy /> Leaderboard
            </div>
            {leaderboard.map(l => (
              <div key={l.rank} className={`${s.leaderRow} ${l.isMe ? s.leaderRowMe : ""}`}>
                <span className={`${s.leaderRank} ${l.rank <= 3 ? s.leaderRankTop : ""}`}>{l.rank}</span>
                <div className={s.leaderAvatar} style={{ background: l.bg }}>{l.initials}</div>
                <span className={s.leaderName}>{l.name}</span>
                <span className={s.leaderXp}>{l.xp} XP</span>
                {l.rank <= 3 && <span className={s.leaderMedal}>{l.rank === 1 ? "🥇" : l.rank === 2 ? "🥈" : "🥉"}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
