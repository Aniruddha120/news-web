import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);
  const category = categories.find((c) => c.slug === slug);

  if (!category || products.length === 0) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
        <p className="text-5xl">🧺</p>
        <h1 className="mt-4 text-2xl font-bold">এই ক্যাটাগরিতে কোনো পণ্য নেই</h1>
        <p className="mt-2 text-flat">
          &ldquo;{slug}&rdquo; নামে কোনো ক্যাটাগরি খুঁজে পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-brand px-5 py-3 text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          {category.icon} {category.nameBn}
        </h1>
        <p className="text-sm text-flat">{products.length}টি পণ্য</p>
      </div>
      <CategoryProducts products={products} />
    </main>
  );
}
