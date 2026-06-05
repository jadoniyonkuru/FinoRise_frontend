import type { ReactNode } from "react";
import PortalLayout from "@/portal/PortalLayout";
import { useAuth } from "@/context/AuthContext";
import { filterAdminNav } from "@/lib/roles";
import { adminNavItems } from "./adminNav";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AdminLayout({ title, subtitle, children }: Props) {
  const { user } = useAuth();
  const nav = user ? filterAdminNav(user.role, adminNavItems) : adminNavItems;

  return (
    <PortalLayout area="admin" title={title} subtitle={subtitle} subNav={nav}>
      {children}
    </PortalLayout>
  );
}
