import { useState } from "react";
import LearnerLayout from "../LearnerLayout";
import s from "./lesson-view.module.css";

/* ─── Icons ─── */
function IconPlay() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
function IconVolume() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IconMaximize() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#0d9488" />
      <polyline points="6 12 10 16 18 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconCircle({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none"
        stroke={active ? "#6366f1" : "#d1d5db"} strokeWidth="2" />
      {active && <circle cx="12" cy="12" r="5" fill="#6366f1" />}
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
function IconAI() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v2H8V6a4 4 0 0 1 4-4z" />
      <path d="M8 8H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-3" />
      <circle cx="9" cy="14" r="1" fill="currentColor" />
      <circle cx="15" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─── Curriculum data ─── */
type LessonStatus = "completed" | "current" | "upcoming" | "locked";
type CurriculumLesson = {
  id: number;
  title: string;
  duration: string;
  status: LessonStatus;
  type: "video" | "quiz";
};

const curriculum: CurriculumLesson[] = [
  { id: 1, title: "Fundamentals of Portfolio Theory", duration: "12:45", status: "completed", type: "video" },
  { id: 2, title: "Risk vs. Reward Assessment",       duration: "08:20", status: "completed", type: "video" },
  { id: 3, title: "Diversification Tactics",         duration: "15:10", status: "current",   type: "video" },
  { id: 4, title: "Understanding Market Volatility", duration: "10:00", status: "upcoming",  type: "video" },
  { id: 5, title: "Asset Allocation Workshop",       duration: "20:00", status: "locked",    type: "video" },
  { id: 6, title: "Final Module Quiz",               duration: "15:00", status: "locked",    type: "quiz"  },
];

const keyLearnings = [
  "Diversification reduces unsystematic risk by holding uncorrelated assets across sectors and geographies.",
  "The Sharpe ratio measures return per unit of risk — diversification improves it by reducing volatility without reducing expected return.",
  "Correlation coefficients below 1.0 indicate diversification benefit. Assets with negative correlation provide the strongest protection.",
  "Modern Portfolio Theory shows there is an 'efficient frontier' — the optimal set of portfolios with maximum return for a given risk level.",
  "Over-diversification beyond ~20–30 holdings adds minimal risk reduction but increases complexity and tracking costs.",
];

/* ─── Chart SVG for video background ─── */
function ChartGraphic() {
  return (
    <svg viewBox="0 0 800 300" width="100%" height="100%"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {/* Bar chart */}
      {[60, 100, 80, 130, 110, 160, 140, 180].map((h, i) => (
        <rect key={i} x={80 + i * 55} y={280 - h} width={28} height={h}
          rx={4} fill="rgba(99,102,241,0.35)" />
      ))}
      {/* Line chart */}
      <polyline
        points="80,220 135,190 190,200 245,150 300,165 355,110 410,125 465,80"
        fill="none" stroke="rgba(14,165,233,0.6)" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
      {[220, 190, 200, 150, 165, 110, 125, 80].map((y, i) => (
        <circle key={i} cx={80 + i * 55 + 14} cy={y} r={4}
          fill="rgba(14,165,233,0.9)" />
      ))}
      {/* Donut */}
      <circle cx={650} cy={150} r={70} fill="none"
        stroke="rgba(99,102,241,0.2)" strokeWidth={20} />
      <circle cx={650} cy={150} r={70} fill="none"
        stroke="rgba(14,165,233,0.6)" strokeWidth={20}
        strokeDasharray="264 176" strokeDashoffset="88" />
      <circle cx={650} cy={150} r={70} fill="none"
        stroke="rgba(34,197,94,0.5)" strokeWidth={20}
        strokeDasharray="110 330" strokeDashoffset="-176" />
    </svg>
  );
}

/* ─── Component ─── */
export default function LessonViewPage() {
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"learnings" | "insight">("learnings");
  const [activeLesson, setActiveLesson] = useState(3);

  const current = curriculum.find(l => l.id === activeLesson) || curriculum[2];

  function statusIcon(l: CurriculumLesson) {
    if (l.status === "completed") return <IconCheck />;
    if (l.status === "locked")    return <IconLock />;
    if (l.status === "current")   return <IconCircle active />;
    return <IconCircle />;
  }

  return (
    <LearnerLayout>
      <div className={s.wrapper}>

        {/* ── Lesson header ── */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <div className={s.titleRow}>
              <h1 className={s.lessonTitle}>{current.title}</h1>
              <span className={s.levelBadge}>Advanced</span>
            </div>
            <div className={s.breadcrumb}>
              <IconBook />
              <span>Module 4: Market Dynamics</span>
              <span className={s.breadcrumbSep}>|</span>
              <span>Lesson {activeLesson} of {curriculum.length}</span>
            </div>
          </div>
          <div className={s.headerNav}>
            <button type="button" className={s.prevBtn}
              onClick={() => setActiveLesson(l => Math.max(1, l - 1))}>
              <IconChevLeft /> Previous
            </button>
            <button type="button" className={s.nextBtn}
              onClick={() => setActiveLesson(l => Math.min(curriculum.length, l + 1))}>
              Next Lesson <IconChevRight />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className={s.body}>
          {/* Left: video + content */}
          <div className={s.videoCard}>
            {/* Video player */}
            <div className={s.videoPlayer} onClick={() => setPlaying(v => !v)}>
              <div className={s.videoBg}><ChartGraphic /></div>
              <div className={s.videoPlayBtn}>
                <div className={s.playCircle}>
                  {playing ? <IconPause /> : <IconPlay />}
                </div>
              </div>
              <div className={s.videoControls}>
                <div className={s.videoProgress}>
                  <div className={s.videoProgressFill} style={{ width: "43%" }} />
                </div>
                <div className={s.controlsRow}>
                  <div className={s.controlsLeft}>
                    <button type="button" className={s.controlBtn}
                      onClick={e => { e.stopPropagation(); setPlaying(v => !v); }}>
                      {playing ? <IconPause /> : <IconPlay />}
                    </button>
                    <button type="button" className={s.controlBtn}
                      onClick={e => e.stopPropagation()}>
                      <IconVolume />
                    </button>
                    <span className={s.videoTime}>06:45 / 15:10</span>
                  </div>
                  <div className={s.controlsRight}>
                    <button type="button" className={s.controlBtn}
                      onClick={e => e.stopPropagation()}>
                      <IconSettings />
                    </button>
                    <button type="button" className={s.controlBtn}
                      onClick={e => e.stopPropagation()}>
                      <IconMaximize />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson text */}
            <div className={s.lessonContent}>
              <h2 className={s.lessonContentTitle}>Mastering Diversification Tactics</h2>
              <p className={s.lessonContentText}>
                Diversification is more than just "not putting all your eggs in one basket." In professional finance,
                it is a mathematically-driven strategy to reduce unsystematic risk. By holding assets that are not
                perfectly correlated, you can optimize your portfolio's Sharpe ratio — maximizing returns for a given
                level of risk.
              </p>
            </div>

            {/* Bottom tabs */}
            <div className={s.lessonTabs}>
              <button
                type="button"
                className={`${s.lessonTab} ${activeTab === "learnings" ? s.lessonTabActive : ""}`}
                onClick={() => setActiveTab("learnings")}
              >
                <IconBook /> Key Learnings
              </button>
              <button
                type="button"
                className={`${s.lessonTab} ${activeTab === "insight" ? s.lessonTabActive : ""}`}
                onClick={() => setActiveTab("insight")}
              >
                <IconAI /> AI Insight
              </button>
            </div>

            {/* Tab content */}
            <div className={s.tabContent}>
              {activeTab === "learnings" ? (
                <ul className={s.keyLearningsList}>
                  {keyLearnings.map((item, i) => (
                    <li key={i} className={s.keyLearningsItem}>
                      <span className={s.keyLearningsDot} />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={s.aiInsightBox}>
                  <div className={s.aiInsightLabel}>
                    <IconAI /> AI Insight
                  </div>
                  <p className={s.aiInsightText}>
                    Based on your simulation performance, you tend to over-concentrate in technology assets (+34% vs
                    benchmark). This lesson directly addresses that behavioral bias. After completing it, try the
                    Portfolio Rebalancing simulation — learners who pair this lesson with that simulation show 28%
                    better risk-adjusted outcomes in subsequent modules.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Module curriculum */}
          <div className={s.curriculumPanel}>
            <div className={s.curriculumTitle}>Module Curriculum</div>

            <div className={s.progressRow}>
              <span className={s.progressLabel}>Overall Progress</span>
              <span className={s.progressPct}>65%</span>
            </div>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ width: "65%" }} />
            </div>

            <div className={s.lessonList}>
              {curriculum.map((l) => (
                <div
                  key={l.id}
                  className={`${s.lessonItem} ${l.id === activeLesson ? s.lessonItemCurrent : ""}`}
                  onClick={() => l.status !== "locked" && setActiveLesson(l.id)}
                >
                  <div className={s.lessonStatusIcon}>{statusIcon(l)}</div>
                  <div className={s.lessonItemBody}>
                    <div className={s.lessonItemTitleRow}>
                      <span className={`${s.lessonItemTitle} ${
                        l.id === activeLesson ? s.lessonItemTitleCurrent
                        : l.status === "locked" ? s.lessonItemTitleLocked : ""
                      }`}>
                        {l.title}
                      </span>
                      {l.id === activeLesson && (
                        <span className={s.currentTag}>Current</span>
                      )}
                    </div>
                    <div className={s.lessonItemMeta}>
                      {l.type === "video"
                        ? <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                      }
                      {l.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className={s.viewResources}>
              View Resources (4)
            </button>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
