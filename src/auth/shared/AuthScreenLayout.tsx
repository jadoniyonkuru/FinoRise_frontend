import type { ReactNode } from "react";
import LandingPage from "@/landing/LandingPage";
import styles from "./auth-screen.module.css";

type AuthScreenLayoutProps = {
  title: string;
  children: ReactNode;
};

/** Login overlay: dimmed landing page + centered sign-in box (no extra nav buttons). */
export default function AuthScreenLayout({ title, children }: AuthScreenLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.landingBackdrop} aria-hidden>
        <LandingPage asBackdrop />
      </div>
      <div className={styles.overlay} aria-hidden />

      <main className={styles.main}>
        <div className={styles.formBox}>
          <h1 className={styles.formTitle}>{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}

export { styles as authStyles };
