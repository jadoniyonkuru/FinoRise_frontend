import type { ReactNode } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { adminNavItems } from "./adminNav";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AdminLayout({ title, subtitle, children }: Props) {
  return (
    <DashboardLayout
      role="admin"
      title={title}
      subtitle={subtitle}
      accent="var(--admin)"
      navItems={adminNavItems}
    >
      {children}
    </DashboardLayout>
  );
}
