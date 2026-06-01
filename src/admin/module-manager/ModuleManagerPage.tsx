import { useState, useMemo, useRef } from "react";
import AdminLayout from "@/admin/AdminLayout";
import styles from "./module-manager.module.css";

type ModuleStatus = "published" | "draft" | "archived";
type ModuleCategory = "savings" | "budgeting" | "investing" | "credit" | "insurance" | "other";

interface Module {
  id: number;
  title: string;
  description: string;
  category: ModuleCategory;
  lessons: number;
  status: ModuleStatus;
  createdAt: string;
  fileName?: string;
}

const INITIAL_MODULES: Module[] = [
  { id: 1, title: "Saving Basics",            description: "Learn the fundamentals of saving money.",       category: "savings",   lessons: 8,  status: "published", createdAt: "2023-09-01" },
  { id: 2, title: "Budgeting 101",             description: "Master the art of personal budgeting.",        category: "budgeting", lessons: 10, status: "published", createdAt: "2023-09-15" },
  { id: 3, title: "Investment Fundamentals",   description: "Introduction to investing and asset classes.", category: "investing", lessons: 12, status: "published", createdAt: "2023-10-05" },
  { id: 4, title: "Credit & Debt Management",  description: "Understanding credit scores and debt.",        category: "credit",    lessons: 6,  status: "draft",     createdAt: "2024-01-20" },
  { id: 5, title: "Emergency Funds",           description: "Building and maintaining your safety net.",    category: "savings",   lessons: 5,  status: "published", createdAt: "2023-11-10" },
  { id: 6, title: "Insurance Basics",          description: "Protect yourself and your assets.",            category: "insurance", lessons: 7,  status: "draft",     createdAt: "2024-02-14" },
  { id: 7, title: "Advanced Investing",        description: "Stocks, bonds, mutual funds, and ETFs.",       category: "investing", lessons: 15, status: "archived",  createdAt: "2023-06-01" },
];

const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  savings: "Savings",
  budgeting: "Budgeting",
  investing: "Investing",
  credit: "Credit",
  insurance: "Insurance",
  other: "Other",
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
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function IconUpload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function IconFile() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

type ModalMode = "add" | "edit" | "delete" | null;

interface FormState {
  title: string;
  description: string;
  category: ModuleCategory;
  lessons: number;
  status: ModuleStatus;
  fileName: string;
}

const BLANK_FORM: FormState = {
  title: "",
  description: "",
  category: "savings",
  lessons: 1,
  status: "draft",
  fileName: "",
};

function statusBadgeClass(status: ModuleStatus): string {
  if (status === "published") return styles.badgePublished;
  if (status === "draft") return styles.badgeDraft;
  return styles.badgeArchived;
}

export default function ModuleManagerPage() {
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ModuleStatus>("all");
  const [modal, setModal] = useState<ModalMode>(null);
  const [editing, setEditing] = useState<Module | null>(null);
  const [form, setForm] = useState<FormState>(BLANK_FORM);
  const [nextId, setNextId] = useState(INITIAL_MODULES.length + 1);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () =>
      modules.filter((m) => {
        const matchSearch = !search || m.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || m.status === statusFilter;
        return matchSearch && matchStatus;
      }),
    [modules, search, statusFilter],
  );

  const stats = useMemo(() => [
    { label: "Published",     value: modules.filter((m) => m.status === "published").length.toString(), hint: "Live on platform" },
    { label: "Draft",         value: modules.filter((m) => m.status === "draft").length.toString(),     hint: "In review" },
    { label: "Archived",      value: modules.filter((m) => m.status === "archived").length.toString(),  hint: "Hidden from learners" },
    { label: "Total lessons", value: modules.reduce((s, m) => s + m.lessons, 0).toString(),             hint: "Across all modules" },
  ], [modules]);

  function openAdd() {
    setForm(BLANK_FORM);
    setEditing(null);
    setModal("add");
  }

  function openEdit(m: Module) {
    setForm({
      title: m.title,
      description: m.description,
      category: m.category,
      lessons: m.lessons,
      status: m.status,
      fileName: m.fileName ?? "",
    });
    setEditing(m);
    setModal("edit");
  }

  function openDelete(m: Module) {
    setEditing(m);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setEditing(null);
  }

  function handleSave() {
    if (!form.title.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    if (modal === "add") {
      setModules((prev) => [
        ...prev,
        { id: nextId, ...form, createdAt: today },
      ]);
      setNextId((n) => n + 1);
    } else if (modal === "edit" && editing) {
      setModules((prev) =>
        prev.map((m) => (m.id === editing.id ? { ...m, ...form } : m)),
      );
    }
    closeModal();
  }

  function handleDelete() {
    if (editing) setModules((prev) => prev.filter((m) => m.id !== editing.id));
    closeModal();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setForm((f) => ({ ...f, fileName: file.name }));
  }

  return (
    <AdminLayout title="Learning modules" subtitle="Create, upload, and manage learning content.">
      <div className={styles.root}>
        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statHint}>{s.hint}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>
              <IconSearch />
            </span>
            <input
              className={styles.searchInput}
              placeholder="Search modules…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | ModuleStatus)}
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button className={styles.addBtn} onClick={openAdd}>
            <IconPlus /> Add module
          </button>
        </div>

        {/* Table */}
        <div className={styles.tablePanel}>
          <div className={styles.tablePanelHeader}>
            <span className={styles.tablePanelTitle}>All modules</span>
            <span className={styles.tablePanelCount}>{filtered.length} modules</span>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHead}>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Lessons</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className={styles.emptyRow}>
                    <td colSpan={6}>No modules found.</td>
                  </tr>
                ) : (
                  filtered.map((m) => (
                    <tr key={m.id} className={styles.tableRow}>
                      <td>
                        <div className={styles.moduleCell}>
                          <div className={styles.moduleTitle}>{m.title}</div>
                          <div className={styles.moduleDesc}>{m.description}</div>
                          {m.fileName && (
                            <span className={styles.fileTag}>
                              <IconFile /> {m.fileName}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={styles.categoryCell}>{CATEGORY_LABELS[m.category]}</td>
                      <td className={styles.numCell}>{m.lessons}</td>
                      <td>
                        <span className={`${styles.badge} ${statusBadgeClass(m.status)}`}>
                          {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                        </span>
                      </td>
                      <td className={styles.dateCell}>{m.createdAt}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.iconBtn}
                            title="Edit module"
                            onClick={() => openEdit(m)}
                          >
                            <IconEdit />
                          </button>
                          <button
                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                            title="Delete module"
                            onClick={() => openDelete(m)}
                          >
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

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.docx,.pptx,.mp4,.zip"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              {modal === "add" ? "Add new module" : "Edit module"}
            </h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Module title</label>
                <input
                  className={styles.formInput}
                  placeholder="e.g. Saving Basics"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  className={styles.formTextarea}
                  placeholder="Brief description of this module…"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category</label>
                  <select
                    className={styles.formSelect}
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value as ModuleCategory }))
                    }
                  >
                    <option value="savings">Savings</option>
                    <option value="budgeting">Budgeting</option>
                    <option value="investing">Investing</option>
                    <option value="credit">Credit</option>
                    <option value="insurance">Insurance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>No. of lessons</label>
                  <input
                    className={styles.formInput}
                    type="number"
                    min={1}
                    max={999}
                    value={form.lessons}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lessons: Math.max(1, parseInt(e.target.value) || 1) }))
                    }
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Status</label>
                  <select
                    className={styles.formSelect}
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, status: e.target.value as ModuleStatus }))
                    }
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Upload material</label>
                  <button
                    type="button"
                    className={`${styles.uploadBtn} ${form.fileName ? styles.uploadBtnActive : ""}`}
                    onClick={() => fileRef.current?.click()}
                    title={form.fileName || "Choose a file to upload"}
                  >
                    <IconUpload />
                    {form.fileName ? form.fileName : "Choose file…"}
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                {modal === "add" ? "Add module" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {modal === "delete" && editing && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Delete module</h2>
            <p className={styles.confirmText}>
              Are you sure you want to delete <strong>{editing.title}</strong>? All associated
              lessons will be removed. This cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.deleteBtnConfirm} onClick={handleDelete}>
                Delete module
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
