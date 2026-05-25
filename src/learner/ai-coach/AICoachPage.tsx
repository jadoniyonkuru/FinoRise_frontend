import { useState, useRef, useEffect } from "react";
import LearnerLayout from "../LearnerLayout";
import x from "@/components/dashboard-extras.module.css";

type Message = { id: number; role: "user" | "ai"; text: string };

const suggestions = [
  "How do I start budgeting?",
  "What is the 50/30/20 rule?",
  "How much should I save?",
  "How do I pay off debt faster?",
];

function getAIResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("budget") || q.includes("50/30/20") || q.includes("50 30 20")) {
    return "The 50/30/20 rule is a simple budgeting framework: allocate 50% of your income to needs (rent, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. It's a great starting point before building a detailed budget.";
  }
  if (q.includes("save") || q.includes("saving") || q.includes("how much")) {
    return "Aim to save at least 20% of your income. Start with a 3–6 month emergency fund in a liquid savings account before moving to investments. Even saving 5–10% consistently builds the habit and compounds over time.";
  }
  if (q.includes("invest")) {
    return "For beginners, index funds and ETFs offer low-cost diversification. Invest consistently regardless of market conditions — this is called dollar-cost averaging. Never invest money you can't afford to leave untouched for at least 3–5 years.";
  }
  if (q.includes("debt") || q.includes("loan") || q.includes("pay off")) {
    return "Use the avalanche method: pay minimums on all debts, then direct extra payments to the highest-interest debt first. This saves the most money overall. Alternatively, the snowball method (smallest balance first) provides motivational wins that keep you going.";
  }
  if (q.includes("credit") || q.includes("score")) {
    return "Build a strong credit score by: paying all bills on time (biggest factor), keeping credit utilization below 30%, avoiding too many new credit applications at once, and maintaining a long credit history. A score above 700 opens the door to better loan rates.";
  }
  if (q.includes("emergency") || q.includes("fund")) {
    return "Your emergency fund should cover 3–6 months of essential living expenses — rent, food, transport, utilities. Keep it in a liquid, easily accessible savings account, not invested. This protects you from taking on debt during unexpected events.";
  }
  return "Great question! Based on your current progress, I recommend focusing on the Credit & Debt Management module next. It directly builds on your budgeting knowledge. Is there a specific financial topic you'd like to explore further?";
}

const initial: Message[] = [
  {
    id: 0,
    role: "ai",
    text: "Hi! I am your FinoRise AI Coach. Ask me anything about budgeting, savings, investments, or how to improve your financial decisions.",
  },
];

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function send(text: string) {
    if (!text.trim() || thinking) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: getAIResponse(text),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setThinking(false);
    }, 900);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <LearnerLayout title="AI Coach" subtitle="Your personalized financial guide">
      <div style={{ "--accent": "#0ea5e9" } as React.CSSProperties}>
        <div className={x.chatWrap}>
          <div className={x.chatMessages}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${x.chatBubble} ${
                  m.role === "user" ? x.chatBubbleUser : x.chatBubbleAI
                }`}
              >
                {m.text}
              </div>
            ))}
            {thinking && (
              <div className={`${x.chatBubble} ${x.chatBubbleAI}`}>
                Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={x.chatSuggestions}>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className={x.chatSuggestion}
                onClick={() => send(s)}
                disabled={thinking}
              >
                {s}
              </button>
            ))}
          </div>

          <form className={x.chatInputRow} onSubmit={handleSubmit}>
            <input
              className={x.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about budgeting, savings, investments..."
              disabled={thinking}
            />
            <button
              type="submit"
              className={x.chatSendBtn}
              disabled={thinking || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </LearnerLayout>
  );
}
