import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { modulesService } from "@/api";
import type { ModuleProgress } from "@/api";
import { useAuth } from "./AuthContext";

type LearnerProgressContextValue = {
  progress: ModuleProgress[];
  loading: boolean;
  refreshProgress: () => Promise<void>;
  markModuleCompleted: (
    moduleId: string,
    score: number,
    patch?: Partial<Pick<ModuleProgress, "title" | "category" | "difficulty" | "xp_reward">>
  ) => void;
  isModuleCompleted: (moduleId: string) => boolean;
};

const LearnerProgressContext = createContext<LearnerProgressContextValue | null>(null);

export function LearnerProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshProgress = useCallback(async () => {
    if (!user || user.role !== "learner") {
      setProgress([]);
      return;
    }
    setLoading(true);
    try {
      const list = await modulesService.getMyProgress();
      setProgress(list);
    } catch {
      /* keep previous */
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  const markModuleCompleted = useCallback(
    (
      moduleId: string,
      score: number,
      patch?: Partial<Pick<ModuleProgress, "title" | "category" | "difficulty" | "xp_reward">>
    ) => {
      setProgress((prev) => {
        const existing = prev.find((p) => p.module_id === moduleId);
        const completed_at = new Date().toISOString();
        if (existing) {
          return prev.map((p) =>
            p.module_id === moduleId
              ? { ...p, ...patch, completed: true, score, completed_at }
              : p
          );
        }
        return [
          ...prev,
          {
            module_id: moduleId,
            title: patch?.title ?? "Module",
            category: patch?.category ?? "",
            difficulty: patch?.difficulty ?? "",
            xp_reward: patch?.xp_reward ?? 0,
            completed: true,
            completed_at,
            score,
          },
        ];
      });
    },
    []
  );

  const isModuleCompleted = useCallback(
    (moduleId: string) => progress.some((p) => p.module_id === moduleId && p.completed),
    [progress]
  );

  return (
    <LearnerProgressContext.Provider
      value={{ progress, loading, refreshProgress, markModuleCompleted, isModuleCompleted }}
    >
      {children}
    </LearnerProgressContext.Provider>
  );
}

export function useLearnerProgress(): LearnerProgressContextValue {
  const ctx = useContext(LearnerProgressContext);
  if (!ctx) {
    throw new Error("useLearnerProgress must be used inside LearnerProgressProvider");
  }
  return ctx;
}
