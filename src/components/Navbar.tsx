import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getCategories, getProducts } from "@/lib/api";
import CategoryLinks from "./CategoryLinks";
import Ticker from "./Ticker";

export default async function Navbar() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="shrink-0">
          <Link href="/" className="text-xl font-bold">
            🛒 বাজার দর
          </Link>
          <Suspense fallback={<span className="block text-xs text-flat">&nbsp;</span>}>
            <BanglaDate />
          </Suspense>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/signin" className="rounded-lg border border-black/15 px-3 py-1.5 text-sm">
            সাইন ইন
          </Link>
          <Link href="/signup" className="rounded-lg bg-brand px-3 py-1.5 text-sm text-white">
            সাইন আপ
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-3">
        <CategoryLinks categories={categories} />
      </div>

      <Ticker products={products} />
    </header>
  );
}

async function BanglaDate() {
  await connection();
  const today = new Intl.DateTimeFormat("bn-BD", { dateStyle: "full" }).format(new Date());
  return <span className="block text-xs text-flat">{today}</span>;
}