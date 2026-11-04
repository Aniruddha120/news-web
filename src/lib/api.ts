import { cacheLife } from "next/cache";
import type { Change } from "./format";

const BASE = "https://api.api-store.workers.dev/api/bazardor";

export type Market = { market: string; division: string; min: number; max: number };

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
  markets: Market[];
};

export type Category = { id: string; slug: string; nameBn: string; icon: string };

// ৩৩টা পণ্যের দাম দিনে একবারের বেশি বদলায় না — তাই ঘণ্টাখানেক cache.
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${BASE}/products`);
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${BASE}/categories`);
  return res.json();
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string) {
  const products = await getProducts();
  return products.filter((p) => p.category === slug);
}
