import { getFiltersApi, getVehiclesApi, type VehicleFilterParams } from "@/api/vehicles";
import { defaultFilters } from "@/types/vehicles";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProductFilters } from "./ProductFilter";
import { ProductFiltersSheet } from "./ProductFiltersSheet";
import { ProductsGrid } from "./ProductsGrid";

export function ProductSection() {
  const [filterParams, setFilterParams] = useState<VehicleFilterParams>({});

  const { data } = useQuery({
    queryKey: ["vehicles", filterParams],
    queryFn: () => getVehiclesApi(filterParams),
  });
  const { data: filtersData } = useQuery({
    queryKey: ["filters"],
    queryFn: getFiltersApi,
  });

  const vehicles = data?.data?.data?.vehicles ?? [];
  const filters = filtersData?.data?.data ?? defaultFilters;

  return (
    <section className="container py-20">
      {/* Top bar */}
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className=" flex flex-col gap-2 ">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600">
            Featured Machines
          </h2>
          <p className=" text-gray-400">
            Browse our wide range of heavy machinery solutions.
          </p>
        </div>

        <div className="md:hidden">
          <ProductFiltersSheet
            filters={filters}
            onFilterChange={setFilterParams}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-30 rounded-lg border p-4">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilterParams}
            />
          </div>
        </aside>

        {/* Products */}
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {vehicles?.length}
            </span>{" "}
            products
          </div>
          {vehicles?.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No Vehicles Found
            </div>
          ) : (
            <ProductsGrid vehicles={vehicles} />
          )}
        </div>
      </div>
    </section>
  );
}
