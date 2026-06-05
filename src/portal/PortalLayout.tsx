import { NavLink, useNavigate } from "react-router";
import type { ReactNode } from "react";
import type { NavItem } from "@/components/DashboardLayout";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import type { PortalArea } from "./portalTabs";
import styles from "./PortalLayout.module.css";

const sectionLabels: Record<PortalArea, string> = {
  dashboard: "Overview",
  admin: "Administration",
  learner: "Learning",
  partner: "Partnerships",
};

type Props = {
  area: PortalArea;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  subNav?: NavItem[];
  showHeader?: boolean;
  topSlot?: ReactNode;
};

export default function PortalLayout({
  area,
  title,
  subtitle,
  children,
  subNav,
  showHeader = true,
  topSlot,
}: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/auth/login", { replace: true });
  }

  function handleSwitchRole() {
    logout();
    navigate("/auth/login", { replace: true });
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>FR</span>
          <strong className={styles.brandName}>FinoRise</strong>
        </div>

        {subNav && subNav.length > 0 && (
          <>
            <div className={styles.sectionLabel}>{sectionLabels[area]}</div>
            <nav className={styles.subNav} aria-label="Section navigation">
              {subNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? styles.subLinkActive : styles.subLink)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </>
        )}

        <button type="button" className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      </aside>

      <div className={styles.mainWrap}>
        {topSlot}

        <div className={styles.main}>
          {showHeader && title && (
            <header className={styles.header}>
              <div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
              </div>
              <div className={styles.headerActions}>
                <ThemeToggle />
                <button type="button" className={styles.switchRole} onClick={handleSwitchRole}>
                  Switch role
                </button>
              </div>
            </header>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
