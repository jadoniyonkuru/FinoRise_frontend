import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./simulation-runner.module.css";

/* ─── Icons ─── */
function IconChevLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IconChevRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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
function IconTrophy() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" />
      <path d="M5 4H3a2 2 0 0 0-2 2v3a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V6a2 2 0 0 0-2-2h-2" />
      <rect x="5" y="2" width="14" height="6" rx="2" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconInfo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
function IconRepeat() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

/* ─── Simulation data ─── */
type Debt = { label: string; balance: string; rate: string; minPayment: string };

const debts: Debt[] = [
  { label: "Credit Card A", balance: "RWF 450,000", rate: "22%",  minPayment: "RWF 18,000" },
  { label: "Personal Loan",  balance: "RWF 200,000", rate: "15%",  minPayment: "RWF 12,000" },
  { label: "Credit Card B", balance: "RWF 85,000",  rate: "19%",  minPayment: "RWF 6,000"  },
  { label: "Car Loan",       balance: "RWF 1,200,000", rate: "9%", minPayment: "RWF 35,000" },
];

type Step = {
  id: number;
  title: string;
  scenario: string;
  context: string;
  choices: { label: string; desc: string; outcome: string }[];
};

const steps: Step[] = [
  {
    id: 1,
    title: "Choose Your Strategy",
    scenario: "You have RWF 1,935,000 in total debt across 4 accounts. You can afford RWF 100,000/month toward debt payoff — RWF 29,000 more than the combined minimums.",
    context: "Your extra RWF 29,000/month is your weapon. The question is where to aim it.",
    choices: [
      {
        label: "Avalanche Method",
        desc: "Pay minimums on all debts, then put the RWF 29,000 extra toward the highest-interest debt first.",
        outcome: "You save ~RWF 87,000 in interest over 24 months. Mathematically optimal.",
      },
      {
        label: "Snowball Method",
        desc: "Pay minimums on all debts, then put the RWF 29,000 extra toward the smallest balance first.",
        outcome: "Credit Card B is cleared in month 3, giving you a motivational win. Costs slightly more in interest.",
      },
      {
        label: "Split 50/50",
        desc: "Split the extra payment evenly between the two highest-interest debts.",
        outcome: "Balanced approach — moderate savings, moderate progress across accounts.",
      },
    ],
  },
  {
    id: 2,
    title: "Unexpected Expense",
    scenario: "Month 4 arrives. Your car needs urgent repairs costing RWF 120,000. Your emergency fund holds only RWF 50,000.",
    context: "You're making great progress on your debts. Now you face a RWF 70,000 shortfall.",
    choices: [
      {
        label: "Pause debt extra payments",
        desc: "Use the RWF 70,000 shortfall from pausing your extra debt payments for 2.5 months.",
        outcome: "Smart choice. You preserve your emergency fund and avoid new high-interest debt.",
      },
      {
        label: "Put it on Credit Card A",
        desc: "Charge the RWF 70,000 to Credit Card A at 22% interest.",
        outcome: "Costly — adds ~RWF 15,400/year in interest and sets your payoff timeline back 1.5 months.",
      },
      {
        label: "Take a personal loan",
        desc: "Apply for a small emergency loan at 12% interest.",
        outcome: "Better than the credit card rate, but adds complexity. Manageable if you stay disciplined.",
      },
    ],
  },
  {
    id: 3,
    title: "End-of-Year Bonus",
    scenario: "Month 12. You receive an annual bonus of RWF 250,000. Your debt is down to RWF 1,450,000.",
    context: "This windfall can dramatically change your trajectory. How do you deploy it?",
    choices: [
      {
        label: "Lump-sum debt payment",
        desc: "Apply the full RWF 250,000 to your highest-interest debt immediately.",
        outcome: "Excellent! Saves ~RWF 55,000 in future interest and shortens your payoff by 4 months.",
      },
      {
        label: "Half debt, half savings",
        desc: "Put RWF 125,000 toward debt and RWF 125,000 into a high-yield savings account.",
        outcome: "Solid balance. Reduces debt and builds your emergency buffer simultaneously.",
      },
      {
        label: "Invest it all",
        desc: "Put the full RWF 250,000 into an index fund at ~10% projected annual return.",
        outcome: "High risk at this debt level — your debt interest likely exceeds investment returns short-term.",
      },
    ],
  },
];

const XP_TOTAL = 350;

/* ─── Component ─── */
export default function SimulationRunnerPage() {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const [chosen, setChosen] = useState<(number | null)[]>(Array(steps.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [done, setDone] = useState(false);

  const step = steps[stepIdx];
  const chosenForStep = chosen[stepIdx];
  const progress = ((stepIdx + 1) / steps.length) * 100;

  function choose(idx: number) {
    if (showFeedback) return;
    setChosen(prev => {
      const next = [...prev];
      next[stepIdx] = idx;
      return next;
    });
  }

  function confirm() {
    if (chosenForStep === null) return;
    setShowFeedback(true);
  }

  function goNext() {
    setShowFeedback(false);
    if (stepIdx < steps.length - 1) {
      setStepIdx(i => i + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setChosen(Array(steps.length).fill(null));
    setStepIdx(0);
    setShowFeedback(false);
    setDone(false);
  }

  /* ── Results ── */
  if (done) {
    return (
      <LearnerLayout>
        <div className={s.resultsWrap}>
          <div className={s.resultsCard}>
            <div className={s.resultsBadge}><IconTrophy /></div>
            <h2 className={s.resultsTitle}>Simulation Complete!</h2>
            <p className={s.resultsSubtitle}>
              You navigated all 3 financial decision points in the Debt Snowball vs Avalanche simulation.
            </p>

            <div className={s.resultsStats}>
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>{steps.length}/{steps.length}</div>
                <div className={s.resultsStatLabel}>Decisions</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={`${s.resultsStatValue} ${s.resultsXp}`}>+{XP_TOTAL} XP</div>
                <div className={s.resultsStatLabel}>Earned</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>24 mo</div>
                <div className={s.resultsStatLabel}>Payoff Est.</div>
              </div>
            </div>

            {/* Decision recap */}
            <div className={s.recapList}>
              {steps.map((st, i) => (
                <div key={st.id} className={s.recapItem}>
                  <div className={s.recapCheck}><IconCheck /></div>
                  <div className={s.recapText}>
                    <div className={s.recapTitle}>Step {st.id}: {st.title}</div>
                    {chosen[i] !== null && (
                      <div className={s.recapChoice}>
                        You chose: <strong>{st.choices[chosen[i]!].label}</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={s.resultsActions}>
              <button type="button" className={s.retryBtn} onClick={restart}>
                <IconRepeat /> Try Again
              </button>
              <button type="button" className={s.backBtn} onClick={() => navigate("/learner/simulations")}>
                Back to Simulations
              </button>
            </div>
          </div>
        </div>
      </LearnerLayout>
    );
  }

  /* ── Step screen ── */
  return (
    <LearnerLayout>
      <div className={s.runnerWrap}>

        {/* Top bar */}
        <div className={s.topBar}>
          <div className={s.topBarLeft}>
            <button type="button" className={s.backLink} onClick={() => navigate("/learner/simulations")}>
              <IconChevLeft /> Simulations
            </button>
            <span className={s.topBarSep}>/</span>
            <span className={s.topBarTitle}>Debt Snowball vs Avalanche</span>
          </div>
          <div className={s.topBarRight}>
            <span className={s.xpPill}><IconBolt /> +{XP_TOTAL} XP on completion</span>
            <span className={s.stepCount}>Step {stepIdx + 1} of {steps.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className={s.progressBar}>
          <div className={s.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Main two-column layout */}
        <div className={s.body}>

          {/* Left: context panel */}
          <div className={s.contextPanel}>
            <div className={s.contextCard}>
              <div className={s.contextTag}>Scenario {step.id}</div>
              <h2 className={s.contextTitle}>{step.title}</h2>
              <p className={s.contextScenario}>{step.scenario}</p>

              <div className={s.contextHint}>
                <IconInfo />
                <span>{step.context}</span>
              </div>
            </div>

            {/* Debt snapshot */}
            <div className={s.snapshotCard}>
              <div className={s.snapshotTitle}>Your Debt Snapshot</div>
              <div className={s.debtList}>
                {debts.map((d) => (
                  <div key={d.label} className={s.debtRow}>
                    <div className={s.debtLabel}>{d.label}</div>
                    <div className={s.debtDetails}>
                      <span className={s.debtBalance}>{d.balance}</span>
                      <span className={s.debtRate}>{d.rate} APR</span>
                      <span className={s.debtMin}>Min: {d.minPayment}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={s.debtTotal}>
                <span>Total</span>
                <span className={s.debtTotalValue}>RWF 1,935,000</span>
              </div>
            </div>
          </div>

          {/* Right: decision panel */}
          <div className={s.decisionPanel}>
            <div className={s.decisionCard}>
              <h3 className={s.decisionTitle}>Make Your Decision</h3>
              <p className={s.decisionSubtitle}>Choose the strategy you would apply in this situation.</p>

              <div className={s.choiceList}>
                {step.choices.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${s.choiceBtn} ${chosenForStep === idx ? s.choiceBtnSelected : ""}`}
                    onClick={() => choose(idx)}
                    disabled={showFeedback}
                  >
                    <span className={`${s.choiceLetter} ${chosenForStep === idx ? s.choiceLetterSelected : ""}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className={s.choiceText}>
                      <div className={s.choiceLabel}>{c.label}</div>
                      <div className={s.choiceDesc}>{c.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Feedback box */}
              {showFeedback && chosenForStep !== null && (
                <div className={s.feedbackBox}>
                  <div className={s.feedbackLabel}><IconCheck /> Outcome</div>
                  <p className={s.feedbackText}>{step.choices[chosenForStep].outcome}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className={s.actionRow}>
                {!showFeedback ? (
                  <button
                    type="button"
                    className={`${s.confirmBtn} ${chosenForStep === null ? s.confirmBtnDisabled : ""}`}
                    onClick={confirm}
                    disabled={chosenForStep === null}
                  >
                    Confirm Choice <IconChevRight />
                  </button>
                ) : (
                  <button type="button" className={s.nextBtn} onClick={goNext}>
                    {stepIdx < steps.length - 1 ? "Next Scenario" : "See Results"}
                    <IconChevRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
