import DashboardLayout from "@/components/DashboardLayout";
import { partnerNavItems } from "../partnerNav";
import statStyles from "@/components/StatCard.module.css";
import x from "@/components/dashboard-extras.module.css";

const stats = [
  { label: "Learners funded", value: "156", hint: "Across all programs" },
  { label: "Certifications issued", value: "89", hint: "57% of learners" },
  { label: "Districts reached", value: "8", hint: "Across Rwanda" },
  { label: "Behavior improvement", value: "+23%", hint: "Avg score change" },
];

type Level = "positive" | "warning" | "neutral";

const impacts: { category: string; text: string; level: Level }[] = [
  {
    category: "Completion rate",
    level: "positive",
    text: "92% of your funded learners completed at least 3 modules — significantly above the platform average of 64%. Your programs demonstrate strong learner engagement.",
  },
  {
    category: "Financial behavior",
    level: "positive",
    text: "Learners in your programs showed a 23% average improvement in behavioral finance scores after 8 weeks, indicating measurable improvements in real-world financial decision-making.",
  },
  {
    category: "Geographic reach",
    level: "neutral",
    text: "Your funding currently reaches 8 districts. 73% of learners are from urban areas. Expanding the Rural Savings Initiative could significantly increase rural financial literacy impact.",
  },
  {
    category: "Retention risk",
    level: "warning",
    text: "The Women Entrepreneurs program shows a 15% drop-off after Module 4. Consider adding a motivational nudge, peer check-in, or mentor support at that stage to improve completion.",
  },
  {
    category: "Gender impact",
    level: "positive",
    text: "62 women enrolled in the Women Entrepreneurs program show 28% higher savings rate improvements compared to the platform average, demonstrating strong program effectiveness.",
  },
];

function levelClass(level: Level) {
  if (level === "positive") return x.insightCategoryPositive;
  if (level === "warning") return x.insightCategoryWarning;
  return x.insightCategoryNeutral;
}

export default function PartnerImpactPage() {
  return (
    <DashboardLayout
      role="partner"
      title="Impact"
      subtitle="Measure the difference your funding makes"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        <div className={statStyles.grid}>
          {stats.map((s) => (
            <div
              key={s.label}
              className={statStyles.card}
              data-accent
              style={{ "--accent": "var(--partner)" } as React.CSSProperties}
            >
              <div className={statStyles.label}>{s.label}</div>
              <div className={statStyles.value}>{s.value}</div>
              <div className={statStyles.hint}>{s.hint}</div>
            </div>
          ))}
        </div>

        <section className={statStyles.panel} style={{ marginTop: "1.5rem" }}>
          <h2>Impact analysis</h2>
          <div className={x.insightsList}>
            {impacts.map((item) => (
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
    </DashboardLayout>
  );
}
