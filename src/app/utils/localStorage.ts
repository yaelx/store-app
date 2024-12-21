import { Product } from "../types/Product";

export const getProductsFromLocalStorage = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const setProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};