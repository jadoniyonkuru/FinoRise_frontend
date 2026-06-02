import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicNavbar from "@/components/PublicNavbar";
import styles from "./login.module.css";

/* ── Icons ── */
function FinoRiseLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
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

function LightningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

type Role = "learner" | "partner" | "admin";

const roles: { id: Role; label: string; description: string }[] = [
  { id: "learner", label: "Learner", description: "Learn & earn XP" },
  { id: "partner", label: "Partner", description: "Track impact" },
  { id: "admin", label: "Admin", description: "Manage platform" },
];

/* ── Data ── */
const avatars = [
  { initials: "A", bg: "#0284c7" },
  { initials: "K", bg: "#38bdf8" },
  { initials: "M", bg: "#0ea5e9" },
  { initials: "J", bg: "#075985" },
];

/* ── Component ── */
export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState<Role>("learner");

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/${role}/dashboard`);
  }

  return (
    <div className={styles.page}>
      <PublicNavbar />

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.container}>

          {/* Hero */}
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>
              Master Your Money,<br />
              <span className={styles.heroAccent}>Level Up</span> Your Life.
            </h1>
            <p className={styles.heroSubtitle}>
              Join 50,000+ users gamifying their way to financial independence
              through interactive simulations and AI insights.
            </p>

            <div className={styles.featureCards}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrap} data-color="indigo">
                  <LightningIcon />
                </div>
                <div>
                  <div className={styles.featureTitle}>Interactive</div>
                  <div className={styles.featureSub}>Simulate real markets.</div>
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrap} data-color="red">
                  <ShieldIcon />
                </div>
                <div>
                  <div className={styles.featureTitle}>Personalized</div>
                  <div className={styles.featureSub}>AI-driven feedback.</div>
                </div>
              </div>
            </div>

            <div className={styles.socialProof}>
              <div className={styles.avatarStack}>
                {avatars.map((a, i) => (
                  <div
                    key={a.initials}
                    className={styles.avatar}
                    style={{
                      background: a.bg,
                      zIndex: avatars.length - i,
                    }}
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <span className={styles.socialProofText}>
                1.2M+ XP earned this week
              </span>
            </div>
          </div>

          {/* Login card */}
          <div className={styles.card}>
            <div className={styles.streakBadge}>
              <LightningIcon />
              Streak Active
            </div>

            <h2 className={styles.cardTitle}>Welcome back</h2>
            <p className={styles.cardSubtitle}>
              Enter your credentials to access your financial growth journey.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="email">Email or Phone Number</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}><MailIcon /></span>
                  <input
                    id="email"
                    type="text"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.fieldLabelRow}>
                  <label htmlFor="password">Password</label>
                  <Link to="/auth/reset-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}><LockIcon /></span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
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

              <fieldset className={styles.roleGroup}>
                <legend>Sign in as</legend>
                <div className={styles.roleGrid}>
                  {roles.map((item) => (
                    <label
                      key={item.id}
                      className={styles.roleOption}
                      data-active={String(role === item.id)}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={item.id}
                        checked={role === item.id}
                        onChange={() => setRole(item.id)}
                      />
                      <span>{item.label}</span>
                      <small>{item.description}</small>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Keep me logged in for 30 days</span>
              </label>

              <button type="submit" className={styles.submitBtn}>
                Log In <span className={styles.arrow}>→</span>
              </button>
            </form>

            <p className={styles.cardFooter}>
              Don't have an account?{" "}
              <Link to="/auth/register">Sign up for free</Link>
            </p>
            <p className={styles.cardFooter}>
              Are you an admin?{" "}
              <Link to="/auth/admin-login">Admin portal →</Link>
            </p>
            <div className={styles.secureNote}>
              <ShieldCheckIcon />
              <span>Secure Financial Grade Encryption</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <FinoRiseLogo />
          <span>© 2024 FinoRise AI. Gamifying financial freedom.</span>
        </div>
        <div className={styles.footerRight}>
          <Link to="/auth/login">Privacy Policy</Link>
          <Link to="/auth/login">Terms of Service</Link>
          <Link to="/auth/login">Help Center</Link>
        </div>
      </footer>
    </div>
  );
}
