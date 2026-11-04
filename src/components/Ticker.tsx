import type { Product } from "@/lib/api";
import { changeLabel, taka, unitLabel } from "@/lib/format";

export default function Ticker({ products }: { products: Product[] }) {
  const strip = (hidden: boolean) => (
    <div className="flex shrink-0 gap-6" aria-hidden={hidden || undefined}>
      {products.map((p) => (
        <span key={p.slug} className="flex items-center gap-2 whitespace-nowrap">
          <span>{p.image}</span>
          <span>{p.nameBn}</span>
          <span className="font-semibold">{taka(p.today)}</span>
          <span className="text-xs opacity-80">{unitLabel(p.unit)}</span>
          <span className="font-semibold">{changeLabel(p.change)}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-black/10 bg-brand text-sm text-white">
      <div className="flex w-max animate-ticker gap-6 py-2 motion-reduce:animate-none">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}