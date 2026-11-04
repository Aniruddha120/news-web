import { test } from "node:test";
import assert from "node:assert/strict";
import { risers, fallers, sortByPrice } from "./select.ts";
import type { Product } from "./api";

const p = (name: string, today: number, dir: "up" | "down" | "flat", pct: number) =>
  ({ nameBn: name, today, change: { dir, pct } }) as Product;

const list = [
  p("আ", 50, "up", 1.5),
  p("বা", 20, "up", 9),
  p("চ", 80, "down", -1.2),
  p("দ", 40, "down", -7.5),
  p("ই", 30, "flat", 0),
  p("এক", 10, "up", 4),
];

test("risers: শুধু up, বড় pct আগে, সর্বোচ্চ n", () => {
  assert.deepEqual(
    risers(list).map((x) => x.nameBn),
    ["বা", "এক", "আ"],
  );
});

test("fallers: শুধু down, সবচেয়ে বেশি পড়া আগে", () => {
  assert.deepEqual(
    fallers(list).map((x) => x.nameBn),
    ["দ", "চ"],
  );
});

test("sortByPrice: সংখ্যায় সাজে, মূল list বদলায় না", () => {
  assert.deepEqual(
    sortByPrice(list, "asc").map((x) => x.today),
    [10, 20, 30, 40, 50, 80],
  );
  assert.equal(list[0].nameBn, "আ");
});
