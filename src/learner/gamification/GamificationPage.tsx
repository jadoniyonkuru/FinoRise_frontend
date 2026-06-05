import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { gamificationService } from "@/api";
import type { Badge as ApiBadge, LeaderboardEntry } from "@/api";
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

/* Badge icon component */
function BadgeSparkle(){ return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>; }

const BADGE_GRADIENTS = [
  "linear-gradient(135deg,#0d9488,#34d399)",
  "linear-gradient(135deg,#4f46e5,#818cf8)",
  "linear-gradient(135deg,#db2777,#f472b6)",
  "linear-gradient(135deg,#7c3aed,#a78bfa)",
  "linear-gradient(135deg,#0ea5e9,#38bdf8)",
  "linear-gradient(135deg,#f59e0b,#fcd34d)",
];

const AVATAR_COLORS = ["#f59e0b","#6366f1","#0ea5e9","#22c55e","#ec4899","#8b5cf6"];

const DAY_LABELS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

/* ─── Level Ring SVG ─── */
function LevelRing({ level, xpCurrent, xpNext }: { level: number; xpCurrent: number; xpNext: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const fill = circ * Math.min(xpCurrent / Math.max(xpNext, 1), 1);
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
      <text x="65" y="57" textAnchor="middle" style={{ fill: "#111827", fontSize: 28, fontWeight: 800, fontFamily: "inherit" }}>{level}</text>
      <text x="65" y="72" textAnchor="middle" style={{ fill: "#9ca3af", fontSize: 8.5, fontWeight: 700, fontFamily: "inherit", letterSpacing: 1 }}>CURRENT LEVEL</text>
    </svg>
  );
}

/* ─── Component ─── */
export default function GamificationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [badges, setBadges] = useState<ApiBadge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [streak, setStreak] = useState(0);

  const xpCurrent = user?.xp_total ?? 0;
  const level = user?.level ?? 1;
  const xpNext = level * 1000;
  const xpPct = Math.round((xpCurrent / Math.max(xpNext, 1)) * 100);

  useEffect(() => {
    gamificationService.getBadges().then(setBadges).catch(() => {});
    gamificationService.getLeaderboard().then(setLeaderboard).catch(() => {});
    gamificationService.getStreak().then(s => setStreak(s.streak_days)).catch(() => {});
  }, []);

  const streakDays = DAY_LABELS.map((label, i) => ({ label, active: i < streak }));

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
            <LevelRing level={level} xpCurrent={xpCurrent} xpNext={xpNext} />
            <div className={s.levelInfo}>
              <h2 className={s.levelTitle}>Level {level}</h2>
              <p className={s.levelHint}>Keep going! You're only <strong>{(xpNext - xpCurrent).toLocaleString()} XP</strong> away from Level {level + 1}.</p>
              <div className={s.xpBarRow}>
                <div className={s.xpBar}>
                  <div className={s.xpFill} style={{ width: `${xpPct}%` }} />
                </div>
                <span className={s.xpLabel}>{xpCurrent.toLocaleString()} / {xpNext.toLocaleString()} XP</span>
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
              {badges.length === 0 ? (
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>No badges earned yet. Complete modules and simulations to earn badges.</p>
              ) : badges.map((b, i) => (
                <div key={b.id} className={s.badgeCard}>
                  <div
                    className={s.badgeIconWrap}
                    style={{ background: BADGE_GRADIENTS[i % BADGE_GRADIENTS.length] }}
                  >
                    <BadgeSparkle />
                  </div>
                  <div className={s.badgeName}>{b.badge_name}</div>
                  <div className={s.badgeDesc}>{b.badge_type}</div>
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
              <span className={s.streakTitle}>{streak} Day Streak</span>
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
            {leaderboard.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: "0.85rem", padding: "0.5rem 0" }}>Leaderboard loading…</p>
            ) : leaderboard.map((l, i) => {
              const rank = i + 1;
              const initials = l.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
              const isMe = l.id === user?.id;
              return (
                <div key={l.id} className={`${s.leaderRow} ${isMe ? s.leaderRowMe : ""}`}>
                  <span className={`${s.leaderRank} ${rank <= 3 ? s.leaderRankTop : ""}`}>{rank}</span>
                  <div className={s.leaderAvatar} style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>{initials}</div>
                  <span className={s.leaderName}>{isMe ? "You" : l.full_name}</span>
                  <span className={s.leaderXp}>{l.xp_total.toLocaleString()} XP</span>
                  {rank <= 3 && <span className={s.leaderMedal}>{rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
