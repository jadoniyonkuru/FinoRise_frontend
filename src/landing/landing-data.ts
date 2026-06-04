export type PortalCard = {
  id: "learner" | "admin" | "partner";
  title: string;
  subtitle: string;
  cta: string;
  href: string;
};

export const PORTALS: PortalCard[] = [
  {
    id: "learner",
    title: "For Learners",
    subtitle: "Modules, simulations, XP rewards, and AI coaching in one hub.",
    cta: "Start learning",
    href: "/auth/register",
  },
  {
    id: "admin",
    title: "For Admins",
    subtitle: "Manage users, content, simulations, rewards, and platform analytics.",
    cta: "Open admin console",
    href: "/auth/admin-login",
  },
  {
    id: "partner",
    title: "For Partners",
    subtitle: "Fund programs and measure reach, completions, and learner impact.",
    cta: "View partner portal",
    href: "/auth/login",
  },
];

/** Hero cards on the public landing page only (no admin card). */
export const LANDING_PORTALS: PortalCard[] = PORTALS.filter((p) => p.id !== "admin");

export const FEATURES = [
  {
    title: "Learning modules",
    description:
      "Structured lessons across budgeting, debt, emergency savings, loans, and investing—with quizzes and progress tracking.",
    icon: "book",
  },
  {
    title: "Financial simulations",
    description:
      "Branching scenario simulations where learners practice real decisions and see outcomes instantly.",
    icon: "sim",
  },
  {
    title: "Gamification & rewards",
    description:
      "XP, levels, streaks, badges, and a reward catalog that keeps learners motivated and coming back.",
    icon: "reward",
  },
  {
    title: "AI financial coach",
    description:
      "On-demand guidance, simulation explanations, and personalized learning recommendations powered by AI.",
    icon: "ai",
  },
  {
    title: "Admin control center",
    description:
      "User management, module publishing, simulation setup, reward configuration, and platform analytics.",
    icon: "admin",
  },
  {
    title: "Partner programs & impact",
    description:
      "Partners fund learning paths, publish cohort programs, and track learners reached and outcomes.",
    icon: "partner",
  },
];

export const PROGRAMS = [
  {
    title: "Budgeting fundamentals",
    category: "Budgeting",
    difficulty: "Beginner",
    description: "Build a monthly budget, track spending habits, and set realistic savings goals.",
    xp: "120 XP",
  },
  {
    title: "Emergency preparedness",
    category: "Emergency",
    difficulty: "Beginner",
    description: "Create an emergency fund plan and practice crisis decision-making simulations.",
    xp: "100 XP",
  },
  {
    title: "Debt management",
    category: "Debt",
    difficulty: "Intermediate",
    description: "Understand interest, payoff strategies, and healthy borrowing behavior.",
    xp: "150 XP",
  },
  {
    title: "Loan literacy",
    category: "Loan",
    difficulty: "Intermediate",
    description: "Compare loan types, rates, and terms before committing to credit products.",
    xp: "130 XP",
  },
  {
    title: "Investing basics",
    category: "Investing",
    difficulty: "Advanced",
    description: "Introduction to risk, diversification, and long-term wealth building.",
    xp: "180 XP",
  },
  {
    title: "Partner-funded cohorts",
    category: "Partner",
    difficulty: "All levels",
    description: "Organizations sponsor custom learning paths for schools, NGOs, and workplaces.",
    xp: "Custom XP",
  },
];

export const IMPACT_STATS = [
  { value: "2", label: "Portals", hint: "Learner & partner" },
  { value: "5+", label: "Finance topics", hint: "Budgeting to investing" },
  { value: "100%", label: "Scenario-based", hint: "Learn by doing" },
  { value: "24/7", label: "AI coach access", hint: "Guidance on demand" },
];

export const IMPACT_POINTS = [
  {
    title: "Learner outcomes",
    text: "Track module completion, quiz scores, simulation performance, XP earned, and behavioral insights over time.",
  },
  {
    title: "Platform visibility",
    text: "Admins monitor engagement, active simulations, reward redemptions, and content health from a single analytics dashboard.",
  },
  {
    title: "Partner accountability",
    text: "Partners see learners reached, categories covered, difficulty mix, and total XP available across funded programs.",
  },
];
