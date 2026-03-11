import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/user";
import { UserKey, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
export default function AuthBtns() {
  const { token, isAuthenticated } = useAuthStore();

  return token && isAuthenticated ? (
    
    <UserAvatar />
  ) : (
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
  );
}
