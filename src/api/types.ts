export type UserRole = 'learner' | 'admin' | 'partner';

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  xp_total: number;
  level: number;
  streak_days: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  xp_reward: number;
}

export type BadgeType = 'streak' | 'completion' | 'simulation' | 'special';

export interface Badge {
  id: string;
  badge_name: string;
  badge_type: BadgeType;
  badge_icon: string;
  earned_at: string;
}

export type RewardType = 'airtime' | 'discount' | 'voucher' | 'partner_offer';

export interface Reward {
  id: string;
  title: string;
  description: string;
  reward_type: RewardType;
  xp_cost: number;
  quantity: number | null;
  is_active: boolean;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export type RedemptionStatus = 'pending' | 'confirmed' | 'used' | 'expired';

export interface Redemption {
  id: string;
  user_id: string;
  reward_id: string;
  redemption_code: string;
  xp_spent: number;
  status: RedemptionStatus;
  created_at: string;
}

export type BehaviorEventType =
  | 'simulation_decision'
  | 'module_completed'
  | 'reward_redeemed'
  | 'streak_achieved';

export type BehaviorCategory =
  | 'budgeting'
  | 'loan'
  | 'emergency'
  | 'debt'
  | 'investing'
  | 'general';

export interface BehaviorEvent {
  id: string;
  user_id: string;
  event_type: BehaviorEventType;
  category: BehaviorCategory;
  is_correct: boolean | null;
  difficulty: string | null;
  meta: Record<string, unknown>;
  created_at: string;
}

export type InsightType =
  | 'spending'
  | 'risk'
  | 'consistency'
  | 'decision_pattern'
  | 'improvement';

export interface Insight {
  id: string;
  user_id: string;
  insight_text: string;
  insight_type: InsightType;
  is_read: boolean;
  created_at: string;
}

export type AiFeature = 'qa' | 'simulation_explanation' | 'recommendations' | 'learning_guidance';

export interface AiLog {
  id: string;
  user_id: string;
  prompt: string;
  response: string;
  feature: AiFeature;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}

export interface AuthTokenResponse {
  token: string;
  user: User;
}

export interface XpInfo {
  xp_total: number;
  level: number;
}

export interface StreakInfo {
  streak_days: number;
}

export interface LeaderboardEntry {
  id: string;
  full_name: string;
  xp_total: number;
  level: number;
}

export interface RedeemResult {
  message: string;
  redemption_code: string;
  redemption_id: string;
  reward_title: string;
  xp_spent: number;
  xp_remaining: number;
}

export interface PartnerDashboard {
  stats: {
    total_programs: number;
    published_programs: number;
    draft_programs: number;
  };
  recent_programs: Module[];
  ai_insight: Insight | null;
}

export interface PartnerPrograms {
  stats: { total: number; published: number; drafts: number };
  programs: Module[];
}

export interface PartnerImpact {
  stats: {
    total_programs: number;
    published_programs: number;
    draft_programs: number;
    total_xp_available: number;
    learners_reached: number;
    categories_covered: number;
  };
  category_breakdown: Record<string, number>;
  difficulty_breakdown: Record<string, number>;
  programs: Module[];
}

// ── Lessons ──────────────────────────────────────────────────────────────────
export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  order_index: number;
  duration_minutes: number | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  xp_reward: number;
}

export interface QuizData {
  module_id: string;
  questions: QuizQuestion[];
}

export interface QuizAnswerResult {
  question_id: string;
  correct: boolean;
  correct_answer: string;
}

export interface QuizResult {
  score: number;
  correct_answers: number;
  total_questions: number;
  xp_earned: number;
  passed: boolean;
  results: QuizAnswerResult[];
}

// ── Module Progress ───────────────────────────────────────────────────────────
export interface ModuleProgress {
  module_id: string;
  title: string;
  category: string;
  difficulty: string;
  xp_reward: number;
  completed: boolean;
  completed_at: string | null;
  score: number | null;
}

export interface CompleteModuleResult {
  message: string;
  xp_awarded: number;
  completed_at: string;
}

// ── Simulations ───────────────────────────────────────────────────────────────
export type SimCategory = 'budgeting' | 'loan' | 'emergency' | 'debt' | 'investing';

export interface Simulation {
  id: string;
  title: string;
  description: string;
  category: SimCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp_reward: number;
  choices: string[];
  correct_choice: string | null;
  feedback: string;
  is_published: boolean;
  created_at: string;
}

export interface SimChoice {
  id: string;
  step_id: string;
  choice_text: string;
  outcome_text: string;
  financial_impact: number;
  xp_bonus: number;
  next_step_id: string | null;
}

export interface SimStep {
  id: string;
  simulation_id: string;
  step_number: number;
  scenario_text: string;
  is_first_step: boolean;
  SimChoices: SimChoice[];
}

export interface SimulationWithSteps extends Simulation {
  SimSteps: SimStep[];
}

export interface SimulationStartResult {
  attempt_id: string;
  message: string;
  simulation: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    xp_reward: number;
  };
  current_step: SimStep;
}

export interface SubmitChoiceResult {
  status: 'in_progress' | 'completed';
  outcome: string;
  financial_impact: number;
  xp_bonus?: number;
  next_step?: SimStep;
  final_score?: number;
  xp_earned?: number;
  message?: string;
}

export interface SimulationAttempt {
  id: string;
  user_id: string;
  simulation_id: string;
  status: 'in_progress' | 'completed';
  score: number;
  xp_earned: number;
  started_at: string;
  completed_at: string | null;
  Simulation?: { title: string; category: string; difficulty: string };
}

// ── Analytics ─────────────────────────────────────────────────────────────────
export interface LearnerAnalytics {
  overview: {
    xp_total: number;
    level: number;
    streak_days: number;
    last_active: string | null;
  };
  modules: {
    completed: number;
    total_available: number;
    completion_rate: number;
    average_quiz_score: number | null;
    category_breakdown: Record<string, number>;
    recent_completions: ModuleProgress[];
  };
  recent_activity: BehaviorEvent[];
  insights: Insight[];
  badges: Badge[];
}

// ── Admin ─────────────────────────────────────────────────────────────────────
export interface AdminAnalytics {
  total_users: number;
  total_admins: number;
  total_learners: number;
  total_badges_awarded: number;
  top_users: { id: string; full_name: string; email: string; xp_total: number; level: number }[];
}
