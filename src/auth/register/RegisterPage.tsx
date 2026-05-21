import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import formStyles from "@/components/auth-form.module.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("learner");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate("/auth/login");
  }

  return (
    <AuthLayout
      title="Register"
      subtitle="Create an account for any role on FinoRise."
    >
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <div className={formStyles.field}>
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" placeholder="Your name" required />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" required />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="role">Account type</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="learner">Learner</option>
            <option value="admin">Admin</option>
            <option value="partner">Partner</option>
          </select>
        </div>
        <button type="submit" className={formStyles.submit}>
          Create account
        </button>
      </form>
      <p className={formStyles.footer}>
        Already have an account? <Link to="/auth/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
