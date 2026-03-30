import {
  getFiltersApi,
  getVehiclesApi,
  type VehicleFilterParams,
} from "@/api/vehicles";
import { defaultFilters } from "@/types/vehicles";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationControls } from "./Pagination";
import { ProductFilters } from "./ProductFilter";
import { ProductFiltersSheet } from "./ProductFiltersSheet";
import { ProductsGrid } from "./ProductsGrid";
import { HorizontalFilterRow } from "./HorizontalFilters";

export function ProductSection() {
  const [searchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<VehicleFilterParams>({});
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["vehicles", filterParams, page, searchParams.toString()],
    queryFn: () => {
      const parentId = searchParams.get("parentId");
      const childId = searchParams.get("childId");
      const mergedParams = { ...filterParams };
      if (parentId && !mergedParams.parentCategoryIds) {
        mergedParams.parentCategoryIds = [parentId];
      }
      if (childId && !mergedParams.childCategoryIds) {
        mergedParams.childCategoryIds = [childId];
      }
      return getVehiclesApi({ ...mergedParams, page });
    },
  });

  const { data: filtersData } = useQuery({
    queryKey: ["filters", filterParams.childCategoryIds, searchParams.get("childId")],
    queryFn: async () => {
      const childId = searchParams.get("childId");
      const currentChildIds = filterParams.childCategoryIds || (childId ? [childId] : []);

      if (currentChildIds.length > 0) {
        const { getModelsApi } = await import("@/api/vehicles");
        const res = await getModelsApi(currentChildIds as string[]);
        if (res.ok && res.data?.data) {
          const apiData = res.data.data;
          // Map objects to strings as HorizontalFilters expects string[]
          return {
            ...defaultFilters,
            models: apiData.models?.map((m) => m.name) || [],
            types: apiData.types?.map((t) => t.title) || [],
            results: apiData.results || [],
          };
        }
      }

      const res = await getFiltersApi();
      return res.data?.data ?? defaultFilters;
    },
  });

  const vehicles = data?.data?.data?.vehicles ?? [];
  const pagination = data?.data?.data?.pagination;
  const filters = filtersData ?? defaultFilters;

  // Reset to page 1 whenever filters change
  const handleFilterChange = (params: VehicleFilterParams) => {
    setFilterParams((prev) => {
      // If params is empty, it's a reset - clear everything
      if (Object.keys(params).length === 0) return {};
      // Otherwise merge (preserving types/models that might be excluded from some filter components)
      return { ...prev, ...params };
    });
    setPage(1);
  };

  const handleToggle = (key: 'types' | 'models', item: string, checked: boolean) => {
    const current = filterParams[key] || [];
    const next = checked ? [...current, item] : current.filter((i) => i !== item);
    handleFilterChange({ ...filterParams, [key]: next });
  };

  return (
    <section className="container py-10">
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
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <HorizontalFilterRow
          title="Category"
          items={filters.types}
          selectedItems={filterParams.types || []}
          onToggle={(item, checked) => handleToggle('types', item, checked)}
        />
        <HorizontalFilterRow
          title="Sub-Category"
          items={filters.models}
          selectedItems={filterParams.models || []}
          onToggle={(item, checked) => handleToggle('models', item, checked)}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-30 rounded-lg border p-4">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              exclude={["types", "models"]}
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

          {/* Pagination */}
          {pagination && (
            <PaginationControls
              pagination={pagination}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
