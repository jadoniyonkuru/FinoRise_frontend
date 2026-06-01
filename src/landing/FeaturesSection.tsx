import { Bot, Compass, Trophy, BarChart3, Users2, GraduationCap } from 'lucide-react';

const features = [
  {
    title: "AI Behavioral Coach",
    description:
      "Get personalized feedback on every decision you make in our high-stakes simulations.",
    icon: Bot,
  },
  {
    title: "Immersive Scenarios",
    description:
      "Navigate branching narratives of budgeting, debt recovery, and investment growth.",
    icon: Compass,
  },
  {
    title: "Gamified Progression",
    description:
      "Earn XP, unlock rare badges, and compete for partner-sponsored real-world rewards.",
    icon: Trophy,
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track your financial decisions with detailed performance metrics and AI insights.",
    icon: BarChart3,
  },
  {
    title: "Community Challenges",
    description:
      "Compete with peers in weekly financial challenges and climb the leaderboard.",
    icon: Users2,
  },
  {
    title: "Expert-Led Content",
    description:
      "Access courses and webinars from industry leaders and certified financial planners.",
    icon: GraduationCap,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-[#f8fafc] scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-[36px] font-bold text-[#1e293b] mb-3">
            Master Every Domain
          </h2>
          <p className="text-[#64748b] max-w-2xl mx-auto text-base">
            Our intelligent system bridges the gap between theory and real-world behavior.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="text-[#0ea5e9] mb-4">
                <feature.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-semibold text-[#1e293b] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#64748b] text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}