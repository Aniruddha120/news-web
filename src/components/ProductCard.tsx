import Link from "next/link";
import type { Product } from "@/lib/api";
import { changeLabel, changeTone, taka, unitLabel } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col rounded-xl border border-black/10 bg-white p-4 transition hover:shadow-md"
    >
      <span className="text-4xl">{product.image}</span>
      <h3 className="mt-2 font-semibold">{product.nameBn}</h3>
      <p className="text-sm text-flat">{unitLabel(product.unit)}</p>

      <div className="mt-auto flex items-baseline justify-between pt-3">
        <span className="text-xs text-flat">আজকের দাম</span>
        <span className="font-bold">{taka(product.today)}</span>
      </div>
      <span className={`text-sm font-medium ${changeTone(product.change.dir)}`}>
        {changeLabel(product.change)}
      </span>
    </Link>
  );
}
