import api from "./config";


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: {token},
  };
};

export const login = async (username, password) => {
  try {
    console.log("enviando: ", { username, password });
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
  try {
    const response = await api.get("/releases?limit=6");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar novidades:", error);
    throw error;
  }
};

export const getProducts = async (category = "", search="") => {
  try {
    let url = "/products";
    const params = [];

    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};


export const deleteProduct = async (id) => {
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
