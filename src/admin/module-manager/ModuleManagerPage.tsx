import { useState, useEffect } from "react";
import AdminLayout from "@/admin/AdminLayout";
import s from "./module-manager.module.css";
import { modulesService } from "@/api/services/modules.service";

/* ── Icons ── */
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
function BookIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>; }
function DraftIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }
function ArchiveIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>; }
function LessonIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>; }
function AlertIcon()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>; }

/* ── Types ── */
type Status = "Published" | "Draft" | "Archived";

type Module = {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  tagBg: string;
  status: Status;
  lessons: number;
  learners: number;
  completion: number;
  accentColor: string;
};

const CATEGORY_COLORS: Record<string, { color: string; bg: string; accent: string }> = {
  "budgeting":          { color: "#22c55e", bg: "rgba(34,197,94,0.1)",   accent: "#22c55e" },
  "investing":          { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", accent: "#8b5cf6" },
  "debt":               { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", accent: "#f59e0b" },
  "savings":            { color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", accent: "#0ea5e9" },
  "personal finance":   { color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", accent: "#0ea5e9" },
  "emergency":          { color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", accent: "#0ea5e9" },
  "digital assets":     { color: "#f97316", bg: "rgba(249,115,22,0.1)", accent: "#f97316" },
  "long-term planning": { color: "#64748b", bg: "rgba(100,116,139,0.1)", accent: "#94a3b8" },
};

function getCategoryStyle(category: string) {
  const key = category.toLowerCase();
  return CATEGORY_COLORS[key] ?? { color: "#64748b", bg: "rgba(100,116,139,0.1)", accent: "#64748b" };
}

function fromApiModule(m: { id: string; title: string; description: string; category: string; difficulty: string; xp_reward: number; is_published: boolean }, archivedIds: Set<string>): Module {
  const st = getCategoryStyle(m.category);
  const status: Status = archivedIds.has(m.id) ? "Archived" : m.is_published ? "Published" : "Draft";
  return {
    id: m.id,
    title: m.title,
    description: m.description,
    category: m.category,
    categoryColor: st.color,
    tagBg: st.bg,
    status,
    lessons: 0,
    learners: 0,
    completion: 0,
    accentColor: st.accent,
  };
}

type Filter = "All" | Status;

/* ── Component ── */
export default function ModuleManagerPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  /* Create modal */
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", description: "", category: "", difficulty: "beginner", xp_reward: 100 });
  const [saving, setSaving] = useState(false);

  /* Delete confirm */
  const [deleteTarget, setDeleteTarget] = useState<Module | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    modulesService.getAll()
      .then((data) => {
        setModules(data.map(m => fromApiModule(m, archivedIds)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const visible = modules.filter((m) => {
    const matchFilter = filter === "All" || m.status === filter;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const published = modules.filter(m => m.status === "Published").length;
  const drafts     = modules.filter(m => m.status === "Draft").length;
  const archived   = modules.filter(m => m.status === "Archived").length;
  const totalLessons = modules.reduce((a, m) => a + m.lessons, 0);

  const PAGE_STATS = [
    { label: "Published modules", value: String(published), hint: "Live learning content",   iconBg: "rgba(34,197,94,0.1)",   iconColor: "#22c55e", badge: "Live",         badgeCls: "badgeGreen", icon: <BookIcon /> },
    { label: "Draft modules",     value: String(drafts),    hint: "Being created",           iconBg: "rgba(251,191,36,0.1)",  iconColor: "#d97706", badge: "In progress",  badgeCls: "badgeAmber", icon: <DraftIcon /> },
    { label: "Archived",          value: String(archived),  hint: "Hidden from learners",    iconBg: "rgba(100,116,139,0.1)", iconColor: "#64748b", badge: "Inactive",     badgeCls: "badgeGray",  icon: <ArchiveIcon /> },
    { label: "Lessons total",     value: String(totalLessons), hint: "Across learning paths", iconBg: "rgba(14,165,233,0.1)", iconColor: "#0ea5e9", badge: "All paths",    badgeCls: "badgeBlue",  icon: <LessonIcon /> },
  ];

  async function handlePublish(id: string) {
    try {
      await modulesService.update(id, { is_published: true });
      const newArchived = new Set(archivedIds);
      newArchived.delete(id);
      setArchivedIds(newArchived);
      setModules(prev => prev.map(m => m.id === id ? { ...m, status: "Published" as Status } : m));
    } catch { /* silent */ }
  }

  async function handleArchive(id: string) {
    const mod = modules.find(m => m.id === id);
    if (!mod) return;
    if (mod.status === "Archived") {
      // Restore → Draft
      const newArchived = new Set(archivedIds);
      newArchived.delete(id);
      setArchivedIds(newArchived);
      setModules(prev => prev.map(m => m.id === id ? { ...m, status: "Draft" as Status } : m));
    } else {
      // Archive → set unpublished + mark archived locally
      try {
        await modulesService.update(id, { is_published: false });
        const newArchived = new Set(archivedIds);
        newArchived.add(id);
        setArchivedIds(newArchived);
        setModules(prev => prev.map(m => m.id === id ? { ...m, status: "Archived" as Status } : m));
      } catch { /* silent */ }
    }
  }

  async function handleCreate() {
    if (!addForm.title.trim() || !addForm.description.trim()) return;
    setSaving(true);
    try {
      const created = await modulesService.create({
        title: addForm.title,
        description: addForm.description,
        category: addForm.category || "General",
        difficulty: addForm.difficulty,
        xp_reward: addForm.xp_reward,
        is_published: false,
      });
      setModules(prev => [fromApiModule(created, archivedIds), ...prev]);
      setShowAdd(false);
      setAddForm({ title: "", description: "", category: "", difficulty: "beginner", xp_reward: 100 });
    } catch { /* silent */ } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await modulesService.remove(deleteTarget.id);
      setModules(prev => prev.filter(m => m.id !== deleteTarget.id));
    } catch { /* silent */ } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <AdminLayout title="Learning module creation" subtitle="Create, publish, and maintain financial learning modules.">
      {/* Top bar */}
      <div className={s.topBar}>
        <label className={s.searchWrap}>
          <span className={s.searchIcon}><SearchIcon /></span>
          <input
            className={s.searchInput}
            type="search"
            placeholder="Search modules or categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className={s.newBtn} onClick={() => setShowAdd(true)}>
          <PlusIcon /> New Module
        </button>
      </div>

      {/* Stats */}
      <div className={s.statsGrid}>
        {PAGE_STATS.map((st) => (
          <div key={st.label} className={s.statCard}>
            <div className={s.statTop}>
              <div className={s.statIcon} style={{ background: st.iconBg, color: st.iconColor }}>{st.icon}</div>
              <span className={`${s.statBadge} ${s[st.badgeCls as keyof typeof s] as string}`}>{st.badge}</span>
            </div>
            <div className={s.statLabel}>{st.label}</div>
            <div className={s.statValue}>{st.value}</div>
            <div className={s.statHint}>{st.hint}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className={s.filterRow}>
        {(["All", "Published", "Draft", "Archived"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={s.filterTab}
            data-active={String(filter === f)}
            onClick={() => setFilter(f)}
          >
            {f} {f !== "All" && `(${modules.filter(m => m.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Module cards */}
      {loading ? (
        <div className={s.empty}>Loading modules…</div>
      ) : visible.length === 0 ? (
        <div className={s.empty}>No modules match your search or filter.</div>
      ) : (
        <div className={s.moduleGrid}>
          {visible.map((m) => (
            <div key={m.id} className={s.moduleCard}>
              <div className={s.moduleStripe} style={{ background: m.accentColor }} />
              <div className={s.moduleBody}>
                <div className={s.moduleHead}>
                  <div className={s.moduleTitleWrap}>
                    <h3 className={s.moduleTitle}>{m.title}</h3>
                    <p className={s.moduleDesc}>{m.description}</p>
                  </div>
                  <span className={`${s.statusBadge} ${
                    m.status === "Published" ? s.statusPublished :
                    m.status === "Draft"     ? s.statusDraft     : s.statusArchived
                  }`}>{m.status}</span>
                </div>

                <div className={s.tagsRow}>
                  <span className={s.tag} style={{ background: m.tagBg, color: m.categoryColor }}>
                    {m.category}
                  </span>
                </div>

                <div className={s.metricsRow}>
                  <div className={s.metric}>
                    <span className={s.metricVal}>{m.learners.toLocaleString()}</span>
                    <span className={s.metricLbl}>learners</span>
                  </div>
                  <div className={s.metric} style={{ flex: 1 }}>
                    <span className={s.metricVal}>{m.completion}%</span>
                    <span className={s.metricLbl}>completion</span>
                    <div className={s.progressWrap}>
                      <div className={s.progressTrack}>
                        <div className={s.progressFill} style={{ width: `${m.completion}%`, background: m.accentColor }} />
                      </div>
                    </div>
                  </div>
                  <div className={s.metric}>
                    <span className={s.metricVal}>{m.lessons}</span>
                    <span className={s.metricLbl}>lessons</span>
                  </div>
                </div>
              </div>

              <div className={s.actions}>
                {m.status === "Draft" && (
                  <button type="button" className={s.btnPublish} onClick={() => handlePublish(m.id)}>
                    Publish
                  </button>
                )}
                {m.status === "Published" && (
                  <button type="button" className={s.btnPublish}>View Live</button>
                )}
                <button type="button" className={s.btnArchive} onClick={() => handleArchive(m.id)}>
                  {m.status === "Archived" ? "Restore" : "Archive"}
                </button>
                <button type="button" className={s.btnDelete} onClick={() => setDeleteTarget(m)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create Module Modal ── */}
      {showAdd && (
        <div className={s.overlay} onClick={() => !saving && setShowAdd(false)}>
          <div className={s.modal} onClick={e => e.stopPropagation()}>
            <h3 className={s.modalTitle}>New Module</h3>

            <div className={s.modalField}>
              <label>Title</label>
              <input className={s.modalInput} value={addForm.title}
                onChange={e => setAddForm(f => ({ ...f, title: e.target.value }))} placeholder="Module title" />
            </div>

            <div className={s.modalField}>
              <label>Description</label>
              <textarea className={s.modalTextarea} value={addForm.description}
                onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description…" rows={3} />
            </div>

            <div className={s.modalField}>
              <label>Category</label>
              <input className={s.modalInput} value={addForm.category}
                onChange={e => setAddForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Budgeting, Investing…" />
            </div>

            <div className={s.modalRow}>
              <div className={s.modalField}>
                <label>Difficulty</label>
                <select className={s.modalSelect} value={addForm.difficulty}
                  onChange={e => setAddForm(f => ({ ...f, difficulty: e.target.value }))}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className={s.modalField}>
                <label>XP reward</label>
                <input className={s.modalInput} type="number" min={0} value={addForm.xp_reward}
                  onChange={e => setAddForm(f => ({ ...f, xp_reward: Number(e.target.value) }))} />
              </div>
            </div>

            <div className={s.modalActions}>
              <button type="button" className={s.btnCancel} onClick={() => setShowAdd(false)} disabled={saving}>Cancel</button>
              <button type="button" className={s.btnSave} onClick={handleCreate} disabled={saving}>
                {saving ? "Creating…" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className={s.overlay} onClick={() => !deleting && setDeleteTarget(null)}>
          <div className={s.deleteModal} onClick={e => e.stopPropagation()}>
            <div className={s.deleteIconWrap}><AlertIcon /></div>
            <h3 className={s.deleteTitle}>Delete module?</h3>
            <p className={s.deleteDesc}>
              Delete <strong>{deleteTarget.title}</strong>? This removes all lessons and progress data and cannot be undone.
            </p>
            <div className={s.modalActions}>
              <button type="button" className={s.btnCancel} onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</button>
              <button type="button" className={s.btnDeleteConfirm} onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
