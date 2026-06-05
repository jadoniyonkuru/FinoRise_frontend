import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LearnerLayout from "../LearnerLayout";
import { useAuth } from "@/context/AuthContext";
import { simulationsService, gamificationService } from "@/api";
import type { SimStep, SimChoice, SubmitChoiceResult } from "@/api";
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

type Decision = { stepNumber: number; choiceText: string; outcome: string };

/* ─── Component ─── */
export default function SimulationRunnerPage() {
  const { syncXpEarned, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const simulationId = searchParams.get("id") ?? "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [simTitle, setSimTitle] = useState("");
  const [xpReward, setXpReward] = useState(0);
  const [attemptId, setAttemptId] = useState("");
  const [currentStep, setCurrentStep] = useState<SimStep | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ outcome: string; financial_impact: number; xp_bonus?: number } | null>(null);
  const [pendingNextStep, setPendingNextStep] = useState<SimStep | undefined>(undefined);
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    if (!simulationId) { setError("No simulation selected."); setLoading(false); return; }

    simulationsService.start(simulationId)
      .then((res) => {
        setSimTitle(res.simulation.title);
        setXpReward(res.simulation.xp_reward);
        setAttemptId(res.attempt_id);
        setCurrentStep(res.current_step);
      })
      .catch(() => setError("Failed to load simulation. Please try again."))
      .finally(() => setLoading(false));
  }, [simulationId]);

  async function confirmChoice() {
    if (!selectedChoiceId || !attemptId || submitting) return;
    setSubmitting(true);

    const choiceText = currentStep?.SimChoices.find(c => c.id === selectedChoiceId)?.choice_text ?? "";

    try {
      const res: SubmitChoiceResult = await simulationsService.submitChoice(attemptId, selectedChoiceId);

      setFeedback({
        outcome: res.outcome,
        financial_impact: res.financial_impact,
        xp_bonus: res.xp_bonus,
      });
      setPendingNextStep(res.next_step);

      setDecisions(prev => [
        ...prev,
        { stepNumber: currentStep?.step_number ?? prev.length + 1, choiceText, outcome: res.outcome },
      ]);

      if (res.status === "completed") {
        const earned = res.xp_earned ?? xpReward;
        setFinalScore(res.final_score ?? 0);
        setXpEarned(earned);
        setDone(true);
        try {
          await gamificationService.recordLearningActivity({
            activity_type: "simulation",
            reference_id: simulationId,
          });
        } catch {
          /* streak endpoint may be unavailable */
        }
        if (earned > 0) {
          void syncXpEarned(earned);
        } else {
          void refreshUser();
        }
      }
    } catch {
      setFeedback({ outcome: "An error occurred. Please try again.", financial_impact: 0 });
    } finally {
      setSubmitting(false);
    }
  }

  function goNext() {
    setFeedback(null);
    setSelectedChoiceId(null);
    if (pendingNextStep) {
      setCurrentStep(pendingNextStep);
      setPendingNextStep(undefined);
    }
  }

  async function restart() {
    setLoading(true);
    setDone(false);
    setDecisions([]);
    setFeedback(null);
    setPendingNextStep(undefined);
    setSelectedChoiceId(null);
    setError("");

    simulationsService.start(simulationId)
      .then((res) => {
        setSimTitle(res.simulation.title);
        setXpReward(res.simulation.xp_reward);
        setAttemptId(res.attempt_id);
        setCurrentStep(res.current_step);
      })
      .catch(() => setError("Failed to restart simulation."))
      .finally(() => setLoading(false));
  }

  /* ── Loading / error ── */
  if (loading) {
    return (
      <LearnerLayout>
        <div style={{ padding: "2rem", color: "#6b7280" }}>Loading simulation…</div>
      </LearnerLayout>
    );
  }

  if (error || !currentStep) {
    const message = error || (simTitle
      ? `"${simTitle}" has no scenarios configured yet. The admin needs to add steps to this simulation.`
      : "Simulation not available — no scenarios have been added to it yet.");
    return (
      <LearnerLayout>
        <div style={{ padding: "2rem" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>{message}</p>
          <button
            type="button"
            style={{ color: "#0ea5e9", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "0.9rem" }}
            onClick={() => navigate("/learner/simulations")}
          >
            ← Back to Simulations
          </button>
        </div>
      </LearnerLayout>
    );
  }

  /* ── Results screen ── */
  if (done) {
    return (
      <LearnerLayout>
        <div className={s.resultsWrap}>
          <div className={s.resultsCard}>
            <div className={s.resultsBadge}><IconTrophy /></div>
            <h2 className={s.resultsTitle}>Simulation Complete!</h2>
            <p className={s.resultsSubtitle}>
              You navigated all financial decision points in the <strong>{simTitle}</strong> simulation.
            </p>

            <div className={s.resultsStats}>
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>{decisions.length}</div>
                <div className={s.resultsStatLabel}>Decisions</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={`${s.resultsStatValue} ${s.resultsXp}`}>+{xpEarned} XP</div>
                <div className={s.resultsStatLabel}>Earned</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>{finalScore}%</div>
                <div className={s.resultsStatLabel}>Score</div>
              </div>
            </div>

            {/* Decision recap */}
            <div className={s.recapList}>
              {decisions.map((d, i) => (
                <div key={i} className={s.recapItem}>
                  <div className={s.recapCheck}><IconCheck /></div>
                  <div className={s.recapText}>
                    <div className={s.recapTitle}>Step {d.stepNumber}</div>
                    <div className={s.recapChoice}>
                      You chose: <strong>{d.choiceText}</strong>
                    </div>
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
  const choices: SimChoice[] = currentStep.SimChoices ?? [];

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
            <span className={s.topBarTitle}>{simTitle}</span>
          </div>
          <div className={s.topBarRight}>
            <span className={s.xpPill}><IconBolt /> +{xpReward} XP on completion</span>
            <span className={s.stepCount}>Step {currentStep.step_number}</span>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className={s.body}>

          {/* Left: context panel */}
          <div className={s.contextPanel}>
            <div className={s.contextCard}>
              <div className={s.contextTag}>Scenario {currentStep.step_number}</div>
              <h2 className={s.contextTitle}>Decision Point</h2>
              <p className={s.contextScenario}>{currentStep.scenario_text}</p>

              {decisions.length > 0 && (
                <div className={s.contextHint}>
                  <IconInfo />
                  <span>Previous decisions: {decisions.length} completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: decision panel */}
          <div className={s.decisionPanel}>
            <div className={s.decisionCard}>
              <h3 className={s.decisionTitle}>Make Your Decision</h3>
              <p className={s.decisionSubtitle}>Choose the strategy you would apply in this situation.</p>

              <div className={s.choiceList}>
                {choices.map((c, idx) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`${s.choiceBtn} ${selectedChoiceId === c.id ? s.choiceBtnSelected : ""}`}
                    onClick={() => !feedback && setSelectedChoiceId(c.id)}
                    disabled={!!feedback}
                  >
                    <span className={`${s.choiceLetter} ${selectedChoiceId === c.id ? s.choiceLetterSelected : ""}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className={s.choiceText}>
                      <div className={s.choiceLabel}>{c.choice_text}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Feedback box */}
              {feedback && (
                <div className={s.feedbackBox}>
                  <div className={s.feedbackLabel}><IconCheck /> Outcome</div>
                  <p className={s.feedbackText}>{feedback.outcome}</p>
                  {feedback.financial_impact !== 0 && (
                    <p style={{ fontSize: "0.85rem", color: feedback.financial_impact > 0 ? "#16a34a" : "#ef4444", marginTop: "0.5rem" }}>
                      Financial impact: {feedback.financial_impact > 0 ? "+" : ""}{feedback.financial_impact} pts
                    </p>
                  )}
                  {feedback.xp_bonus != null && feedback.xp_bonus > 0 && (
                    <p style={{ fontSize: "0.85rem", color: "#22c55e", marginTop: "0.25rem" }}>
                      <IconBolt /> +{feedback.xp_bonus} XP bonus
                    </p>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className={s.actionRow}>
                {!feedback ? (
                  <button
                    type="button"
                    className={`${s.confirmBtn} ${!selectedChoiceId ? s.confirmBtnDisabled : ""}`}
                    onClick={confirmChoice}
                    disabled={!selectedChoiceId || submitting}
                  >
                    {submitting ? "Submitting…" : "Confirm Choice"} <IconChevRight />
                  </button>
                ) : (
                  <button type="button" className={s.nextBtn} onClick={() => goNext()}>
                    {done ? "See Results" : "Next Scenario"} <IconChevRight />
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
