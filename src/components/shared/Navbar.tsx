import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Heart,
  Home,
  LayoutPanelTop,
  UserKey,
  UserPlus,
  Van,
} from "lucide-react";

const links = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: LayoutPanelTop,
  },
  {
    name: "Machines",
    path: "/machines",
    icon: Van,
  },
  {
    name: "Favorite",
    path: "/favorite",
    icon: Heart,
  },
];

export default function Navbar() {
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block   border-b bg-background sticky top-0 left-0 right-0 z-50">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"} className="text-xl font-bold">
            <img
              src="/logo-icon.jpeg"
              alt="logo"
              className="size-20 object-contain"
            />
          </Link>

          {/* Links */}
          <div className="flex gap-6">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "group font-medium transition-colors hover:border-b-2 hover:border-primary flex items-center gap-1 pb-1",
                    isActive && "text-primary border-b-2 border-primary",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon
                      size={20}
                      className={cn(
                        "transition-colors group-hover:text-red-700",
                        isActive && "text-red-700",
                      )}
                    />
                    {link.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-2">
            <Link to={"/login"}>
              <Button
                variant="ghost"
                size={"lg"}
                className="hover:bg-red-700 hover:text-white"
              >
                <UserKey /> Login
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button size={"lg"}>
                <UserPlus /> Signup
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background z-50">
        <div className="flex justify-around items-center py-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "group  font-medium flex flex-col items-center hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    size={20}
                    className={cn(
                      "transition-colors group-hover:text-red-700",
                      isActive && "text-red-700",
                    )}
                  />
                  {link.name}
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            key={"login"}
            to={"/login"}
            className={({ isActive }) =>
              cn(
                "group text-sm font-medium flex flex-col items-center hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground",
              )
            }
          >
            {({ isActive }) => (
              <>
                <UserKey
                  size={16}
                  className={cn(
                    "transition-colors group-hover:text-red-700",
                    isActive && "text-red-700",
                  )}
                />
                Login
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </>
  );
}
