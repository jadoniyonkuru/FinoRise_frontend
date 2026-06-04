import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import LearnerLayout from "../LearnerLayout";
import { modulesService } from "@/api";
import type { Module, Lesson } from "@/api";
import { useLearnerProgress } from "@/context/LearnerProgressContext";
import s from "./module-detail-page.module.css";

function TextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16l4-4h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      <path d="M8 8h8" /><path d="M8 12h6" /><path d="M8 16h5" />
    </svg>
  );
}

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const [mod, setMod] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { progress: allProgress, refreshProgress } = useLearnerProgress();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const progress = moduleId
    ? allProgress.find((p) => p.module_id === moduleId) ?? null
    : null;

  useEffect(() => {
    if (!moduleId) { setNotFound(true); return; }

    Promise.all([
      modulesService.getById(moduleId),
      modulesService.getLessons(moduleId),
      refreshProgress(),
    ])
      .then(([module, lessonList]) => {
        setMod(module);
        setLessons(lessonList.sort((a, b) => a.order_index - b.order_index));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [moduleId, refreshProgress]);

  if (loading) {
    return (
      <LearnerLayout>
        <div style={{ padding: "2rem", color: "#6b7280" }}>Loading module…</div>
      </LearnerLayout>
    );
  }

  if (notFound || !mod) {
    return <Navigate to="/learner/modules" replace />;
  }

  const isCompleted = progress?.completed ?? false;
  const topAction = isCompleted ? "Review" : (lessons.length > 0 ? "Start" : "Begin");
  const firstLesson = lessons[0];

  function startLesson(lesson: Lesson) {
    navigate(`/learner/lesson?moduleId=${moduleId}&lessonId=${lesson.id}`);
  }

  function goToQuiz() {
    navigate(`/learner/quiz?moduleId=${moduleId}`);
  }

  return (
    <LearnerLayout>
      <div className={s.pageShell}>
        <section className={s.heroCard}>
          <div className={s.heroHeaderRow}>
            <div className={s.heroCopy}>
              <div className={s.kicker}>Learning path</div>
              <h1 className={s.heroTitle}>{mod.title}</h1>
              <p className={s.heroDescription}>{mod.description}</p>
            </div>

            <div className={s.heroActions}>
              <div className={s.topActionWrap}>
                {firstLesson ? (
                  <button
                    type="button"
                    className={s.topActionButton}
                    onClick={() => startLesson(firstLesson)}
                  >
                    {topAction}
                  </button>
                ) : (
                  <button type="button" className={s.topActionButton} onClick={goToQuiz}>
                    Take Quiz
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={s.heroMetaRow}>
            <span className={s.metaPill}>{mod.category}</span>
            <span className={`${s.metaPill} ${s.metaPillDifficulty}`}>{mod.difficulty}</span>
            <span className={s.rewardBadge}>{mod.xp_reward} XP reward</span>
            {isCompleted && progress?.score != null && (
              <span className={s.rewardBadge}>Score: {progress.score}%</span>
            )}
          </div>

          {isCompleted && (
            <div className={s.progressCard}>
              <div className={s.progressSummaryRow}>
                <div>
                  <div className={s.progressLabel}>Module Status</div>
                  <div className={s.progressCount}>Completed</div>
                </div>
                <div className={s.progressPct}>100%</div>
              </div>
              <div className={s.progressBar} aria-hidden="true">
                <div className={s.progressFill} style={{ width: "100%" }} />
              </div>
            </div>
          )}
        </section>

        <section className={s.lessonsSection}>
          <div className={s.sectionHeaderRow}>
            <div>
              <div className={s.sectionEyebrow}>Curriculum</div>
              <h2 className={s.sectionTitle}>Lesson list</h2>
            </div>
            <div className={s.sectionMeta}>{lessons.length} lesson{lessons.length !== 1 ? "s" : ""}</div>
          </div>

          {lessons.length === 0 ? (
            <p style={{ color: "#6b7280", padding: "1rem 0" }}>No lessons available yet.</p>
          ) : (
            <div className={s.lessonList}>
              {lessons.map((lesson, index) => (
                <article className={s.lessonRow} key={lesson.id}>
                  <div className={s.lessonLeft}>
                    <div className={s.lessonIndex}>{String(index + 1).padStart(2, "0")}</div>
                    <div className={s.lessonInfo}>
                      <div className={s.lessonTitleRow}>
                        <h3 className={s.lessonTitle}>{lesson.title}</h3>
                      </div>
                      <div className={s.lessonMetaRow}>
                        <span className={s.typeBadge}><TextIcon /> Lesson</span>
                        {lesson.duration_minutes != null && (
                          <span className={s.lessonDuration}>{lesson.duration_minutes} min</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={s.lessonAction}>
                    <button
                      type="button"
                      className={s.lessonStartButton}
                      onClick={() => startLesson(lesson)}
                    >
                      Start
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div style={{ marginTop: "1.5rem" }}>
            <button type="button" className={s.topActionButton} onClick={goToQuiz}>
              Take Module Quiz
            </button>
          </div>
        </section>
      </div>
    </LearnerLayout>
  );
}
