import { getCategoriesApi } from "@/api/categories";
import { CategoriesPageSimple } from "@/dashboard/components/categories/CategoriesPageSimple";
import { PaginationControls } from "@/components/products/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const CategoriesPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => getCategoriesApi({ page }),
  });

  const categories = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-700"> Equipment Categories</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
        </div>
      ) : (
        <>
          <CategoriesPageSimple categories={categories} />
          {pagination && (
            <div className="mt-6 flex justify-center">
              <PaginationControls
                pagination={pagination}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
