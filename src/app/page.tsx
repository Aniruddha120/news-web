import Image from "next/image";
import { getProducts, type Product } from "@/lib/api";
import { fallers, risers } from "@/lib/select";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-6xl space-y-16 px-4 py-10">
      <Hero />

      <Section
        title="আজ দাম বেড়েছে ▲"
        subtitle="গতকালের তুলনায় সবচেয়ে বেশি বাড়া ৬টি পণ্য"
        products={risers(products)}
      />
      <Section
        title="আজ দাম কমেছে ▼"
        subtitle="গতকালের তুলনায় সবচেয়ে বেশি কমা ৬টি পণ্য"
        products={fallers(products)}
      />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`${products.length}টি প্রয়োজনীয় পণ্যের আজকের বাজার দর`}
        products={products}
      />
    </main>
  );
}

function Hero() {
  return (
    <section className="grid items-center gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-brand">প্রতিদিনের বাজার, এক নজরে</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          আজকের বাজার দর, হাতের মুঠোয়
        </h1>
        <p className="text-flat">
          কোন পণ্যের দাম বাড়ল, কোনটা কমল — প্রতিদিনের বাজার আগেই জেনে নিন, এক জায়গা থেকেই।
        </p>
        <a
          href="#সব-পণ্য"
          className="inline-flex rounded-lg bg-brand px-5 py-3 font-medium text-white hover:opacity-90"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <Image
        src="/bazar-hero.png"
        alt="বাজারের পণ্যভর্তি ঝুড়ি"
        width={315}
        height={263}
        priority
        className="mx-auto h-auto w-full max-w-sm"
      />
    </section>
  );
}

function Section({
  id,
  title,
  subtitle,
  products,
}: {
  id?: string;
  title: string;
  subtitle: string;
  products: Product[];
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5">
      <div>
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        <p className="text-sm text-flat">{subtitle}</p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
