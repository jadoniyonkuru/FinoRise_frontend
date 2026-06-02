import type { ReactNode } from "react";
import PortalLayout from "@/portal/PortalLayout";
import ThemeToggle from "@/components/ThemeToggle";
import { learnerNavItems } from "./learnerNav";
import styles from "./LearnerLayout.module.css";

type Props = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

function LightningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}

export default function LearnerLayout({ children, title, subtitle }: Props) {
  const topSlot = (
    <header className={styles.topbar}>
      <label className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden>
          ⌕
        </span>
        <input
          type="search"
          placeholder="Search modules, simulations..."
          className={styles.searchInput}
          aria-label="Search modules and simulations"
        />
      </label>
      <ThemeToggle />
      <div className={styles.xpBadge}>
        <LightningIcon />
        <span>1,240 XP</span>
      </div>
    </header>
  );

  return (
    <PortalLayout
      area="learner"
      title={title}
      subtitle={subtitle}
      subNav={learnerNavItems}
      showHeader={Boolean(title)}
      topSlot={topSlot}
    >
      {children}
    </PortalLayout>
  );
}
