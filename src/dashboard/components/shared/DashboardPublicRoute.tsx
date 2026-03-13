import { useAuthStore } from "@/stores/user";
import type { AuthState } from "@/types/auth";
import { Navigate } from "react-router-dom";

export default function DashboardPublicRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state: AuthState) => state.token);
  const isAuthenticated = useAuthStore((state: AuthState) => state.isAuthenticated);
  const user = useAuthStore((state: AuthState) => state.user);

  if (token && isAuthenticated && user?.role === "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
