import test from "node:test";
import assert from "node:assert/strict";
import { demoCatalog } from "../src/fixtures/demoCatalog.js";

test("fixture local contém o produto usado no roteiro da demonstração", () => {
  const item = demoCatalog.find((product) => product.title === "Mar & Sal #2");

  assert.ok(item);
  assert.equal(item.id, 102);
  assert.equal(item.imageUrl.startsWith("/images/"), true);
  assert.deepEqual(
    demoCatalog.map((product) => product.category),
    ["bikinis", "conjuntos", "acessorios"],
  );
});
