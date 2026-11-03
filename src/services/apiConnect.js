import api from "./config";
import { normalizeApiCollection } from "../domain/cart";
import { demoCatalog } from "../fixtures/demoCatalog";

export const isDemoMode = import.meta.env?.VITE_DEMO_MODE === "true";

const getDemoProducts = (category = "", search = "") => {
  const normalizedCategory = (category ?? "").toLowerCase();
  const normalizedSearch = (search ?? "").trim().toLowerCase();
  return demoCatalog.filter((product) => {
    const matchesCategory = !normalizedCategory || product.category === normalizedCategory;
    const matchesSearch =
      !normalizedSearch || product.title.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });
};


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: {token},
  };
};

export const login = async (username, password) => {
  if (isDemoMode) throw new Error("Login desativado no modo demo local.");

  try {
    const response = await api.post("/login", {
      login: username,
      password: password,
    });

    return response.data;
  } catch (err) {
    console.error("Erro ao fazer login: ", err);
  }
};

export const getReleases = async () => {
  if (isDemoMode) return demoCatalog.slice(0, 2);

  try {
    const response = await api.get("/releases?limit=6");
    return normalizeApiCollection(response.data);
  } catch (error) {
    console.error("Erro ao buscar novidades:", error);
    throw error;
  }
};

export const getProducts = async (category = "", search="") => {
  if (isDemoMode) return getDemoProducts(category, search);

  try {
    let url = "/products";
    const params = [];

    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const response = await api.get(url);
    return normalizeApiCollection(response.data);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};


export const deleteProduct = async (id) => {
  if (isDemoMode) throw new Error("Operações administrativas desativadas no modo demo local.");

  try {
    const response = await api.delete(`/admin/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};


export const updateProduct = async (product) => {
  if (isDemoMode) throw new Error("Operações administrativas desativadas no modo demo local.");

  try {
    const response = await api.put("/admin", product, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  if (isDemoMode) throw new Error("Operações administrativas desativadas no modo demo local.");

  try {
    const response = await api.post("/admin", product, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}
