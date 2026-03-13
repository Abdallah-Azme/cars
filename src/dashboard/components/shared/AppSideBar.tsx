import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
} from "@/dashboard/components/ui/sidebar";
import { cn } from "@/dashboard/lib/utils";
import { LayoutPanelTop, LogOut, Truck, Users, Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@/api/auth";
import { useAuthStore } from "@/stores/user";
import { toast } from "sonner";

export function AppSidebar() {
  const Navigations = [
    {
      title: "Auctions",
      href: "/dashboard",
      icon: Truck,
    },
    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: LayoutPanelTop,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
  ];

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logoutApi(),
    onSettled: () => {
      // Regardless of whether the API call succeeds or fails, log the user out locally
      logout();
      toast.success("Logged out successfully");
      navigate("/dashboard/login", { replace: true });
    },
  });

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center gap-2 border-b-2">
        <img src="/logo-icon.jpeg" alt="logo" className="w-22" />
        <h1 className="text-xl font-bold">Cars Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2">
          {Navigations.map((navigation) => (
            <SidebarMenuItem key={navigation.title}>
              <NavLink
                to={navigation.href}
                className={({ isActive }) =>
                  cn(
                    "font-semibold flex items-center gap-2 p-2 rounded hover:bg-red-700 hover:text-white",
                    isActive && "bg-red-700 text-white",
                  )
                }
              >
                <navigation.icon />
                {navigation.title}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-2">
        <Button 
          variant="destructive" 
          size={"lg"} 
          className="bg-red-700" 
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <LogOut />
          )}
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
