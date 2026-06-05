import { useEffect, useRef, useState } from "react";
import { authService } from "@/api";
import type { User, UserGender } from "@/api";
import { resolveAvatarUrl, setStoredAvatar } from "@/lib/profileAvatar";
import { composeFullName, displayFullName, parseFullName } from "@/lib/profileNames";
import styles from "./profile.module.css";

export type ProfileUpdatePayload = {
  full_name?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string | null;
  avatar_url?: string | null;
};

export type ProfileApi = {
  updateProfile: (data: ProfileUpdatePayload) => Promise<User>;
  uploadAvatar: (file: File) => Promise<User>;
};

type ProfileDraft = {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  gender: UserGender | "";
};

type ExtraField = { label: string; value: string };

const GENDER_OPTIONS: { value: UserGender | ""; label: string }[] = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

function genderLabel(value?: string | null) {
  return GENDER_OPTIONS.find((o) => o.value === value)?.label ?? "—";
}

function draftFromUser(user: User): ProfileDraft {
  const names =
    user.first_name || user.last_name
      ? {
          first_name: user.first_name ?? "",
          middle_name: user.middle_name ?? "",
          last_name: user.last_name ?? "",
        }
      : parseFullName(user.full_name);

  return {
    ...names,
    phone: user.phone ?? "",
    gender: (user.gender as UserGender) ?? "",
  };
}

function initialsFrom(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function nameFieldValue(user: User | null, part: keyof ProfileDraft) {
  if (!user) return "—";
  if (part === "phone") return user.phone ?? "—";
  if (part === "gender") return genderLabel(user.gender);
  const parsed = parseFullName(user.full_name);
  if (part === "first_name") return user.first_name || parsed.first_name || "—";
  if (part === "middle_name") return user.middle_name || parsed.middle_name || "—";
  if (part === "last_name") return user.last_name || parsed.last_name || "—";
  return "—";
}

type ProfileEditorProps = {
  user: User | null;
  roleLabel: string;
  sectionTitle: string;
  profileApi: ProfileApi;
  onUpdated?: (user: User) => void;
  extraFields?: ExtraField[];
  showPasswordSection?: boolean;
};

export default function ProfileEditor({
  user,
  roleLabel,
  sectionTitle,
  profileApi,
  onUpdated,
  extraFields = [],
  showPasswordSection = false,
}: ProfileEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<ProfileDraft>({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    gender: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    if (!user) return;
    setDraft(draftFromUser(user));
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
    setDraft(draftFromUser(user));
    setAvatarPreview(resolveAvatarUrl(user.id, user.avatar_url));
    setAvatarFile(null);
    setRemoveAvatar(false);
    setEditing(false);
    setError("");
    setSuccess("");
  }

  async function handleSave() {
    if (!user) return;
    if (!draft.first_name.trim() || !draft.last_name.trim()) {
      setError("First name and last name are required.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const full_name = composeFullName({
      first_name: draft.first_name,
      middle_name: draft.middle_name,
      last_name: draft.last_name,
    });

    try {
      if (avatarFile) {
        try {
          await profileApi.uploadAvatar(avatarFile);
        } catch {
          const dataUrl = avatarPreview;
          if (dataUrl) {
            setStoredAvatar(user.id, dataUrl);
            try {
              await profileApi.updateProfile({ avatar_url: dataUrl });
            } catch {
              /* local preview only */
            }
          }
        }
      } else if (removeAvatar) {
        setStoredAvatar(user.id, null);
        try {
          await profileApi.updateProfile({ avatar_url: null });
        } catch {
          /* local remove */
        }
      }

      const updated = await profileApi.updateProfile({
        full_name,
        first_name: draft.first_name.trim(),
        middle_name: draft.middle_name.trim() || undefined,
        last_name: draft.last_name.trim(),
        phone: draft.phone.trim() || undefined,
        gender: draft.gender || null,
      });

      if (avatarPreview && !removeAvatar) {
        setStoredAvatar(user.id, avatarPreview);
      }

      onUpdated?.(updated);
      setDraft(draftFromUser(updated));
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

  if (!user) {
    return <p style={{ color: "#6b7280" }}>Loading profile…</p>;
  }

  const displayName = displayFullName(user) || roleLabel;
  const initials = initialsFrom(displayName);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatarWrap}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="" className={styles.avatarImg} />
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
                {avatarPreview && (
                  <button type="button" className={styles.linkBtnDanger} onClick={handleRemovePhoto}>
                    Delete photo
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={styles.profileInfo}>
            <p className={styles.profileName}>{displayName}</p>
            <p className={styles.profileEmail}>{user.email}</p>
            <span className={styles.roleBadge}>{roleLabel}</span>
          </div>

          {!editing && (
            <button type="button" className={styles.editBtn} onClick={() => setEditing(true)}>
              Edit profile
            </button>
          )}
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        <div className={styles.fields}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>First name</span>
            {editing ? (
              <input
                className={styles.fieldInput}
                value={draft.first_name}
                onChange={(e) => setDraft({ ...draft, first_name: e.target.value })}
                placeholder="First name"
              />
            ) : (
              <span className={styles.fieldValue}>{nameFieldValue(user, "first_name")}</span>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Middle name</span>
            {editing ? (
              <input
                className={styles.fieldInput}
                value={draft.middle_name}
                onChange={(e) => setDraft({ ...draft, middle_name: e.target.value })}
                placeholder="Middle name (optional)"
              />
            ) : (
              <span className={styles.fieldValue}>{nameFieldValue(user, "middle_name")}</span>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Last name</span>
            {editing ? (
              <input
                className={styles.fieldInput}
                value={draft.last_name}
                onChange={(e) => setDraft({ ...draft, last_name: e.target.value })}
                placeholder="Last name"
              />
            ) : (
              <span className={styles.fieldValue}>{nameFieldValue(user, "last_name")}</span>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <span className={styles.fieldValue}>{user.email}</span>
            {editing && <span className={styles.fieldHint}>Email cannot be changed here</span>}
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Gender</span>
            {editing ? (
              <select
                className={styles.fieldSelect}
                value={draft.gender}
                onChange={(e) => setDraft({ ...draft, gender: e.target.value as UserGender | "" })}
              >
                {GENDER_OPTIONS.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <span className={styles.fieldValue}>{nameFieldValue(user, "gender")}</span>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Phone number</span>
            {editing ? (
              <input
                className={styles.fieldInput}
                value={draft.phone}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                placeholder="+250 7XX XXX XXX"
              />
            ) : (
              <span className={styles.fieldValue}>{nameFieldValue(user, "phone")}</span>
            )}
          </div>

          {extraFields.map((f) => (
            <div key={f.label} className={styles.field}>
              <span className={styles.fieldLabel}>{f.label}</span>
              <span className={styles.fieldValue}>{f.value}</span>
            </div>
          ))}
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

      {showPasswordSection && (
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
      )}
    </div>
  );
}
