import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "var(--text-muted)", fontFamily: "system-ui, sans-serif" }}>
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/account/login" replace />;

  return <>{children}</>;
}
