import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/api";
import { resolveAvatarUrl, setStoredAvatar } from "@/lib/profileAvatar";
import LearnerLayout from "../LearnerLayout";
import styles from "./profile.module.css";

type ProfileDraft = {
  full_name: string;
  phone: string;
};

function initialsFrom(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function LearnerProfile() {
  const { user, refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [draft, setDraft] = useState<ProfileDraft>({ full_name: "", phone: "" });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    if (!user) return;
    setDraft({ full_name: user.full_name, phone: user.phone ?? "" });
    setAvatarPreview(resolveAvatarUrl(user.id, user.avatar_url));
    setAvatarFile(null);
    setRemoveAvatar(false);
  }, [user]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function onAvatarSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, or WebP).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be smaller than 2 MB.");
      return;
    }
    setError("");
    setAvatarFile(file);
    setRemoveAvatar(false);
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleRemovePhoto() {
    setAvatarPreview(null);
    setAvatarFile(null);
    setRemoveAvatar(true);
  }

  function handleCancel() {
    if (!user) return;
    setDraft({ full_name: user.full_name, phone: user.phone ?? "" });
    setAvatarPreview(resolveAvatarUrl(user.id, user.avatar_url));
    setAvatarFile(null);
    setRemoveAvatar(false);
    setEditing(false);
    setError("");
    setSuccess("");
  }

  async function handleSave() {
    if (!user) return;
    if (!draft.full_name.trim()) {
      setError("Full name is required.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (avatarFile) {
        try {
          await authService.uploadAvatar(avatarFile);
        } catch {
          const dataUrl = avatarPreview;
          if (dataUrl) {
            setStoredAvatar(user.id, dataUrl);
            try {
              await authService.updateProfile({ avatar_url: dataUrl });
            } catch {
              /* keep local preview only */
            }
          }
        }
      } else if (removeAvatar) {
        setStoredAvatar(user.id, null);
        try {
          await authService.updateProfile({ avatar_url: null });
        } catch {
          /* local remove still applies */
        }
      }

      await authService.updateProfile({
        full_name: draft.full_name.trim(),
        phone: draft.phone.trim() || undefined,
      });

      if (avatarPreview && !removeAvatar) {
        setStoredAvatar(user.id, avatarPreview);
      }

      await refreshUser();
      setEditing(false);
      setAvatarFile(null);
      setRemoveAvatar(false);
      setSuccess("Profile updated successfully.");
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordForm.current || !passwordForm.next) {
      setPasswordError("Enter your current and new password.");
      return;
    }
    if (passwordForm.next.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setChangingPassword(true);
    try {
      await authService.changePassword({
        current_password: passwordForm.current,
        new_password: passwordForm.next,
      });
      setPasswordForm({ current: "", next: "", confirm: "" });
      setPasswordSuccess("Password updated successfully.");
    } catch {
      setPasswordError("Could not change password. Check your current password.");
    } finally {
      setChangingPassword(false);
    }
  }

  const displayName = user?.full_name ?? "Learner";
  const initials = initialsFrom(displayName || "?");
  const avatarSrc = avatarPreview;

  return (
    <LearnerLayout title="My profile" subtitle="Manage your photo and personal information">
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarBlock}>
              <div className={styles.avatarWrap}>
                {avatarSrc ? (
                  <img src={avatarSrc} alt="" className={styles.avatarImg} />
                ) : (
                  <div className={styles.avatar}>{initials}</div>
                )}
                {editing && (
                  <button
                    type="button"
                    className={styles.avatarEditBtn}
                    onClick={openFilePicker}
                    aria-label="Change profile photo"
                  >
                    📷
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className={styles.hiddenInput}
                onChange={onAvatarSelected}
              />
              {editing && (
                <div className={styles.avatarActions}>
                  <button type="button" className={styles.linkBtn} onClick={openFilePicker}>
                    Upload photo
                  </button>
                  {avatarSrc && (
                    <button type="button" className={styles.linkBtnDanger} onClick={handleRemovePhoto}>
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{displayName}</p>
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
                <input
                  className={styles.fieldInput}
                  value={draft.full_name}
                  onChange={(e) => setDraft({ ...draft, full_name: e.target.value })}
                  placeholder="Your full name"
                />
              ) : (
                <span className={styles.fieldValue}>{user?.full_name}</span>
              )}
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <span className={styles.fieldValue}>{user?.email}</span>
              {editing && <span className={styles.fieldHint}>Email cannot be changed here</span>}
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Phone</span>
              {editing ? (
                <input
                  className={styles.fieldInput}
                  value={draft.phone}
                  onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                  placeholder="+250 7XX XXX XXX"
                />
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

          {error && <p className={styles.errorMsg}>{error}</p>}
          {success && <p className={styles.successMsg}>{success}</p>}

          {editing && (
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Security</h2>
          <p className={styles.sectionDesc}>Update your password to keep your account secure.</p>
          <div className={styles.passwordGrid}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Current password</span>
              <input
                type="password"
                className={styles.fieldInput}
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))}
                autoComplete="current-password"
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>New password</span>
              <input
                type="password"
                className={styles.fieldInput}
                value={passwordForm.next}
                onChange={(e) => setPasswordForm((f) => ({ ...f, next: e.target.value }))}
                autoComplete="new-password"
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Confirm new password</span>
              <input
                type="password"
                className={styles.fieldInput}
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))}
                autoComplete="new-password"
              />
            </div>
          </div>
          {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
          {passwordSuccess && <p className={styles.successMsg}>{passwordSuccess}</p>}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.saveBtn}
              onClick={handleChangePassword}
              disabled={changingPassword}
            >
              {changingPassword ? "Updating…" : "Update password"}
            </button>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
