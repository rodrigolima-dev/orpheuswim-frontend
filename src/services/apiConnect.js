import api from "./config"

export const getReleases = async () => {
    try {
        const response = await api.get("/products/releases?limit=6");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar novidades:", error);
        throw error;
    }
}

export const getProducts = async (category = "") => {
    try {
      const url = category
        ? `/products?category=${category}`
        : "/products";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  };