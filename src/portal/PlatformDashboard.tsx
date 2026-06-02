import PortalLayout from "./PortalLayout";
import ThemeToggle from "@/components/ThemeToggle";
import OverviewDashboard from "./OverviewDashboard";
import styles from "./PortalLayout.module.css";

export default function PlatformDashboard() {
  return (
    <PortalLayout
      area="dashboard"
      title="Overview"
      subtitle="Monitor your learning ecosystem performance and marketplace health."
      showHeader={false}
    >
      <header className={styles.header}>
        <div>
          <h1>Overview</h1>
          <p>Monitor your learning ecosystem performance and marketplace health.</p>
        </div>
        <div className={styles.headerActions}>
          <ThemeToggle />
        </div>
      </header>
      <OverviewDashboard />
    </PortalLayout>
  );
}
