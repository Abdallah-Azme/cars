import { logoutApi } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/user";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LogoutBtn = ({size="sm"}: {size?: "sm"|"lg"}) => {
  const { logout } = useAuthStore();
  const navigation= useNavigate()
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const res = await logoutApi();
    if (res?.ok) {
      toast.success(res?.data?.message);
      logout();
      navigation("/")
      
    } else {
      toast.error(res?.error);
    }
    setLoading(false);
  };
  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      size={size}
      className="w-full mt-2"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <LogOut /> Logout
        </>
      )}
    </Button>
  );
};

export default LogoutBtn;
