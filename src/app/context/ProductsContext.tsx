"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { Product } from "../types/Product";
import {
  updateItem,
  deleteItem,
  createItem,
  getItemById,
  getItems,
} from "../utils/api";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  fetchProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getItems();
      setProducts(data);
    } catch (error) {
      console.error("Error: failed to fetch products:", error);
    }
  };

  // Add a product and update context and local storage
  const addProduct = async (newProduct: Product) => {
    await createItem(newProduct);
    fetchProducts();
  };

  // Delete a product and update context and local storage
  const deleteProduct = async (id: number) => {
    const updatedProducts = await deleteItem(id);
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("No provider was provided for ProductContext");
  }
  return context;
};
