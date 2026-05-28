import { Link, Navigate, useParams } from "react-router-dom";
import LearnerLayout from "../LearnerLayout";
import s from "./module-detail-page.module.css";
import { modules } from "./moduleCatalog";

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#0d9488" />
      <polyline points="6 12 10 16 18 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16l4-4h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      <path d="M8 8h8" />
      <path d="M8 12h6" />
      <path d="M8 16h5" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5h6" />
      <path d="M9 12h6" />
      <path d="M9 19h6" />
      <circle cx="17" cy="17" r="4" fill="none" />
      <path d="m19 19-1.5-1.5" />
    </svg>
  );
}

const typeIcons = {
  video: <VideoIcon />,
  text: <TextIcon />,
  quiz: <QuizIcon />,
};

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const selectedModule = modules.find((module) => String(module.id) === moduleId);

  if (!selectedModule) {
    return <Navigate to="/learner/modules" replace />;
  }

  const completedLessons = selectedModule.lessons.filter((lesson) => lesson.completed).length;
  const totalLessons = selectedModule.lessons.length;
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const topAction = progress === 0 ? "Start" : progress === 100 ? "Review" : "Continue";

  return (
    <LearnerLayout>
      <div className={s.pageShell}>
        <section className={s.heroCard}>
          <div className={s.heroHeaderRow}>
            <div className={s.heroCopy}>
              <div className={s.kicker}>Learning path</div>
              <h1 className={s.heroTitle}>{selectedModule.title}</h1>
              <p className={s.heroDescription}>{selectedModule.description}</p>
            </div>

            <div className={s.heroActions}>
              <div className={s.topActionWrap}>
                <Link to="/learner/lesson" className={s.topActionButton}>{topAction}</Link>
              </div>
            </div>
          </div>

          <div className={s.heroMetaRow}>
            <span className={s.metaPill}>{selectedModule.category}</span>
            <span className={`${s.metaPill} ${s.metaPillDifficulty}`}>{selectedModule.difficulty}</span>
            <span className={s.rewardBadge}>{selectedModule.xp} XP reward</span>
          </div>

          <div className={s.progressCard}>
            <div className={s.progressSummaryRow}>
              <div>
                <div className={s.progressLabel}>Overall progress</div>
                <div className={s.progressCount}>{completedLessons} / {totalLessons} lessons completed</div>
              </div>
              <div className={s.progressPct}>{progress}%</div>
            </div>
            <div className={s.progressBar} aria-hidden="true">
              <div className={s.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section className={s.lessonsSection}>
          <div className={s.sectionHeaderRow}>
            <div>
              <div className={s.sectionEyebrow}>Curriculum</div>
              <h2 className={s.sectionTitle}>Lesson list</h2>
            </div>
            <div className={s.sectionMeta}>{completedLessons} of {totalLessons} completed</div>
          </div>

          <div className={s.lessonList}>
            {selectedModule.lessons.map((lesson, index) => (
              <article className={s.lessonRow} key={lesson.id}>
                <div className={s.lessonLeft}>
                  <div className={s.lessonIndex}>{String(index + 1).padStart(2, "0")}</div>

                  <div className={s.lessonInfo}>
                    <div className={s.lessonTitleRow}>
                      <h3 className={s.lessonTitle}>{lesson.title}</h3>
                      {lesson.completed && <span className={s.completedTag}><IconCheck /> Completed</span>}
                    </div>

                    <div className={s.lessonMetaRow}>
                      <span className={s.typeBadge}>{typeIcons[lesson.type]} {lesson.type[0].toUpperCase()}{lesson.type.slice(1)}</span>
                      <span className={s.lessonDuration}>{lesson.duration}</span>
                    </div>
                  </div>
                </div>

                <div className={s.lessonAction}>
                  {lesson.completed ? (
                    <span className={s.completedBadge}><IconCheck /> Done</span>
                  ) : (
                    <Link to="/learner/lesson" className={s.lessonStartButton}>Start</Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </LearnerLayout>
  );
}
