import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import formStyles from "@/components/auth-form.module.css";

const dashboardByRole: Record<string, string> = {
  learner: "/learner/dashboard",
  admin: "/admin/dashboard",
  partner: "/partner/dashboard",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("learner");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(dashboardByRole[role] ?? "/learner/dashboard");
  }

  return (
    <AuthLayout
      title="Login"
      subtitle="Shared auth for Learner, Admin, and Partner."
    >
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <div className={formStyles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" required />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="role">Sign in as</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="learner">Learner</option>
            <option value="admin">Admin</option>
            <option value="partner">Partner</option>
          </select>
        </div>
        <button type="submit" className={formStyles.submit}>
          Sign in
        </button>
      </form>
      <p className={formStyles.footer}>
        <Link to="/auth/reset-password">Forgot password?</Link>
        {" · "}
        <Link to="/auth/register">Create account</Link>
      </p>
    </AuthLayout>
  );
}
