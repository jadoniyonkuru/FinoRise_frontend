import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/api";
import LearnerLayout from "../LearnerLayout";
import styles from "./profile.module.css";

export default function LearnerProfile() {
  const { user, refreshUser } = useAuth();
  const [draft, setDraft] = useState({ full_name: "", phone: "" });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setDraft({ full_name: user.full_name, phone: user.phone ?? "" });
    }
  }, [user]);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      await authService.updateProfile({ full_name: draft.full_name, phone: draft.phone || undefined });
      await refreshUser();
      setEditing(false);
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (user) setDraft({ full_name: user.full_name, phone: user.phone ?? "" });
    setEditing(false);
    setError("");
  }

  const initials = (user?.full_name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <LearnerLayout title="My profile" subtitle="Manage your personal information">
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{user?.full_name}</p>
              <p className={styles.profileEmail}>{user?.email}</p>
              <span className={styles.roleBadge}>Learner</span>
            </div>
            {!editing && (
              <button type="button" className={styles.editBtn} onClick={() => setEditing(true)}>
                Edit profile
              </button>
            )}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Profile details</h2>
          <div className={styles.fields}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Full name</span>
              {editing ? (
                <input className={styles.fieldInput} value={draft.full_name} onChange={e => setDraft({ ...draft, full_name: e.target.value })} />
              ) : (
                <span className={styles.fieldValue}>{user?.full_name}</span>
              )}
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <span className={styles.fieldValue}>{user?.email}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Phone</span>
              {editing ? (
                <input className={styles.fieldInput} value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} placeholder="+250..." />
              ) : (
                <span className={styles.fieldValue}>{user?.phone ?? "—"}</span>
              )}
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Level</span>
              <span className={styles.fieldValue}>{user?.level ?? "—"}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Total XP</span>
              <span className={styles.fieldValue}>{user?.xp_total?.toLocaleString() ?? "0"} XP</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Streak</span>
              <span className={styles.fieldValue}>{user?.streak_days ?? 0} days</span>
            </div>
          </div>

          {error && <p style={{ color: "#ef4444", fontSize: "0.85rem" }}>{error}</p>}

          {editing && (
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
              <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </LearnerLayout>
  );
}
