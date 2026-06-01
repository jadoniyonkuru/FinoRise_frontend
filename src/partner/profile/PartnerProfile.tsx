import { useEffect, useState } from "react";
import { partnerService } from "@/api";
import type { User } from "@/api";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import styles from "@/components/profile.module.css";

export default function PartnerProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [draft, setDraft] = useState({ full_name: "", phone: "" });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    partnerService.getProfile()
      .then(u => {
        setUser(u);
        setDraft({ full_name: u.full_name, phone: u.phone ?? "" });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const updated = await partnerService.updateProfile({ full_name: draft.full_name, phone: draft.phone || undefined });
      setUser(updated);
      setEditing(false);
    } catch {
      setError("Failed to save. Please try again.");
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
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  return (
    <DashboardLayout
      role="partner"
      title="Organization profile"
      subtitle="Manage your partnership details"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div className={styles.page} style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading profile…</p>
        ) : (
          <>
            <div className={styles.card}>
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>{initials}</div>
                <div className={styles.profileInfo}>
                  <p className={styles.profileName}>{user?.full_name}</p>
                  <p className={styles.profileEmail}>{user?.email}</p>
                  <span className={styles.roleBadge}>Partner</span>
                </div>
                {!editing && (
                  <button type="button" className={styles.editBtn} onClick={() => setEditing(true)}>
                    Edit profile
                  </button>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Partnership details</h2>
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
