import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PublicNavbar from "@/components/PublicNavbar";
import styles from "./reset-password.module.css";

/* ── Icons ── */
function FinoRiseLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
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

function ShieldCheckIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
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

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

/* ── Component ── */
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  function handleSMS() {
    setSent(true);
  }

  return (
    <div className={styles.page}>
      <PublicNavbar />

      <main className={styles.main}>
        <div className={styles.card}>
          {sent ? (
            /* ── Success state ── */
            <>
              <div className={styles.successWrap}>
                <div className={styles.successCircle}>
                  <CheckCircleIcon />
                </div>
                <h2 className={styles.successTitle}>Link Sent!</h2>
                <p className={styles.successText}>
                  We've sent a reset link to your email or phone number.
                  Check your inbox and follow the instructions.
                </p>
                <Link to="/auth/login" className={styles.backBtn}>
                  <ArrowLeftIcon />
                  Back to Login
                </Link>
              </div>
              <div className={styles.cardFooter}>
                <p className={styles.createLink}>
                  New to FinoRise?{" "}
                  <Link to="/auth/register">Create an account</Link>
                </p>
              </div>
            </>
          ) : (
            /* ── Form state ── */
            <>
              <div className={styles.cardBody}>
                {/* Icon stack */}
                <div className={styles.iconStack}>
                  <div className={styles.logoMark}>
                    <FinoRiseLogo />
                  </div>
                  <div className={styles.shieldWrap}>
                    <ShieldCheckIcon size={26} />
                  </div>
                </div>

                <h1 className={styles.title}>Forgot password?</h1>
                <p className={styles.subtitle}>
                  Enter your registered email or phone number and we'll send
                  you a link to reset your password.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label htmlFor="contact">Email or Phone Number</label>
                    <div className={styles.inputWrap}>
                      <span className={styles.inputIcon}><MailIcon /></span>
                      <input
                        id="contact"
                        type="text"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Send Reset Link <span className={styles.arrow}>›</span>
                  </button>

                  <div className={styles.orDivider}>
                    <span className={styles.orText}>or</span>
                  </div>

                  <button
                    type="button"
                    className={styles.smsBtn}
                    onClick={handleSMS}
                  >
                    <PhoneIcon />
                    Reset via SMS
                  </button>
                </form>
              </div>

              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.backLink}
                  onClick={() => navigate("/auth/login")}
                >
                  <ArrowLeftIcon />
                  Back to Login
                </button>
                <p className={styles.createLink}>
                  New to FinoRise?{" "}
                  <Link to="/auth/register">Create an account</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
