import { taka, changeLabel, changeTone } from "@/lib/format";

const demo = [
  { name: "পেঁয়াজ", price: 68, change: { dir: "up" as const, pct: 12.5 } },
  { name: "মিনিকেট চাল", price: 99, change: { dir: "down" as const, pct: -2.9 } },
  { name: "আলু", price: 32, change: { dir: "flat" as const, pct: 0 } },
];

export default function Home() {
  return (
    <main className="p-10 space-y-3">
      {demo.map((p) => (
        <p key={p.name} className="flex gap-3">
          <span>{p.name}</span>
          <span className="font-semibold">{taka(p.price)}</span>
          <span className={changeTone(p.change.dir)}>{changeLabel(p.change)}</span>
        </p>
      ))}
    </main>
  );
}