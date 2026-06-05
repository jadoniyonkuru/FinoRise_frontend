import { useState, useEffect } from "react";
import AdminLayout from "@/admin/AdminLayout";
import cardStyles from "@/components/StatCard.module.css";
import styles from "./user-management.module.css";
import { adminService } from "@/api/services/admin.service";
import type { AccountStatus, UserRole } from "@/api/types";
import { roleLabel } from "@/lib/roles";

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
type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Disabled" | "Pending invite";
  avatarColor: string;
};

const roleOptions: { value: UserRole; label: string; description: string }[] = [
  { value: "admin",               label: "Admin",                   description: "Full access to all admin tools" },
  { value: "learner",             label: "Learner",                 description: "Learning dashboard access" },
  { value: "partner",             label: "Partner",                 description: "Partner impact dashboard access" },
  { value: "module_manager",      label: "Learning module creator", description: "Create and edit learning modules" },
  { value: "simulation_manager",  label: "Simulation setup",        description: "Configure simulations and scenarios" },
  { value: "rewards_manager",     label: "Reward configuration",    description: "Manage rewards and eligibility" },
  { value: "analytics_viewer",    label: "Analytics dashboard",     description: "View reporting and platform insights" },
];

const AVATAR_COLORS = ["#0ea5e9","#8b5cf6","#22c55e","#f59e0b","#f97316","#ec4899","#06b6d4","#10b981","#6366f1","#64748b"];

function mapAccountStatus(status?: AccountStatus): ManagedUser["status"] {
  if (status === "pending_invite") return "Pending invite";
  if (status === "disabled") return "Disabled";
  return "Active";
}

function toManagedUser(
  u: { id: string; full_name: string; email: string; role: string; account_status?: AccountStatus },
  idx: number
): ManagedUser {
  return {
    id: u.id,
    name: u.full_name,
    email: u.email,
    role: (u.role as UserRole) ?? "learner",
    status: mapAccountStatus(u.account_status),
    avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
  };
}

type FilterType = "All" | "Active" | "Disabled" | "Pending invite";

/* ── Component ── */
export default function UserManagementPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  /* Edit modal */
  const [editTarget, setEditTarget] = useState<ManagedUser | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "" as UserRole,
    status: "Active" as ManagedUser["status"],
  });
  const [saving, setSaving] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  /* Delete confirm */
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* Add user modal */
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", role: "learner" as UserRole });

  useEffect(() => {
    adminService.getUsers()
      .then((fetched) => {
        setUsers(fetched.map((u, i) => toManagedUser(u, i)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* ── Derived ── */
  const visible = users.filter((u) => {
    const matchFilter = filter === "All" || u.status === filter;
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) ||
      roleOptions.find(r => r.value === u.role)?.label.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const stats = [
    { label: "Total users",       value: String(users.length),                                            hint: "All accounts" },
    { label: "Admins",            value: String(users.filter(u => u.role === "admin").length),            hint: "Full access" },
    { label: "Learners",          value: String(users.filter(u => u.role === "learner").length),          hint: "Learning accounts" },
    { label: "Partners",          value: String(users.filter(u => u.role === "partner").length),          hint: "Partner access" },
  ];

  /* ── Handlers ── */
  function openEdit(user: ManagedUser) {
    setEditTarget(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  }

  async function saveEdit() {
    if (!editTarget) return;
    setSaving(true);
    setActionError("");
    try {
      const account_status: AccountStatus =
        editForm.status === "Disabled"
          ? "disabled"
          : editForm.status === "Pending invite"
            ? "pending_invite"
            : "active";
      const updated = await adminService.updateUser(editTarget.id, {
        full_name: editForm.name,
        email: editForm.email,
        role: editForm.role,
        account_status,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === editTarget.id ? toManagedUser(updated, prev.indexOf(u)) : u))
      );
      setEditTarget(null);
      setActionSuccess("User updated.");
    } catch {
      setActionError("Failed to update user.");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteUser(deleteTarget.id);
      setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
    } catch {
      // keep user in list if delete failed
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  async function handleRoleChange(userId: string, role: UserRole) {
    const previous = users.find((u) => u.id === userId);
    if (!previous) return;
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    try {
      await adminService.updateUser(userId, { role });
    } catch {
      setUsers((prev) => prev.map((u) => (u.id === userId ? previous : u)));
      setActionError("Failed to update role.");
    }
  }

  async function resendInvite(userId: string) {
    setActionError("");
    try {
      await adminService.resendInvite(userId);
      setActionSuccess("Invite email resent.");
    } catch {
      setActionError("Failed to resend invite.");
    }
  }

  async function saveAdd() {
    if (!addForm.name.trim() || !addForm.email.trim()) return;
    setInviting(true);
    setActionError("");
    const email = addForm.email.trim();
    try {
      const { user, message } = await adminService.inviteUser({
        full_name: addForm.name.trim(),
        email,
        role: addForm.role,
      });
      setUsers((prev) => [...prev, toManagedUser(user, prev.length)]);
      setShowAdd(false);
      setAddForm({ name: "", email: "", role: "learner" });
      setActionSuccess(message || `Invite sent to ${email}.`);
    } catch {
      setActionError("Failed to send invite. Check the email and try again.");
    } finally {
      setInviting(false);
    }
  }

  return (
    <AdminLayout title="User management" subtitle="Invite users by email; they set a password via the link and land on the dashboard for their role.">

      {actionSuccess && <p className={styles.actionSuccess}>{actionSuccess}</p>}
      {actionError && <p className={styles.actionError}>{actionError}</p>}

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
          {(["All", "Active", "Pending invite", "Disabled"] as FilterType[]).map(f => (
            <button key={f} type="button" className={styles.filterTab}
              data-active={String(filter === f)} onClick={() => setFilter(f)}>
              {f} ({f === "All" ? users.length : users.filter(u => u.status === f).length})
            </button>
          ))}
        </div>

        {/* User rows */}
        <div className={styles.roleTable}>
          {loading && <div className={styles.empty}>Loading users…</div>}
          {!loading && visible.length === 0 && <div className={styles.empty}>No users match your search.</div>}
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
                    onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                  >
                    {roleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <span>{currentRole?.description}</span>
                </div>

                {/* Status */}
                <span
                  className={
                    user.status === "Active"
                      ? styles.statusActive
                      : user.status === "Pending invite"
                        ? styles.statusPending
                        : styles.statusDisabled
                  }
                >
                  {user.status}
                </span>

                {/* Actions */}
                <div className={styles.actions}>
                  {user.status === "Pending invite" && (
                    <button type="button" className={styles.btnResend} onClick={() => resendInvite(user.id)}>
                      Resend invite
                    </button>
                  )}
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
                onChange={e => setEditForm(f => ({ ...f, role: e.target.value as UserRole }))}>
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
              <button type="button" className={styles.btnSave} onClick={saveEdit} disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className={styles.overlay} onClick={() => !deleting && setDeleteTarget(null)}>
          <div className={styles.deleteModal} onClick={e => e.stopPropagation()}>
            <div className={styles.deleteIconWrap}><AlertIcon /></div>
            <h3 className={styles.deleteTitle}>Delete user?</h3>
            <p className={styles.deleteDesc}>
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone and will revoke all platform access.
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</button>
              <button type="button" className={styles.btnDeleteConfirm} onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add User Modal ── */}
      {showAdd && (
        <div className={styles.overlay} onClick={() => setShowAdd(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Invite New User</h3>
            <p className={styles.modalHint}>
              An email with an account setup link will be sent. The user confirms their password, then is directed to the {roleLabel(addForm.role)} dashboard.
            </p>

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
                onChange={e => setAddForm(f => ({ ...f, role: e.target.value as UserRole }))}>
                {roleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setShowAdd(false)}>Cancel</button>
              <button type="button" className={styles.btnSave} onClick={saveAdd} disabled={inviting}>
                {inviting ? "Sending invite…" : "Send invite"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
