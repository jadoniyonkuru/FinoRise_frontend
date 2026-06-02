import { useState } from "react";
import LearnerLayout from "../LearnerLayout";
import { authService } from "@/api";
import styles from "./settings.module.css";

const notificationSettings = [
  { id: "email", title: "Email notifications", description: "Receive progress updates, reminders, and reward alerts.", defaultOn: true },
  { id: "weekly", title: "Weekly learning summary", description: "Get a weekly snapshot of completed modules and earned XP.", defaultOn: true },
  { id: "coach", title: "AI coach nudges", description: "Allow personalized tips based on your recent activity.", defaultOn: false },
];

export default function LearnerSettingsPage() {
  const [enabled, setEnabled] = useState(
    Object.fromEntries(notificationSettings.map((item) => [item.id, item.defaultOn]))
  );
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwStatus, setPwStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [pwError, setPwError] = useState("");

  function toggle(id: string) {
    setEnabled((cur) => ({ ...cur, [id]: !cur[id] }));
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }
    setPwError("");
    setPwStatus("saving");
    try {
      await authService.changePassword({ current_password: currentPassword, new_password: newPassword });
      setPwStatus("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => { setPwStatus("idle"); setShowPasswordForm(false); }, 2000);
    } catch {
      setPwError("Current password is incorrect.");
      setPwStatus("error");
    }
  }

  return (
    <LearnerLayout title="Settings" subtitle="Manage your account preferences">
      <div className={styles.page}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Account settings</h2>
              <p>Control how FinoRise supports your learning journey.</p>
            </div>
            <button type="button" className={styles.saveBtn}>
              Save changes
            </button>
          </div>

          <div className={styles.settingList}>
            {notificationSettings.map((item) => {
              const active = enabled[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  className={styles.settingRow}
                  onClick={() => toggle(item.id)}
                  aria-pressed={active}
                >
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span className={styles.switch} data-active={String(active)}>
                    <span />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.grid}>
          <div className={styles.card}>
            <h2>Security</h2>
            <p className={styles.muted}>Change your account password.</p>

            {!showPasswordForm ? (
              <button
                type="button"
                className={styles.outlineBtn}
                onClick={() => setShowPasswordForm(true)}
              >
                Change password
              </button>
            ) : (
              <form onSubmit={handlePasswordChange} style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "0.875rem" }}
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "0.875rem" }}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "0.875rem" }}
                />
                {pwError && <p style={{ color: "#ef4444", fontSize: "0.8rem", margin: 0 }}>{pwError}</p>}
                {pwStatus === "success" && <p style={{ color: "#16a34a", fontSize: "0.8rem", margin: 0 }}>Password changed successfully!</p>}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                  <button type="submit" className={styles.saveBtn} disabled={pwStatus === "saving"}>
                    {pwStatus === "saving" ? "Saving…" : "Update password"}
                  </button>
                  <button type="button" className={styles.outlineBtn} onClick={() => { setShowPasswordForm(false); setPwError(""); }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className={styles.card}>
            <h2>Privacy</h2>
            <p className={styles.muted}>Your learning profile is visible only to you.</p>
            <button type="button" className={styles.outlineBtn}>
              Manage data
            </button>
          </div>
        </section>
      </div>
    </LearnerLayout>
  );
}
