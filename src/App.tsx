import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import LoginPage from "@/auth/login/LoginPage";
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

function roleDashboard(user: { role?: string } | null): string {
  return user?.role ? `/${user.role}/dashboard` : "/auth/login";
}

function RequireAuth({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Loading…</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (role && user.role !== role) return <Navigate to={roleDashboard(user)} replace />;
  return <>{children}</>;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Loading…</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={roleDashboard(user)} replace />} />

      {/* Auth */}
      <Route path="/auth/login" element={user?.role ? <Navigate to={roleDashboard(user)} replace /> : <LoginPage />} />
      <Route path="/auth/register" element={user?.role ? <Navigate to={roleDashboard(user)} replace /> : <RegisterPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

      {/* Learner */}
      <Route path="/learner/dashboard" element={<RequireAuth role="learner"><LearnerDashboard /></RequireAuth>} />
      <Route path="/learner/modules" element={<RequireAuth role="learner"><LearnerModulesPage /></RequireAuth>} />
      <Route path="/learner/modules/:moduleId" element={<RequireAuth role="learner"><ModuleDetailPage /></RequireAuth>} />
      <Route path="/learner/simulations" element={<RequireAuth role="learner"><LearnerSimulationsPage /></RequireAuth>} />
      <Route path="/learner/rewards" element={<RequireAuth role="learner"><LearnerRewardsPage /></RequireAuth>} />
      <Route path="/learner/ai-coach" element={<RequireAuth role="learner"><AICoachPage /></RequireAuth>} />
      <Route path="/learner/profile" element={<RequireAuth role="learner"><LearnerProfile /></RequireAuth>} />
      <Route path="/learner/settings" element={<RequireAuth role="learner"><LearnerSettingsPage /></RequireAuth>} />
      <Route path="/learner/analytics" element={<RequireAuth role="learner"><LearnerAnalyticsPage /></RequireAuth>} />
      <Route path="/learner/lesson" element={<RequireAuth role="learner"><LessonViewPage /></RequireAuth>} />
      <Route path="/learner/quiz" element={<RequireAuth role="learner"><ModuleQuizPage /></RequireAuth>} />
      <Route path="/learner/simulation-runner" element={<RequireAuth role="learner"><SimulationRunnerPage /></RequireAuth>} />
      <Route path="/learner/insights" element={<RequireAuth role="learner"><BehavioralInsightsPage /></RequireAuth>} />
      <Route path="/learner/gamification" element={<RequireAuth role="learner"><GamificationPage /></RequireAuth>} />
      <Route path="/learner/reward-catalog" element={<RequireAuth role="learner"><RewardCatalogPage /></RequireAuth>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/user-management" element={<RequireAuth role="admin"><UserManagementPage /></RequireAuth>} />
      <Route path="/admin/module-manager" element={<RequireAuth role="admin"><ModuleManagerPage /></RequireAuth>} />
      <Route path="/admin/simulation-manager" element={<RequireAuth role="admin"><SimulationManagerPage /></RequireAuth>} />
      <Route path="/admin/rewards-manager" element={<RequireAuth role="admin"><RewardsManagerPage /></RequireAuth>} />
      <Route path="/admin/analytics" element={<RequireAuth role="admin"><AnalyticsPage /></RequireAuth>} />
      <Route path="/admin/profile" element={<RequireAuth role="admin"><AdminProfile /></RequireAuth>} />

      {/* Partner */}
      <Route path="/partner/dashboard" element={<RequireAuth role="partner"><PartnerDashboard /></RequireAuth>} />
      <Route path="/partner/programs" element={<RequireAuth role="partner"><PartnerProgramsPage /></RequireAuth>} />
      <Route path="/partner/impact" element={<RequireAuth role="partner"><PartnerImpactPage /></RequireAuth>} />
      <Route path="/partner/profile" element={<RequireAuth role="partner"><PartnerProfile /></RequireAuth>} />

      {/* Catch-all: redirect any unknown path */}
      <Route path="*" element={<Navigate to={roleDashboard(user)} replace />} />
    </Routes>
  );
}
