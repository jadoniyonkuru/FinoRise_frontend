import { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import formStyles from "@/components/auth-form.module.css";

export default function ResetPasswordPage() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email and we will send reset instructions."
    >
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <div className={formStyles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" required />
        </div>
        <button type="submit" className={formStyles.submit}>
          Send reset link
        </button>
      </form>
      <p className={formStyles.footer}>
        <Link to="/auth/login">Back to login</Link>
      </p>
    </AuthLayout>
  );
}
