import type { NavItem } from "@/components/DashboardLayout";

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "User management", path: "/admin/user-management" },
  { label: "Learning modules", path: "/admin/module-manager" },
  { label: "Simulations", path: "/admin/simulation-manager" },
  { label: "Rewards", path: "/admin/rewards-manager" },
  { label: "Analytics", path: "/admin/analytics" },
  { label: "Profile", path: "/admin/profile" },
];
