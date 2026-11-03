import test from "node:test";
import assert from "node:assert/strict";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  calculateCartTotal,
  getCartItemKey,
  normalizeApiCollection,
  normalizeStoredCart,
  removeCartItem,
} from "../src/domain/cart.js";

const catalogItem = {
  id: 2,
  title: "Mar & Sal #2",
  price: 49.9,
  imageUrl: "/mar-sal.jpg",
  size: "P",
  color: "Branco",
  quantity: 1,
};

test("calcula o total de variantes diferentes uma única vez", () => {
  const cart = [
    catalogItem,
    { ...catalogItem, size: "M", color: "Azul", price: 39.9, quantity: 2 },
  ];

  assert.equal(calculateCartTotal(cart), 129.7);
  assert.notEqual(getCartItemKey(cart[0]), getCartItemKey(cart[1]));
});

test("remove somente a variante selecionada do carrinho", () => {
  const cart = [
    catalogItem,
    { ...catalogItem, size: "M", color: "Azul" },
  ];

  assert.deepEqual(removeCartItem(cart, 2, "P", "Branco"), [cart[1]]);
});

test("descarta JSON inválido e itens incompletos do localStorage", () => {
  assert.deepEqual(normalizeStoredCart("{invalido"), []);
  assert.deepEqual(
    normalizeStoredCart(JSON.stringify([catalogItem, { title: "sem preço" }])),
    [catalogItem],
  );
});

test("converte valores numéricos legados do localStorage", () => {
  assert.deepEqual(
    normalizeStoredCart(JSON.stringify([{ ...catalogItem, price: "49.90", quantity: "2" }])),
    [{ ...catalogItem, price: 49.9, quantity: 2 }],
  );
});

test("normaliza resposta 204 ou coleção ausente para lista vazia", () => {
  assert.deepEqual(normalizeApiCollection(undefined), []);
  assert.deepEqual(normalizeApiCollection(null), []);
  assert.deepEqual(normalizeApiCollection([catalogItem]), [catalogItem]);
});

test("preserva título, variações e total na URL codificada", () => {
  const cart = [catalogItem, { ...catalogItem, size: "M", color: "Azul" }];
  const message = buildWhatsAppMessage(cart);
  const url = buildWhatsAppUrl("5511999999999", message);

  assert.equal(new URL(url).searchParams.get("text"), message);
  assert.match(message, /Mar & Sal #2/);
  assert.match(message, /Tamanho: P/);
  assert.match(message, /Tamanho: M/);
  assert.match(message, /Total: R\$ 99\.80/);
});
