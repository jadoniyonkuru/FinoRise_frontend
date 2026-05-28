import { useState } from "react";
import LearnerLayout from "../LearnerLayout";
import styles from "./rewards.module.css";

const XP_BALANCE = 2340;

type Category = "all" | "airtime" | "voucher" | "offer";

type Reward = {
  id: number;
  name: string;
  partner: string;
  description: string;
  category: Category;
  cost: number;
};

const rewards: Reward[] = [
  {
    id: 1,
    name: "Airtime Top-up",
    partner: "MTN Rwanda",
    description: "RWF 500 mobile airtime credit",
    category: "airtime",
    cost: 200,
  },
  {
    id: 2,
    name: "Learning Voucher",
    partner: "Coursera",
    description: "1-month premium course access",
    category: "voucher",
    cost: 500,
  },
  {
    id: 3,
    name: "Partner Discount",
    partner: "Bank of Kigali",
    description: "10% off account opening fees",
    category: "offer",
    cost: 300,
  },
  {
    id: 4,
    name: "Certificate of Achievement",
    partner: "FinoRise",
    description: "Official digital certificate",
    category: "voucher",
    cost: 800,
  },
  {
    id: 5,
    name: "Mentorship Session",
    partner: "FinoRise",
    description: "1-hour financial advisor session",
    category: "offer",
    cost: 1000,
  },
  {
    id: 6,
    name: "Airtime Bundle",
    partner: "Airtel Rwanda",
    description: "RWF 1,000 airtime + 1 GB data",
    category: "airtime",
    cost: 400,
  },
];

const filters: { id: Category; label: string }[] = [
  { id: "all", label: "All rewards" },
  { id: "airtime", label: "Airtime" },
  { id: "voucher", label: "Vouchers" },
  { id: "offer", label: "Partner offers" },
];

export default function LearnerRewardsPage() {
  const [filter, setFilter] = useState<Category>("all");

  const visible =
    filter === "all" ? rewards : rewards.filter((r) => r.category === filter);

  return (
    <LearnerLayout title="Rewards" subtitle="Redeem your XP for real-world rewards">
      <div className={styles.rewardsPage}>
        {/* XP wallet */}
        <div className={styles.xpWallet}>
          <div>
            <div className={styles.xpAmount}>{XP_BALANCE.toLocaleString()}</div>
            <div className={styles.xpLabel}>XP available to redeem</div>
          </div>
          <div className={styles.xpDivider} />
          <div>
            <div className={styles.levelAmount}>
              Lv 7
            </div>
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
        <div className={styles.rewardGrid}>
          {visible.map((r) => {
            const affordable = XP_BALANCE >= r.cost;
            return (
              <div key={r.id} className={styles.rewardCard}>
                <div className={styles.rewardName}>{r.name}</div>
                <div className={styles.rewardPartner}>{r.partner}</div>
                <div className={styles.rewardDesc}>{r.description}</div>
                <div className={styles.rewardCost}>{r.cost} XP</div>
                <button
                  type="button"
                  className={styles.redeemBtn}
                  disabled={!affordable}
                >
                  {affordable ? "Redeem" : `Need ${r.cost - XP_BALANCE} more XP`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </LearnerLayout>
  );
}
