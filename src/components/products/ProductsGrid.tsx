import { ProductCard } from "./ProductCard";

export function ProductsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
