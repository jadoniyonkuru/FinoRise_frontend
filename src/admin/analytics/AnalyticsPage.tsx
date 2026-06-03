import { useState, useEffect } from "react";
import AdminLayout from "@/admin/AdminLayout";
import cardStyles from "@/components/StatCard.module.css";
import styles from "./analytics.module.css";
import { adminService } from "@/api/services/admin.service";
import type { AdminAnalytics } from "@/api/types";

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

type InsightCategory = "engagement" | "retention_risk" | "positive_trend" | "performance" | "rewards";

type PlatformInsight = {
  id: string;
  title: string;
  detail: string;
  category: InsightCategory;
  accentColor: string;
};

const categoryOptions: { value: InsightCategory; label: string; description: string }[] = [
  { value: "engagement", label: "Engagement", description: "Usage patterns, session timing, and activity spikes" },
  { value: "retention_risk", label: "Retention risk", description: "Drop-off points and learners at risk of churning" },
  { value: "positive_trend", label: "Positive trend", description: "Growth metrics and improving learner outcomes" },
  { value: "performance", label: "Performance", description: "Scores, completion rates, and assessment results" },
  { value: "rewards", label: "Rewards", description: "Redemptions, eligibility, and incentive effectiveness" },
];

const INITIAL_INSIGHTS: PlatformInsight[] = [
  {
    id: "1",
    title: "Peak usage: Tue–Thu 18:00–21:00",
    detail: "Highest concurrent sessions mid-week evenings",
    category: "engagement",
    accentColor: "#0ea5e9",
  },
  {
    id: "2",
    title: "Drop-off after Module 2 quiz",
    detail: "32% of learners exit before finishing the quiz",
    category: "retention_risk",
    accentColor: "#f59e0b",
  },
  {
    id: "3",
    title: "Simulation completions up 18%",
    detail: "Month-over-month increase across all live simulations",
    category: "positive_trend",
    accentColor: "#22c55e",
  },
  {
    id: "4",
    title: "Mobile sessions dominate weekends",
    detail: "68% of Saturday traffic from mobile devices",
    category: "engagement",
    accentColor: "#8b5cf6",
  },
  {
    id: "5",
    title: "Reward redemptions lag in week 1",
    detail: "Only 12% of eligible learners redeem within 7 days",
    category: "rewards",
    accentColor: "#ec4899",
  },
  {
    id: "6",
    title: "Avg. quiz score improved to 82%",
    detail: "Up from 76% after Module 1 content refresh",
    category: "performance",
    accentColor: "#06b6d4",
  },
  {
    id: "7",
    title: "Partner cohort retention at 79%",
    detail: "Above platform average of 71% for 30-day window",
    category: "positive_trend",
    accentColor: "#10b981",
  },
  {
    id: "8",
    title: "Inactive learners after onboarding",
    detail: "24% have not returned within 14 days of signup",
    category: "retention_risk",
    accentColor: "#ef4444",
  },
];

type FilterType = "All" | "Engagement" | "Retention risk" | "Positive trend";

const filterToCategory: Partial<Record<FilterType, InsightCategory>> = {
  Engagement: "engagement",
  "Retention risk": "retention_risk",
  "Positive trend": "positive_trend",
};

function statusClass(category: InsightCategory) {
  if (category === "positive_trend") return styles.statusPositive;
  if (category === "retention_risk") return styles.statusWatch;
  return styles.statusActive;
}

function categoryLabel(category: InsightCategory) {
  return categoryOptions.find((c) => c.value === category)?.label ?? category;
}

export default function AnalyticsPage() {
  const [insights, setInsights] = useState<PlatformInsight[]>(INITIAL_INSIGHTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);

  const [editTarget, setEditTarget] = useState<PlatformInsight | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    detail: "",
    category: "engagement" as InsightCategory,
  });

  const [deleteTarget, setDeleteTarget] = useState<PlatformInsight | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    detail: "",
    category: "engagement" as InsightCategory,
  });

  useEffect(() => {
    adminService.getAnalytics().then(setAnalytics).catch(() => {});
  }, []);

  const visible = insights.filter((insight) => {
    const matchFilter =
      filter === "All" || insight.category === filterToCategory[filter];
    const q = search.toLowerCase();
    const matchSearch =
      insight.title.toLowerCase().includes(q) ||
      insight.detail.toLowerCase().includes(q) ||
      categoryLabel(insight.category).toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const stats = [
    { label: "Total users",      value: analytics ? String(analytics.total_users)    : "—", hint: "All platform accounts" },
    { label: "Learners",         value: analytics ? String(analytics.total_learners)  : "—", hint: "Active learning accounts" },
    { label: "Admins",           value: analytics ? String(analytics.total_admins)    : "—", hint: "Admin & staff" },
    { label: "Badges awarded",   value: analytics ? String(analytics.total_badges_awarded) : "—", hint: "All time" },
  ];

  function openEdit(insight: PlatformInsight) {
    setEditTarget(insight);
    setEditForm({
      title: insight.title,
      detail: insight.detail,
      category: insight.category,
    });
  }

  function saveEdit() {
    if (!editTarget) return;
    setInsights((prev) =>
      prev.map((i) => (i.id === editTarget.id ? { ...i, ...editForm } : i))
    );
    setEditTarget(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setInsights((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function handleCategoryChange(insightId: string, category: InsightCategory) {
    setInsights((prev) => prev.map((i) => (i.id === insightId ? { ...i, category } : i)));
  }

  function saveAdd() {
    if (!addForm.title.trim()) return;
    const colors = ["#0ea5e9", "#8b5cf6", "#22c55e", "#f59e0b", "#f97316", "#ec4899", "#06b6d4", "#10b981"];
    const newInsight: PlatformInsight = {
      id: String(Date.now()),
      title: addForm.title,
      detail: addForm.detail || "No additional detail",
      category: addForm.category,
      accentColor: colors[insights.length % colors.length],
    };
    setInsights((prev) => [...prev, newInsight]);
    setShowAdd(false);
    setAddForm({ title: "", detail: "", category: "engagement" });
  }

  function filterCount(f: FilterType) {
    if (f === "All") return insights.length;
    const cat = filterToCategory[f];
    return insights.filter((i) => i.category === cat).length;
  }

  return (
    <AdminLayout
      title="Analytics dashboard"
      subtitle="Track learning activity, simulation performance, rewards, and retention."
    >
      <div className={styles.topBar}>
        <label className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search insight or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className={styles.addBtn} onClick={() => setShowAdd(true)}>
          <PlusIcon /> Add insight
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
            <h2>Platform insights</h2>
            <p>Review automated findings, assign categories, and track trends across learning and simulations.</p>
          </div>
        </div>

        <div className={styles.filterRow}>
          {(["All", "Engagement", "Retention risk", "Positive trend"] as FilterType[]).map((f) => (
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

        <div className={styles.insightTable}>
          {visible.length === 0 && <div className={styles.empty}>No insights match your search.</div>}
          {visible.map((insight) => {
            const currentCategory = categoryOptions.find((c) => c.value === insight.category);
            return (
              <article key={insight.id} className={styles.insightRow}>
                <div className={styles.insightIdentity}>
                  <span
                    className={styles.avatar}
                    style={{ background: `${insight.accentColor}20`, color: insight.accentColor }}
                  >
                    {categoryLabel(insight.category)[0]}
                  </span>
                  <div>
                    <strong>{insight.title}</strong>
                    <span>{insight.detail}</span>
                  </div>
                </div>

                <div className={styles.configDetails}>
                  <label htmlFor={`category-${insight.id}`}>Insight category</label>
                  <select
                    id={`category-${insight.id}`}
                    value={insight.category}
                    onChange={(e) =>
                      handleCategoryChange(insight.id, e.target.value as InsightCategory)
                    }
                  >
                    {categoryOptions.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <span>{currentCategory?.description}</span>
                </div>

                <span className={statusClass(insight.category)}>{categoryLabel(insight.category)}</span>

                <div className={styles.actions}>
                  <button type="button" className={styles.btnEdit} onClick={() => openEdit(insight)}>
                    <EditIcon /> Edit
                  </button>
                  <button type="button" className={styles.btnDelete} onClick={() => setDeleteTarget(insight)}>
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
            <h3 className={styles.modalTitle}>Edit insight</h3>

            <div className={styles.modalField}>
              <label>Insight</label>
              <input
                className={styles.modalInput}
                value={editForm.title}
                onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Insight headline"
              />
            </div>

            <div className={styles.modalField}>
              <label>Detail</label>
              <textarea
                className={styles.modalTextarea}
                value={editForm.detail}
                onChange={(e) => setEditForm((f) => ({ ...f, detail: e.target.value }))}
                placeholder="Supporting context for admins"
              />
            </div>

            <div className={styles.modalField}>
              <label>Category</label>
              <select
                className={styles.modalSelect}
                value={editForm.category}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, category: e.target.value as InsightCategory }))
                }
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
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
            <h3 className={styles.deleteTitle}>Delete insight?</h3>
            <p className={styles.deleteDesc}>
              Are you sure you want to remove <strong>{deleteTarget.title}</strong>? It will no longer appear on the
              analytics dashboard.
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
            <h3 className={styles.modalTitle}>Add insight</h3>

            <div className={styles.modalField}>
              <label>Insight</label>
              <input
                className={styles.modalInput}
                value={addForm.title}
                onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Peak usage: Tue–Thu 18:00–21:00"
              />
            </div>

            <div className={styles.modalField}>
              <label>Detail</label>
              <textarea
                className={styles.modalTextarea}
                value={addForm.detail}
                onChange={(e) => setAddForm((f) => ({ ...f, detail: e.target.value }))}
                placeholder="Supporting context"
              />
            </div>

            <div className={styles.modalField}>
              <label>Category</label>
              <select
                className={styles.modalSelect}
                value={addForm.category}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, category: e.target.value as InsightCategory }))
                }
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setShowAdd(false)}>
                Cancel
              </button>
              <button type="button" className={styles.btnSave} onClick={saveAdd}>
                Add insight
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
