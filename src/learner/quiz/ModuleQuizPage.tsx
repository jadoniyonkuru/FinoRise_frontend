import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LearnerLayout from "../LearnerLayout";
import { modulesService } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useLearnerProgress } from "@/context/LearnerProgressContext";
import type { Module } from "@/api";
import type { QuizQuestion, QuizResult } from "@/api";
import s from "./module-quiz.module.css";

/* ─── Icons ─── */
function IconInfo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
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
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconTrophy() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" />
      <line x1="12" y1="17" x2="12" y2="11" />
      <path d="M5 4H3a2 2 0 0 0-2 2v3a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V6a2 2 0 0 0-2-2h-2" />
      <rect x="5" y="2" width="14" height="6" rx="2" />
    </svg>
  );
}
function IconRepeat() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

/* ─── Component ─── */
export default function ModuleQuizPage() {
  const navigate = useNavigate();
  const { syncXpEarned, refreshUser } = useAuth();
  const { markModuleCompleted, refreshProgress } = useLearnerProgress();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("moduleId") ?? "";

  const [moduleInfo, setModuleInfo] = useState<Module | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<(string | null)[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (!moduleId) { setError("No module specified."); setLoading(false); return; }

    Promise.all([
      modulesService.getQuiz(moduleId),
      modulesService.getById(moduleId).catch(() => null),
    ])
      .then(([quiz, mod]) => {
        setQuestions(quiz.questions);
        setSelected(Array(quiz.questions.length).fill(null));
        if (mod) setModuleInfo(mod);
      })
      .catch(() => setError("Quiz not available for this module."))
      .finally(() => setLoading(false));
  }, [moduleId]);

  const q = questions[currentQ];
  const totalQ = questions.length;
  const progress = totalQ > 0 ? ((currentQ + 1) / totalQ) * 100 : 0;
  const selectedForCurrent = selected[currentQ] ?? null;

  function select(option: string) {
    if (result) return;
    setSelected(prev => {
      const next = [...prev];
      next[currentQ] = option;
      return next;
    });
  }

  function goNext() {
    if (currentQ < totalQ - 1) {
      setCurrentQ(i => i + 1);
    } else {
      submitQuiz();
    }
  }

  function goPrev() {
    if (currentQ > 0) setCurrentQ(i => i - 1);
  }

  async function submitQuiz() {
    setSubmitting(true);
    const answers = questions.map((q, i) => ({
      question_id: q.id,
      answer: selected[i] ?? "",
    }));
    try {
      const res = await modulesService.submitQuiz(moduleId, answers);
      setResult(res);

      if (res.xp_earned > 0) {
        await syncXpEarned(res.xp_earned);
      } else {
        await refreshUser();
      }

      if (res.passed) {
        try {
          const completeRes = await modulesService.complete(moduleId);
          if (completeRes.xp_awarded > 0) {
            await syncXpEarned(completeRes.xp_awarded);
          }
        } catch {
          /* already completed is fine */
        }
        markModuleCompleted(moduleId, Math.round(res.score), moduleInfo
          ? {
              title: moduleInfo.title,
              category: moduleInfo.category,
              difficulty: moduleInfo.difficulty,
              xp_reward: moduleInfo.xp_reward,
            }
          : undefined);
        await refreshProgress();
        await refreshUser();
      }
    } catch {
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function retry() {
    setSelected(Array(questions.length).fill(null));
    setCurrentQ(0);
    setResult(null);
  }

  if (loading) {
    return (
      <LearnerLayout>
        <div style={{ padding: "2rem", color: "#6b7280" }}>Loading quiz…</div>
      </LearnerLayout>
    );
  }

  if (error || questions.length === 0) {
    return (
      <LearnerLayout>
        <div style={{ padding: "2rem" }}>
          <p style={{ color: "#6b7280" }}>{error || "No quiz questions available for this module."}</p>
          <button
            type="button"
            style={{ marginTop: "1rem", color: "#0ea5e9", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => navigate(moduleId ? `/learner/modules/${moduleId}` : "/learner/modules")}
          >
            Back to module
          </button>
        </div>
      </LearnerLayout>
    );
  }

  /* ── Results screen ── */
  if (result) {
    const correctAnswerMap = Object.fromEntries(
      result.results.map(r => [r.question_id, r.correct_answer])
    );
    const correctnessMap = Object.fromEntries(
      result.results.map(r => [r.question_id, r.correct])
    );

    return (
      <LearnerLayout>
        <div className={s.resultsWrap}>
          <div className={s.resultsCard}>
            <div className={`${s.resultsBadge} ${result.passed ? s.resultsBadgePass : s.resultsBadgeFail}`}>
              <IconTrophy />
            </div>
            <h2 className={s.resultsTitle}>{result.passed ? "Quiz Passed!" : "Keep Practicing"}</h2>
            <p className={s.resultsSubtitle}>
              {result.passed
                ? "Great work! You've completed the module quiz."
                : "You didn't pass this time, but every attempt builds your knowledge."}
            </p>

            <div className={s.resultsStats}>
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>{result.correct_answers}/{result.total_questions}</div>
                <div className={s.resultsStatLabel}>Correct</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={`${s.resultsStatValue} ${s.resultsXp}`}>+{result.xp_earned} XP</div>
                <div className={s.resultsStatLabel}>Earned</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>{Math.round(result.score)}%</div>
                <div className={s.resultsStatLabel}>Score</div>
              </div>
            </div>

            {/* Answer review */}
            <div className={s.reviewList}>
              {questions.map((q, i) => {
                const correct = correctnessMap[q.id] ?? false;
                const userAns = selected[i];
                const correctAns = correctAnswerMap[q.id];
                return (
                  <div key={q.id} className={`${s.reviewItem} ${correct ? s.reviewItemCorrect : s.reviewItemWrong}`}>
                    <div className={`${s.reviewIcon} ${correct ? s.reviewIconCorrect : s.reviewIconWrong}`}>
                      {correct ? <IconCheck /> : <IconX />}
                    </div>
                    <div className={s.reviewText}>
                      <div className={s.reviewQ}>Q{i + 1}: {q.question.slice(0, 60)}…</div>
                      <div className={s.reviewAns}>
                        Your answer: <strong>{userAns ?? "Skipped"}</strong>
                        {!correct && correctAns && (
                          <span className={s.reviewCorrectAns}> · Correct: {correctAns}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={s.resultsActions}>
              <button type="button" className={s.retryBtn} onClick={retry}>
                <IconRepeat /> Retry Quiz
              </button>
              <button
                type="button"
                className={s.backBtn}
                onClick={() => navigate(moduleId ? `/learner/modules/${moduleId}` : "/learner/modules")}
              >
                Back to Module
              </button>
            </div>
          </div>
        </div>
      </LearnerLayout>
    );
  }

  /* ── Question screen ── */
  return (
    <LearnerLayout>
      <div className={s.quizWrap}>
        <div className={s.quizCard}>
          {/* Header row */}
          <div className={s.quizHeader}>
            <span className={s.moduleName}>Module Quiz</span>
            <span className={s.questionCount}>Question {currentQ + 1} of {totalQ}</span>
          </div>

          {/* Progress bar */}
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ width: `${progress}%` }} />
          </div>

          {/* Question */}
          <p className={s.questionText}>{q.question}</p>

          {/* Options */}
          <div className={s.optionList}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                className={`${s.optionBtn} ${selectedForCurrent === opt ? s.optionSelected : ""}`}
                onClick={() => select(opt)}
              >
                <span className={`${s.optionLetter} ${selectedForCurrent === opt ? s.optionLetterSelected : ""}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className={s.navRow}>
            <button
              type="button"
              className={s.prevBtn}
              onClick={goPrev}
              disabled={currentQ === 0}
            >
              <IconChevLeft /> Previous
            </button>
            <button
              type="button"
              className={`${s.nextBtn} ${selectedForCurrent === null ? s.nextBtnDisabled : ""}`}
              onClick={goNext}
              disabled={selectedForCurrent === null || submitting}
            >
              {submitting ? "Submitting…" : currentQ === totalQ - 1 ? "Submit Quiz" : "Next Question"}
              <IconChevRight />
            </button>
          </div>

          {/* Tip */}
          <div className={s.tipBox}>
            <IconInfo />
            <p className={s.tipText}>
              Take your time to read each question carefully. Correct answers contribute directly
              to your XP ranking and unlock the next learning module.
            </p>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
