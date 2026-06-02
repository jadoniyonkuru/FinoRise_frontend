import { useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import cardStyles from "@/components/StatCard.module.css";
import styles from "./simulation-manager.module.css";

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

type Simulation = {
  id: string;
  title: string;
  topic: string;
  scenarios: number;
  status: SimStatus;
  access: "public" | "cohort" | "preview";
  accentColor: string;
};

const accessOptions: { value: Simulation["access"]; label: string; description: string }[] = [
  { value: "public", label: "All learners", description: "Visible on the learner simulation hub" },
  { value: "cohort", label: "Assigned cohorts", description: "Only learners in selected groups" },
  { value: "preview", label: "Admin preview", description: "Hidden from learners until published" },
];

const INITIAL_SIMULATIONS: Simulation[] = [
  { id: "1", title: "Emergency fund challenge", topic: "Personal savings", scenarios: 3, status: "Live", access: "public", accentColor: "#0ea5e9" },
  { id: "2", title: "Small business cash flow", topic: "Entrepreneurship", scenarios: 5, status: "Live", access: "cohort", accentColor: "#8b5cf6" },
  { id: "3", title: "Retirement planning", topic: "Long-term investing", scenarios: 4, status: "Draft", access: "preview", accentColor: "#f59e0b" },
  { id: "4", title: "Debt payoff sprint", topic: "Debt management", scenarios: 3, status: "Live", access: "public", accentColor: "#22c55e" },
  { id: "5", title: "First home purchase", topic: "Major purchases", scenarios: 6, status: "Draft", access: "preview", accentColor: "#ec4899" },
  { id: "6", title: "Insurance decisions", topic: "Risk protection", scenarios: 2, status: "Live", access: "public", accentColor: "#06b6d4" },
  { id: "7", title: "Side hustle finances", topic: "Income growth", scenarios: 4, status: "Live", access: "cohort", accentColor: "#10b981" },
  { id: "8", title: "Tax season prep", topic: "Compliance", scenarios: 3, status: "Draft", access: "preview", accentColor: "#6366f1" },
  { id: "9", title: "College savings plan", topic: "Education funding", scenarios: 3, status: "Live", access: "public", accentColor: "#f97316" },
];

type FilterType = "All" | "Live" | "Draft";

export default function SimulationManagerPage() {
  const [simulations, setSimulations] = useState<Simulation[]>(INITIAL_SIMULATIONS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const [editTarget, setEditTarget] = useState<Simulation | null>(null);
  const [editForm, setEditForm] = useState({ title: "", topic: "", scenarios: 3, status: "Live" as SimStatus, access: "public" as Simulation["access"] });

  const [deleteTarget, setDeleteTarget] = useState<Simulation | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", topic: "", scenarios: 3, access: "preview" as Simulation["access"] });

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
  const totalScenarios = simulations.reduce((sum, s) => sum + s.scenarios, 0);

  const stats = [
    { label: "Active simulations", value: String(liveCount), hint: "Available to learners" },
    { label: "Scenario setups", value: String(totalScenarios), hint: "Across simulations" },
    { label: "Completions (30d)", value: "412", hint: "+18% vs prior" },
    { label: "Avg. score", value: "78%", hint: "All scenarios" },
  ];

  function openEdit(sim: Simulation) {
    setEditTarget(sim);
    setEditForm({
      title: sim.title,
      topic: sim.topic,
      scenarios: sim.scenarios,
      status: sim.status,
      access: sim.access,
    });
  }

  function saveEdit() {
    if (!editTarget) return;
    setSimulations((prev) =>
      prev.map((s) =>
        s.id === editTarget.id
          ? { ...s, ...editForm, scenarios: Math.max(1, editForm.scenarios) }
          : s
      )
    );
    setEditTarget(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setSimulations((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function handleAccessChange(simId: string, access: Simulation["access"]) {
    setSimulations((prev) => prev.map((s) => (s.id === simId ? { ...s, access } : s)));
  }

  function saveAdd() {
    if (!addForm.title.trim() || !addForm.topic.trim()) return;
    const colors = ["#0ea5e9", "#8b5cf6", "#22c55e", "#f59e0b", "#f97316", "#ec4899", "#06b6d4", "#10b981"];
    const newSim: Simulation = {
      id: String(Date.now()),
      title: addForm.title,
      topic: addForm.topic,
      scenarios: Math.max(1, addForm.scenarios),
      status: "Draft",
      access: addForm.access,
      accentColor: colors[simulations.length % colors.length],
    };
    setSimulations((prev) => [...prev, newSim]);
    setShowAdd(false);
    setAddForm({ title: "", topic: "", scenarios: 3, access: "preview" });
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
          {visible.length === 0 && <div className={styles.empty}>No simulations match your search.</div>}
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
                    <span>
                      {sim.topic} · {sim.scenarios} scenario{sim.scenarios !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className={styles.configDetails}>
                  <label htmlFor={`access-${sim.id}`}>Learner access</label>
                  <select
                    id={`access-${sim.id}`}
                    value={sim.access}
                    onChange={(e) => handleAccessChange(sim.id, e.target.value as Simulation["access"])}
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
        <div className={styles.overlay} onClick={() => setEditTarget(null)}>
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
              <label>Topic</label>
              <input
                className={styles.modalInput}
                value={editForm.topic}
                onChange={(e) => setEditForm((f) => ({ ...f, topic: e.target.value }))}
                placeholder="e.g. Personal savings"
              />
            </div>

            <div className={styles.modalField}>
              <label>Scenarios</label>
              <input
                className={styles.modalInput}
                type="number"
                min={1}
                value={editForm.scenarios}
                onChange={(e) => setEditForm((f) => ({ ...f, scenarios: Number(e.target.value) }))}
              />
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
                onChange={(e) => setEditForm((f) => ({ ...f, access: e.target.value as Simulation["access"] }))}
              >
                {accessOptions.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
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
            <h3 className={styles.deleteTitle}>Delete simulation?</h3>
            <p className={styles.deleteDesc}>
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>? All scenarios and learner progress
              for this simulation will be removed.
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
              <label>Topic</label>
              <input
                className={styles.modalInput}
                value={addForm.topic}
                onChange={(e) => setAddForm((f) => ({ ...f, topic: e.target.value }))}
                placeholder="e.g. Personal savings"
              />
            </div>

            <div className={styles.modalField}>
              <label>Scenarios</label>
              <input
                className={styles.modalInput}
                type="number"
                min={1}
                value={addForm.scenarios}
                onChange={(e) => setAddForm((f) => ({ ...f, scenarios: Number(e.target.value) }))}
              />
            </div>

            <div className={styles.modalField}>
              <label>Learner access</label>
              <select
                className={styles.modalSelect}
                value={addForm.access}
                onChange={(e) => setAddForm((f) => ({ ...f, access: e.target.value as Simulation["access"] }))}
              >
                {accessOptions.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setShowAdd(false)}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={saveAdd}>
                Add simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
