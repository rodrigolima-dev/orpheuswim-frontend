import test from "node:test";
import assert from "node:assert/strict";
import { getProductSlug } from "../src/domain/product.js";

test("codifica caracteres reservados no slug do produto", () => {
  assert.equal(getProductSlug("Mar & Sal #2"), "mar-%26-sal-%232");
});
