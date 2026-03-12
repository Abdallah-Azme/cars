import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { addToFavApi } from "@/api/favorites";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AddToFavBtn = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const addToFav = async () => {
    setLoading(true);
    const res = await addToFavApi(id);
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
      onClick={addToFav}
    >
      {loading ? <Loader2 className="animate-spin" /> : <Heart />}
    </Button>
  );
};

export default AddToFavBtn;
