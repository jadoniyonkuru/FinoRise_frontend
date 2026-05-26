import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./module-quiz.module.css";

/* ─── Icons ─── */
function IconInfo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
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

/* ─── Quiz data ─── */
type Question = {
  id: number;
  text: string;
  options: string[];
  correct: number;
};

const questions: Question[] = [
  {
    id: 1,
    text: "What is the primary benefit of a High-Yield Savings Account (HYSA) compared to a standard savings account?",
    options: [
      "It allows for unlimited monthly withdrawals.",
      "It offers a significantly higher Annual Percentage Yield (APY).",
      "It provides a line of credit based on your balance.",
      "It is exempt from federal income taxes.",
    ],
    correct: 1,
  },
  {
    id: 2,
    text: "Which savings strategy involves automatically transferring a fixed amount to savings each payday?",
    options: [
      "The Snowball Method",
      "Zero-Based Budgeting",
      "Pay Yourself First",
      "The Envelope System",
    ],
    correct: 2,
  },
  {
    id: 3,
    text: "What is the generally recommended size of an emergency fund?",
    options: [
      "1 month of expenses",
      "3–6 months of expenses",
      "12 months of expenses",
      "One full year of salary",
    ],
    correct: 1,
  },
];

const XP_PER_CORRECT = 150;

/* ─── Component ─── */
export default function ModuleQuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const q = questions[currentQ];
  const totalQ = questions.length;
  const progress = ((currentQ + 1) / totalQ) * 100;
  const selectedForCurrent = selected[currentQ];

  function select(optionIdx: number) {
    if (submitted) return;
    setSelected(prev => {
      const next = [...prev];
      next[currentQ] = optionIdx;
      return next;
    });
  }

  function goNext() {
    if (currentQ < totalQ - 1) {
      setCurrentQ(i => i + 1);
    } else {
      setSubmitted(true);
    }
  }

  function goPrev() {
    if (currentQ > 0) setCurrentQ(i => i - 1);
  }

  function retry() {
    setSelected(Array(questions.length).fill(null));
    setCurrentQ(0);
    setSubmitted(false);
  }

  const score = submitted
    ? questions.filter((q, i) => selected[i] === q.correct).length
    : 0;
  const xpEarned = score * XP_PER_CORRECT;
  const passed = score >= Math.ceil(totalQ * 0.6);

  /* ── Results screen ── */
  if (submitted) {
    return (
      <LearnerLayout>
        <div className={s.resultsWrap}>
          <div className={s.resultsCard}>
            <div className={`${s.resultsBadge} ${passed ? s.resultsBadgePass : s.resultsBadgeFail}`}>
              <IconTrophy />
            </div>
            <h2 className={s.resultsTitle}>{passed ? "Quiz Passed!" : "Keep Practicing"}</h2>
            <p className={s.resultsSubtitle}>
              {passed
                ? "Great work! You've completed the Foundations of Saving quiz."
                : "You didn't pass this time, but every attempt builds your knowledge."}
            </p>

            <div className={s.resultsStats}>
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>{score}/{totalQ}</div>
                <div className={s.resultsStatLabel}>Correct</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={`${s.resultsStatValue} ${s.resultsXp}`}>+{xpEarned} XP</div>
                <div className={s.resultsStatLabel}>Earned</div>
              </div>
              <div className={s.resultsDivider} />
              <div className={s.resultsStat}>
                <div className={s.resultsStatValue}>{Math.round((score / totalQ) * 100)}%</div>
                <div className={s.resultsStatLabel}>Score</div>
              </div>
            </div>

            {/* Answer review */}
            <div className={s.reviewList}>
              {questions.map((q, i) => {
                const userAns = selected[i];
                const correct = userAns === q.correct;
                return (
                  <div key={q.id} className={`${s.reviewItem} ${correct ? s.reviewItemCorrect : s.reviewItemWrong}`}>
                    <div className={`${s.reviewIcon} ${correct ? s.reviewIconCorrect : s.reviewIconWrong}`}>
                      {correct ? <IconCheck /> : <IconX />}
                    </div>
                    <div className={s.reviewText}>
                      <div className={s.reviewQ}>Q{q.id}: {q.text.slice(0, 60)}…</div>
                      <div className={s.reviewAns}>
                        Your answer: <strong>{userAns !== null ? q.options[userAns] : "Skipped"}</strong>
                        {!correct && <span className={s.reviewCorrectAns}> · Correct: {q.options[q.correct]}</span>}
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
              <button type="button" className={s.backBtn} onClick={() => navigate("/learner/modules")}>
                Back to Modules
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
            <span className={s.moduleName}>Module: Foundations of Saving</span>
            <span className={s.questionCount}>Question {currentQ + 1} of {totalQ}</span>
          </div>

          {/* Progress bar */}
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ width: `${progress}%` }} />
          </div>

          {/* Question */}
          <p className={s.questionText}>{q.text}</p>

          {/* Options */}
          <div className={s.optionList}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                className={`${s.optionBtn} ${selectedForCurrent === idx ? s.optionSelected : ""}`}
                onClick={() => select(idx)}
              >
                <span className={`${s.optionLetter} ${selectedForCurrent === idx ? s.optionLetterSelected : ""}`}>
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
              disabled={selectedForCurrent === null}
            >
              {currentQ === totalQ - 1 ? "Submit Quiz" : "Next Question"}
              <IconChevRight />
            </button>
          </div>

          {/* Tip */}
          <div className={s.tipBox}>
            <IconInfo />
            <p className={s.tipText}>
              Take your time to read each question carefully. Correct answers in this end-of-module quiz
              contribute directly to your XP ranking and unlock the next learning module.
            </p>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
