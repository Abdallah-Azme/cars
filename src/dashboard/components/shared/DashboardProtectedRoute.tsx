import { useAuthStore } from "@/stores/user";
import type { AuthState } from "@/types/auth";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

export default function DashboardProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state: AuthState) => state.token);
  const isAuthenticated = useAuthStore((state: AuthState) => state.isAuthenticated);
  const user = useAuthStore((state: AuthState) => state.user);

  useEffect(() => {
    // If the user lands here but is not an admin, we can show a toast
    if (isAuthenticated && user && user.role !== "Admin") {
      toast.error("Access Denied", {
        description: "You do not have permission to access the dashboard. Admins only.",
      });
      // Optionally log them out if they tried to access admin dashboard with wrong role
      // Or we can just let them stay logged in globally but redirect to dashboard login
    }
  }, [isAuthenticated, user]);

  if (!token || !isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  // Check if they are actually an Admin
  if (user && user.role !== "Admin") {
    // We can clear their state entirely, or just redirect
    return <Navigate to="/dashboard/login" replace />;
  }

  return children;
}
