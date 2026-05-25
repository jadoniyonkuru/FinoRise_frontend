import { Link, NavLink, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
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
  learner: "Learner",
  admin: "Admin",
  partner: "Partner",
};

export default function DashboardLayout({
  role,
  title,
  subtitle,
  accent,
  children,
  navItems,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.page} data-role={role}>
      <aside className={styles.sidebar} style={{ "--accent": accent } as React.CSSProperties}>
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
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <Link to="/auth/login" className={styles.switchRole}>
            Switch role
          </Link>
        </header>
        {children}
      </main>
    </div>
  );
}
