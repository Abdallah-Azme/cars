import { Badge } from "@/dashboard/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/dashboard/components/ui/card";
import { Separator } from "@/dashboard/components/ui/separator";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleVehicleApi } from "@/api/vehicles";
import { Loader2 } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/dashboard/components/ui/carousel";

export function SingleProductPage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getSingleVehicleApi(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-red-600" />
      </div>
    );
  }

  const vehicle = data?.data?.data;

  if (!vehicle) {
    return (
      <div className="flex h-[70vh] items-center justify-center font-bold">
        Vehicle Not Found
      </div>
    );
  }

  const title = `${vehicle.carMaker} ${vehicle.model}`;
  const images = vehicle.images?.map((img) => img.image_url) || ["/placeholder.svg"];
  
  const specs = [
    { label: "Model", value: vehicle.model || "—" },
    { label: "Year", value: vehicle.year || "—" },
    { label: "Hours", value: vehicle.workingHours || "—" },
    { label: "Lot Number", value: vehicle.lotNumber || "—" },
    { label: "Chassis ID", value: vehicle.chassisId || "—" },
    { label: "Fuel Type", value: vehicle.fuel || "—" },
    { label: "Score", value: vehicle.score || "—" },
    { label: "Body Type", value: vehicle.vehicleType || "—" },
  ];

  return (
    <>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-red-700">{title}</h1>
            <div className="text-muted-foreground">{vehicle.auctionDay} {new Date(vehicle.holdingDate).toLocaleDateString()}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3">
              Grade {vehicle.score || "—"}
            </Badge>
            <Badge variant="outline" className="font-normal capitalize">
              {vehicle.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(vehicle.holdingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: Carousel */}
          <Card>
            <CardHeader className="pb-3">
              <div className="text-sm font-semibold text-red-700">Photos</div>
            </CardHeader>

            <CardContent className="pt-0">
              <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                  {images.map((src, i) => (
                    <CarouselItem key={src + i}>
                      <div className="relative overflow-hidden rounded-lg border bg-muted">
                        <img
                          src={src}
                          alt={`${title} image ${i + 1}`}
                          className="object-contain w-full h-[400px]"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className="flex items-center gap-2 mt-8">
                  <CarouselPrevious className="bg-red-600 border-none text-white size-8! static translate-x-0 translate-y-0" />
                  <CarouselNext className="bg-red-600 border-none text-white size-8! static translate-x-0 translate-y-0" />
                </div>
              </Carousel>
            </CardContent>
          </Card>

          {/* Right: Specs + Start price */}
          <div className="space-y-5">
            {/* Specs table */}
            <Card>
              <CardHeader className="pb-3">
                <div className="text-sm font-semibold text-red-700">
                  Specifications
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-md border bg-muted/20 overflow-hidden">
                  <div className="grid grid-cols-[120px_1fr]">
                    {specs.map((row, idx) => (
                      <div key={`${row.label}-${idx}`} className="contents">
                        <div className="border-b px-3 py-2 text-xs font-medium bg-muted/40">
                          {row.label}
                        </div>
                        <div className="border-b px-3 py-2 text-xs">
                          {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Start price */}
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Start price</div>
                <div className="mt-1 text-lg font-semibold">{Number(vehicle.startPrice).toLocaleString()} Yen</div>
                <Separator className="my-3" />
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="mt-1 text-sm capitalize">{vehicle.status}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-red-700">
              Description / Equipment
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{vehicle.equipment || "No description available."}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
