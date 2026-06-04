import { useEffect, useState } from "react";
import { Link } from "react-router";
import FinoRiseLogo from "@/components/FinoRiseLogo";
import styles from "./landing.module.css";
import { FEATURES, IMPACT_POINTS, IMPACT_STATS, LANDING_PORTALS, PROGRAMS } from "./landing-data";
import type { PortalCard } from "./landing-data";

function FeatureIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    book: "📚",
    sim: "🎯",
    reward: "🏆",
    ai: "✨",
    admin: "⚙️",
    partner: "🤝",
  };
  return <span className={styles.featureIcon}>{icons[type] ?? "•"}</span>;
}

function PortalMock({ portal }: { portal: PortalCard["id"] }) {
  const mocks: Record<PortalCard["id"], { stats: { label: string; value: string }[]; pct: number }> = {
    learner: {
      stats: [
        { label: "XP earned", value: "1,240" },
        { label: "Modules", value: "6/8" },
        { label: "Streak", value: "12d" },
      ],
      pct: 72,
    },
    admin: {
      stats: [
        { label: "Learners", value: "1,353" },
        { label: "Live sims", value: "24" },
        { label: "Completion", value: "87%" },
      ],
      pct: 87,
    },
    partner: {
      stats: [
        { label: "Programs", value: "18" },
        { label: "Reached", value: "4.2k" },
        { label: "Categories", value: "5" },
      ],
      pct: 64,
    },
  };
  const m = mocks[portal];
  return (
    <div className={styles.portalMock}>
      <div className={styles.mockRow}>
        {m.stats.map((s) => (
          <div key={s.label} className={styles.mockStat}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.mockBar}>
        <div className={styles.mockBarFill} style={{ width: `${m.pct}%` }} />
      </div>
    </div>
  );
}

type LandingPageProps = {
  /** Renders hero only, non-interactive — for auth modal background */
  asBackdrop?: boolean;
};

export default function LandingPage({ asBackdrop = false }: LandingPageProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activePortal, setActivePortal] = useState(0);

  useEffect(() => {
    if (asBackdrop) return;
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [asBackdrop]);

  useEffect(() => {
    const t = setInterval(() => {
      setActivePortal((i) => (i + 1) % LANDING_PORTALS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const rootClass = asBackdrop ? `${styles.page} ${styles.pageBackdrop}` : styles.page;

  return (
    <div className={rootClass}>
      <header className={`${styles.nav} ${navScrolled ? styles.navScrolled : ""}`}>
        <Link to="/">
          <FinoRiseLogo size={42} showWordmark variant="light" />
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#programs">Programs</a>
          </li>
          <li>
            <a href="#impact">Impact</a>
          </li>
        </ul>
        <div className={styles.navActions}>
          <Link to="/auth/login" className={styles.btnOutline}>
            Login
          </Link>
          <Link to="/auth/register" className={styles.btnSolid}>
            Get Started
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>One Platform, Two Portals</h1>
          <p className={styles.heroSubtitle}>
            FinoRise brings together learners and partners in a single intelligent financial literacy
            platform—modules, simulations, rewards, and real-time impact for modern education everywhere.
          </p>
          <Link to="/auth/register" className={styles.heroCta}>
            Get Started
          </Link>
        </div>

        <div className={styles.portalStack}>
          {LANDING_PORTALS.map((portal, idx) => (
            <article
              key={portal.id}
              className={styles.portalCard}
              data-active={String(idx === activePortal)}
              onClick={() => setActivePortal(idx)}
              onKeyDown={(e) => e.key === "Enter" && setActivePortal(idx)}
              role="button"
              tabIndex={0}
              aria-label={`${portal.title} portal preview`}
            >
              <h2 className={styles.portalCardTitle}>{portal.title}</h2>
              <p className={styles.portalCardSub}>{portal.subtitle}</p>
              <Link to={portal.href} className={styles.portalCardLink} onClick={(e) => e.stopPropagation()}>
                {portal.cta} ↓
              </Link>
              <PortalMock portal={portal.id} />
            </article>
          ))}
        </div>
      </section>

      {asBackdrop ? null : (
        <>
      <section id="features" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Features</span>
          <h2 className={styles.sectionTitle}>Everything your financial literacy program needs</h2>
          <p className={styles.sectionDesc}>
            From interactive lessons and branching simulations to admin tooling and partner reporting—FinoRise
            is built for end-to-end learning and measurement.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <article key={f.title} className={styles.featureCard}>
              <FeatureIcon type={f.icon} />
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="programs" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Programs</span>
          <h2 className={styles.sectionTitle}>Learning paths that match real-life money decisions</h2>
          <p className={styles.sectionDesc}>
            Publish structured programs across core finance topics—or sponsor custom cohorts as a partner.
            Each path includes lessons, quizzes, XP rewards, and optional simulations.
          </p>
        </div>
        <div className={styles.programGrid}>
          {PROGRAMS.map((p) => (
            <article key={p.title} className={styles.programCard}>
              <div className={styles.programMeta}>
                <span className={styles.programTag}>{p.category}</span>
                <span className={styles.programTag}>{p.difficulty}</span>
                <span className={styles.programXp}>{p.xp}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Impact</span>
          <h2 className={styles.sectionTitle}>Measure growth—for learners, admins, and partners</h2>
          <p className={styles.sectionDesc}>
            Track completions, simulation scores, XP, category coverage, and cohort reach. FinoRise turns
            financial education into outcomes you can report on.
          </p>
        </div>
        <div className={styles.impactGrid}>
          {IMPACT_STATS.map((s) => (
            <div key={s.label} className={styles.impactStat}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <small>{s.hint}</small>
            </div>
          ))}
        </div>
        <div className={styles.impactCards}>
          {IMPACT_POINTS.map((p) => (
            <article key={p.title} className={styles.impactCard}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.ctaBand}>
        <h2>Ready to rise financially?</h2>
        <p>Join as a learner or fund programs as a partner—all on one platform.</p>
        <div className={styles.ctaRow}>
          <Link to="/auth/register" className={styles.btnSolid}>
            Create learner account
          </Link>
          <Link to="/auth/login" className={styles.btnOutline}>
            Partner login
          </Link>
        </div>
      </div>

      <footer className={styles.footer}>
        <FinoRiseLogo size={36} showWordmark variant="dark" />
        <div className={styles.footerLinks}>
          <a href="#features">Features</a>
          <a href="#programs">Programs</a>
          <a href="#impact">Impact</a>
          <Link to="/auth/login">Login</Link>
        </div>
        <span className={styles.footerCopy}>© {new Date().getFullYear()} FinoRise. Financial literacy platform.</span>
      </footer>
        </>
      )}
    </div>
  );
}
