import { useState } from "react";
import LearnerLayout from "../LearnerLayout";
import styles from "./settings.module.css";

const settings = [
  {
    id: "email",
    title: "Email notifications",
    description: "Receive progress updates, reminders, and reward alerts.",
    defaultOn: true,
  },
  {
    id: "weekly",
    title: "Weekly learning summary",
    description: "Get a weekly snapshot of completed modules and earned XP.",
    defaultOn: true,
  },
  {
    id: "coach",
    title: "AI coach nudges",
    description: "Allow personalized tips based on your recent activity.",
    defaultOn: false,
  },
];

export default function LearnerSettingsPage() {
  const [enabled, setEnabled] = useState(
    Object.fromEntries(settings.map((item) => [item.id, item.defaultOn]))
  );

  function toggle(id: string) {
    setEnabled((current) => ({ ...current, [id]: !current[id] }));
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
            {settings.map((item) => {
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
            <p className={styles.muted}>Password last changed 18 days ago.</p>
            <button type="button" className={styles.outlineBtn}>
              Change password
            </button>
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
