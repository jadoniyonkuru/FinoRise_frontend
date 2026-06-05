import type { NavItem } from "@/components/DashboardLayout";
import type { UserRole } from "@/api/types";

export const STAFF_ROLES: UserRole[] = [
  "module_manager",
  "simulation_manager",
  "rewards_manager",
  "analytics_viewer",
];

export const ADMIN_AREA_ROLES: UserRole[] = ["admin", ...STAFF_ROLES];

const ROLE_HOME: Record<UserRole, string> = {
  learner: "/learner/dashboard",
  partner: "/partner/dashboard",
  admin: "/admin/dashboard",
  module_manager: "/admin/module-manager",
  simulation_manager: "/admin/simulation-manager",
  rewards_manager: "/admin/rewards-manager",
  analytics_viewer: "/admin/analytics",
};

const ROLE_ADMIN_PATHS: Record<UserRole, string[]> = {
  learner: [],
  partner: [],
  admin: [
    "/admin/dashboard",
    "/admin/user-management",
    "/admin/module-manager",
    "/admin/simulation-manager",
    "/admin/rewards-manager",
    "/admin/analytics",
    "/admin/profile",
  ],
  module_manager: ["/admin/module-manager", "/admin/profile"],
  simulation_manager: ["/admin/simulation-manager", "/admin/profile"],
  rewards_manager: ["/admin/rewards-manager", "/admin/profile"],
  analytics_viewer: ["/admin/analytics", "/admin/profile"],
};

export function getDashboardPath(role: string): string {
  return ROLE_HOME[role as UserRole] ?? "/learner/dashboard";
}

export function isAdminAreaRole(role: string): boolean {
  return ADMIN_AREA_ROLES.includes(role as UserRole);
}

export function canPublishContent(role: string): boolean {
  return role === "admin";
}

export function canAccessAdminPath(role: string, path: string): boolean {
  const allowed = ROLE_ADMIN_PATHS[role as UserRole];
  if (!allowed) return false;
  return allowed.some((p) => path === p || path.startsWith(`${p}/`));
}

export function filterAdminNav(role: string, items: NavItem[]): NavItem[] {
  const allowed = ROLE_ADMIN_PATHS[role as UserRole];
  if (!allowed) return items;
  if (role === "admin") return items;
  return items.filter((item) => allowed.includes(item.path));
}

export function roleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Admin",
    learner: "Learner",
    partner: "Partner",
    module_manager: "Learning module creator",
    simulation_manager: "Simulation setup",
    rewards_manager: "Reward configuration",
    analytics_viewer: "Analytics dashboard",
  };
  return labels[role] ?? role;
}
