import LearnerLayout from "../LearnerLayout";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";

const summary = [
  { label: "Risk profile", value: "Conservative", hint: "Stability-focused" },
  { label: "Avg savings rate", value: "18%", hint: "Target: 20–30%" },
  { label: "Decision consistency", value: "74%", hint: "Above average" },
  { label: "Behavioral score", value: "62 / 100", hint: "+8 this month" },
];

type Level = "positive" | "warning" | "neutral";

const insights: { category: string; text: string; level: Level }[] = [
  {
    category: "Spending",
    level: "warning",
    text: "You tend to overspend under time pressure. In 3 of your last 5 emergency simulations you exceeded your budget by 15–25%. Try the pause-and-plan technique before making urgent financial decisions.",
  },
  {
    category: "Savings",
    level: "positive",
    text: "Your savings allocation is improving. You averaged an 18% savings rate in recent simulations, up from 12% last month. Keep progressing toward the 20–30% target for financial security.",
  },
  {
    category: "Risk tolerance",
    level: "neutral",
    text: "Conservative risk profile detected. You consistently choose low-risk options, which is great for stability. Consider adding 10–15% moderate-risk investments to improve long-term growth potential.",
  },
  {
    category: "Long-term planning",
    level: "warning",
    text: "You tend to avoid long-term planning scenarios. Only 2 of your last 10 simulations involved multi-year decisions. Practicing long-term financial thinking now builds stronger future resilience.",
  },
  {
    category: "Learning consistency",
    level: "positive",
    text: "7-day learning streak — you are in the top 15% of users for consistency. Regular practice is the strongest predictor of improved real-world financial behavior.",
  },
];

function levelClass(level: Level) {
  if (level === "positive") return x.insightCategoryPositive;
  if (level === "warning") return x.insightCategoryWarning;
  return x.insightCategoryNeutral;
}

export default function BehavioralInsightsPage() {
  return (
    <LearnerLayout title="Behavioral insights" subtitle="Understand your financial decision patterns">
      <div style={{ "--accent": "#0ea5e9" } as React.CSSProperties}>
        <div className={statStyles.grid}>
          {summary.map((s) => (
            <div
              key={s.label}
              className={statStyles.card}
              data-accent
              style={{ "--accent": "#0ea5e9" } as React.CSSProperties}
            >
              <div className={statStyles.label}>{s.label}</div>
              <div className={statStyles.value}>{s.value}</div>
              <div className={statStyles.hint}>{s.hint}</div>
            </div>
          ))}
        </div>

        <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
          <h2>Your behavioral analysis</h2>
          <div className={x.insightsList}>
            {insights.map((item) => (
              <div key={item.category} className={x.insightItem}>
                <div
                  className={`${x.insightCategory} ${levelClass(item.level)}`}
                >
                  {item.category}
                </div>
                <p className={x.insightText}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </LearnerLayout>
  );
}
