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

export const getItems = async (): Promise<Product[]> => {
    const products = getProductsFromLocalStorage();
    if (products.length > 0) {
        return products;
    }
    const response = await api.get<Product[]>("/products");
    setProductsToLocalStorage(response.data);
    return response.data;
};

export const getItemById = async (id: number): Promise<Product|undefined> => {
    // const response = await api.get<Product>(`/products/${id}`);
    // return response.data;
    const products = await getItems();
    const product = products.find((product) => product.id !== id);
    return product;
};

// Add a new product
export const createItem = async (product: Omit<Product, "id">): Promise<Product> => {
    const products = await getItems();
    const newProduct = {id: generateUniqueId(), ...product};
    const updatedProducts = [...products, newProduct];
    setProductsToLocalStorage(updatedProducts);
    // const response = await api.post<Product>("/products", product);
    //  return response.data;
    return newProduct;
};

// Update a product by ID
export const updateItem = async (id: number, updatedProduct: Partial<Product>): Promise<Product|null> => {
    // const response = await api.put<Product>(`/products/${id}`, updatedProduct);
    // return response.data;
    const productsCopy = await getItems();
     console.log("Before update:", productsCopy);
    const idx = productsCopy.findIndex((product) => product.id === id);
    if (idx > -1){
    const updated = {...productsCopy[idx], ...updatedProduct} as Product;
    productsCopy[idx] = updated;
    console.log("Updated product:", updated);
    setProductsToLocalStorage(productsCopy);
    return updated;
    }
    console.warn("Product not found for ID:", id);
    return null;
};

// Delete a product by ID
export const deleteItem = async (id: number): Promise<Product[]> => {
    // await api.delete(`/products/${id}`);
    const products = await getItems();
    const updatedProducts = products.filter((product) => product.id !== id);
    setProductsToLocalStorage(updatedProducts);
    return updatedProducts;
};
