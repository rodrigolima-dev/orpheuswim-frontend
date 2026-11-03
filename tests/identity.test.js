import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const surfaces = [
  "index.html",
  "README.md",
  "package.json",
  "src/components/Footer/Footer.jsx",
  "src/components/Nav/Nav.tsx",
  "src/pages/Home/Home.tsx",
  "src/pages/Purchase/Purchase.tsx",
];

test("superfícies da demonstração usam identidade neutra", async () => {
  const contents = await Promise.all(surfaces.map((file) => readFile(file, "utf8")));
  const combined = contents.join("\n");

  assert.doesNotMatch(combined, /orpheuswim/i);
  assert.doesNotMatch(combined, /gabriella/i);
});
