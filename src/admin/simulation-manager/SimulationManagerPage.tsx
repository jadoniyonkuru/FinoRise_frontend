import { useState, useEffect } from "react";
import AdminLayout from "@/admin/AdminLayout";
import cardStyles from "@/components/StatCard.module.css";
import styles from "./simulation-manager.module.css";
import { simulationsService } from "@/api/services/simulations.service";
import type { SimCategory } from "@/api/types";

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

type SimStatus = "Live" | "Draft";

type UISim = {
  id: string;
  title: string;
  topic: string;
  scenarios: number;
  status: SimStatus;
  access: "public" | "cohort" | "preview";
  accentColor: string;
};

const accessOptions: { value: UISim["access"]; label: string; description: string }[] = [
  { value: "public",  label: "All learners",      description: "Visible on the learner simulation hub" },
  { value: "cohort",  label: "Assigned cohorts",  description: "Only learners in selected groups" },
  { value: "preview", label: "Admin preview",     description: "Hidden from learners until published" },
];

const CATEGORY_OPTIONS: { value: SimCategory; label: string }[] = [
  { value: "budgeting", label: "Budgeting" },
  { value: "loan",      label: "Loan" },
  { value: "emergency", label: "Emergency" },
  { value: "debt",      label: "Debt" },
  { value: "investing", label: "Investing" },
];

const ACCENT_COLORS = ["#0ea5e9","#8b5cf6","#22c55e","#f59e0b","#f97316","#ec4899","#06b6d4","#10b981"];

function fromApiSim(s: { id: string; title: string; category: string; is_published: boolean }, idx: number): UISim {
  return {
    id: s.id,
    title: s.title,
    topic: s.category,
    scenarios: 0,
    status: s.is_published ? "Live" : "Draft",
    access: s.is_published ? "public" : "preview",
    accentColor: ACCENT_COLORS[idx % ACCENT_COLORS.length],
  };
}

type FilterType = "All" | "Live" | "Draft";

export default function SimulationManagerPage() {
  const [simulations, setSimulations] = useState<UISim[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const [editTarget, setEditTarget] = useState<UISim | null>(null);
  const [editForm, setEditForm] = useState({ title: "", topic: "budgeting" as SimCategory, status: "Live" as SimStatus, access: "public" as UISim["access"] });
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<UISim | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", description: "", topic: "budgeting" as SimCategory, difficulty: "beginner" as "beginner" | "intermediate" | "advanced", xp_reward: 50, access: "preview" as UISim["access"] });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    simulationsService.getAll()
      .then((data) => {
        setSimulations(data.map((s, i) => fromApiSim(s, i)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visible = simulations.filter((sim) => {
    const matchFilter = filter === "All" || sim.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      sim.title.toLowerCase().includes(q) ||
      sim.topic.toLowerCase().includes(q) ||
      accessOptions.find((a) => a.value === sim.access)?.label.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const liveCount = simulations.filter((s) => s.status === "Live").length;
  const draftCount = simulations.filter((s) => s.status === "Draft").length;

  const stats = [
    { label: "Active simulations", value: String(liveCount), hint: "Available to learners" },
    { label: "Total simulations",  value: String(simulations.length), hint: "All setups" },
    { label: "Completions (30d)",  value: "—", hint: "From backend analytics" },
    { label: "Avg. score",         value: "—", hint: "All scenarios" },
  ];

  function openEdit(sim: UISim) {
    setEditTarget(sim);
    setEditForm({
      title: sim.title,
      topic: (sim.topic as SimCategory) || "budgeting",
      status: sim.status,
      access: sim.access,
    });
  }

  async function saveEdit() {
    if (!editTarget) return;
    setSaving(true);
    try {
      await simulationsService.update(editTarget.id, {
        title: editForm.title,
        category: editForm.topic,
        is_published: editForm.status === "Live",
      });
      setSimulations((prev) =>
        prev.map((s) =>
          s.id === editTarget.id
            ? { ...s, title: editForm.title, topic: editForm.topic, status: editForm.status, access: editForm.access }
            : s
        )
      );
      setEditTarget(null);
    } catch { /* silent */ } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await simulationsService.remove(deleteTarget.id);
      setSimulations((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    } catch { /* silent */ } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  function handleAccessChange(simId: string, access: UISim["access"]) {
    setSimulations((prev) => prev.map((s) => (s.id === simId ? { ...s, access } : s)));
  }

  async function saveAdd() {
    if (!addForm.title.trim()) return;
    setAdding(true);
    try {
      const created = await simulationsService.create({
        title: addForm.title,
        description: addForm.description,
        category: addForm.topic,
        difficulty: addForm.difficulty,
        xp_reward: addForm.xp_reward,
        is_published: false,
      });
      setSimulations((prev) => [fromApiSim(created, prev.length), ...prev]);
      setShowAdd(false);
      setAddForm({ title: "", description: "", topic: "budgeting", difficulty: "beginner", xp_reward: 50, access: "preview" });
    } catch { /* silent */ } finally {
      setAdding(false);
    }
  }

  return (
    <AdminLayout title="Simulation setup" subtitle="Configure scenarios, tests, scoring, and live simulation access.">
      <div className={styles.topBar}>
        <label className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search title, topic or access…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className={styles.addBtn} onClick={() => setShowAdd(true)}>
          <PlusIcon /> Add simulation
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
            <h2>Simulation setups</h2>
            <p>Configure scenarios, scoring rules, learner access, and publish simulations to the platform.</p>
          </div>
        </div>

        <div className={styles.filterRow}>
          {(["All", "Live", "Draft"] as FilterType[]).map((f) => (
            <button
              key={f}
              type="button"
              className={styles.filterTab}
              data-active={String(filter === f)}
              onClick={() => setFilter(f)}
            >
              {f} ({f === "All" ? simulations.length : f === "Live" ? liveCount : draftCount})
            </button>
          ))}
        </div>

        <div className={styles.simTable}>
          {loading && <div className={styles.empty}>Loading simulations…</div>}
          {!loading && visible.length === 0 && <div className={styles.empty}>No simulations match your search.</div>}
          {visible.map((sim) => {
            const currentAccess = accessOptions.find((a) => a.value === sim.access);
            return (
              <article key={sim.id} className={styles.simRow}>
                <div className={styles.simIdentity}>
                  <span className={styles.avatar} style={{ background: `${sim.accentColor}20`, color: sim.accentColor }}>
                    {sim.title[0].toUpperCase()}
                  </span>
                  <div>
                    <strong>{sim.title}</strong>
                    <span>{sim.topic}</span>
                  </div>
                </div>

                <div className={styles.configDetails}>
                  <label htmlFor={`access-${sim.id}`}>Learner access</label>
                  <select
                    id={`access-${sim.id}`}
                    value={sim.access}
                    onChange={(e) => handleAccessChange(sim.id, e.target.value as UISim["access"])}
                  >
                    {accessOptions.map((a) => (
                      <option key={a.value} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                  <span>{currentAccess?.description}</span>
                </div>

                <span className={sim.status === "Live" ? styles.statusLive : styles.statusDraft}>{sim.status}</span>

                <div className={styles.actions}>
                  <button type="button" className={styles.btnEdit} onClick={() => openEdit(sim)}>
                    <EditIcon /> Edit
                  </button>
                  <button type="button" className={styles.btnDelete} onClick={() => setDeleteTarget(sim)}>
                    <TrashIcon /> Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {editTarget && (
        <div className={styles.overlay} onClick={() => !saving && setEditTarget(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Edit simulation</h3>

            <div className={styles.modalField}>
              <label>Title</label>
              <input
                className={styles.modalInput}
                value={editForm.title}
                onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Simulation title"
              />
            </div>

            <div className={styles.modalField}>
              <label>Category</label>
              <select
                className={styles.modalSelect}
                value={editForm.topic}
                onChange={(e) => setEditForm((f) => ({ ...f, topic: e.target.value as SimCategory }))}
              >
                {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div className={styles.modalField}>
              <label>Status</label>
              <select
                className={styles.modalSelect}
                value={editForm.status}
                onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value as SimStatus }))}
              >
                <option value="Live">Live</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className={styles.modalField}>
              <label>Learner access</label>
              <select
                className={styles.modalSelect}
                value={editForm.access}
                onChange={(e) => setEditForm((f) => ({ ...f, access: e.target.value as UISim["access"] }))}
              >
                {accessOptions.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setEditTarget(null)} disabled={saving}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={saveEdit} disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className={styles.overlay} onClick={() => !deleting && setDeleteTarget(null)}>
          <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteIconWrap}>
              <AlertIcon />
            </div>
            <h3 className={styles.deleteTitle}>Delete simulation?</h3>
            <p className={styles.deleteDesc}>
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>? All scenarios and learner progress
              for this simulation will be removed.
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </button>
              <button type="button" className={styles.btnDeleteConfirm} onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className={styles.overlay} onClick={() => !adding && setShowAdd(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Add simulation</h3>

            <div className={styles.modalField}>
              <label>Title</label>
              <input
                className={styles.modalInput}
                value={addForm.title}
                onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Simulation title"
              />
            </div>

            <div className={styles.modalField}>
              <label>Description</label>
              <input
                className={styles.modalInput}
                value={addForm.description}
                onChange={(e) => setAddForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Brief description"
              />
            </div>

            <div className={styles.modalField}>
              <label>Category</label>
              <select
                className={styles.modalSelect}
                value={addForm.topic}
                onChange={(e) => setAddForm((f) => ({ ...f, topic: e.target.value as SimCategory }))}
              >
                {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div className={styles.modalField}>
              <label>Difficulty</label>
              <select
                className={styles.modalSelect}
                value={addForm.difficulty}
                onChange={(e) => setAddForm((f) => ({ ...f, difficulty: e.target.value as typeof addForm.difficulty }))}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setShowAdd(false)} disabled={adding}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={saveAdd} disabled={adding}>
                {adding ? "Creating…" : "Add simulation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
