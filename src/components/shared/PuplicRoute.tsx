import { useAuthStore } from "@/stores/user";
import type { AuthState } from "@/types/auth";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state:AuthState) => state.token);
  const isAuthenticated = useAuthStore((state:AuthState) => state.isAuthenticated);

  if (token && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
