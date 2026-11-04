import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      <div className="mt-12">
        <ProductGridSkeleton />
      </div>
    </main>
  );
}
