"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/api";

export default function CategoryLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const all = [{ slug: "", nameBn: "সব", icon: "🛒" }, ...categories];

  return (
    <nav className="flex gap-1 overflow-x-auto">
      {all.map((c) => {
        const href = c.slug ? `/category/${c.slug}` : "/";
        const active = pathname === href;
        return (
          <Link
            key={c.slug || "all"}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition ${
              active ? "bg-brand font-medium text-white" : "text-flat hover:bg-black/5"
            }`}
          >
            {c.icon} {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}