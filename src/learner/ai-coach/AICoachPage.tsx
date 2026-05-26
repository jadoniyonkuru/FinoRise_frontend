import { useState, useRef, useEffect } from "react";
import LearnerLayout from "../LearnerLayout";
import s from "./ai-coach.module.css";

/* ─── Icons ─── */
function IconBot() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M12 11V5" />
      <circle cx="12" cy="4" r="1" />
      <line x1="8" y1="15" x2="8" y2="15" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="15" x2="12" y2="15" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="15" x2="16" y2="15" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/* ─── Quick-start topic cards ─── */
const quickTopics = [
  { label: "Budgeting Basics",    desc: "50/30/20 rule & tracking",  color: "#0ea5e9", bg: "rgba(14,165,233,0.1)" },
  { label: "Saving Strategies",  desc: "Emergency fund & goals",     color: "#22c55e", bg: "rgba(34,197,94,0.1)"  },
  { label: "Investing 101",       desc: "Index funds & DCA",          color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  { label: "Debt Management",     desc: "Avalanche vs snowball",      color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
];

/* ─── AI response logic ─── */
type Message = { id: number; role: "user" | "ai"; text: string };

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("budget") || q.includes("50/30/20") || q.includes("50 30 20"))
    return "The 50/30/20 rule divides your after-tax income into: 50% for needs (rent, groceries, utilities), 30% for wants (dining, entertainment), and 20% for savings and debt. It's a flexible starting framework — adjust percentages as your financial situation changes.";
  if (q.includes("save") || q.includes("saving") || q.includes("how much") || q.includes("emergency"))
    return "Start with a 3–6 month emergency fund in a high-yield savings account before investing. Aim for at least 20% of income saved. Even 5% saved consistently is better than nothing — the habit matters more than the amount early on.";
  if (q.includes("invest") || q.includes("index") || q.includes("etf") || q.includes("dca"))
    return "For beginners, broad market index funds (like S&P 500 ETFs) are ideal — low cost, diversified, historically strong. Use dollar-cost averaging: invest a fixed amount monthly regardless of market conditions. Never invest money you'll need within 3–5 years.";
  if (q.includes("debt") || q.includes("loan") || q.includes("pay off") || q.includes("avalanche") || q.includes("snowball"))
    return "Two proven strategies: **Avalanche** — pay minimums on all debts, then put extra money toward the highest-interest debt (saves the most money). **Snowball** — pay off the smallest balance first for psychological wins. Both work — choose whichever keeps you motivated.";
  if (q.includes("credit") || q.includes("score"))
    return "Credit score factors: payment history (35%), credit utilization (30%), credit history length (15%), new credit (10%), credit mix (10%). The two biggest wins: never miss a payment, and keep your credit card balance below 30% of the limit.";
  if (q.includes("compound") || q.includes("interest"))
    return "Compound interest means you earn returns on your returns. At 8% annual return: RWF 100,000 becomes ~RWF 215,000 in 10 years, ~RWF 466,000 in 20 years. Starting early makes a dramatic difference — 10 extra years nearly doubles the result.";
  if (q.includes("risk") || q.includes("diversif"))
    return "Diversification spreads risk across different assets (stocks, bonds, real estate). A simple portfolio: 80% broad equity index funds + 20% bonds for moderate risk. As you near a financial goal, shift toward bonds to protect against volatility.";
  return "Great question! Based on your current progress (Level 12, 81% on Compound Interest Mastery), I recommend exploring the Credit & Debt Management module next. It directly builds on the savings habits you've been developing. What specific financial topic would you like to understand better?";
}

const initialMessages: Message[] = [
  {
    id: 0, role: "ai",
    text: "Hi! I'm your FinoRise AI Coach — powered by behavioral finance principles. I can help with budgeting, saving, investing, debt, and more. What's on your financial mind today?",
  },
];

/* ─── Component ─── */
export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function send(text: string) {
    if (!text.trim() || thinking) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", text: text.trim() }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", text: getResponse(text) }]);
      setThinking(false);
    }, 900);
  }

  return (
    <LearnerLayout>
      {/* Page header */}
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>AI Coach</h1>
          <p className={s.pageSubtitle}>Your personalized financial guide, available anytime.</p>
        </div>
      </div>

      {/* Quick-start topic cards */}
      <div className={s.quickCards}>
        {quickTopics.map((t) => (
          <button
            key={t.label}
            type="button"
            className={s.quickCard}
            onClick={() => send(`Tell me about ${t.label}`)}
            disabled={thinking}
          >
            <div className={s.quickCardIcon} style={{ background: t.bg, color: t.color }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className={s.quickCardLabel}>{t.label}</div>
            <div className={s.quickCardDesc}>{t.desc}</div>
          </button>
        ))}
      </div>

      {/* Chat card */}
      <div className={s.chatCard}>
        {/* Header */}
        <div className={s.coachHeader}>
          <div className={s.coachAvatar}>
            <IconBot />
          </div>
          <div className={s.coachInfo}>
            <div className={s.coachName}>FinoRise AI Coach</div>
            <div className={s.coachStatus}>
              <span className={s.statusDot} />
              Online · Personalized to your Level 12 progress
            </div>
          </div>
          <span className={s.sessionBadge}>Session active</span>
        </div>

        {/* Messages */}
        <div className={s.messages}>
          {messages.map((m) => (
            <div key={m.id} className={`${s.bubble} ${m.role === "user" ? s.bubbleUser : s.bubbleAI}`}>
              {m.text}
            </div>
          ))}
          {thinking && (
            <div className={s.typing}>
              <span className={s.dot} />
              <span className={s.dot} />
              <span className={s.dot} />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips */}
        <div className={s.suggestions}>
          {["How do I start budgeting?", "What is the 50/30/20 rule?", "How much should I save?", "How do I pay off debt faster?"].map((sg) => (
            <button key={sg} type="button" className={s.suggestionBtn}
              onClick={() => send(sg)} disabled={thinking}>
              {sg}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          className={s.inputRow}
          onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => { e.preventDefault(); send(input); }}
        >
          <input
            className={s.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about budgeting, savings, investing..."
            disabled={thinking}
          />
          <button type="submit" className={s.sendBtn} disabled={thinking || !input.trim()}>
            <IconSend /> Send
          </button>
        </form>
      </div>
    </LearnerLayout>
  );
}
