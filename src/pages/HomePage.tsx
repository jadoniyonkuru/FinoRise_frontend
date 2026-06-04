import { Link } from "react-router-dom";
import PublicNavbar from "@/components/PublicNavbar";
import s from "./home.module.css";

function FinoRiseLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#0ea5e9" />
      <g transform="translate(8,8)">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          fill="white" />
      </g>
    </svg>
  );
}

const features = [
  { icon: "⚡", title: "Simulations", desc: "Practice real financial decisions risk-free" },
  { icon: "🤖", title: "AI Coach", desc: "Personalized advice powered by AI" },
  { icon: "🏆", title: "Earn Rewards", desc: "Gain XP and redeem real rewards" },
];

export default function HomePage() {
  return (
    <div className={s.page}>
      <PublicNavbar />

      <main className={s.main}>
        <div className={s.hero}>
          <FinoRiseLogo />
          <h1 className={s.title}>
            Master Your Money,<br />
            <span className={s.accent}>Level Up</span> Your Life.
          </h1>
          <p className={s.subtitle}>
            Join thousands of learners gamifying their way to financial independence
            through AI-powered simulations and real rewards.
          </p>

          <div className={s.features}>
            {features.map((f) => (
              <div key={f.title} className={s.featureCard}>
                <span className={s.featureIcon}>{f.icon}</span>
                <div>
                  <div className={s.featureTitle}>{f.title}</div>
                  <div className={s.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={s.ctas}>
            <Link to="/account/login" className={s.btnPrimary}>Log In</Link>
            <Link to="/account/register" className={s.btnSecondary}>Sign Up Free</Link>
          </div>

          <p className={s.trust}>
            <span className={s.dot} /> Secure · No credit card needed · Free to start
          </p>
        </div>
      </main>

      <footer className={s.footer}>
        <span>© 2024 FinoRise AI. Gamifying financial freedom.</span>
        <div className={s.footerLinks}>
          <Link to="/account/login">Privacy</Link>
          <Link to="/account/login">Terms</Link>
          <Link to="/account/login">Help</Link>
        </div>
      </footer>
    </div>
  );
}
