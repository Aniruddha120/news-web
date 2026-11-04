const bn = new Intl.NumberFormat("bn-BD");

export type Change = { dir: "up" | "down" | "flat"; pct: number };

export const toBn = (n: number) => bn.format(n);

export const taka = (n: number) => `${toBn(n)} টাকা`;

const units: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const unitLabel = (unit: string) => units[unit] ?? unit;

export const changeLabel = ({ dir, pct }: Change) =>
  `${dir === "up" ? "▲" : dir === "down" ? "▼" : "—"} ${toBn(Math.abs(pct))}%`;

export const changeTone = (dir: Change["dir"]) =>
  dir === "up" ? "text-up" : dir === "down" ? "text-down" : "text-flat";
