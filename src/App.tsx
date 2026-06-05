import { Navigate, Route, Routes } from "react-router";
import LoginPage from "@/auth/login/LoginPage";
import AdminLoginPage from "@/auth/admin-login/AdminLoginPage";
import RegisterPage from "@/auth/register/RegisterPage";
import ResetPasswordPage from "@/auth/reset-password/ResetPasswordPage";
import AcceptInvitePage from "@/auth/accept-invite/AcceptInvitePage";
import ProtectedRoute from "@/auth/guards/ProtectedRoute";
import GuestRoute from "@/auth/guards/GuestRoute";

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
import LandingPage from "@/landing/LandingPage";

const adminRoles = ["admin", "module_manager", "simulation_manager", "rewards_manager", "analytics_viewer"] as const;

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <LandingPage />
          </GuestRoute>
        }
      />
      <Route path="/dashboard" element={<PlatformDashboard />} />

      {/* Auth */}
      <Route
        path="/auth/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route path="/auth/admin-login" element={<AdminLoginPage />} />
      <Route
        path="/auth/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/accept-invite" element={<AcceptInvitePage />} />

      {/* Learner */}
      <Route path="/learner/dashboard" element={<ProtectedRoute roles={["learner"]}><LearnerDashboard /></ProtectedRoute>} />
      <Route path="/learner/modules" element={<ProtectedRoute roles={["learner"]}><LearnerModulesPage /></ProtectedRoute>} />
      <Route path="/learner/modules/:moduleId" element={<ProtectedRoute roles={["learner"]}><ModuleDetailPage /></ProtectedRoute>} />
      <Route path="/learner/simulations" element={<ProtectedRoute roles={["learner"]}><LearnerSimulationsPage /></ProtectedRoute>} />
      <Route path="/learner/rewards" element={<ProtectedRoute roles={["learner"]}><LearnerRewardsPage /></ProtectedRoute>} />
      <Route path="/learner/ai-coach" element={<ProtectedRoute roles={["learner"]}><AICoachPage /></ProtectedRoute>} />
      <Route path="/learner/profile" element={<ProtectedRoute roles={["learner"]}><LearnerProfile /></ProtectedRoute>} />
      <Route path="/learner/settings" element={<ProtectedRoute roles={["learner"]}><LearnerSettingsPage /></ProtectedRoute>} />
      <Route path="/learner/analytics" element={<ProtectedRoute roles={["learner"]}><LearnerAnalyticsPage /></ProtectedRoute>} />
      <Route path="/learner/lesson" element={<ProtectedRoute roles={["learner"]}><LessonViewPage /></ProtectedRoute>} />
      <Route path="/learner/quiz" element={<ProtectedRoute roles={["learner"]}><ModuleQuizPage /></ProtectedRoute>} />
      <Route path="/learner/simulation-runner" element={<ProtectedRoute roles={["learner"]}><SimulationRunnerPage /></ProtectedRoute>} />
      <Route path="/learner/insights" element={<ProtectedRoute roles={["learner"]}><BehavioralInsightsPage /></ProtectedRoute>} />
      <Route path="/learner/gamification" element={<ProtectedRoute roles={["learner"]}><GamificationPage /></ProtectedRoute>} />
      <Route path="/learner/reward-catalog" element={<ProtectedRoute roles={["learner"]}><RewardCatalogPage /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin"]} adminPath="/admin/dashboard"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/user-management" element={<ProtectedRoute roles={["admin"]} adminPath="/admin/user-management"><UserManagementPage /></ProtectedRoute>} />
      <Route path="/admin/module-manager" element={<ProtectedRoute roles={[...adminRoles]} adminPath="/admin/module-manager"><ModuleManagerPage /></ProtectedRoute>} />
      <Route path="/admin/simulation-manager" element={<ProtectedRoute roles={[...adminRoles]} adminPath="/admin/simulation-manager"><SimulationManagerPage /></ProtectedRoute>} />
      <Route path="/admin/rewards-manager" element={<ProtectedRoute roles={[...adminRoles]} adminPath="/admin/rewards-manager"><RewardsManagerPage /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute roles={[...adminRoles]} adminPath="/admin/analytics"><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute roles={[...adminRoles]} adminPath="/admin/profile"><AdminProfile /></ProtectedRoute>} />

      {/* Partner */}
      <Route path="/partner/dashboard" element={<ProtectedRoute roles={["partner"]}><PartnerDashboard /></ProtectedRoute>} />
      <Route path="/partner/programs" element={<ProtectedRoute roles={["partner"]}><PartnerProgramsPage /></ProtectedRoute>} />
      <Route path="/partner/impact" element={<ProtectedRoute roles={["partner"]}><PartnerImpactPage /></ProtectedRoute>} />
      <Route path="/partner/profile" element={<ProtectedRoute roles={["partner"]}><PartnerProfile /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
