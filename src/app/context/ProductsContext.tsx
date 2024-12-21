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
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (productId: number) => void;
  fetchProducts: () => void;
  filterProducts: (query: string) => void;
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

  const addProduct = async (newProduct: Omit<Product, "id">) => {
    await createItem(newProduct);
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await deleteItem(id);
    fetchProducts();
  };

  const filterProducts = async (query: string) => {
    if (query === "") {
      fetchProducts();
      return;
    }
    const data = await getItems();
    const filteredList = data.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setProducts(filteredList);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        fetchProducts,
        filterProducts,
      }}
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
