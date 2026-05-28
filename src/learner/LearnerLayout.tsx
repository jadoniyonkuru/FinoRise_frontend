import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./LearnerLayout.module.css";

type Props = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

function FinoRiseLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect width="40" height="40" rx="10" fill="#0ea5e9" />
      <g transform="translate(8,8)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconGift() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconLogOut() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}

const navItems = [
  { label: "Dashboard", to: "/learner/dashboard", icon: <IconDashboard /> },
  { label: "Learning Hub", to: "/learner/modules", icon: <IconBook /> },
  { label: "Simulation Center", to: "/learner/simulations", icon: <IconPlay /> },
  { label: "AI Coach", to: "/learner/ai-coach", icon: <IconChat /> },
  { label: "Rewards", to: "/learner/rewards", icon: <IconGift /> },
  { label: "Analytics", to: "/learner/analytics", icon: <IconBarChart /> },
];

export default function LearnerLayout({ children, title, subtitle }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.shell}>
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <NavLink to="/learner/dashboard" className={styles.brand}>
            <FinoRiseLogo />
            <span>FinoRise</span>
          </NavLink>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/learner/dashboard"}
                className={({ isActive }) =>
                  `${styles.sideLink} ${isActive ? styles.sideLinkActive : ""}`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => navigate("/auth/login")}
          >
            <IconLogOut />
            Log out
          </button>
        </aside>

        <div className={styles.contentWrap}>
          <header className={styles.topbar}>
            <label className={styles.searchWrap}>
              <span className={styles.searchIcon} aria-hidden>⌕</span>
              <input
                type="search"
                placeholder="Search modules, simulations..."
                className={styles.searchInput}
                aria-label="Search modules and simulations"
              />
            </label>
            <div className={styles.xpBadge}>
              <LightningIcon />
              <span>1,240 XP</span>
            </div>
          </header>

          <main className={styles.main}>
            {title && (
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>{title}</h1>
                {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
