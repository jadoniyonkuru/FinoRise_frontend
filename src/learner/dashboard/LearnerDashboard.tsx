import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { gamificationService } from "@/api";
import LearnerLayout from "../LearnerLayout";
import s from "./learner-dashboard.module.css";

function LightningIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const recommendedModule = {
  tag: "INVESTING BASICS",
  level: "INTERMEDIATE",
  title: "Understanding Market Volatility",
  duration: "15 mins",
  to: "/learner/modules",
};

export default function LearnerDashboard() {
  const { user } = useAuth();
  const [streakDays, setStreakDays] = useState<number | null>(null);

  useEffect(() => {
    gamificationService.getStreak().then(s => setStreakDays(s.streak_days)).catch(() => {});
  }, []);

  const firstName = user?.full_name?.split(" ")[0] ?? "there";

  return (
    <LearnerLayout>
      {/* Welcome hero */}
      <section className={s.hero}>
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>
            Welcome back, <span>{firstName}</span>
          </h1>
          <p className={s.heroText}>
            You&apos;re currently in the top 15% of users this week. Complete your
            next simulation to maintain your streak!
          </p>
          <div className={s.heroActions}>
            <Link to="/learner/simulations" className={s.btnPrimary}>
              Continue Simulation
            </Link>
            <Link to="/learner/analytics" className={s.btnSecondary}>
              View Progress
            </Link>
          </div>
        </div>
        <div className={s.streakPanel}>
          <span className={s.streakLabel}>Daily Streak</span>
          <div className={s.streakValue}>
            <LightningIcon size={22} />
            <span>{streakDays !== null ? `${streakDays} Days` : "—"}</span>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <div className={s.statsRow}>
        <article className={s.statCard}>
          <div className={s.statHeader}>
            <span className={s.statLabel}>Learning Progress</span>
            <span className={s.statIcon}><TrendUpIcon /></span>
          </div>
          <div className={s.statMain}>
            <span className={s.statNumber}>72%</span>
            <span className={s.statDelta}>+5% from last week</span>
          </div>
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ width: "72%" }} />
          </div>
          <div className={s.statFooter}>
            <span>8 / 12 Modules</span>
            <span>4 lessons left</span>
          </div>
        </article>

        <article className={s.statCard}>
          <div className={s.statHeader}>
            <span className={s.statLabel}>Financial Score</span>
            <span className={s.statIcon}><TargetIcon /></span>
          </div>
          <div className={s.statMain}>
            <span className={s.statNumber}>840</span>
            <span className={s.statBadge}>Excellent</span>
          </div>
          <div className={s.scoreBar}>
            <span className={s.scoreSeg} data-tone="low" />
            <span className={s.scoreSeg} data-tone="mid" />
            <span className={s.scoreSeg} data-tone="high" />
            <span className={s.scoreSeg} data-tone="peak" />
          </div>
          <p className={s.statDesc}>
            Your behavioral score shows high risk awareness in budgeting simulations.
          </p>
        </article>

        <article className={`${s.statCard} ${s.insightCard}`}>
          <div className={s.insightHead}>
            <h2 className={s.insightTitle}>AI Behavioral Insights</h2>
            <p className={s.insightSub}>Based on your last simulation</p>
          </div>
          <blockquote className={s.insightQuote}>
            You showed strong resilience during the market dip scenario. Consider
            diversifying your simulated portfolio to reduce volatility exposure.
          </blockquote>
          <Link to="/learner/ai-coach" className={s.insightBtn}>
            Talk to AI Coach
          </Link>
        </article>
      </div>

      {/* Recommended next */}
      <section className={s.recommended}>
        <div className={s.recommendedHeader}>
          <h2 className={s.recommendedTitle}>Recommended Next</h2>
          <Link to="/learner/modules" className={s.viewAll}>
            View All Modules
          </Link>
        </div>
        <Link to={recommendedModule.to} className={s.moduleCard}>
          <div className={s.moduleThumb}>
            <span className={s.moduleTag}>{recommendedModule.tag}</span>
          </div>
          <div className={s.moduleBody}>
            <span className={s.moduleLevel}>{recommendedModule.level}</span>
            <h3 className={s.moduleName}>{recommendedModule.title}</h3>
            <span className={s.moduleMeta}>
              <ClockIcon /> {recommendedModule.duration}
            </span>
          </div>
        </Link>
      </section>
    </LearnerLayout>
  );
}
