import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="h-8 w-40 animate-pulse rounded bg-black/5" />
      <div className="mt-6">
        <ProductGridSkeleton />
      </div>
    </main>
  );
}
