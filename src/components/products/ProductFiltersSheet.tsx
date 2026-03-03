import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet";
import { ProductFilters } from "./ProductFilter";

export function ProductFiltersSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full  bg-red-600 text-white">
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="overflow-auto">
        <SheetHeader>
          <SheetDescription asChild>
            <div className="mt-6">
              <ProductFilters />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
