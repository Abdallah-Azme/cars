import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/dashboard/components/ui/sidebar";
import { AppSidebar } from "./AppSideBar";
const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Layout;
