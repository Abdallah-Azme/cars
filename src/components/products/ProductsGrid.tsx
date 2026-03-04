import { ProductCard } from "./ProductCard";

export function ProductsGrid({isFavorite = false}: {isFavorite?: boolean}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCard key={i} isFavorite={isFavorite} />
      ))}
    </div>
  );
}
