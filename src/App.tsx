import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/HomePage";

import LoginPage from "@/auth/login/LoginPage";
import AdminLoginPage from "@/auth/admin-login/AdminLoginPage";
import RegisterPage from "@/auth/register/RegisterPage";
import ResetPasswordPage from "@/auth/reset-password/ResetPasswordPage";

import LearnerDashboard from "@/learner/dashboard/LearnerDashboard";
import LearnerProfile from "@/learner/profile/LearnerProfile";
import LearnerModulesPage from "@/learner/modules/LearnerModulesPage";
import ModuleDetailPage from "@/learner/modules/ModuleDetailPage";
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

import PlatformDashboard from "@/portal/PlatformDashboard";

function P({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/account/login" element={<LoginPage />} />
      <Route path="/account/admin-login" element={<AdminLoginPage />} />
      <Route path="/account/register" element={<RegisterPage />} />
      <Route path="/account/reset-password" element={<ResetPasswordPage />} />

      {/* Portal (protected) */}
      <Route path="/dashboard" element={<P><PlatformDashboard /></P>} />

      {/* Learner (protected) */}
      <Route path="/learner/dashboard" element={<P><LearnerDashboard /></P>} />
      <Route path="/learner/modules" element={<P><LearnerModulesPage /></P>} />
      <Route path="/learner/modules/:moduleId" element={<P><ModuleDetailPage /></P>} />
      <Route path="/learner/simulations" element={<P><LearnerSimulationsPage /></P>} />
      <Route path="/learner/rewards" element={<P><LearnerRewardsPage /></P>} />
      <Route path="/learner/ai-coach" element={<P><AICoachPage /></P>} />
      <Route path="/learner/profile" element={<P><LearnerProfile /></P>} />
      <Route path="/learner/settings" element={<P><LearnerSettingsPage /></P>} />
      <Route path="/learner/analytics" element={<P><LearnerAnalyticsPage /></P>} />
      <Route path="/learner/lesson" element={<P><LessonViewPage /></P>} />
      <Route path="/learner/quiz" element={<P><ModuleQuizPage /></P>} />
      <Route path="/learner/simulation-runner" element={<P><SimulationRunnerPage /></P>} />
      <Route path="/learner/insights" element={<P><BehavioralInsightsPage /></P>} />
      <Route path="/learner/gamification" element={<P><GamificationPage /></P>} />
      <Route path="/learner/reward-catalog" element={<P><RewardCatalogPage /></P>} />

      {/* Admin (protected) */}
      <Route path="/admin/dashboard" element={<P><AdminDashboard /></P>} />
      <Route path="/admin/user-management" element={<P><UserManagementPage /></P>} />
      <Route path="/admin/module-manager" element={<P><ModuleManagerPage /></P>} />
      <Route path="/admin/simulation-manager" element={<P><SimulationManagerPage /></P>} />
      <Route path="/admin/rewards-manager" element={<P><RewardsManagerPage /></P>} />
      <Route path="/admin/analytics" element={<P><AnalyticsPage /></P>} />
      <Route path="/admin/profile" element={<P><AdminProfile /></P>} />

      {/* Partner (protected) */}
      <Route path="/partner/dashboard" element={<P><PartnerDashboard /></P>} />
      <Route path="/partner/programs" element={<P><PartnerProgramsPage /></P>} />
      <Route path="/partner/impact" element={<P><PartnerImpactPage /></P>} />
      <Route path="/partner/profile" element={<P><PartnerProfile /></P>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
