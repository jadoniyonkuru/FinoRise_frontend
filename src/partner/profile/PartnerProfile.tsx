import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import styles from "@/components/profile.module.css";

type ProfileData = {
  organization: string;
  contact: string;
  email: string;
  focus: string;
  country: string;
  since: string;
};

type Field = {
  key: keyof ProfileData;
  label: string;
  readonly?: boolean;
};

const fields: Field[] = [
  { key: "organization", label: "Organization" },
  { key: "contact", label: "Contact person" },
  { key: "email", label: "Email" },
  { key: "focus", label: "Focus area" },
  { key: "country", label: "Country" },
  { key: "since", label: "Partner since", readonly: true },
];

const initial: ProfileData = {
  organization: "Rwanda Development Bank",
  contact: "Marie Uwase",
  email: "marie.uwase@rdb.rw",
  focus: "Youth financial literacy",
  country: "Rwanda",
  since: "March 2024",
};

export default function PartnerProfile() {
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

  const initials = data.organization
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
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
      <div
        className={styles.page}
        style={{ "--accent": "var(--partner)" } as React.CSSProperties}
      >
        <div className={styles.card}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{data.organization}</p>
              <p className={styles.profileEmail}>{data.email}</p>
              <span className={styles.roleBadge}>Partner</span>
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
          <h2 className={styles.sectionTitle}>Partnership details</h2>
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
    </DashboardLayout>
  );
}
