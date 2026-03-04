import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import EmailSubscription from "@/components/shared/EmailBox";
import PageHeader from "@/components/shared/PageHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from "lucide-react";

type SpecRow = { label: string; value: string };

type Props = {
  dateText?: string; // "03/03(Tue) Machinery"
  title?: string; // "WHEEL LOADER CAT"
  images?: string[];
  grade?: "A" | "B" | "C" | "D";
  specs?: SpecRow[];
  startPrice?: string; // "2,500,000 Yen"
  auctionStatus?: string; // "Not auctioned"
  timeText?: string; // "03/03 11:00"
  description?: string;
};

export function SingleProductPage({
  dateText = "03/03(Tue) Machinery",
  title = "WHEEL LOADER CAT",
  images = ["/hero.jpg", "/hero.jpg", "/hero.jpg"],
  grade = "B",
  specs = [
    { label: "Model", value: "950F" },
    { label: "Year", value: "H09" },
    { label: "Hours", value: "5,741 hr" },
    { label: "SerialNo", value: "4DJ03710" },
    { label: "Size", value: "MEDIUM" },
    { label: "Inspection", value: "—" },
    { label: "Specification", value: "Cabin / Piping" },
    { label: "FuelType", value: "D" },
  ],
  startPrice = "2,500,000 Yen",
  auctionStatus = "Not auctioned",
  timeText = "03/03 11:00",
  description = "Simple description about the product condition, notes, and any important details.",
}: Props) {
  return (
    <>
      <PageHeader title="Product Name" />
      <div className="space-y-5 container my-12">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="text-muted-foreground">{dateText}</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full px-3">
                Grade {grade}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {auctionStatus}
              </Badge>
              <span className="text-xs text-muted-foreground">{timeText}</span>
            </div>
          </div>

          {/* Favorite + CTA (UI only) */}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="gap-2"
              aria-label="Add to favorites"
              title="Add to favorites"
            >
              <Heart />
            </Button>

            <Button className="bg-red-600 hover:bg-red-700">
              Request / Buy
            </Button>
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: Carousel */}
          <Card>
            <CardHeader className="pb-3">
              <div className="text-sm font-semibold text-red-600">Photos</div>
            </CardHeader>

            <CardContent className="pt-0">
              <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                  {images.map((src, i) => (
                    <CarouselItem key={src + i}>
                      <div className="relative  overflow-hidden rounded-lg border bg-muted">
                        <img
                          src={src}
                          alt={`${title} image ${i + 1}`}
                          className="object-cover"
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
                <div className="text-sm font-semibold text-red-600">
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
                <div className="mt-1 text-lg font-semibold">{startPrice}</div>
                <Separator className="my-3" />
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="mt-1 text-sm">{auctionStatus}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-red-600">
              Description
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </div>
      <EmailSubscription />
    </>
  );
}
