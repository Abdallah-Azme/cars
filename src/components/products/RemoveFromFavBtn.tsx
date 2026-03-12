import { removeFromFavApi } from "@/api/favorites";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const RemoveFromFavBtn = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const removeFromFav = async () => {
    setLoading(true);
    const res = await removeFromFavApi(id);
    if (res.ok) {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    } else {
      toast.error(res?.error);
    }
    setLoading(false);
  };
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full"
      aria-label="Add to favorites"
      title="Add to favorites"
      disabled={loading}
      onClick={removeFromFav}
    >
      {loading ? <Loader2 className="animate-spin" /> : <X />}
    </Button>
  );
};

export default RemoveFromFavBtn;
