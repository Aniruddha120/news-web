import type { Product } from "./api";

// pct-এর ভিত্তিতে সাজানো — সংখ্যায়, লেখায় নয়। down-এর pct ঋণাত্মক, তাই ascending = সবচেয়ে বেশি পড়া।
export const risers = (products: Product[], n = 6) =>
  products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

export const fallers = (products: Product[], n = 6) =>
  products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);

export const sortByPrice = (products: Product[], order: "asc" | "desc") =>
  [...products].sort((a, b) => (order === "asc" ? a.today - b.today : b.today - a.today));
