import { useState, useMemo } from "react";
import AdminLayout from "@/admin/AdminLayout";
import styles from "./user-management.module.css";

type UserRole = "learner" | "admin" | "partner";
type UserStatus = "active" | "inactive";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
}

const INITIAL_USERS: User[] = [
  { id: 1,  name: "Marie Uwase",           email: "marie.uwase@example.com",      role: "learner",  status: "active",   joined: "2024-01-15" },
  { id: 2,  name: "Jean Paul Nkurunziza",  email: "jp.nkurunziza@example.com",    role: "admin",    status: "active",   joined: "2023-08-20" },
  { id: 3,  name: "Alice Mukamana",        email: "alice.mukamana@example.com",   role: "learner",  status: "active",   joined: "2024-03-10" },
  { id: 4,  name: "Bob Habimana",          email: "bob.habimana@example.com",     role: "learner",  status: "inactive", joined: "2024-02-01" },
  { id: 5,  name: "Kigali Savings Co.",    email: "info@ksc.rw",                  role: "partner",  status: "active",   joined: "2023-11-05" },
  { id: 6,  name: "Christine Ingabire",    email: "christine.i@example.com",      role: "learner",  status: "active",   joined: "2024-04-22" },
  { id: 7,  name: "David Nzeyimana",       email: "david.n@example.com",          role: "learner",  status: "active",   joined: "2024-05-08" },
  { id: 8,  name: "RDB Foundation",        email: "programs@rdb.rw",              role: "partner",  status: "active",   joined: "2023-07-14" },
  { id: 9,  name: "Sarah Umutoniwase",     email: "sarah.u@example.com",          role: "admin",    status: "active",   joined: "2023-09-30" },
  { id: 10, name: "Felix Nshimiyimana",    email: "felix.n@example.com",          role: "learner",  status: "inactive", joined: "2024-01-28" },
  { id: 11, name: "Grace Uwimana",         email: "grace.u@example.com",          role: "learner",  status: "active",   joined: "2024-06-02" },
  { id: 12, name: "Henry Mugisha",         email: "henry.m@example.com",          role: "learner",  status: "active",   joined: "2024-07-19" },
];

const AVATAR_COLORS = ["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#0ea5e9", "#ec4899"];

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function getAvatarColor(name: string): string {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h];
}

function roleBadgeClass(role: UserRole): string {
  if (role === "learner") return styles.badgeLearner;
  if (role === "admin") return styles.badgeAdmin;
  return styles.badgePartner;
}

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

type ModalMode = "add" | "edit" | "delete" | null;

interface FormState {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

const BLANK_FORM: FormState = { name: "", email: "", role: "learner", status: "active" };

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [modal, setModal] = useState<ModalMode>(null);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<FormState>(BLANK_FORM);
  const [nextId, setNextId] = useState(INITIAL_USERS.length + 1);

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        const q = search.toLowerCase();
        const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        const matchRole = roleFilter === "all" || u.role === roleFilter;
        return matchSearch && matchRole;
      }),
    [users, search, roleFilter],
  );

  const stats = useMemo(() => {
    const learnerCount = users.filter((u) => u.role === "learner").length;
    return [
      { label: "Total users",  value: users.length.toString(),                hint: "All roles" },
      { label: "Learners",     value: learnerCount.toString(),                 hint: `${Math.round((learnerCount / users.length) * 100)}% of users` },
      { label: "Admins",       value: users.filter((u) => u.role === "admin").length.toString(),   hint: "System staff" },
      { label: "Partners",     value: users.filter((u) => u.role === "partner").length.toString(), hint: "Verified" },
    ];
  }, [users]);

  function openAdd() {
    setForm(BLANK_FORM);
    setEditing(null);
    setModal("add");
  }

  function openEdit(u: User) {
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status });
    setEditing(u);
    setModal("edit");
  }

  function openDelete(u: User) {
    setEditing(u);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setEditing(null);
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) return;
    if (modal === "add") {
      const today = new Date().toISOString().slice(0, 10);
      setUsers((prev) => [...prev, { id: nextId, ...form, joined: today }]);
      setNextId((n) => n + 1);
    } else if (modal === "edit" && editing) {
      setUsers((prev) => prev.map((u) => (u.id === editing.id ? { ...u, ...form } : u)));
    }
    closeModal();
  }

  function handleDelete() {
    if (editing) setUsers((prev) => prev.filter((u) => u.id !== editing.id));
    closeModal();
  }

  return (
    <AdminLayout title="User management" subtitle="Manage learners, admins, and partners.">
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
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as "all" | UserRole)}
          >
            <option value="all">All roles</option>
            <option value="learner">Learner</option>
            <option value="admin">Admin</option>
            <option value="partner">Partner</option>
          </select>
          <button className={styles.addBtn} onClick={openAdd}>
            <IconPlus /> Add user
          </button>
        </div>

        {/* Table */}
        <div className={styles.tablePanel}>
          <div className={styles.tablePanelHeader}>
            <span className={styles.tablePanelTitle}>All users</span>
            <span className={styles.tablePanelCount}>{filtered.length} users</span>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHead}>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className={styles.emptyRow}>
                    <td colSpan={5}>No users found.</td>
                  </tr>
                ) : (
                  filtered.map((u) => {
                    const color = getAvatarColor(u.name);
                    return (
                      <tr key={u.id} className={styles.tableRow}>
                        <td>
                          <div className={styles.userCell}>
                            <div
                              className={styles.avatar}
                              style={{ background: `${color}22`, color }}
                            >
                              {getInitials(u.name)}
                            </div>
                            <div>
                              <div className={styles.userName}>{u.name}</div>
                              <div className={styles.userEmail}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`${styles.badge} ${roleBadgeClass(u.role)}`}>
                            {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${styles.badge} ${
                              u.status === "active" ? styles.badgeActive : styles.badgeInactive
                            }`}
                          >
                            {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                          </span>
                        </td>
                        <td className={styles.dateCell}>{u.joined}</td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              className={styles.iconBtn}
                              title="Edit user"
                              onClick={() => openEdit(u)}
                            >
                              <IconEdit />
                            </button>
                            <button
                              className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                              title="Delete user"
                              onClick={() => openDelete(u)}
                            >
                              <IconTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              {modal === "add" ? "Add new user" : "Edit user"}
            </h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full name</label>
                <input
                  className={styles.formInput}
                  placeholder="e.g. Marie Uwase"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email address</label>
                <input
                  className={styles.formInput}
                  type="email"
                  placeholder="e.g. marie@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Role</label>
                  <select
                    className={styles.formSelect}
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}
                  >
                    <option value="learner">Learner</option>
                    <option value="admin">Admin</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Status</label>
                  <select
                    className={styles.formSelect}
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as UserStatus }))}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                {modal === "add" ? "Add user" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {modal === "delete" && editing && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Delete user</h2>
            <p className={styles.confirmText}>
              Are you sure you want to delete <strong>{editing.name}</strong>? This action cannot
              be undone.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.deleteBtnConfirm} onClick={handleDelete}>
                Delete user
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
