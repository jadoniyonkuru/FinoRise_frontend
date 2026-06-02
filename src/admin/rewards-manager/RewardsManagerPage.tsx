import { useState, useEffect } from "react";
import AdminLayout from "@/admin/AdminLayout";
import cardStyles from "@/components/StatCard.module.css";
import styles from "./rewards-manager.module.css";
import { rewardsService } from "@/api/services/rewards.service";
import type { RewardType } from "@/api/types";

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

type RewardStatus = "Active" | "Inactive";

type UIReward = {
  id: string;
  title: string;
  rewardType: RewardType;
  xpCost: number;
  status: RewardStatus;
  accentColor: string;
};

const typeLabels: Record<RewardType, string> = {
  airtime:       "Airtime",
  discount:      "Discount",
  voucher:       "Voucher",
  partner_offer: "Partner Offer",
};

const REWARD_TYPES: RewardType[] = ["airtime", "discount", "voucher", "partner_offer"];

const ACCENT_COLORS = ["#0ea5e9","#22c55e","#8b5cf6","#f59e0b","#06b6d4","#ec4899","#10b981","#6366f1"];

function fromApiReward(r: { id: string; title: string; reward_type: RewardType; xp_cost: number; is_active: boolean }, idx: number): UIReward {
  return {
    id: r.id,
    title: r.title,
    rewardType: r.reward_type,
    xpCost: r.xp_cost,
    status: r.is_active ? "Active" : "Inactive",
    accentColor: ACCENT_COLORS[idx % ACCENT_COLORS.length],
  };
}

type FilterType = "All" | "Active" | "Inactive";

function statusClass(status: RewardStatus) {
  return status === "Active" ? styles.statusActive : styles.statusDraft;
}

export default function RewardsManagerPage() {
  const [rewards, setRewards] = useState<UIReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const [editTarget, setEditTarget] = useState<UIReward | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<UIReward | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", rewardType: "airtime" as RewardType, xpCost: 100, description: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    rewardsService.getAll()
      .then((data) => {
        setRewards(data.map((r, i) => fromApiReward(r, i)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visible = rewards.filter((reward) => {
    const matchFilter = filter === "All" || reward.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      reward.title.toLowerCase().includes(q) ||
      typeLabels[reward.rewardType].toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const activeCount = rewards.filter((r) => r.status === "Active").length;

  const stats = [
    { label: "Active rewards",   value: String(activeCount),      hint: "Open reward programs" },
    { label: "Total rewards",    value: String(rewards.length),   hint: "All configured" },
    { label: "Redeemed (30d)",   value: "—",                      hint: "Across all programs" },
    { label: "Inactive",         value: String(rewards.length - activeCount), hint: "Disabled rewards" },
  ];

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await rewardsService.remove(deleteTarget.id);
      setRewards((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    } catch { /* silent */ } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  function handleEditLocal(id: string, changes: Partial<UIReward>) {
    setRewards(prev => prev.map(r => r.id === id ? { ...r, ...changes } : r));
  }

  async function saveAdd() {
    if (!addForm.title.trim()) return;
    setAdding(true);
    try {
      const created = await rewardsService.create({
        title: addForm.title,
        reward_type: addForm.rewardType,
        xp_cost: addForm.xpCost,
        description: addForm.description,
      });
      setRewards((prev) => [fromApiReward(created, prev.length), ...prev]);
      setShowAdd(false);
      setAddForm({ title: "", rewardType: "airtime", xpCost: 100, description: "" });
    } catch { /* silent */ } finally {
      setAdding(false);
    }
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
            placeholder="Search reward or type…"
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
          {(["All", "Active", "Inactive"] as FilterType[]).map((f) => (
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
          {loading && <div className={styles.empty}>Loading rewards…</div>}
          {!loading && visible.length === 0 && <div className={styles.empty}>No rewards match your search.</div>}
          {visible.map((reward) => (
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
                  <span>{typeLabels[reward.rewardType]} · {reward.xpCost} XP</span>
                </div>
              </div>

              <div className={styles.configDetails}>
                <label>Type</label>
                <select
                  value={reward.rewardType}
                  onChange={(e) => handleEditLocal(reward.id, { rewardType: e.target.value as RewardType })}
                >
                  {REWARD_TYPES.map(t => <option key={t} value={t}>{typeLabels[t]}</option>)}
                </select>
                <span>{reward.xpCost} XP required to redeem</span>
              </div>

              <span className={statusClass(reward.status)}>{reward.status}</span>

              <div className={styles.actions}>
                <button type="button" className={styles.btnEdit} onClick={() => setEditTarget(reward)}>
                  <EditIcon /> Edit
                </button>
                <button type="button" className={styles.btnDelete} onClick={() => setDeleteTarget(reward)}>
                  <TrashIcon /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Edit Modal (local-only) ── */}
      {editTarget && (
        <div className={styles.overlay} onClick={() => setEditTarget(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Edit reward</h3>

            <div className={styles.modalField}>
              <label>Title</label>
              <input
                className={styles.modalInput}
                value={editTarget.title}
                onChange={(e) => setEditTarget(t => t ? { ...t, title: e.target.value } : t)}
                placeholder="Reward title"
              />
            </div>

            <div className={styles.modalField}>
              <label>Reward type</label>
              <select
                className={styles.modalSelect}
                value={editTarget.rewardType}
                onChange={(e) => setEditTarget(t => t ? { ...t, rewardType: e.target.value as RewardType } : t)}
              >
                {REWARD_TYPES.map(t => <option key={t} value={t}>{typeLabels[t]}</option>)}
              </select>
            </div>

            <div className={styles.modalField}>
              <label>XP cost</label>
              <input
                className={styles.modalInput}
                type="number"
                min={0}
                value={editTarget.xpCost}
                onChange={(e) => setEditTarget(t => t ? { ...t, xpCost: Number(e.target.value) } : t)}
              />
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setEditTarget(null)}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={() => {
                handleEditLocal(editTarget.id, { title: editTarget.title, rewardType: editTarget.rewardType, xpCost: editTarget.xpCost });
                setEditTarget(null);
              }}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className={styles.overlay} onClick={() => !deleting && setDeleteTarget(null)}>
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

      {/* ── Add Reward Modal ── */}
      {showAdd && (
        <div className={styles.overlay} onClick={() => !adding && setShowAdd(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Add reward</h3>

            <div className={styles.modalField}>
              <label>Title</label>
              <input
                className={styles.modalInput}
                value={addForm.title}
                onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Airtime – Top Learner"
              />
            </div>

            <div className={styles.modalField}>
              <label>Description</label>
              <input
                className={styles.modalInput}
                value={addForm.description}
                onChange={(e) => setAddForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Brief description (optional)"
              />
            </div>

            <div className={styles.modalField}>
              <label>Reward type</label>
              <select
                className={styles.modalSelect}
                value={addForm.rewardType}
                onChange={(e) => setAddForm((f) => ({ ...f, rewardType: e.target.value as RewardType }))}
              >
                {REWARD_TYPES.map(t => <option key={t} value={t}>{typeLabels[t]}</option>)}
              </select>
            </div>

            <div className={styles.modalField}>
              <label>XP cost</label>
              <input
                className={styles.modalInput}
                type="number"
                min={0}
                value={addForm.xpCost}
                onChange={(e) => setAddForm((f) => ({ ...f, xpCost: Number(e.target.value) }))}
              />
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setShowAdd(false)} disabled={adding}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={saveAdd} disabled={adding}>
                {adding ? "Creating…" : "Add reward"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
