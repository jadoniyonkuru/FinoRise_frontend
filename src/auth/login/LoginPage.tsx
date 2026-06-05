import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { getDashboardPath } from "@/lib/roles";
import AuthScreenLayout, { authStyles } from "@/auth/shared/AuthScreenLayout";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    setSubmitting(true);
    try {
      const user = await login(email, password);
      navigate(getDashboardPath(user.role), { replace: true });
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthScreenLayout title="Sign In">
      <form className={authStyles.form} onSubmit={handleSubmit}>
        <input
          className={authStyles.input}
          id="email"
          name="email"
          type="email"
          placeholder="Email or phone number"
          autoComplete="email"
          required
        />
        <input
          className={authStyles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />

        <button type="submit" className={authStyles.submitBtn} disabled={submitting}>
          {submitting ? "Signing in…" : "Sign In"}
        </button>

        <div className={authStyles.formRow}>
          <label className={authStyles.remember}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <Link to="/auth/reset-password" className={authStyles.helpLink}>
            Need help?
          </Link>
        </div>

        {error && <p className={authStyles.error}>{error}</p>}
      </form>

      <p className={authStyles.signupPrompt}>
        New to FinoRise? <Link to="/auth/register">Sign up now.</Link>
      </p>

      <p className={authStyles.disclaimer}>
        This page is protected to keep your account secure.{" "}
        <Link to="/">Learn more</Link>
      </p>
    </AuthScreenLayout>
  );
}
