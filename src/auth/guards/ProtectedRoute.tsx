import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/api/types";
import { canAccessAdminPath, getDashboardPath } from "@/lib/roles";

type Props = {
  children: ReactNode;
  roles?: UserRole[];
  adminPath?: string;
};

export default function ProtectedRoute({ children, roles, adminPath }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  if (adminPath && !canAccessAdminPath(user.role, adminPath)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}
