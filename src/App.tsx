import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/auth/login/LoginPage";
import RegisterPage from "@/auth/register/RegisterPage";
import ResetPasswordPage from "@/auth/reset-password/ResetPasswordPage";
import LearnerDashboard from "@/learner/dashboard/LearnerDashboard";
import AdminDashboard from "@/admin/dashboard/AdminDashboard";
import UserManagementPage from "@/admin/user-management/UserManagementPage";
import ModuleManagerPage from "@/admin/module-manager/ModuleManagerPage";
import SimulationManagerPage from "@/admin/simulation-manager/SimulationManagerPage";
import RewardsManagerPage from "@/admin/rewards-manager/RewardsManagerPage";
import AnalyticsPage from "@/admin/analytics/AnalyticsPage";
import PartnerDashboard from "@/partner/dashboard/PartnerDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/learner/dashboard" element={<LearnerDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/user-management" element={<UserManagementPage />} />
      <Route path="/admin/module-manager" element={<ModuleManagerPage />} />
      <Route path="/admin/simulation-manager" element={<SimulationManagerPage />} />
      <Route path="/admin/rewards-manager" element={<RewardsManagerPage />} />
      <Route path="/admin/analytics" element={<AnalyticsPage />} />
      <Route path="/partner/dashboard" element={<PartnerDashboard />} />
    </Routes>
  );
}
