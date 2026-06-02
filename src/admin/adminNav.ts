import type { NavItem } from "@/components/DashboardLayout";

export const adminNavItems: NavItem[] = [
  { label: "Admin dashboard", path: "/admin/dashboard" },
  { label: "User management", path: "/admin/user-management" },
  { label: "Learning modules", path: "/admin/module-manager" },
  { label: "Simulation setup", path: "/admin/simulation-manager" },
  { label: "Reward config", path: "/admin/rewards-manager" },
  { label: "Analytics dashboard", path: "/admin/analytics" },
  { label: "Profile", path: "/admin/profile" },
];
