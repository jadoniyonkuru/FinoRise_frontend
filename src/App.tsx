import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/auth/login/LoginPage";
import RegisterPage from "@/auth/register/RegisterPage";
import ResetPasswordPage from "@/auth/reset-password/ResetPasswordPage";

import LearnerDashboard from "@/learner/dashboard/LearnerDashboard";
import LearnerProfile from "@/learner/profile/LearnerProfile";
import LearnerModulesPage from "@/learner/modules/LearnerModulesPage";
import LearnerSimulationsPage from "@/learner/simulations/LearnerSimulationsPage";
import LearnerRewardsPage from "@/learner/rewards/LearnerRewardsPage";
import AICoachPage from "@/learner/ai-coach/AICoachPage";
import LearnerSettingsPage from "@/learner/settings/LearnerSettingsPage";
import LearnerAnalyticsPage from "@/learner/analytics/LearnerAnalyticsPage";
import LessonViewPage from "@/learner/lesson/LessonViewPage";
import ModuleQuizPage from "@/learner/quiz/ModuleQuizPage";
import SimulationRunnerPage from "@/learner/simulation-runner/SimulationRunnerPage";
import BehavioralInsightsPage from "@/learner/behavioral-insights/BehavioralInsightsPage";
import GamificationPage from "@/learner/gamification/GamificationPage";
import RewardCatalogPage from "@/learner/reward-catalog/RewardCatalogPage";

import AdminDashboard from "@/admin/dashboard/AdminDashboard";
import AdminProfile from "@/admin/profile/AdminProfile";
import UserManagementPage from "@/admin/user-management/UserManagementPage";
import ModuleManagerPage from "@/admin/module-manager/ModuleManagerPage";
import SimulationManagerPage from "@/admin/simulation-manager/SimulationManagerPage";
import RewardsManagerPage from "@/admin/rewards-manager/RewardsManagerPage";
import AnalyticsPage from "@/admin/analytics/AnalyticsPage";

import PartnerDashboard from "@/partner/dashboard/PartnerDashboard";
import PartnerProfile from "@/partner/profile/PartnerProfile";
import PartnerProgramsPage from "@/partner/programs/PartnerProgramsPage";
import PartnerImpactPage from "@/partner/impact/PartnerImpactPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Auth */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

      {/* Learner */}
      <Route path="/learner/dashboard" element={<LearnerDashboard />} />
      <Route path="/learner/modules" element={<LearnerModulesPage />} />
      <Route path="/learner/simulations" element={<LearnerSimulationsPage />} />
      <Route path="/learner/rewards" element={<LearnerRewardsPage />} />
      <Route path="/learner/ai-coach" element={<AICoachPage />} />
      <Route path="/learner/insights" element={<Navigate to="/learner/dashboard" replace />} />
      <Route path="/learner/profile" element={<LearnerProfile />} />
      <Route path="/learner/settings" element={<LearnerSettingsPage />} />
      <Route path="/learner/analytics" element={<LearnerAnalyticsPage />} />
      <Route path="/learner/lesson" element={<LessonViewPage />} />
      <Route path="/learner/quiz" element={<ModuleQuizPage />} />
      <Route path="/learner/simulation-runner" element={<SimulationRunnerPage />} />
      <Route path="/learner/insights" element={<BehavioralInsightsPage />} />
      <Route path="/learner/gamification" element={<GamificationPage />} />
      <Route path="/learner/reward-catalog" element={<RewardCatalogPage />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/user-management" element={<UserManagementPage />} />
      <Route path="/admin/module-manager" element={<ModuleManagerPage />} />
      <Route path="/admin/simulation-manager" element={<SimulationManagerPage />} />
      <Route path="/admin/rewards-manager" element={<RewardsManagerPage />} />
      <Route path="/admin/analytics" element={<AnalyticsPage />} />
      <Route path="/admin/profile" element={<AdminProfile />} />

      {/* Partner */}
      <Route path="/partner/dashboard" element={<PartnerDashboard />} />
      <Route path="/partner/programs" element={<PartnerProgramsPage />} />
      <Route path="/partner/impact" element={<PartnerImpactPage />} />
      <Route path="/partner/profile" element={<PartnerProfile />} />
    </Routes>
  );
}
