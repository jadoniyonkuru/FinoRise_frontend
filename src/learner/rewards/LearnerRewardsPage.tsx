import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { rewardsService } from "@/api";
import type { Reward } from "@/api";
import LearnerLayout from "../LearnerLayout";
import styles from "./rewards.module.css";

type FilterCategory = "all" | "airtime" | "voucher" | "offer";

const filters: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All rewards" },
  { id: "airtime", label: "Airtime" },
  { id: "voucher", label: "Vouchers" },
  { id: "offer", label: "Partner offers" },
];

function rewardTypeToFilter(reward_type: string): FilterCategory {
  if (reward_type === "airtime") return "airtime";
  if (reward_type === "voucher" || reward_type === "discount") return "voucher";
  return "offer";
}

export default function LearnerRewardsPage() {
  const { user, refreshUser } = useAuth();
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const [message, setMessage] = useState<{ id: string; text: string } | null>(null);

  const xpBalance = user?.xp_total ?? 0;

  useEffect(() => {
    rewardsService.getAll()
      .then(setRewards)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visible = filter === "all"
    ? rewards
    : rewards.filter(r => rewardTypeToFilter(r.reward_type) === filter);

  async function handleRedeem(reward: Reward) {
    setRedeeming(reward.id);
    setMessage(null);
    try {
      const result = await rewardsService.redeem(reward.id);
      setMessage({ id: reward.id, text: `Redeemed! Code: ${result.redemption_code}` });
      await refreshUser();
    } catch {
      setMessage({ id: reward.id, text: "Redemption failed. Please try again." });
    } finally {
      setRedeeming(null);
    }
  }

  return (
    <LearnerLayout title="Rewards" subtitle="Redeem your XP for real-world rewards">
      <div className={styles.rewardsPage}>
        {/* XP wallet */}
        <div className={styles.xpWallet}>
          <div>
            <div className={styles.xpAmount}>{xpBalance.toLocaleString()}</div>
            <div className={styles.xpLabel}>XP available to redeem</div>
          </div>
          <div className={styles.xpDivider} />
          <div>
            <div className={styles.levelAmount}>Lv {user?.level ?? "—"}</div>
            <div className={styles.xpLabel}>Current level</div>
          </div>
        </div>

        {/* Filter */}
        <div className={styles.filterRow}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.filterTab}
              data-active={String(filter === f.id)}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reward cards */}
        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading rewards…</p>
        ) : (
          <div className={styles.rewardGrid}>
            {visible.map((r) => {
              const affordable = xpBalance >= r.xp_cost;
              const isRedeeming = redeeming === r.id;
              const msg = message?.id === r.id ? message.text : null;
              return (
                <div key={r.id} className={styles.rewardCard}>
                  <div className={styles.rewardName}>{r.title}</div>
                  <div className={styles.rewardPartner}>{r.reward_type}</div>
                  <div className={styles.rewardDesc}>{r.description}</div>
                  <div className={styles.rewardCost}>{r.xp_cost.toLocaleString()} XP</div>
                  {msg && <div style={{ fontSize: "0.8rem", color: msg.startsWith("Redeemed") ? "#16a34a" : "#ef4444", marginBottom: "0.5rem" }}>{msg}</div>}
                  <button
                    type="button"
                    className={styles.redeemBtn}
                    disabled={!affordable || isRedeeming}
                    onClick={() => handleRedeem(r)}
                  >
                    {isRedeeming ? "Redeeming…" : affordable ? "Redeem" : `Need ${(r.xp_cost - xpBalance).toLocaleString()} more XP`}
                  </button>
                </div>
              );
            })}
            {visible.length === 0 && (
              <p style={{ color: "#6b7280" }}>No rewards in this category.</p>
            )}
          </div>
        )}
      </div>
    </LearnerLayout>
  );
}
