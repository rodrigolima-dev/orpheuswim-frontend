export const getProductSlug = (title) =>
  encodeURIComponent(title.trim().replace(/\s+/g, "-").toLowerCase());
