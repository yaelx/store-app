import axios from "axios";
import { Product } from "../types/Product";

const API_BASE_URL = "http://localhost:5001";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
};

// Fetch a product by ID
export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

// Add a new product
export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await api.post<Product>("/products", product);
    return response.data;
};

// Update a product by ID
export const updateProduct = async (id: number, updatedProduct: Partial<Product>): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, updatedProduct);
    return response.data;
};

// Delete a product by ID
export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
};
