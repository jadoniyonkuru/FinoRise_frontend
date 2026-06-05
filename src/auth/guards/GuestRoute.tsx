import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { getDashboardPath } from "@/lib/roles";

export default function GuestRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}
