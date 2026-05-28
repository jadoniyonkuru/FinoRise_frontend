import { useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import styles from "@/components/profile.module.css";

type ProfileData = {
  name: string;
  email: string;
  level: string;
  department: string;
  joined: string;
};

type Field = {
  key: keyof ProfileData;
  label: string;
  readonly?: boolean;
};

const fields: Field[] = [
  { key: "name", label: "Full name" },
  { key: "email", label: "Email" },
  { key: "level", label: "Role level" },
  { key: "department", label: "Department" },
  { key: "joined", label: "Member since", readonly: true },
];

const initial: ProfileData = {
  name: "Admin User",
  email: "admin@finorise.com",
  level: "Super Admin",
  department: "Platform Operations",
  joined: "October 2023",
};

export default function AdminProfile() {
  const [data, setData] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);

  function handleSave() {
    setData(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(data);
    setEditing(false);
  }

  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <AdminLayout title="Admin profile" subtitle="Manage your account details">
      <div
        className={styles.page}
        style={{ "--accent": "var(--admin)" } as React.CSSProperties}
      >
        <div className={styles.card}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{data.name}</p>
              <p className={styles.profileEmail}>{data.email}</p>
              <span className={styles.roleBadge}>Admin</span>
            </div>
            {!editing && (
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => setEditing(true)}
              >
                Edit profile
              </button>
            )}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Account details</h2>
          <div className={styles.fields}>
            {fields.map(({ key, label, readonly }) => (
              <div key={key} className={styles.field}>
                <span className={styles.fieldLabel}>{label}</span>
                {editing && !readonly ? (
                  <input
                    className={styles.fieldInput}
                    value={draft[key]}
                    onChange={(e) =>
                      setDraft({ ...draft, [key]: e.target.value })
                    }
                  />
                ) : (
                  <span className={styles.fieldValue}>{data[key]}</span>
                )}
              </div>
            ))}
          </div>
          {editing && (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.saveBtn}
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
