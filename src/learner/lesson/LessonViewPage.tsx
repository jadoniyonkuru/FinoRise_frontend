import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LearnerLayout from "../LearnerLayout";
import { modulesService, gamificationService } from "@/api";
import type { Lesson } from "@/api";
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
function IconCircle({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none"
        stroke={active ? "#6366f1" : "#d1d5db"} strokeWidth="2" />
      {active && <circle cx="12" cy="12" r="5" fill="#6366f1" />}
    </svg>
  );
}
function IconCheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <polyline points="7 12 10 15 17 9" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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

/* ─── Extract YouTube video ID from various URL formats ─── */
function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

/* ─── Chart SVG for video background ─── */
function ChartGraphic() {
  return (
    <svg viewBox="0 0 800 300" width="100%" height="100%"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {[60, 100, 80, 130, 110, 160, 140, 180].map((h, i) => (
        <rect key={i} x={80 + i * 55} y={280 - h} width={28} height={h}
          rx={4} fill="rgba(99,102,241,0.35)" />
      ))}
      <polyline
        points="80,220 135,190 190,200 245,150 300,165 355,110 410,125 465,80"
        fill="none" stroke="rgba(14,165,233,0.6)" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
      {[220, 190, 200, 150, 165, 110, 125, 80].map((y, i) => (
        <circle key={i} cx={80 + i * 55 + 14} cy={y} r={4}
          fill="rgba(14,165,233,0.9)" />
      ))}
      <circle cx={650} cy={150} r={70} fill="none"
        stroke="rgba(99,102,241,0.2)" strokeWidth={20} />
      <circle cx={650} cy={150} r={70} fill="none"
        stroke="rgba(14,165,233,0.6)" strokeWidth={20}
        strokeDasharray="264 176" strokeDashoffset="88" />
    </svg>
  );
}

/* ─── Component ─── */
export default function LessonViewPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const moduleId = searchParams.get("moduleId") ?? "";
  const lessonId = searchParams.get("lessonId") ?? "";

  const [playing, setPlaying] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [curriculum, setCurriculum] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [visited, setVisited] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(`finorise_visited_${moduleId}`);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch { return new Set(); }
  });

  useEffect(() => {
    if (!moduleId) { setLoading(false); return; }

    Promise.all([
      lessonId ? modulesService.getLessonById(moduleId, lessonId) : Promise.resolve(null),
      modulesService.getLessons(moduleId),
    ])
      .then(([currentLesson, allLessons]) => {
        const sorted = allLessons.sort((a, b) => a.order_index - b.order_index);
        setCurriculum(sorted);
        if (currentLesson) {
          setLesson(currentLesson);
        } else if (sorted.length > 0) {
          setLesson(sorted[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [moduleId, lessonId]);

  useEffect(() => {
    if (!lesson?.id || !moduleId) return;
    setVisited(prev => {
      if (prev.has(lesson.id)) return prev;
      const next = new Set(prev);
      next.add(lesson.id);
      localStorage.setItem(`finorise_visited_${moduleId}`, JSON.stringify([...next]));
      void gamificationService.recordLearningActivity({
        activity_type: "lesson",
        reference_id: lesson.id,
      }).catch(() => {});
      return next;
    });
  }, [lesson?.id, moduleId]);

  function goToLesson(l: Lesson) {
    setLesson(l);
    setSearchParams({ moduleId, lessonId: l.id });
  }

  const currentIndex = curriculum.findIndex(l => l.id === (lesson?.id ?? lessonId));
  const prevLesson = currentIndex > 0 ? curriculum[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < curriculum.length - 1
    ? curriculum[currentIndex + 1]
    : null;

  if (loading) {
    return (
      <LearnerLayout>
        <div style={{ padding: "2rem", color: "#6b7280" }}>Loading lesson…</div>
      </LearnerLayout>
    );
  }

  if (!lesson) {
    return (
      <LearnerLayout>
        <div style={{ padding: "2rem", color: "#6b7280" }}>
          Lesson not found.{" "}
          <button type="button" onClick={() => navigate(`/learner/modules/${moduleId}`)}
            style={{ color: "#0ea5e9", background: "none", border: "none", cursor: "pointer" }}>
            Back to module
          </button>
        </div>
      </LearnerLayout>
    );
  }

  return (
    <LearnerLayout>
      <div className={s.wrapper}>

        {/* ── Lesson header ── */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <div className={s.titleRow}>
              <h1 className={s.lessonTitle}>{lesson.title}</h1>
            </div>
            <div className={s.breadcrumb}>
              <IconBook />
              <button
                type="button"
                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "inherit" }}
                onClick={() => navigate(`/learner/modules/${moduleId}`)}
              >
                Back to module
              </button>
              <span className={s.breadcrumbSep}>|</span>
              <span>
                Lesson {currentIndex + 1} of {curriculum.length}
              </span>
            </div>
          </div>
          <div className={s.headerNav}>
            <button
              type="button"
              className={s.prevBtn}
              disabled={!prevLesson}
              onClick={() => prevLesson && goToLesson(prevLesson)}
            >
              <IconChevLeft /> Previous
            </button>
            <button
              type="button"
              className={s.nextBtn}
              disabled={!nextLesson}
              onClick={() => nextLesson && goToLesson(nextLesson)}
            >
              Next Lesson <IconChevRight />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className={s.body}>
          {/* Left: video + content */}
          <div className={s.videoCard}>
            {/* Video player — real embed when video_url is set, decorative fallback otherwise */}
            {lesson.video_url && getYouTubeId(lesson.video_url) ? (
              <div className={s.videoPlayer} style={{ padding: 0, overflow: "hidden" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(lesson.video_url)}?rel=0&modestbranding=1`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              </div>
            ) : (
              <div className={s.videoPlayer} onClick={() => setPlaying(v => !v)}>
                <div className={s.videoBg}><ChartGraphic /></div>
                <div className={s.videoPlayBtn}>
                  <div className={s.playCircle}>
                    {playing ? <IconPause /> : <IconPlay />}
                  </div>
                </div>
                <div className={s.videoControls}>
                  <div className={s.videoProgress}>
                    <div className={s.videoProgressFill} style={{ width: "0%" }} />
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
            )}

            {/* Lesson text content */}
            <div className={s.lessonContent}>
              <h2 className={s.lessonContentTitle}>{lesson.title}</h2>
              <p className={s.lessonContentText} style={{ whiteSpace: "pre-wrap" }}>
                {lesson.content}
              </p>
              {lesson.duration_minutes != null && (
                <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "0.75rem" }}>
                  Estimated read time: {lesson.duration_minutes} min
                </p>
              )}
            </div>

            {/* Next lesson / quiz action */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #f3f4f6", display: "flex", gap: "0.75rem" }}>
              {nextLesson ? (
                <button type="button" className={s.nextBtn} onClick={() => goToLesson(nextLesson)}>
                  Next Lesson <IconChevRight />
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>
                    You've reached the end of this module. Pass the quiz to earn XP and mark this module complete.
                  </p>
                  <button
                    type="button"
                    className={s.nextBtn}
                    onClick={() => navigate(`/learner/quiz?moduleId=${moduleId}`)}
                  >
                    Take Module Quiz <IconChevRight />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Module curriculum */}
          <div className={s.curriculumPanel}>
            <div className={s.curriculumTitle}>Module Curriculum</div>

            <div className={s.lessonList}>
              {curriculum.map((l) => (
                <div
                  key={l.id}
                  className={`${s.lessonItem} ${l.id === lesson.id ? s.lessonItemCurrent : ""}`}
                  onClick={() => goToLesson(l)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={s.lessonStatusIcon}>
                    {l.id === lesson.id
                      ? <IconCircle active />
                      : visited.has(l.id)
                        ? <IconCheckCircle />
                        : <IconCircle />}
                  </div>
                  <div className={s.lessonItemBody}>
                    <div className={s.lessonItemTitleRow}>
                      <span className={`${s.lessonItemTitle} ${l.id === lesson.id ? s.lessonItemTitleCurrent : ""}`}>
                        {l.title}
                      </span>
                      {l.id === lesson.id && (
                        <span className={s.currentTag}>Current</span>
                      )}
                    </div>
                    {l.duration_minutes != null && (
                      <div className={s.lessonItemMeta}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        {l.duration_minutes} min
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
