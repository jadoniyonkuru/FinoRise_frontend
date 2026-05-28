import { useState } from "react";
import LearnerLayout from "../LearnerLayout";
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
function IconStar() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ─── Card visual SVGs ─── */
function VisualFrame() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <circle cx="140" cy="80" r="55" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="10" />
      <circle cx="140" cy="80" r="40" fill="rgba(255,255,255,0.15)" />
      <circle cx="140" cy="80" r="22" fill="rgba(255,255,255,0.25)" />
      <circle cx="140" cy="80" r="8" fill="rgba(255,255,255,0.6)" />
      <circle cx="140" cy="25" r="5" fill="rgba(255,255,255,0.5)" />
      <circle cx="140" cy="135" r="5" fill="rgba(255,255,255,0.5)" />
      <circle cx="85" cy="80" r="5" fill="rgba(255,255,255,0.5)" />
      <circle cx="195" cy="80" r="5" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}
function VisualCoffee() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <ellipse cx="140" cy="90" rx="38" ry="42" fill="rgba(255,255,255,0.2)" />
      <rect x="102" y="55" width="76" height="75" rx="10" fill="rgba(255,255,255,0.25)" />
      <path d="M178 75 Q195 75 195 90 Q195 105 178 105" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="140" cy="55" rx="38" ry="8" fill="rgba(255,255,255,0.3)" />
      <path d="M125 30 Q130 20 135 30 Q140 20 145 30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function VisualKey() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <circle cx="110" cy="75" r="32" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="10" />
      <circle cx="110" cy="75" r="15" fill="rgba(255,255,255,0.25)" />
      <rect x="138" y="72" width="70" height="12" rx="6" fill="rgba(255,255,255,0.5)" />
      <rect x="190" y="84" width="12" height="18" rx="3" fill="rgba(255,255,255,0.5)" />
      <rect x="172" y="84" width="12" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}
function VisualPhone() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <rect x="108" y="20" width="64" height="120" rx="12" fill="rgba(255,255,255,0.25)" />
      <rect x="116" y="35" width="48" height="80" rx="5" fill="rgba(255,255,255,0.2)" />
      <circle cx="140" cy="125" r="6" fill="rgba(255,255,255,0.5)" />
      <path d="M125 60 L155 60 M125 72 L148 72 M125 84 L152 84" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function VisualCrown() {
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
function VisualCert() {
  return (
    <svg viewBox="0 0 280 160" className={s.cardVisualSvg}>
      <rect x="80" y="30" width="120" height="95" rx="8" fill="rgba(255,255,255,0.2)" />
      <rect x="90" y="42" width="100" height="6" rx="3" fill="rgba(255,255,255,0.5)" />
      <rect x="95" y="56" width="60" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="90" y="68" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
      <rect x="90" y="76" width="80" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
      <rect x="90" y="84" width="90" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
      <circle cx="140" cy="108" r="12" fill="rgba(255,255,255,0.5)" />
      <text x="140" y="113" textAnchor="middle" style={{ fill: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 800, fontFamily: "inherit" }}>✓</text>
    </svg>
  );
}

/* ─── Data ─── */
const XP_BALANCE = 2450;
const XP_LVL_CURRENT = 450;
const XP_LVL_NEXT = 1000;
const LEVEL = 3;

type Tag = "Digital" | "Discount" | "Airtime" | "Premium" | "Voucher";

type Reward = {
  id: number;
  name: string;
  partner: string;
  description: string;
  cost: number;
  tag: Tag;
  popular?: boolean;
  gradient: string;
  visual: React.ReactNode;
};

const rewards: Reward[] = [
  {
    id: 1,
    name: "Financial Master Avatar Frame",
    partner: "FinoRise",
    description: "Exclusive gold-plated profile border for elite learners. Show off your status in the community.",
    cost: 500,
    tag: "Digital",
    popular: true,
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 50%, #fbbf24 100%)",
    visual: <VisualFrame />,
  },
  {
    id: 2,
    name: "Starbucks Gift Voucher",
    partner: "Starbucks",
    description: "Redeem 1,200 XP for a $5 Starbucks coffee. Real-world rewards for your educational efforts.",
    cost: 1200,
    tag: "Discount",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%)",
    visual: <VisualCoffee />,
  },
  {
    id: 3,
    name: "Advanced Investing Module Unlock",
    partner: "FinoRise",
    description: "Bypass level requirements for the 'Advanced Crypto Strategies' module.",
    cost: 800,
    tag: "Digital",
    gradient: "linear-gradient(135deg, #1e2d5c 0%, #1d4ed8 60%, #60a5fa 100%)",
    visual: <VisualKey />,
  },
  {
    id: 4,
    name: "MTN Airtime Bundle",
    partner: "MTN Rwanda",
    description: "RWF 1,000 airtime + 1 GB mobile data valid for 7 days. Instantly credited to your number.",
    cost: 400,
    tag: "Airtime",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #ea580c 60%, #fb923c 100%)",
    visual: <VisualPhone />,
  },
  {
    id: 5,
    name: "FinoRise Pro – 1 Month",
    partner: "FinoRise",
    description: "Full Pro tier: unlimited AI Coach sessions, advanced analytics, exclusive simulations, and no ads.",
    cost: 1500,
    tag: "Premium",
    popular: true,
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a78bfa 100%)",
    visual: <VisualCrown />,
  },
  {
    id: 6,
    name: "Financial Literacy Certificate",
    partner: "FinoRise",
    description: "Official digital certificate verifiable via blockchain. Share on LinkedIn and your resume.",
    cost: 800,
    tag: "Digital",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #93c5fd 100%)",
    visual: <VisualCert />,
  },
];

type HistoryItem = { id: number; name: string; cost: number; date: string; status: "Delivered" | "Processing" };
const history: HistoryItem[] = [
  { id: 1, name: "Airtime Top-up",           cost: 200,  date: "May 20, 2026", status: "Delivered" },
  { id: 2, name: "Budget Master Badge",       cost: 150,  date: "May 14, 2026", status: "Delivered" },
  { id: 3, name: "Learning Voucher – Coursera", cost: 500, date: "May 05, 2026", status: "Delivered" },
];

const tagColors: Record<Tag, { bg: string; color: string }> = {
  Digital:  { bg: "#eff6ff", color: "#2563eb" },
  Discount: { bg: "#f0fdf4", color: "#16a34a" },
  Airtime:  { bg: "#fff7ed", color: "#ea580c" },
  Premium:  { bg: "#fdf4ff", color: "#9333ea" },
  Voucher:  { bg: "#fefce8", color: "#ca8a04" },
};

type Tab = "marketplace" | "history";

/* ─── Modal ─── */
type ModalState = { open: boolean; reward: Reward | null; done: boolean };

export default function RewardCatalogPage() {
  const [tab, setTab] = useState<Tab>("marketplace");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalState>({ open: false, reward: null, done: false });

  const visible = rewards.filter(r =>
    search.trim() === "" ||
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.partner.toLowerCase().includes(search.toLowerCase())
  );

  function openModal(r: Reward) {
    if (XP_BALANCE >= r.cost) setModal({ open: true, reward: r, done: false });
  }

  function confirm() { setModal(m => ({ ...m, done: true })); }
  function closeModal() { setModal({ open: false, reward: null, done: false }); }

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
            <div className={s.streakSub}>3 items this month</div>
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
            <span className={s.walletLevelLabel}>Level {LEVEL}</span>
            <div className={s.walletBar}>
              <div className={s.walletBarFill} style={{ width: `${(XP_LVL_CURRENT / XP_LVL_NEXT) * 100}%` }} />
            </div>
            <span className={s.walletLevelNext}>{XP_LVL_CURRENT}/{XP_LVL_NEXT} XP to Lvl {LEVEL + 1}</span>
          </div>
        </div>
        <div className={s.walletTotal}>
          <span className={s.walletXp}>{XP_BALANCE.toLocaleString()}</span>
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
        <div className={s.grid}>
          {visible.map(r => {
            const affordable = XP_BALANCE >= r.cost;
            const tc = tagColors[r.tag];
            return (
              <div key={r.id} className={`${s.card} ${!affordable ? s.cardDimmed : ""}`}>
                {/* Visual area */}
                <div className={s.cardVisual} style={{ background: r.gradient }}>
                  {r.visual}
                  {r.popular && <span className={s.popularBadge}><IconStar /> Popular</span>}
                  <span className={s.tagBadge} style={{ background: tc.bg, color: tc.color }}>{r.tag}</span>
                </div>
                {/* Body */}
                <div className={s.cardBody}>
                  <div className={s.cardName}>{r.name}</div>
                  <div className={s.cardPartner}>{r.partner}</div>
                  <div className={s.cardDesc}>{r.description}</div>
                  <div className={s.cardCost}>
                    <IconBolt /> {r.cost.toLocaleString()} XP
                  </div>
                  <button
                    type="button"
                    className={`${s.redeemBtn} ${!affordable ? s.redeemBtnDisabled : ""}`}
                    disabled={!affordable}
                    onClick={() => openModal(r)}
                  >
                    <IconGift />
                    {affordable ? "Redeem Now" : `Need ${(r.cost - XP_BALANCE).toLocaleString()} more XP`}
                  </button>
                </div>
              </div>
            );
          })}
          {visible.length === 0 && (
            <div className={s.empty}>No rewards match your search.</div>
          )}
        </div>
      )}

      {/* ── History tab ── */}
      {tab === "history" && (
        <div className={s.historyCard}>
          <div className={s.historyHeader}>
            <span className={s.historyTitle}>Redemption History</span>
            <span className={s.historySub}>{history.length} redemptions</span>
          </div>
          {history.map(h => (
            <div key={h.id} className={s.historyRow}>
              <div className={s.historyIcon}><IconCheck /></div>
              <div className={s.historyBody}>
                <div className={s.historyName}>{h.name}</div>
                <div className={s.historyDate}>{h.date}</div>
              </div>
              <div className={s.historyCost}>-{h.cost} XP</div>
              <span className={`${s.historyStatus} ${h.status === "Delivered" ? s.historyDelivered : s.historyProcessing}`}>
                {h.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Redeem modal ── */}
      {modal.open && modal.reward && (
        <div className={s.overlay} onClick={closeModal}>
          <div className={s.modal} onClick={e => e.stopPropagation()}>
            {!modal.done ? (
              <>
                <div className={s.modalVisual} style={{ background: modal.reward.gradient }}>
                  {modal.reward.visual}
                </div>
                <h3 className={s.modalTitle}>{modal.reward.name}</h3>
                <p className={s.modalDesc}>{modal.reward.description}</p>
                <div className={s.modalCost}><IconBolt /> {modal.reward.cost.toLocaleString()} XP will be deducted</div>
                <div className={s.modalBalance}>
                  Balance: {XP_BALANCE.toLocaleString()} → {(XP_BALANCE - modal.reward.cost).toLocaleString()} XP
                </div>
                <div className={s.modalActions}>
                  <button type="button" className={s.modalCancel} onClick={closeModal}>Cancel</button>
                  <button type="button" className={s.modalConfirm} onClick={confirm}>Confirm Redemption</button>
                </div>
              </>
            ) : (
              <>
                <div className={s.modalSuccessIcon}><IconCheck /></div>
                <h3 className={s.modalTitle}>Redeemed!</h3>
                <p className={s.modalDesc}>
                  <strong>{modal.reward.name}</strong> has been redeemed successfully.
                  Check your email for delivery details.
                </p>
                <button type="button" className={s.modalConfirm} onClick={closeModal}>Done</button>
              </>
            )}
          </div>
        </div>
      )}
    </LearnerLayout>
  );
}
