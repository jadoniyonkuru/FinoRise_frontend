import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { authService } from "@/api";
import type { UserRole } from "@/api/types";
import { getDashboardPath, roleLabel } from "@/lib/roles";
import { useAuth } from "@/context/AuthContext";
import AuthScreenLayout, { authStyles } from "@/auth/shared/AuthScreenLayout";

export default function AcceptInvitePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { refreshUser } = useAuth();

  const [inviteInfo, setInviteInfo] = useState<{
    email: string;
    full_name: string;
    role: UserRole;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Invalid or missing invite link.");
      return;
    }
    authService
      .validateInviteToken(token)
      .then(setInviteInfo)
      .catch(() => setError("This invite link is invalid or has expired."))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setError("");
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const { user } = await authService.acceptInvite({ token, password });
      await refreshUser();
      navigate(getDashboardPath(user.role), { replace: true });
    } catch {
      setError("Could not activate your account. The link may have expired.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <AuthScreenLayout title="Activate account">
        <p className={authStyles.error} style={{ textAlign: "center" }}>
          Verifying invite…
        </p>
      </AuthScreenLayout>
    );
  }

  if (!inviteInfo) {
    return (
      <AuthScreenLayout title="Activate account">
        <p className={authStyles.error}>{error || "Invalid invite link."}</p>
        <p className={authStyles.signupPrompt}>
          <Link to="/auth/login">Back to sign in</Link>
        </p>
      </AuthScreenLayout>
    );
  }

  return (
    <AuthScreenLayout title="Create your password">
      <p style={{ margin: "0 0 1.25rem", color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.5 }}>
        Welcome, <strong>{inviteInfo.full_name}</strong>. Set a password to activate your{" "}
        <strong>{roleLabel(inviteInfo.role)}</strong> account ({inviteInfo.email}).
      </p>

      <form className={authStyles.form} onSubmit={handleSubmit}>
        <input
          className={authStyles.input}
          id="password"
          name="password"
          type="password"
          placeholder="New password"
          autoComplete="new-password"
          required
          minLength={6}
        />
        <input
          className={authStyles.input}
          id="confirm"
          name="confirm"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          required
          minLength={6}
        />

        <button type="submit" className={authStyles.submitBtn} disabled={submitting}>
          {submitting ? "Activating…" : "Activate account"}
        </button>

        {error && <p className={authStyles.error}>{error}</p>}
      </form>

      <p className={authStyles.disclaimer}>
        Already have a password? <Link to="/auth/login">Sign in</Link>
      </p>
    </AuthScreenLayout>
  );
}
