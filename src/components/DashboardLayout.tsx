import { Link, NavLink, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./DashboardLayout.module.css";

export type Role = "learner" | "admin" | "partner";

export type NavItem = {
  label: string;
  path: string;
};

type Props = {
  role: Role;
  title: string;
  subtitle: string;
  accent: string;
  children: ReactNode;
  navItems?: NavItem[];
};

const roleLabels: Record<Role, string> = {
  learner: "Learner Portal",
  admin:   "Admin Portal",
  partner: "Partner Portal",
};

function IconSun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function DashboardLayout({
  role,
  title,
  subtitle,
  accent,
  children,
  navItems,
}: Props) {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  return (
    <div
      className={styles.page}
      data-role={role}
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* ── Dark sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.logo}>FinoRise</span>
          <span className={styles.roleBadge}>{roleLabels[role]}</span>
        </div>

        <nav className={styles.nav}>
          {navItems ? (
            navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? styles.navActive : styles.navLink
                }
              >
                {item.label}
              </NavLink>
            ))
          ) : (
            <>
              <span className={styles.navActive}>Dashboard</span>
              <span className={styles.navItemMuted}>Coming soon</span>
            </>
          )}
        </nav>

        <button
          type="button"
          className={styles.logout}
          onClick={() => navigate("/auth/login")}
        >
          Log out
        </button>
      </aside>

      {/* ── Main column ── */}
      <main className={styles.main}>
        {/* Sticky topbar */}
        <header className={styles.header}>
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className={styles.headerRight}>
            <button
              type="button"
              className={styles.themeBtn}
              onClick={toggle}
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>
            <Link to="/auth/login" className={styles.portalLabel}>
              Switch role
            </Link>
          </div>
        </header>

        {/* Page content */}
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
