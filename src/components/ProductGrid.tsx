import type { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className={grid} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="h-48 animate-pulse rounded-xl border border-black/10 bg-black/5" />
      ))}
    </div>
  );
}
