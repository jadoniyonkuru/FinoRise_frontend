import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import styles from "./register.module.css";

function FinoRiseLogo() {
  return (
    <svg
      className={styles.logoMark}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="15" fill="#19A7E0" />
      <path
        d="M35.34 12.96 18.1 34.03h13.56l-3.84 16.99 18.08-22.85H32.64l2.7-15.21Z"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Role = "learner" | "admin" | "partner";

const roles: { id: Role; label: string; description: string }[] = [
  { id: "learner", label: "Learner", description: "Learn, simulate, earn XP" },
  { id: "admin", label: "Admin", description: "Manage users and content" },
  { id: "partner", label: "Partner", description: "Track programs and impact" },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState<Role>("learner");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const full_name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    setSubmitting(true);
    try {
      await register({ full_name, email, password });
      navigate("/account/login");
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell} aria-labelledby="register-title">
        <div className={styles.brand}>
          <FinoRiseLogo />
          <span className={styles.brandName}>FinoRise</span>
        </div>

        <header className={styles.hero}>
          <h1 id="register-title">Create an account</h1>
          <p>Join the next generation of financial intelligence</p>
        </header>

        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.cardHeader}>
            <h2>Sign Up</h2>
            <p>Get started with your financial journey today</p>
          </div>

          <fieldset className={styles.roleGroup}>
            <legend>Account type</legend>
            <div className={styles.roleGrid}>
              {roles.map((item) => (
                <label key={item.id} className={styles.roleOption} data-active={String(role === item.id)}>
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

          <div className={styles.field}>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" placeholder="Alex Johnson" required />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="name@example.com" required />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: "0" }}>{error}</p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "Creating account…" : "Create Account"}
          </button>

          <p className={styles.footer}>
            Already have an account? <Link to="/account/login">Log in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
