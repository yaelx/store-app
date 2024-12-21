import axios from "axios";
import { Product } from "../types/Product";
import { getProductsFromLocalStorage, setProductsToLocalStorage } from './localStorage';

const API_BASE_URL = "http://localhost:5001";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const generateUniqueId = () => {
  return Date.now();
};

export const getProducts = async (): Promise<Product[]> => {
    const products = getProductsFromLocalStorage();
    if (products.length > 0) {
        return products;
    }
    const response = await api.get<Product[]>("/products");
    setProductsToLocalStorage(response.data);
    return response.data;
};

export const getProductById = async (id: number): Promise<Product|undefined> => {
    // const response = await api.get<Product>(`/products/${id}`);
    // return response.data;
    const products = await getProducts();
    const product = products.find((product) => product.id !== id);
    return product;
};

// Add a new product
export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    const products = await getProducts();
    const newProduct = {id: generateUniqueId(), ...product};
    const updatedProducts = [...products, newProduct];
    setProductsToLocalStorage(updatedProducts);
    // const response = await api.post<Product>("/products", product);
    //  return response.data;
    return newProduct;
};

// Update a product by ID
export const updateProduct = async (id: number, updatedProduct: Partial<Product>): Promise<Product> => {
    // const response = await api.put<Product>(`/products/${id}`, updatedProduct);
    // return response.data;
    const product = await getProductById(id);
    const updated = {...product, updatedProduct} as Product;
    return updated;
};

// Delete a product by ID
export const deleteProduct = async (id: number): Promise<void> => {
    console.log("try delete", id);
    // await api.delete(`/products/${id}`);
    const products = await getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    setProductsToLocalStorage(updatedProducts);
};
