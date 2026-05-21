import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import styles from "./AuthLayout.module.css";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.logo}>FinoRise</span>
          <span className={styles.tag}>Auth (shared)</span>
        </div>
        <h1>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
        <div className={styles.roles}>
          <span>Demo dashboards:</span>
          <Link to="/learner/dashboard">Learner</Link>
          <Link to="/admin/dashboard">Admin</Link>
          <Link to="/partner/dashboard">Partner</Link>
        </div>
      </div>
    </div>
  );
}
