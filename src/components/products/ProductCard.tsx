// components/products/product-card-ui.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { VehicleData } from "@/types/vehicles";
import { Link } from "react-router-dom";
import AddToFavBtn from "./AddToFavBtn";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/stores/settings";
import { MessageCircle } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";

import { ZoomDialog } from "./ZoomDialog";

type Props = {
  isFavorite?: boolean;
  vehicle: VehicleData;
};

export function ProductCard({ vehicle }: Props) {
  const labels = [
    { label: "Vehicle Type", value: vehicle?.vehicleType },
    { label: "Chassis Id", value: vehicle?.chassisId },
    { label: "Hours", value: vehicle?.workingHours },
    { label: "Score", value: vehicle?.score },
    { label: "Year", value: vehicle?.year },
    { label: "Fuel", value: vehicle?.fuel },
    { label: "Size", value: vehicle?.vehicleSize },
    { label: "Inspection", value: vehicle?.inspection },
  ];

  const { settings } = useSettingsStore();

  const handleWhatsAppContact = () => {
    const contact = settings?.whatsapp || settings?.phone;
    const message = `Hello, I'm interested in the ${vehicle?.carMaker || ""} ${vehicle?.model || ""} (ID: ${vehicle?.id}). Could you provide more details?`;
    const finalUrl = formatWhatsAppUrl(contact, message);
    if (finalUrl) window.open(finalUrl, "_blank");
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="px-4 py-2">
        {/* Top row: date + grade + favorite */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className=" font-semibold tracking-wide">
              {vehicle?.carMaker || "-"} {vehicle?.model || "-"}
            </div>
            <div className="text-sm text-muted-foreground">
              {vehicle?.auctionDay}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AddToFavBtn  id={vehicle?.id}/>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Middle: specs table + image */}
        <div className="flex flex-col gap-4">
          {/* Image */}
          <ZoomDialog
            src={vehicle?.images?.[0]?.image_url || "/placeholder.svg"}
            alt="product"
          >
            <Link
              to={`/products/${vehicle?.id}`}
              className="relative block overflow-hidden rounded-md border bg-muted aspect-4/3 cursor-zoom-in group/item"
            >
              <img
                src={vehicle?.images?.[0]?.image_url || "/placeholder.svg"}
                alt="product"
                className="h-full w-full object-cover transition-all duration-700 group-hover/item:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </Link>
          </ZoomDialog>
          {/* Specs */}
          <div className="rounded-md border bg-muted/20 overflow-hidden">
            <div className="grid grid-cols-[110px_1fr]">
              {labels.map((row, idx) => (
                <div key={`${row.label}-${idx}`} className="contents">
                  <div className="border-b px-3 py-2 text-xs font-medium bg-muted/60">
                    {row.label}
                  </div>
                  <div className="border-b px-3 py-2 text-xs">
                    {row.value || "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className=" border-t">
        <div className="flex w-full flex-col gap-2  ">
          <div className="text-xs text-muted-foreground">
            Start price
            <span className="ml-2 text-sm font-semibold text-foreground flex items-center gap-1">
              <span className="text-[10px] opacity-70 font-bold italic">(¥) ين</span>
              {vehicle?.startPrice}
            </span>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <p>Acceptance Period:</p>
            <p className="font-semibold text-primary">
              {new Date(vehicle?.acceptancePeriod).toLocaleDateString()}
            </p>
          </div>

          {settings?.whatsapp || settings?.phone ? (
            <Button
              onClick={handleWhatsAppContact}
              className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white gap-2 transition-all active:scale-95"
            >
              <MessageCircle className="size-4" />
              Contact via WhatsApp
            </Button>
          ) : (
            <Button
              disabled
              variant="outline"
              className="w-full mt-2 gap-2"
            >
              <MessageCircle className="size-4" />
              Contact Unavailable
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
