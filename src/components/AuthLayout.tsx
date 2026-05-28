import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./AuthLayout.module.css";

type Props = {
  heading: string;
  subtitle: string;
  cardTitle: string;
  cardSubtitle: string;
  children: ReactNode;
};

function FinoRiseLogo() {
  return (
    <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0ea5e9" />
      <g transform="translate(8, 8)">
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

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function AuthLayout({ heading, subtitle, cardTitle, cardSubtitle, children }: Props) {
  const [dark, setDark] = useState(false);

  return (
    <div className={styles.page} data-theme={dark ? "dark" : "light"}>
      <button
        className={styles.themeToggle}
        onClick={() => setDark(!dark)}
        aria-label="Toggle theme"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className={styles.hero}>
        <div className={styles.brand}>
          <FinoRiseLogo />
          <span className={styles.brandName}>FinoRise</span>
        </div>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{cardTitle}</h2>
          <p className={styles.cardSubtitle}>{cardSubtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
