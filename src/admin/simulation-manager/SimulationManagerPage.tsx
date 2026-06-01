import { useState, useMemo } from "react";
import AdminLayout from "@/admin/AdminLayout";
import styles from "@/admin/module-manager/module-manager.module.css";

type SimStatus = "live" | "draft" | "archived";
type SimDifficulty = "beginner" | "intermediate" | "advanced";

interface Simulation {
  id: number;
  title: string;
  description: string;
  scenarios: number;
  difficulty: SimDifficulty;
  status: SimStatus;
  createdAt: string;
}

const INITIAL: Simulation[] = [
  { id: 1, title: "Emergency fund challenge", description: "Navigate unexpected expenses while building a safety net.", scenarios: 3, difficulty: "beginner", status: "live", createdAt: "2024-01-10" },
  { id: 2, title: "Small business cash flow", description: "Manage income and expenses for a growing side business.", scenarios: 5, difficulty: "intermediate", status: "live", createdAt: "2024-02-14" },
  { id: 3, title: "Retirement planning", description: "Allocate savings across funds to hit a retirement target.", scenarios: 4, difficulty: "advanced", status: "draft", createdAt: "2024-03-22" },
  { id: 4, title: "Market crash scenario", description: "Respond to a sudden downturn without panic selling.", scenarios: 3, difficulty: "intermediate", status: "live", createdAt: "2024-04-05" },
  { id: 5, title: "First-time investor", description: "Build a diversified portfolio from scratch.", scenarios: 6, difficulty: "beginner", status: "draft", createdAt: "2024-05-18" },
];

const DIFF_LABELS: Record<SimDifficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
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
  scenarios: number;
  difficulty: SimDifficulty;
  status: SimStatus;
}

const BLANK: FormState = {
  title: "",
  description: "",
  scenarios: 3,
  difficulty: "beginner",
  status: "draft",
};

function statusClass(s: SimStatus) {
  if (s === "live") return styles.badgePublished;
  if (s === "draft") return styles.badgeDraft;
  return styles.badgeArchived;
}

export default function SimulationManagerPage() {
  const [items, setItems] = useState<Simulation[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SimStatus>("all");
  const [modal, setModal] = useState<ModalMode>(null);
  const [editing, setEditing] = useState<Simulation | null>(null);
  const [form, setForm] = useState<FormState>(BLANK);
  const [nextId, setNextId] = useState(INITIAL.length + 1);

  const filtered = useMemo(
    () =>
      items.filter((s) => {
        const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || s.status === statusFilter;
        return matchSearch && matchStatus;
      }),
    [items, search, statusFilter],
  );

  const stats = useMemo(
    () => [
      { label: "Live", value: items.filter((s) => s.status === "live").length.toString(), hint: "Available to learners" },
      { label: "Draft", value: items.filter((s) => s.status === "draft").length.toString(), hint: "In setup" },
      { label: "Total scenarios", value: items.reduce((n, s) => n + s.scenarios, 0).toString(), hint: "Across simulations" },
      { label: "Completions (30d)", value: "412", hint: "+18% vs prior period" },
    ],
    [items],
  );

  function openAdd() {
    setForm(BLANK);
    setEditing(null);
    setModal("add");
  }

  function openEdit(s: Simulation) {
    setForm({
      title: s.title,
      description: s.description,
      scenarios: s.scenarios,
      difficulty: s.difficulty,
      status: s.status,
    });
    setEditing(s);
    setModal("edit");
  }

  function closeModal() {
    setModal(null);
    setEditing(null);
  }

  function handleSave() {
    if (!form.title.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    if (modal === "add") {
      setItems((prev) => [...prev, { id: nextId, ...form, createdAt: today }]);
      setNextId((n) => n + 1);
    } else if (modal === "edit" && editing) {
      setItems((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...form } : s)));
    }
    closeModal();
  }

  function handleDelete() {
    if (editing) setItems((prev) => prev.filter((s) => s.id !== editing.id));
    closeModal();
  }

  return (
    <AdminLayout title="Simulation setup" subtitle="Configure simulations and scenarios for learners.">
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
              placeholder="Search simulations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | SimStatus)}
          >
            <option value="all">All statuses</option>
            <option value="live">Live</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button type="button" className={styles.addBtn} onClick={openAdd}>
            <IconPlus /> Add simulation
          </button>
        </div>

        <div className={styles.tablePanel}>
          <div className={styles.tablePanelHeader}>
            <span className={styles.tablePanelTitle}>All simulations</span>
            <span className={styles.tablePanelCount}>{filtered.length} simulations</span>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHead}>
                  <th>Simulation</th>
                  <th>Difficulty</th>
                  <th>Scenarios</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className={styles.emptyRow}><td colSpan={6}>No simulations found.</td></tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.id} className={styles.tableRow}>
                      <td>
                        <div className={styles.moduleCell}>
                          <div className={styles.moduleTitle}>{s.title}</div>
                          <div className={styles.moduleDesc}>{s.description}</div>
                        </div>
                      </td>
                      <td className={styles.categoryCell}>{DIFF_LABELS[s.difficulty]}</td>
                      <td className={styles.numCell}>{s.scenarios}</td>
                      <td>
                        <span className={`${styles.badge} ${statusClass(s.status)}`}>
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </span>
                      </td>
                      <td className={styles.dateCell}>{s.createdAt}</td>
                      <td>
                        <div className={styles.actions}>
                          <button type="button" className={styles.iconBtn} title="Edit" onClick={() => openEdit(s)}>
                            <IconEdit />
                          </button>
                          <button type="button" className={`${styles.iconBtn} ${styles.iconBtnDanger}`} title="Delete" onClick={() => { setEditing(s); setModal("delete"); }}>
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
            <h2 className={styles.modalTitle}>{modal === "add" ? "Add simulation" : "Edit simulation"}</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title</label>
                <input className={styles.formInput} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Emergency fund challenge" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea className={styles.formTextarea} rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="What learners will practice…" />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Difficulty</label>
                  <select className={styles.formSelect} value={form.difficulty} onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value as SimDifficulty }))}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Scenarios</label>
                  <input className={styles.formInput} type="number" min={1} max={20} value={form.scenarios} onChange={(e) => setForm((f) => ({ ...f, scenarios: Math.max(1, parseInt(e.target.value) || 1) }))} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Status</label>
                <select className={styles.formSelect} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as SimStatus }))}>
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
              <button type="button" className={styles.saveBtn} onClick={handleSave}>{modal === "add" ? "Add simulation" : "Save changes"}</button>
            </div>
          </div>
        </div>
      )}

      {modal === "delete" && editing && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Delete simulation</h2>
            <p className={styles.confirmText}>Delete <strong>{editing.title}</strong>? All scenarios will be removed.</p>
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
