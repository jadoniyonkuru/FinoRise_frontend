import { useEffect, useState } from "react";
import LearnerLayout from "../LearnerLayout";
import { useAuth } from "@/context/AuthContext";
import { rewardsService } from "@/api";
import type { Reward, Redemption, RewardType } from "@/api";
import s from "./reward-catalog.module.css";

/* ─── Icons ─── */
function IconTrophy() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" />
      <path d="M5 4H3a2 2 0 0 0-2 2v3a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V6a2 2 0 0 0-2-2h-2" />
      <rect x="5" y="2" width="14" height="6" rx="2" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L9.5 22L20 10.5H13.5L13 2Z" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconHistory() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconFilter() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function IconGift() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
/* ─── Card visual SVGs ─── */
function VisualDefault() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <circle cx="140" cy="80" r="55" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="10" />
      <circle cx="140" cy="80" r="40" fill="rgba(255,255,255,0.15)" />
      <circle cx="140" cy="80" r="22" fill="rgba(255,255,255,0.25)" />
      <circle cx="140" cy="80" r="8" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
}
function VisualAirtime() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <rect x="108" y="20" width="64" height="120" rx="12" fill="rgba(255,255,255,0.25)" />
      <rect x="116" y="35" width="48" height="80" rx="5" fill="rgba(255,255,255,0.2)" />
      <circle cx="140" cy="125" r="6" fill="rgba(255,255,255,0.5)" />
      <path d="M125 60 L155 60 M125 72 L148 72 M125 84 L152 84" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function VisualDiscount() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <ellipse cx="140" cy="90" rx="38" ry="42" fill="rgba(255,255,255,0.2)" />
      <rect x="102" y="55" width="76" height="75" rx="10" fill="rgba(255,255,255,0.25)" />
      <path d="M178 75 Q195 75 195 90 Q195 105 178 105" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="140" cy="55" rx="38" ry="8" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}
function VisualVoucher() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <rect x="80" y="30" width="120" height="95" rx="8" fill="rgba(255,255,255,0.2)" />
      <rect x="90" y="42" width="100" height="6" rx="3" fill="rgba(255,255,255,0.5)" />
      <rect x="95" y="56" width="60" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="90" y="68" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
      <circle cx="140" cy="108" r="12" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}
function VisualPremium() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <path d="M80 110 L100 55 L140 85 L180 40 L220 55 L200 110 Z" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinejoin="round" />
      <rect x="80" y="110" width="120" height="14" rx="5" fill="rgba(255,255,255,0.4)" />
      <circle cx="100" cy="55" r="7" fill="rgba(255,255,255,0.7)" />
      <circle cx="180" cy="40" r="7" fill="rgba(255,255,255,0.7)" />
      <circle cx="220" cy="55" r="7" fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}

/* ─── Helpers ─── */
type Tag = "Digital" | "Discount" | "Airtime" | "Premium" | "Voucher";

const tagColors: Record<Tag, { bg: string; color: string }> = {
  Digital:  { bg: "#eff6ff", color: "#2563eb" },
  Discount: { bg: "#f0fdf4", color: "#16a34a" },
  Airtime:  { bg: "#fff7ed", color: "#ea580c" },
  Premium:  { bg: "#fdf4ff", color: "#9333ea" },
  Voucher:  { bg: "#fefce8", color: "#ca8a04" },
};

function rewardGradient(type: RewardType): string {
  const map: Record<string, string> = {
    airtime: "linear-gradient(135deg,#7c2d12,#ea580c 60%,#fb923c)",
    discount: "linear-gradient(135deg,#064e3b,#059669 60%,#34d399)",
    voucher: "linear-gradient(135deg,#1e3a5f,#2563eb 60%,#93c5fd)",
    partner_offer: "linear-gradient(135deg,#4c1d95,#7c3aed 60%,#a78bfa)",
  };
  return map[type] ?? "linear-gradient(135deg,#1e2d5c,#1d4ed8 60%,#60a5fa)";
}

function rewardTag(type: RewardType): Tag {
  const map: Record<string, Tag> = {
    airtime: "Airtime",
    discount: "Discount",
    voucher: "Voucher",
    partner_offer: "Premium",
  };
  return map[type] ?? "Digital";
}

function rewardVisual(type: RewardType): React.ReactNode {
  if (type === "airtime") return <VisualAirtime />;
  if (type === "discount") return <VisualDiscount />;
  if (type === "voucher") return <VisualVoucher />;
  if (type === "partner_offer") return <VisualPremium />;
  return <VisualDefault />;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

type Tab = "marketplace" | "history";
type ModalState = { open: boolean; reward: Reward | null; done: boolean; code: string | null };

export default function RewardCatalogPage() {
  const { user, refreshUser } = useAuth();
  const [tab, setTab] = useState<Tab>("marketplace");
  const [search, setSearch] = useState("");
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ open: false, reward: null, done: false, code: null });
  const [redeeming, setRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState("");

  const xpBalance = user?.xp_total ?? 0;
  const level = user?.level ?? 1;

  useEffect(() => {
    Promise.all([rewardsService.getAll(), rewardsService.getMyRedemptions()])
      .then(([r, h]) => { setRewards(r); setRedemptions(h); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const rewardMap = Object.fromEntries(rewards.map(r => [r.id, r]));

  const visible = rewards.filter(r =>
    r.is_active &&
    (search.trim() === "" ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()))
  );

  function openModal(r: Reward) {
    if (xpBalance >= r.xp_cost) {
      setModal({ open: true, reward: r, done: false, code: null });
      setRedeemError("");
    }
  }

  async function confirm() {
    if (!modal.reward) return;
    setRedeeming(true);
    setRedeemError("");
    try {
      const result = await rewardsService.redeem(modal.reward.id);
      await refreshUser();
      const updated = await rewardsService.getMyRedemptions();
      setRedemptions(updated);
      setModal(m => ({ ...m, done: true, code: result.redemption_code }));
    } catch {
      setRedeemError("Redemption failed. Please try again.");
    } finally {
      setRedeeming(false);
    }
  }

  function closeModal() { setModal({ open: false, reward: null, done: false, code: null }); }

  return (
    <LearnerLayout>
      {/* ── Header ── */}
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Rewards &amp; Catalog</h1>
          <p className={s.pageSubtitle}>Spend your hard-earned XP on exclusive assets and perks.</p>
        </div>
        <div className={s.redemptionStreak}>
          <span className={s.streakIcon}><IconGift /></span>
          <div>
            <div className={s.streakTitle}>Redemption Streak</div>
            <div className={s.streakSub}>{redemptions.length} redemptions total</div>
          </div>
        </div>
      </div>

      {/* ── XP Wallet banner ── */}
      <div className={s.walletCard}>
        <div className={s.walletIcon}><IconTrophy /></div>
        <div className={s.walletInfo}>
          <div className={s.walletTitle}>XP Wallet</div>
          <div className={s.walletSub}>Keep learning to unlock premium rewards.</div>
          <div className={s.walletLevelRow}>
            <span className={s.walletLevelLabel}>Level {level}</span>
          </div>
        </div>
        <div className={s.walletTotal}>
          <span className={s.walletXp}>{xpBalance.toLocaleString()}</span>
          <span className={s.walletXpLabel}>Total XP</span>
        </div>
      </div>

      {/* ── Tab + search bar ── */}
      <div className={s.filterBar}>
        <div className={s.tabs}>
          <button
            type="button"
            className={`${s.tabBtn} ${tab === "marketplace" ? s.tabBtnActive : ""}`}
            onClick={() => setTab("marketplace")}
          >
            <IconGrid /> Marketplace
          </button>
          <button
            type="button"
            className={`${s.tabBtn} ${tab === "history" ? s.tabBtnActive : ""}`}
            onClick={() => setTab("history")}
          >
            <IconHistory /> History
          </button>
        </div>
        {tab === "marketplace" && (
          <div className={s.searchRow}>
            <div className={s.searchWrap}>
              <span className={s.searchIcon}><IconSearch /></span>
              <input
                className={s.searchInput}
                placeholder="Search rewards..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button type="button" className={s.filterBtn}><IconFilter /></button>
          </div>
        )}
      </div>

      {/* ── Marketplace grid ── */}
      {tab === "marketplace" && (
        loading ? (
          <p style={{ color: "#6b7280" }}>Loading rewards…</p>
        ) : (
          <div className={s.grid}>
            {visible.map(r => {
              const affordable = xpBalance >= r.xp_cost;
              const tag = rewardTag(r.reward_type);
              const tc = tagColors[tag];
              return (
                <div key={r.id} className={`${s.card} ${!affordable ? s.cardDimmed : ""}`}>
                  <div className={s.cardVisual} style={{ background: rewardGradient(r.reward_type) }}>
                    {rewardVisual(r.reward_type)}
                    <span className={s.tagBadge} style={{ background: tc.bg, color: tc.color }}>{tag}</span>
                  </div>
                  <div className={s.cardBody}>
                    <div className={s.cardName}>{r.title}</div>
                    <div className={s.cardDesc}>{r.description}</div>
                    <div className={s.cardCost}>
                      <IconBolt /> {r.xp_cost.toLocaleString()} XP
                    </div>
                    <button
                      type="button"
                      className={`${s.redeemBtn} ${!affordable ? s.redeemBtnDisabled : ""}`}
                      disabled={!affordable}
                      onClick={() => openModal(r)}
                    >
                      <IconGift />
                      {affordable ? "Redeem Now" : `Need ${(r.xp_cost - xpBalance).toLocaleString()} more XP`}
                    </button>
                  </div>
                </div>
              );
            })}
            {visible.length === 0 && (
              <div className={s.empty}>No rewards match your search.</div>
            )}
          </div>
        )
      )}

      {/* ── History tab ── */}
      {tab === "history" && (
        <div className={s.historyCard}>
          <div className={s.historyHeader}>
            <span className={s.historyTitle}>Redemption History</span>
            <span className={s.historySub}>{redemptions.length} redemptions</span>
          </div>
          {loading ? (
            <p style={{ color: "#6b7280", padding: "1rem 0" }}>Loading history…</p>
          ) : redemptions.length === 0 ? (
            <p style={{ color: "#6b7280", padding: "1rem 0" }}>No redemptions yet.</p>
          ) : (
            redemptions.map(h => {
              const reward = rewardMap[h.reward_id];
              return (
                <div key={h.id} className={s.historyRow}>
                  <div className={s.historyIcon}><IconCheck /></div>
                  <div className={s.historyBody}>
                    <div className={s.historyName}>{reward?.title ?? "Reward"}</div>
                    <div className={s.historyDate}>{formatDate(h.created_at)}</div>
                  </div>
                  <div className={s.historyCost}>-{h.xp_spent} XP</div>
                  <span className={`${s.historyStatus} ${h.status === "confirmed" || h.status === "used" ? s.historyDelivered : s.historyProcessing}`}>
                    {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── Redeem modal ── */}
      {modal.open && modal.reward && (
        <div className={s.overlay} onClick={closeModal}>
          <div className={s.modal} onClick={e => e.stopPropagation()}>
            {!modal.done ? (
              <>
                <div className={s.modalVisual} style={{ background: rewardGradient(modal.reward.reward_type) }}>
                  {rewardVisual(modal.reward.reward_type)}
                </div>
                <h3 className={s.modalTitle}>{modal.reward.title}</h3>
                <p className={s.modalDesc}>{modal.reward.description}</p>
                <div className={s.modalCost}><IconBolt /> {modal.reward.xp_cost.toLocaleString()} XP will be deducted</div>
                <div className={s.modalBalance}>
                  Balance: {xpBalance.toLocaleString()} → {(xpBalance - modal.reward.xp_cost).toLocaleString()} XP
                </div>
                {redeemError && <p style={{ color: "#ef4444", fontSize: "0.8rem", margin: "0.5rem 0 0" }}>{redeemError}</p>}
                <div className={s.modalActions}>
                  <button type="button" className={s.modalCancel} onClick={closeModal}>Cancel</button>
                  <button type="button" className={s.modalConfirm} onClick={confirm} disabled={redeeming}>
                    {redeeming ? "Processing…" : "Confirm Redemption"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={s.modalSuccessIcon}><IconCheck /></div>
                <h3 className={s.modalTitle}>Redeemed!</h3>
                <p className={s.modalDesc}>
                  <strong>{modal.reward.title}</strong> has been redeemed successfully.
                </p>
                {modal.code && (
                  <p style={{ fontFamily: "monospace", background: "#f3f4f6", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.9rem", margin: "0.5rem 0" }}>
                    Code: <strong>{modal.code}</strong>
                  </p>
                )}
                <button type="button" className={s.modalConfirm} onClick={closeModal}>Done</button>
              </>
            )}
          </div>
        </div>
      )}
    </LearnerLayout>
  );
}
