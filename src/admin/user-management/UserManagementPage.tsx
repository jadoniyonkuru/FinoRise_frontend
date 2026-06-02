import { useState } from "react";
import AdminLayout from "@/admin/AdminLayout";
import cardStyles from "@/components/StatCard.module.css";
import styles from "./user-management.module.css";

/* ── Icons ── */
function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function PlusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function EditIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
function TrashIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
}
function AlertIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}

/* ── Types ── */
type AdminRole =
  | "admin" | "learner" | "partner"
  | "module_manager" | "simulation_manager"
  | "rewards_manager" | "analytics_viewer";

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "Active" | "Disabled";
  avatarColor: string;
};

const roleOptions: { value: AdminRole; label: string; description: string }[] = [
  { value: "admin",               label: "Admin",                   description: "Full access to all admin tools" },
  { value: "learner",             label: "Learner",                 description: "Learning dashboard access" },
  { value: "partner",             label: "Partner",                 description: "Partner impact dashboard access" },
  { value: "module_manager",      label: "Learning module creator", description: "Create and edit learning modules" },
  { value: "simulation_manager",  label: "Simulation setup",        description: "Configure simulations and scenarios" },
  { value: "rewards_manager",     label: "Reward configuration",    description: "Manage rewards and eligibility" },
  { value: "analytics_viewer",    label: "Analytics dashboard",     description: "View reporting and platform insights" },
];

/* ── Sample data ── */
const INITIAL_USERS: ManagedUser[] = [
  { id: "1",  name: "Aline Mukamana",   email: "aline@finorise.com",    role: "admin",              status: "Active",   avatarColor: "#0ea5e9" },
  { id: "2",  name: "Jean Ndayisaba",   email: "jean@finorise.com",     role: "module_manager",     status: "Active",   avatarColor: "#8b5cf6" },
  { id: "3",  name: "Keza Uwase",       email: "keza@finorise.com",     role: "rewards_manager",    status: "Active",   avatarColor: "#22c55e" },
  { id: "4",  name: "Eric Habimana",    email: "eric@finorise.com",     role: "simulation_manager", status: "Active",   avatarColor: "#f59e0b" },
  { id: "5",  name: "Marie Ingabire",   email: "marie@finorise.com",    role: "analytics_viewer",   status: "Active",   avatarColor: "#f97316" },
  { id: "6",  name: "Patrick Niyombi",  email: "patrick@finorise.com",  role: "learner",            status: "Active",   avatarColor: "#06b6d4" },
  { id: "7",  name: "Grace Umuhoza",    email: "grace@finorise.com",    role: "partner",            status: "Active",   avatarColor: "#ec4899" },
  { id: "8",  name: "Samuel Hakizimana",email: "samuel@finorise.com",   role: "learner",            status: "Disabled", avatarColor: "#64748b" },
  { id: "9",  name: "Diane Mutoni",     email: "diane@finorise.com",    role: "module_manager",     status: "Active",   avatarColor: "#10b981" },
  { id: "10", name: "Claude Irakoze",   email: "claude@finorise.com",   role: "analytics_viewer",   status: "Disabled", avatarColor: "#6366f1" },
];

type FilterType = "All" | "Active" | "Disabled";

/* ── Component ── */
export default function UserManagementPage() {
  const [users, setUsers] = useState<ManagedUser[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  /* Edit modal */
  const [editTarget, setEditTarget] = useState<ManagedUser | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" as AdminRole, status: "Active" as "Active" | "Disabled" });

  /* Delete confirm */
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);

  /* Add user modal */
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", role: "learner" as AdminRole });

  /* ── Derived ── */
  const visible = users.filter((u) => {
    const matchFilter = filter === "All" || u.status === filter;
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) ||
      roleOptions.find(r => r.value === u.role)?.label.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const stats = [
    { label: "Total users",       value: String(users.length),                                                      hint: "All accounts" },
    { label: "Admins",            value: String(users.filter(u => u.role === "admin").length),                      hint: "Full access" },
    { label: "Managers",          value: String(users.filter(u => u.role.endsWith("_manager")).length),             hint: "Modules, simulations, rewards" },
    { label: "Analytics viewers", value: String(users.filter(u => u.role === "analytics_viewer").length),           hint: "Reporting access" },
  ];

  /* ── Handlers ── */
  function openEdit(user: ManagedUser) {
    setEditTarget(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  }

  function saveEdit() {
    if (!editTarget) return;
    setUsers(prev => prev.map(u => u.id === editTarget.id
      ? { ...u, name: editForm.name, email: editForm.email, role: editForm.role, status: editForm.status }
      : u));
    setEditTarget(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function handleRoleChange(userId: string, role: AdminRole) {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  }

  function saveAdd() {
    if (!addForm.name.trim() || !addForm.email.trim()) return;
    const colors = ["#0ea5e9","#8b5cf6","#22c55e","#f59e0b","#f97316","#ec4899","#06b6d4","#10b981"];
    const newUser: ManagedUser = {
      id: String(Date.now()),
      name: addForm.name,
      email: addForm.email,
      role: addForm.role,
      status: "Active",
      avatarColor: colors[users.length % colors.length],
    };
    setUsers(prev => [...prev, newUser]);
    setShowAdd(false);
    setAddForm({ name: "", email: "", role: "learner" });
  }

  return (
    <AdminLayout title="User management" subtitle="Assign access roles and manage admin permissions.">

      {/* Top bar */}
      <div className={styles.topBar}>
        <label className={styles.searchWrap}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search name, email or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className={styles.addBtn} onClick={() => setShowAdd(true)}>
          <PlusIcon /> Add User
        </button>
      </div>

      {/* Stats */}
      <div className={cardStyles.grid}>
        {stats.map((st) => (
          <div key={st.label} className={cardStyles.card} data-accent style={{ "--accent": "var(--admin)" } as React.CSSProperties}>
            <div className={cardStyles.label}>{st.label}</div>
            <div className={cardStyles.value}>{st.value}</div>
            <div className={cardStyles.hint}>{st.hint}</div>
          </div>
        ))}
      </div>

      <section className={cardStyles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Role assignment</h2>
            <p>Admins can grant access to learning, simulation, reward, analytics, partner, and admin tools.</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={styles.filterRow}>
          {(["All", "Active", "Disabled"] as FilterType[]).map(f => (
            <button key={f} type="button" className={styles.filterTab}
              data-active={String(filter === f)} onClick={() => setFilter(f)}>
              {f} ({f === "All" ? users.length : users.filter(u => u.status === f).length})
            </button>
          ))}
        </div>

        {/* User rows */}
        <div className={styles.roleTable}>
          {visible.length === 0 && <div className={styles.empty}>No users match your search.</div>}
          {visible.map((user) => {
            const currentRole = roleOptions.find(r => r.value === user.role);
            return (
              <article key={user.id} className={styles.userRow}>
                {/* Identity */}
                <div className={styles.userIdentity}>
                  <span className={styles.avatar} style={{ background: `${user.avatarColor}20`, color: user.avatarColor }}>
                    {user.name[0].toUpperCase()}
                  </span>
                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>

                {/* Role dropdown */}
                <div className={styles.roleDetails}>
                  <label htmlFor={`role-${user.id}`}>Assigned role</label>
                  <select
                    id={`role-${user.id}`}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as AdminRole)}
                  >
                    {roleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <span>{currentRole?.description}</span>
                </div>

                {/* Status */}
                <span className={user.status === "Active" ? styles.statusActive : styles.statusDisabled}>
                  {user.status}
                </span>

                {/* Actions */}
                <div className={styles.actions}>
                  <button type="button" className={styles.btnEdit} onClick={() => openEdit(user)}>
                    <EditIcon /> Edit
                  </button>
                  <button type="button" className={styles.btnDelete} onClick={() => setDeleteTarget(user)}>
                    <TrashIcon /> Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Edit Modal ── */}
      {editTarget && (
        <div className={styles.overlay} onClick={() => setEditTarget(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Edit User</h3>

            <div className={styles.modalField}>
              <label>Full name</label>
              <input className={styles.modalInput} value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
            </div>

            <div className={styles.modalField}>
              <label>Email address</label>
              <input className={styles.modalInput} type="email" value={editForm.email}
                onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} placeholder="email@finorise.com" />
            </div>

            <div className={styles.modalField}>
              <label>Role</label>
              <select className={styles.modalSelect} value={editForm.role}
                onChange={e => setEditForm(f => ({ ...f, role: e.target.value as AdminRole }))}>
                {roleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className={styles.modalToggleRow}>
              <div>
                <div className={styles.modalToggleLabel}>Account status</div>
                <div className={styles.modalToggleSub}>{editForm.status === "Active" ? "User can log in" : "Login disabled"}</div>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" checked={editForm.status === "Active"}
                  onChange={e => setEditForm(f => ({ ...f, status: e.target.checked ? "Active" : "Disabled" }))} />
                <span className={styles.toggleSlider} />
              </label>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setEditTarget(null)}>Cancel</button>
              <button type="button" className={styles.btnSave} onClick={saveEdit}>Save changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className={styles.overlay} onClick={() => setDeleteTarget(null)}>
          <div className={styles.deleteModal} onClick={e => e.stopPropagation()}>
            <div className={styles.deleteIconWrap}><AlertIcon /></div>
            <h3 className={styles.deleteTitle}>Delete user?</h3>
            <p className={styles.deleteDesc}>
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone and will revoke all platform access.
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button type="button" className={styles.btnDeleteConfirm} onClick={confirmDelete}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add User Modal ── */}
      {showAdd && (
        <div className={styles.overlay} onClick={() => setShowAdd(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Add New User</h3>

            <div className={styles.modalField}>
              <label>Full name</label>
              <input className={styles.modalInput} value={addForm.name}
                onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
            </div>

            <div className={styles.modalField}>
              <label>Email address</label>
              <input className={styles.modalInput} type="email" value={addForm.email}
                onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} placeholder="email@finorise.com" />
            </div>

            <div className={styles.modalField}>
              <label>Role</label>
              <select className={styles.modalSelect} value={addForm.role}
                onChange={e => setAddForm(f => ({ ...f, role: e.target.value as AdminRole }))}>
                {roleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setShowAdd(false)}>Cancel</button>
              <button type="button" className={styles.btnSave} onClick={saveAdd}>Add user</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
