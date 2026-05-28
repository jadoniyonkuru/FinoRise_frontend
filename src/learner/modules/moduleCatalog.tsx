import type { ReactNode } from "react";

export type LessonType = "video" | "text" | "quiz";

export type ModuleLesson = {
  id: number;
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
};

export type Module = {
  id: number;
  category: "Essentials" | "Investing" | "Advanced";
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  xp: number;
  icon: ReactNode;
  lessons: ModuleLesson[];
};

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function GradCapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function CryptoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function DebtIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

export const modules: Module[] = [
  {
    id: 1,
    category: "Essentials",
    title: "Budgeting 101",
    description: "Master the 50/30/20 rule and build a realistic spending plan that sticks.",
    difficulty: "Beginner",
    duration: "45 mins",
    xp: 500,
    icon: <WalletIcon />,
    lessons: [
      { id: 101, title: "Budgeting fundamentals", type: "video", duration: "08:15", completed: true },
      { id: 102, title: "The 50/30/20 rule", type: "text", duration: "06:00", completed: true },
      { id: 103, title: "Expense tracking practice", type: "video", duration: "10:30", completed: true },
      { id: 104, title: "Building your starter budget", type: "quiz", duration: "12:00", completed: false },
      { id: 105, title: "Real-life budgeting scenarios", type: "video", duration: "14:00", completed: false },
    ],
  },
  {
    id: 2,
    category: "Investing",
    title: "Stock Market Basics",
    description: "Understand market cycles, stocks, and how beginners can start investing with confidence.",
    difficulty: "Intermediate",
    duration: "1.5 hours",
    xp: 850,
    icon: <TrendIcon />,
    lessons: [
      { id: 201, title: "Market basics", type: "video", duration: "09:40", completed: true },
      { id: 202, title: "Stocks vs. ETFs", type: "text", duration: "05:20", completed: true },
      { id: 203, title: "Reading market news", type: "video", duration: "11:15", completed: false },
      { id: 204, title: "Risk management essentials", type: "quiz", duration: "13:05", completed: false },
      { id: 205, title: "First portfolio plan", type: "video", duration: "15:50", completed: false },
    ],
  },
  {
    id: 3,
    category: "Advanced",
    title: "Tax Optimization",
    description: "Advanced, legal tax strategies for minimizing liabilities and improving cashflow.",
    difficulty: "Advanced",
    duration: "2 hours",
    xp: 1200,
    icon: <ShieldIcon />,
    lessons: [
      { id: 301, title: "Tax filing fundamentals", type: "video", duration: "09:10", completed: true },
      { id: 302, title: "Deductions that matter", type: "text", duration: "07:30", completed: true },
      { id: 303, title: "Tax brackets explained", type: "video", duration: "13:15", completed: false },
      { id: 304, title: "Planning your yearly strategy", type: "quiz", duration: "16:00", completed: false },
    ],
  },
  {
    id: 4,
    category: "Essentials",
    title: "Credit Score Mastery",
    description: "Learn how credit scores are calculated, then take action to improve your rating.",
    difficulty: "Beginner",
    duration: "1 hour",
    xp: 600,
    icon: <CardIcon />,
    lessons: [
      { id: 401, title: "How credit scores work", type: "video", duration: "08:45", completed: true },
      { id: 402, title: "The five factors that move your score", type: "text", duration: "06:20", completed: true },
      { id: 403, title: "Repairing negative marks", type: "video", duration: "10:10", completed: true },
      { id: 404, title: "Smart credit habits", type: "quiz", duration: "11:50", completed: true },
      { id: 405, title: "Credit score action checklist", type: "text", duration: "05:30", completed: true },
    ],
  },
  {
    id: 5,
    category: "Investing",
    title: "Retirement Planning",
    description: "Compare retirement accounts and plan for long-term wealth with confidence.",
    difficulty: "Intermediate",
    duration: "1.5 hours",
    xp: 900,
    icon: <GradCapIcon />,
    lessons: [
      { id: 501, title: "Retirement accounts overview", type: "video", duration: "09:00", completed: true },
      { id: 502, title: "Compound growth basics", type: "text", duration: "07:10", completed: false },
      { id: 503, title: "401(k) vs IRA", type: "video", duration: "12:25", completed: false },
      { id: 504, title: "Build a retirement timeline", type: "quiz", duration: "14:50", completed: false },
    ],
  },
  {
    id: 6,
    category: "Advanced",
    title: "Crypto Fundamentals",
    description: "Understand blockchain basics, wallet safety, and the risks behind crypto investing.",
    difficulty: "Advanced",
    duration: "2 hours",
    xp: 1100,
    icon: <CryptoIcon />,
    lessons: [
      { id: 601, title: "Blockchain foundations", type: "video", duration: "10:05", completed: true },
      { id: 602, title: "Wallet safety basics", type: "text", duration: "06:40", completed: false },
      { id: 603, title: "Crypto market cycles", type: "video", duration: "14:20", completed: false },
      { id: 604, title: "Risk and scam awareness", type: "quiz", duration: "11:30", completed: false },
    ],
  },
  {
    id: 7,
    category: "Essentials",
    title: "Emergency Fund Planning",
    description: "Build a safety net that protects your goals and keeps your finances resilient.",
    difficulty: "Beginner",
    duration: "30 mins",
    xp: 400,
    icon: <HomeIcon />,
    lessons: [
      { id: 701, title: "Emergency fund goals", type: "video", duration: "07:00", completed: true },
      { id: 702, title: "How much to save", type: "text", duration: "05:15", completed: true },
      { id: 703, title: "Automating your buffer", type: "video", duration: "08:40", completed: true },
      { id: 704, title: "Emergency fund checklist", type: "quiz", duration: "09:30", completed: true },
    ],
  },
  {
    id: 8,
    category: "Essentials",
    title: "Debt Elimination Strategy",
    description: "Compare avalanche and snowball methods to pick the right payoff strategy for you.",
    difficulty: "Intermediate",
    duration: "1 hour",
    xp: 750,
    icon: <DebtIcon />,
    lessons: [
      { id: 801, title: "Debt payoff frameworks", type: "video", duration: "09:50", completed: false },
      { id: 802, title: "Snowball vs. avalanche", type: "text", duration: "06:15", completed: false },
      { id: 803, title: "Consolidation options", type: "video", duration: "11:35", completed: false },
      { id: 804, title: "Payoff worksheet", type: "quiz", duration: "12:10", completed: false },
    ],
  },
  {
    id: 9,
    category: "Investing",
    title: "Real Estate Investing",
    description: "Learn property basics, house hacking, and when to use REITs for exposure.",
    difficulty: "Advanced",
    duration: "2.5 hours",
    xp: 1300,
    icon: <HomeIcon />,
    lessons: [
      { id: 901, title: "Real estate entry points", type: "video", duration: "10:20", completed: false },
      { id: 902, title: "Cash flow basics", type: "text", duration: "08:00", completed: false },
      { id: 903, title: "REITs vs direct ownership", type: "video", duration: "12:45", completed: false },
      { id: 904, title: "Risk verification quiz", type: "quiz", duration: "15:10", completed: false },
    ],
  },
];

export const moduleLessonsById = Object.fromEntries(
  modules.map((module) => [module.id, module.lessons])
) as Record<number, ModuleLesson[]>;
