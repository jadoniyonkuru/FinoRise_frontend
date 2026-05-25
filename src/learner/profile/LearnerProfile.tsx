import { useState } from "react";
import LearnerLayout from "../LearnerLayout";
import styles from "./profile.module.css";

type ProfileData = {
  name: string;
  email: string;
  goal: string;
  country: string;
  bio: string;
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
  { key: "goal", label: "Learning goal" },
  { key: "country", label: "Country" },
  { key: "bio", label: "Bio" },
  { key: "joined", label: "Member since", readonly: true },
];

const initial: ProfileData = {
  name: "Alex Muneza",
  email: "alex.muneza@example.com",
  goal: "Financial independence",
  country: "Rwanda",
  bio: "Passionate about personal finance and building wealth.",
  joined: "January 2025",
};

export default function LearnerProfile() {
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
    <LearnerLayout title="My profile" subtitle="Manage your personal information">
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{data.name}</p>
              <p className={styles.profileEmail}>{data.email}</p>
              <span className={styles.roleBadge}>Learner</span>
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
          <h2 className={styles.sectionTitle}>Profile details</h2>
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
    </LearnerLayout>
  );
}
