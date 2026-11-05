import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/api";
import { priceStats } from "@/lib/select";
import { changeLabel, changeTone, taka, unitLabel } from "@/lib/format";
import Protected from "@/components/Protected";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const { min, max, avg } = priceStats(product);

  return (
    <Protected>
      <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{product.image}</span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <p className="text-sm text-flat">
              {product.categoryIcon} {product.categoryNameBn} · {unitLabel(product.unit)}
            </p>
          </div>
        </div>

        <p className="text-flat">
          আজকের দাম <b className="text-black">{taka(product.today)}</b>, গতকাল ছিল{" "}
          {taka(product.yesterday)}।{" "}
          <span className={`font-medium ${changeTone(product.change.dir)}`}>
            {changeLabel(product.change)}
          </span>
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["সর্বনিম্ন দাম", min],
            ["সর্বোচ্চ দাম", max],
            ["গড় দাম", avg],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-xl border border-black/10 bg-white p-4">
              <p className="text-xs text-flat">{label}</p>
              <p className="mt-1 text-xl font-bold">{taka(Number(value))}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-black/10 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-black/5 text-left">
                <tr>
                  <th className="p-3 font-medium">বাজার</th>
                  <th className="p-3 font-medium">বিভাগ</th>
                  <th className="p-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="p-3 text-right font-medium">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m) => (
                  <tr key={m.market} className="border-t border-black/5">
                    <td className="p-3">{m.market}</td>
                    <td className="p-3 text-flat">{m.division}</td>
                    <td className="p-3 text-right">{taka(m.min)}</td>
                    <td className="p-3 text-right">{taka(m.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Link
          href={`/category/${product.category}`}
          className="inline-flex rounded-lg border border-black/15 px-4 py-2 text-sm"
        >
          আরও {product.categoryNameBn} দেখুন
        </Link>
      </main>
    </Protected>
  );
}
