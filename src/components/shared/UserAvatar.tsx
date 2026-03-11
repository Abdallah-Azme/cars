import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/user";
import { Link } from "react-router-dom";
import { Loader2, LogOut } from "lucide-react";
import { logoutApi } from "@/api/auth";
import { toast } from "sonner";
import { useState } from "react";

const UserAvatar = () => {
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const res = await logoutApi();
    if (res?.ok) {
      toast.success(res?.data?.message);
      logout();
    } else {
      toast.error(res?.error);
    }
    setLoading(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="lg:size-10 size-8">
          <AvatarImage src={""} />
          <AvatarFallback className="bg-red-700 text-white">
            {user?.name.charAt(0).toUpperCase()}{" "}
            {user?.name.charAt(1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={"/"}>Profile</Link>
          </DropdownMenuItem>
          <Button
            onClick={handleLogout}
            variant="destructive"
            size={"sm"}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <LogOut /> Logout
              </>
            )}
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
