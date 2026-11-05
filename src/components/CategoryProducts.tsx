"use client";

import { useState } from "react";
import type { Product } from "@/lib/api";
import { sortByPrice } from "@/lib/select";
import ProductGrid from "./ProductGrid";

const options = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
] as const;

type Sort = (typeof options)[number]["value"];

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");
  const list = sort === "default" ? products : sortByPrice(products, sort);

  return (
    <div className="space-y-5">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-flat">সাজান:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border border-black/15 bg-white px-3 py-1.5"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <ProductGrid products={list} />
    </div>
  );
}