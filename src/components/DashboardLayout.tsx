import type { ReactNode } from "react";
import PortalLayout from "@/portal/PortalLayout";
import type { PortalArea } from "@/portal/portalTabs";

export type Role = "learner" | "admin" | "partner";

export type NavItem = {
  label: string;
  path: string;
};

type Props = {
  role: Role;
  title: string;
  subtitle: string;
  accent: string;
  children: ReactNode;
  navItems?: NavItem[];
};

const roleToArea: Record<Role, PortalArea> = {
  admin: "admin",
  partner: "partner",
  learner: "learner",
};

/** @deprecated accent is unused; portal layout uses shared dark-blue theme */
export default function DashboardLayout({ role, title, subtitle, children, navItems }: Props) {
  return (
    <PortalLayout area={roleToArea[role]} title={title} subtitle={subtitle} subNav={navItems}>
      {children}
    </PortalLayout>
  );
}
