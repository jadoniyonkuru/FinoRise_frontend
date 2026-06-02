import type { ReactNode } from "react";
import PortalLayout from "@/portal/PortalLayout";
import { adminNavItems } from "./adminNav";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AdminLayout({ title, subtitle, children }: Props) {
  return (
    <PortalLayout area="admin" title={title} subtitle={subtitle} subNav={adminNavItems}>
      {children}
    </PortalLayout>
  );
}
