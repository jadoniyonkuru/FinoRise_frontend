import { useState, useMemo } from "react";
import AdminLayout from "@/admin/AdminLayout";
import styles from "@/admin/module-manager/module-manager.module.css";

type RewardStatus = "active" | "inactive";
type RewardType = "badge" | "xp_bonus" | "scholarship";

interface Reward {
  id: number;
  title: string;
  description: string;
  type: RewardType;
  xpCost: number;
  eligibility: string;
  status: RewardStatus;
  createdAt: string;
}

const INITIAL: Reward[] = [
  { id: 1, title: "Completion badge — Module 1", description: "Awarded when a learner finishes all lessons in their first module.", type: "badge", xpCost: 0, eligibility: "100% module completion", status: "active", createdAt: "2024-01-05" },
  { id: 2, title: "7-day streak bonus", description: "Extra XP for maintaining a daily learning streak.", type: "xp_bonus", xpCost: 250, eligibility: "7 consecutive days active", status: "active", createdAt: "2024-02-10" },
  { id: 3, title: "Partner scholarship slot", description: "Top performers qualify for a funded program slot.", type: "scholarship", xpCost: 5000, eligibility: "Top 10% platform XP", status: "active", createdAt: "2024-03-01" },
  { id: 4, title: "Simulation master badge", description: "Complete 5 simulations with a score above 80%.", type: "badge", xpCost: 0, eligibility: "5 simulations ≥ 80%", status: "active", createdAt: "2024-04-12" },
  { id: 5, title: "Referral XP boost", description: "Bonus XP when a referred friend completes onboarding.", type: "xp_bonus", xpCost: 150, eligibility: "Valid referral signup", status: "inactive", createdAt: "2024-05-20" },
];

const TYPE_LABELS: Record<RewardType, string> = {
  badge: "Badge",
  xp_bonus: "XP bonus",
  scholarship: "Scholarship",
};

function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

type ModalMode = "add" | "edit" | "delete" | null;

interface FormState {
  title: string;
  description: string;
  type: RewardType;
  xpCost: number;
  eligibility: string;
  status: RewardStatus;
}

const BLANK: FormState = {
  title: "",
  description: "",
  type: "badge",
  xpCost: 0,
  eligibility: "",
  status: "active",
};

export default function RewardsManagerPage() {
  const [items, setItems] = useState<Reward[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | RewardType>("all");
  const [modal, setModal] = useState<ModalMode>(null);
  const [editing, setEditing] = useState<Reward | null>(null);
  const [form, setForm] = useState<FormState>(BLANK);
  const [nextId, setNextId] = useState(INITIAL.length + 1);

  const filtered = useMemo(
    () =>
      items.filter((r) => {
        const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === "all" || r.type === typeFilter;
        return matchSearch && matchType;
      }),
    [items, search, typeFilter],
  );

  const stats = useMemo(
    () => [
      { label: "Active rewards", value: items.filter((r) => r.status === "active").length.toString(), hint: "Open programs" },
      { label: "XP bonuses", value: items.filter((r) => r.type === "xp_bonus").length.toString(), hint: "Configurable" },
      { label: "Redeemed (30d)", value: "124", hint: "Certificates & badges" },
      { label: "Pending review", value: "7", hint: "Eligibility checks" },
    ],
    [items],
  );

  function openAdd() {
    setForm(BLANK);
    setEditing(null);
    setModal("add");
  }

  function openEdit(r: Reward) {
    setForm({
      title: r.title,
      description: r.description,
      type: r.type,
      xpCost: r.xpCost,
      eligibility: r.eligibility,
      status: r.status,
    });
    setEditing(r);
    setModal("edit");
  }

  function closeModal() {
    setModal(null);
    setEditing(null);
  }

  function handleSave() {
    if (!form.title.trim() || !form.eligibility.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    if (modal === "add") {
      setItems((prev) => [...prev, { id: nextId, ...form, createdAt: today }]);
      setNextId((n) => n + 1);
    } else if (modal === "edit" && editing) {
      setItems((prev) => prev.map((r) => (r.id === editing.id ? { ...r, ...form } : r)));
    }
    closeModal();
  }

  function handleDelete() {
    if (editing) setItems((prev) => prev.filter((r) => r.id !== editing.id));
    closeModal();
  }

  return (
    <AdminLayout title="Reward configuration" subtitle="Configure badges, XP bonuses, and scholarship eligibility.">
      <div className={styles.root}>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statHint}>{s.hint}</div>
            </div>
          ))}
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}><IconSearch /></span>
            <input
              className={styles.searchInput}
              placeholder="Search rewards…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | RewardType)}
          >
            <option value="all">All types</option>
            <option value="badge">Badge</option>
            <option value="xp_bonus">XP bonus</option>
            <option value="scholarship">Scholarship</option>
          </select>
          <button type="button" className={styles.addBtn} onClick={openAdd}>
            <IconPlus /> Add reward
          </button>
        </div>

        <div className={styles.tablePanel}>
          <div className={styles.tablePanelHeader}>
            <span className={styles.tablePanelTitle}>Reward programs</span>
            <span className={styles.tablePanelCount}>{filtered.length} rewards</span>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHead}>
                  <th>Reward</th>
                  <th>Type</th>
                  <th>XP cost</th>
                  <th>Eligibility</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className={styles.emptyRow}><td colSpan={6}>No rewards found.</td></tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className={styles.tableRow}>
                      <td>
                        <div className={styles.moduleCell}>
                          <div className={styles.moduleTitle}>{r.title}</div>
                          <div className={styles.moduleDesc}>{r.description}</div>
                        </div>
                      </td>
                      <td className={styles.categoryCell}>{TYPE_LABELS[r.type]}</td>
                      <td className={styles.numCell}>{r.xpCost > 0 ? r.xpCost.toLocaleString() : "—"}</td>
                      <td className={styles.categoryCell}>{r.eligibility}</td>
                      <td>
                        <span className={`${styles.badge} ${r.status === "active" ? styles.badgePublished : styles.badgeArchived}`}>
                          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button type="button" className={styles.iconBtn} title="Edit" onClick={() => openEdit(r)}>
                            <IconEdit />
                          </button>
                          <button type="button" className={`${styles.iconBtn} ${styles.iconBtnDanger}`} title="Delete" onClick={() => { setEditing(r); setModal("delete"); }}>
                            <IconTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {(modal === "add" || modal === "edit") && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{modal === "add" ? "Add reward" : "Edit reward"}</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title</label>
                <input className={styles.formInput} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. 7-day streak bonus" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea className={styles.formTextarea} rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Type</label>
                  <select className={styles.formSelect} value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as RewardType }))}>
                    <option value="badge">Badge</option>
                    <option value="xp_bonus">XP bonus</option>
                    <option value="scholarship">Scholarship</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>XP cost</label>
                  <input className={styles.formInput} type="number" min={0} value={form.xpCost} onChange={(e) => setForm((f) => ({ ...f, xpCost: Math.max(0, parseInt(e.target.value) || 0) }))} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Eligibility rule</label>
                <input className={styles.formInput} value={form.eligibility} onChange={(e) => setForm((f) => ({ ...f, eligibility: e.target.value }))} placeholder="e.g. Top 10% platform XP" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Status</label>
                <select className={styles.formSelect} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as RewardStatus }))}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
              <button type="button" className={styles.saveBtn} onClick={handleSave}>{modal === "add" ? "Add reward" : "Save changes"}</button>
            </div>
          </div>
        </div>
      )}

      {modal === "delete" && editing && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Delete reward</h2>
            <p className={styles.confirmText}>Delete <strong>{editing.title}</strong>? Learners will no longer be able to earn this reward.</p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
              <button type="button" className={styles.deleteBtnConfirm} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
