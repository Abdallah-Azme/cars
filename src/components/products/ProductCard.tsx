// components/products/product-card-ui.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

type SpecRow = { label: string; value: string };

type Props = {
  dateText?: string; // "03/03(Tue) Machinery"
  title?: string; // "WHEEL LOADER CAT"
  imageUrl?: string;
  grade?: "A" | "B" | "C" | "D";
  specs?: SpecRow[];
  startPrice?: string; // "2,500,000 Yen"
  auctionStatus?: string; // "Not auctioned"
  timeText?: string; // "03/03 11:00"
  isFavorite?: boolean;
};

export function ProductCard({
  dateText = "03/03(Tue) Machinery",
  title = "WHEEL LOADER CAT",
  imageUrl = "/hero.jpg",
  grade = "B",
  specs = [
    { label: "Model", value: "950F" },
    { label: "Year", value: "H09" },
    { label: "Hours", value: "5,741 hr" },
    { label: "SerialNo", value: "4DJ03710" },
    { label: "Specification", value: "Cabin / Piping" },
    { label: "FuelType", value: "D" },
    { label: "Size", value: "MEDIU" },
    { label: "Inspection", value: "t" },
  ],
  startPrice = "2,500,000 Yen",
  auctionStatus = "Not auctioned",
  timeText = "03/03 11:00",
  isFavorite = false,
}: Props) {
  return (
    <Link to={`/products/${title}`}>
    <Card className="overflow-hidden">
      <CardContent className="px-4 py-2">
        {/* Top row: date + grade + favorite */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className=" font-semibold tracking-wide">{title}</div>
            <div className="text-sm text-muted-foreground">{dateText}</div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary"  className="rounded-full size-9 text-base">
              {grade}
            </Badge>

            {/* Favorite button (no extra libs) */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Add to favorites"
              title="Add to favorites"
            >
              <Heart fill={isFavorite ? "red" : "none"} color={isFavorite ? "red" : "black"} />
            </Button>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Middle: specs table + image */}
        <div className="flex flex-col gap-4">
          {/* Image */}
          <div className="relative overflow-hidden rounded-md border bg-muted aspect-4/3">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Specs */}
          <div className="rounded-md border bg-muted/20 overflow-hidden">
            <div className="grid grid-cols-[110px_1fr]">
              {specs.map((row, idx) => (
                <div key={`${row.label}-${idx}`} className="contents">
                  <div className="border-b px-3 py-2 text-xs font-medium bg-muted/60">
                    {row.label}
                  </div>
                  <div className="border-b px-3 py-2 text-xs">{row.value}</div>
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
            <span className="ml-2 text-sm font-semibold text-foreground">
              {startPrice}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 ">
            <Badge variant="outline" className="font-normal">
              {auctionStatus}
            </Badge>
            <div className="text-xs text-muted-foreground">{timeText}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
    </Link>
  );
}
