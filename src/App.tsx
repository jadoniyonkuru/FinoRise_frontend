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

import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <Routes>
      {/* Landing page at the root route */}
      <Route path="/" element={<LandingPage />} />

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

export default App;