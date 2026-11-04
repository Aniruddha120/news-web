import { test } from "node:test";
import assert from "node:assert/strict";
import { toBn, taka, unitLabel, changeLabel, changeTone } from "./format.ts";

test("Bengali digits and prices", () => {
  assert.equal(toBn(148), "১৪৮");
  assert.equal(toBn(1850), "১,৮৫০");
  assert.equal(taka(148), "১৪৮ টাকা");
});

test("units map to Bengali labels", () => {
  assert.equal(unitLabel("kg"), "প্রতি কেজি");
  assert.equal(unitLabel("dozen"), "প্রতি ডজন");
  assert.equal(unitLabel("bosta"), "bosta");
});

test("change badge: direction, sign and colour", () => {
  assert.equal(changeLabel({ dir: "up", pct: 2.1 }), "▲ ২.১%");
  assert.equal(changeLabel({ dir: "down", pct: -2.9 }), "▼ ২.৯%");
  assert.equal(changeLabel({ dir: "flat", pct: 0 }), "— ০%");
  assert.equal(changeTone("up"), "text-up");
  assert.equal(changeTone("down"), "text-down");
  assert.equal(changeTone("flat"), "text-flat");
});
