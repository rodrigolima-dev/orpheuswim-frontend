export const getCartItemKey = (itemOrId, size, color) => {
  if (typeof itemOrId === "object") {
    return `${itemOrId.id}-${itemOrId.size}-${itemOrId.color}`;
  }

  return `${itemOrId}-${size}-${color}`;
};

export const calculateCartTotal = (cart) =>
  Number(
    cart
      .reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)
      .toFixed(2),
  );

const isStoredCartItem = (item) =>
  item &&
  (typeof item.id === "number" || typeof item.id === "string") &&
  typeof item.title === "string" &&
  Number.isFinite(Number(item.price)) &&
  typeof item.size === "string" &&
  typeof item.color === "string" &&
  Number.isInteger(Number(item.quantity)) &&
  Number(item.quantity) >= 1;

export const normalizeStoredCart = (storedCart) => {
  try {
    const parsedCart = JSON.parse(storedCart);
    return Array.isArray(parsedCart)
      ? parsedCart.filter(isStoredCartItem).map((item) => ({
          ...item,
          price: Number(item.price),
          quantity: Number(item.quantity),
        }))
      : [];
  } catch {
    return [];
  }
};

export const normalizeApiCollection = (data) => (Array.isArray(data) ? data : []);

export const removeCartItem = (cart, id, size, color) =>
  cart.filter((item) => getCartItemKey(item) !== getCartItemKey(id, size, color));

export const buildWhatsAppMessage = (cart) => {
  const lines = ["Olá, quero finalizar uma compra com os seguintes produtos:", ""];

  cart.forEach((item, index) => {
    lines.push(`Produto ${index + 1}: ${item.title}`);
    lines.push(`Tamanho: ${item.size}`);
    lines.push(`Cor: ${item.color}`);
    lines.push(`Quantidade: ${item.quantity}`);
    lines.push(`Preço unitário: R$ ${Number(item.price).toFixed(2)}`);
    lines.push("");
  });

  lines.push(`Total: R$ ${calculateCartTotal(cart).toFixed(2)}`, "", "Aguardo a confirmação!");
  return lines.join("\n");
};

export const buildWhatsAppUrl = (phone, message) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
