import { useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import cardStyles from "@/components/StatCard.module.css";
import styles from "./rewards-manager.module.css";

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

type RewardStatus = "Active" | "Draft" | "Pending review";
type RewardType = "badge" | "bonus" | "scholarship" | "certificate";
type EligibilityRule =
  | "lessons_100"
  | "active_learners"
  | "top_10"
  | "streak_7"
  | "simulation_complete"
  | "module_progress";

type Reward = {
  id: string;
  title: string;
  rewardType: RewardType;
  eligibility: EligibilityRule;
  status: RewardStatus;
  accentColor: string;
};

const typeLabels: Record<RewardType, string> = {
  badge: "Badge",
  bonus: "Bonus",
  scholarship: "Scholarship",
  certificate: "Certificate",
};

const eligibilityOptions: { value: EligibilityRule; label: string; description: string }[] = [
  { value: "lessons_100", label: "100% lessons", description: "Award when all lessons in the module are complete" },
  { value: "active_learners", label: "Active learners", description: "Learners with activity in the last 7 days" },
  { value: "top_10", label: "Top 10%", description: "Highest performers in the current cycle" },
  { value: "streak_7", label: "7-day streak", description: "Consecutive days of learning activity" },
  { value: "simulation_complete", label: "Simulation completed", description: "Finish all scenarios in a simulation" },
  { value: "module_progress", label: "50% module progress", description: "Mid-module milestone reward" },
];

const INITIAL_REWARDS: Reward[] = [
  { id: "1", title: "Completion badge – Module 1", rewardType: "badge", eligibility: "lessons_100", status: "Active", accentColor: "#0ea5e9" },
  { id: "2", title: "Streak bonus – 7 days", rewardType: "bonus", eligibility: "streak_7", status: "Active", accentColor: "#22c55e" },
  { id: "3", title: "Partner scholarship slot", rewardType: "scholarship", eligibility: "top_10", status: "Active", accentColor: "#8b5cf6" },
  { id: "4", title: "Budget master certificate", rewardType: "certificate", eligibility: "lessons_100", status: "Active", accentColor: "#f59e0b" },
  { id: "5", title: "Simulation champion badge", rewardType: "badge", eligibility: "simulation_complete", status: "Active", accentColor: "#06b6d4" },
  { id: "6", title: "Early bird bonus", rewardType: "bonus", eligibility: "active_learners", status: "Pending review", accentColor: "#ec4899" },
  { id: "7", title: "Savings streak reward", rewardType: "bonus", eligibility: "streak_7", status: "Active", accentColor: "#10b981" },
  { id: "8", title: "Investing fundamentals badge", rewardType: "badge", eligibility: "module_progress", status: "Draft", accentColor: "#6366f1" },
  { id: "9", title: "Community top performer", rewardType: "scholarship", eligibility: "top_10", status: "Pending review", accentColor: "#f97316" },
  { id: "10", title: "Financial literacy certificate", rewardType: "certificate", eligibility: "lessons_100", status: "Active", accentColor: "#14b8a6" },
  { id: "11", title: "Weekly engagement bonus", rewardType: "bonus", eligibility: "active_learners", status: "Active", accentColor: "#a855f7" },
  { id: "12", title: "Module 2 completion badge", rewardType: "badge", eligibility: "lessons_100", status: "Pending review", accentColor: "#0ea5e9" },
  { id: "13", title: "Partner referral reward", rewardType: "bonus", eligibility: "top_10", status: "Draft", accentColor: "#64748b" },
  { id: "14", title: "Debt-free milestone", rewardType: "certificate", eligibility: "simulation_complete", status: "Pending review", accentColor: "#ef4444" },
];

type FilterType = "All" | "Active" | "Pending review" | "Draft";

function statusClass(status: RewardStatus) {
  if (status === "Active") return styles.statusActive;
  if (status === "Pending review") return styles.statusPending;
  return styles.statusDraft;
}

export default function RewardsManagerPage() {
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const [editTarget, setEditTarget] = useState<Reward | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    rewardType: "badge" as RewardType,
    eligibility: "lessons_100" as EligibilityRule,
    status: "Active" as RewardStatus,
  });

  const [deleteTarget, setDeleteTarget] = useState<Reward | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    rewardType: "badge" as RewardType,
    eligibility: "lessons_100" as EligibilityRule,
  });

  const visible = rewards.filter((reward) => {
    const matchFilter = filter === "All" || reward.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      reward.title.toLowerCase().includes(q) ||
      typeLabels[reward.rewardType].toLowerCase().includes(q) ||
      eligibilityOptions.find((e) => e.value === reward.eligibility)?.label.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const activeCount = rewards.filter((r) => r.status === "Active").length;
  const pendingCount = rewards.filter((r) => r.status === "Pending review").length;

  const stats = [
    { label: "Active rewards", value: String(activeCount), hint: "Open reward programs" },
    { label: "Eligible learners", value: "856", hint: "This cycle" },
    { label: "Redeemed (30d)", value: "124", hint: "Certificates and badges" },
    { label: "Pending review", value: String(pendingCount), hint: "Eligibility checks" },
  ];

  function openEdit(reward: Reward) {
    setEditTarget(reward);
    setEditForm({
      title: reward.title,
      rewardType: reward.rewardType,
      eligibility: reward.eligibility,
      status: reward.status,
    });
  }

  function saveEdit() {
    if (!editTarget) return;
    setRewards((prev) =>
      prev.map((r) => (r.id === editTarget.id ? { ...r, ...editForm } : r))
    );
    setEditTarget(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setRewards((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function handleEligibilityChange(rewardId: string, eligibility: EligibilityRule) {
    setRewards((prev) => prev.map((r) => (r.id === rewardId ? { ...r, eligibility } : r)));
  }

  function saveAdd() {
    if (!addForm.title.trim()) return;
    const colors = ["#0ea5e9", "#8b5cf6", "#22c55e", "#f59e0b", "#f97316", "#ec4899", "#06b6d4", "#10b981"];
    const newReward: Reward = {
      id: String(Date.now()),
      title: addForm.title,
      rewardType: addForm.rewardType,
      eligibility: addForm.eligibility,
      status: "Draft",
      accentColor: colors[rewards.length % colors.length],
    };
    setRewards((prev) => [...prev, newReward]);
    setShowAdd(false);
    setAddForm({ title: "", rewardType: "badge", eligibility: "lessons_100" });
  }

  function filterCount(f: FilterType) {
    if (f === "All") return rewards.length;
    return rewards.filter((r) => r.status === f).length;
  }

  return (
    <AdminLayout
      title="Reward configuration"
      subtitle="Configure rewards, eligibility rules, redemptions, and review queues."
    >
      <div className={styles.topBar}>
        <label className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search reward, type or eligibility…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className={styles.addBtn} onClick={() => setShowAdd(true)}>
          <PlusIcon /> Add reward
        </button>
      </div>

      <div className={cardStyles.grid}>
        {stats.map((st) => (
          <div
            key={st.label}
            className={cardStyles.card}
            data-accent
            style={{ "--accent": "var(--admin)" } as React.CSSProperties}
          >
            <div className={cardStyles.label}>{st.label}</div>
            <div className={cardStyles.value}>{st.value}</div>
            <div className={cardStyles.hint}>{st.hint}</div>
          </div>
        ))}
      </div>

      <section className={cardStyles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Reward configurations</h2>
            <p>Set eligibility rules, redemption limits, and review queues before rewards go live for learners.</p>
          </div>
        </div>

        <div className={styles.filterRow}>
          {(["All", "Active", "Pending review", "Draft"] as FilterType[]).map((f) => (
            <button
              key={f}
              type="button"
              className={styles.filterTab}
              data-active={String(filter === f)}
              onClick={() => setFilter(f)}
            >
              {f} ({filterCount(f)})
            </button>
          ))}
        </div>

        <div className={styles.rewardTable}>
          {visible.length === 0 && <div className={styles.empty}>No rewards match your search.</div>}
          {visible.map((reward) => {
            const currentEligibility = eligibilityOptions.find((e) => e.value === reward.eligibility);
            return (
              <article key={reward.id} className={styles.rewardRow}>
                <div className={styles.rewardIdentity}>
                  <span
                    className={styles.avatar}
                    style={{ background: `${reward.accentColor}20`, color: reward.accentColor }}
                  >
                    {typeLabels[reward.rewardType][0]}
                  </span>
                  <div>
                    <strong>{reward.title}</strong>
                    <span>{typeLabels[reward.rewardType]} · Eligibility: {currentEligibility?.label}</span>
                  </div>
                </div>

                <div className={styles.configDetails}>
                  <label htmlFor={`eligibility-${reward.id}`}>Eligibility rule</label>
                  <select
                    id={`eligibility-${reward.id}`}
                    value={reward.eligibility}
                    onChange={(e) =>
                      handleEligibilityChange(reward.id, e.target.value as EligibilityRule)
                    }
                  >
                    {eligibilityOptions.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                  <span>{currentEligibility?.description}</span>
                </div>

                <span className={statusClass(reward.status)}>{reward.status}</span>

                <div className={styles.actions}>
                  <button type="button" className={styles.btnEdit} onClick={() => openEdit(reward)}>
                    <EditIcon /> Edit
                  </button>
                  <button type="button" className={styles.btnDelete} onClick={() => setDeleteTarget(reward)}>
                    <TrashIcon /> Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {editTarget && (
        <div className={styles.overlay} onClick={() => setEditTarget(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Edit reward</h3>

            <div className={styles.modalField}>
              <label>Title</label>
              <input
                className={styles.modalInput}
                value={editForm.title}
                onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Reward title"
              />
            </div>

            <div className={styles.modalField}>
              <label>Reward type</label>
              <select
                className={styles.modalSelect}
                value={editForm.rewardType}
                onChange={(e) => setEditForm((f) => ({ ...f, rewardType: e.target.value as RewardType }))}
              >
                {(Object.keys(typeLabels) as RewardType[]).map((t) => (
                  <option key={t} value={t}>
                    {typeLabels[t]}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.modalField}>
              <label>Eligibility rule</label>
              <select
                className={styles.modalSelect}
                value={editForm.eligibility}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, eligibility: e.target.value as EligibilityRule }))
                }
              >
                {eligibilityOptions.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.modalField}>
              <label>Status</label>
              <select
                className={styles.modalSelect}
                value={editForm.status}
                onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value as RewardStatus }))}
              >
                <option value="Active">Active</option>
                <option value="Pending review">Pending review</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setEditTarget(null)}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={saveEdit}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className={styles.overlay} onClick={() => setDeleteTarget(null)}>
          <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteIconWrap}>
              <AlertIcon />
            </div>
            <h3 className={styles.deleteTitle}>Delete reward?</h3>
            <p className={styles.deleteDesc}>
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>? Learners will no longer be able
              to earn or redeem this reward.
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" className={styles.btnDeleteConfirm} onClick={confirmDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className={styles.overlay} onClick={() => setShowAdd(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Add reward</h3>

            <div className={styles.modalField}>
              <label>Title</label>
              <input
                className={styles.modalInput}
                value={addForm.title}
                onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Completion badge – Module 1"
              />
            </div>

            <div className={styles.modalField}>
              <label>Reward type</label>
              <select
                className={styles.modalSelect}
                value={addForm.rewardType}
                onChange={(e) => setAddForm((f) => ({ ...f, rewardType: e.target.value as RewardType }))}
              >
                {(Object.keys(typeLabels) as RewardType[]).map((t) => (
                  <option key={t} value={t}>
                    {typeLabels[t]}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.modalField}>
              <label>Eligibility rule</label>
              <select
                className={styles.modalSelect}
                value={addForm.eligibility}
                onChange={(e) => setAddForm((f) => ({ ...f, eligibility: e.target.value as EligibilityRule }))}
              >
                {eligibilityOptions.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setShowAdd(false)}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={saveAdd}>
                Add reward
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
