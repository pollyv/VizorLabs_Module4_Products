import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (limit = 30, skip = 0) => {
  const response = await apiClient.get("/", { params: { limit, skip } });
  return response.data.products;
};

export const fetchProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/${productId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(`Product with ID ${productId} not found.`);
      return null;
    }
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/${productId}`);
    if (response.data.isDeleted) {
      return response.data;
    } else {
      console.warn(`Product with ID ${productId} could not be deleted.`);
      return null;
    }
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiClient.patch(`/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createProduct = async (productData) => {
  const response = await apiClient.post("/add", productData);
  return response.data;
};
