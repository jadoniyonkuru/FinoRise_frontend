import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./admin-login.module.css";

/* ── Icons ── */
function FinoRiseLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#0ea5e9" />
      <g transform="translate(8,8)">
        <path
          fillRule="evenodd" clipRule="evenodd"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

/* ── Component ── */
export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    navigate("/admin/dashboard");
  }

  return (
    <div className={styles.page}>
      {/* ── Left panel ── */}
      <div className={styles.left}>
        <div className={styles.leftBg} />
        <div className={styles.leftGrid} />
        <div className={styles.leftContent}>
          <div className={styles.brand}>
            <FinoRiseLogo />
            <span className={styles.brandName}>FinoRise</span>
            <span className={styles.brandBadge}>Admin Portal</span>
          </div>

          <p className={styles.heroLabel}>Secure Administration</p>
          <h1 className={styles.heroTitle}>
            Platform<br />
            <span>Control Center</span>
          </h1>
          <p className={styles.heroDesc}>
            Manage learners, modules, partners, and platform analytics from a
            single unified dashboard built for FinoRise administrators.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <div className={styles.statVal}>1,284</div>
              <div className={styles.statLbl}>Total learners</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statVal}>18</div>
              <div className={styles.statLbl}>Active modules</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statVal}>12</div>
              <div className={styles.statLbl}>Partners</div>
            </div>
          </div>

          <div className={styles.featureList}>
            <div className={styles.feature}>
              <span className={styles.featureDot} />
              User management &amp; role assignments
            </div>
            <div className={styles.feature}>
              <span className={styles.featureDot} />
              Module &amp; simulation configuration
            </div>
            <div className={styles.feature}>
              <span className={styles.featureDot} />
              Platform-wide analytics &amp; reporting
            </div>
            <div className={styles.feature}>
              <span className={styles.featureDot} />
              Rewards &amp; partner management
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.shieldWrap}>
            <ShieldIcon />
          </div>

          <h2 className={styles.cardTitle}>Admin Sign In</h2>
          <p className={styles.cardSubtitle}>
            Restricted access — authorized personnel only.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.errorMsg}>{error}</div>}

            <div className={styles.field}>
              <label htmlFor="email">Admin Email</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><MailIcon /></span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@finorise.com"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldRow}>
                <label htmlFor="password">Password</label>
                <Link to="/auth/reset-password" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><LockIcon /></span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className={styles.mfaNotice}>
              <KeyIcon />
              Two-factor authentication may be required for admin accounts.
            </div>

            <button type="submit" className={styles.submitBtn}>
              Access Admin Portal <ArrowRightIcon />
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>Not an admin?</span>
              <span className={styles.dividerLine} />
            </div>

            <Link to="/auth/login" className={styles.backLink}>
              <ChevronLeftIcon />
              Back to learner / partner login
            </Link>
          </form>

          <div className={styles.secureNote}>
            <ShieldIcon />
            <span>256-bit encrypted · Session monitored</span>
          </div>
        </div>
      </div>
    </div>
  );
}
