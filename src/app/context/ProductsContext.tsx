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
import { sortByDate, sortByName, sortByPrice } from "../utils/helperFunctions";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (productId: number) => void;
  fetchProducts: () => void;
  filterProducts: (query: string) => void;
  openProductForm: boolean;
  setOpenProductForm: (open: boolean) => void;
  updateProduct: (updatedProduct: { id: number } & Partial<Product>) => void;
  editProduct: (product: { id: number } & Partial<Product>) => void;
  draftProduct: ({ id: number } & Partial<Product>) | undefined;
  sortProducts: (sort: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [openProductForm, setOpenProductForm] = React.useState<boolean>(false);
  const [draftProduct, setdraftProduct] = React.useState<
    { id: number } & Partial<Product>
  >();
  const [sort, setSort] = React.useState<string>();

  React.useEffect(() => {
    fetchProducts();
    sortProducts("Name");
  }, []);

  const editProduct = (product: { id: number } & Partial<Product>) => {
    setdraftProduct(product);
    setOpenProductForm(true);
  };

  const fetchProducts = async () => {
    const data = await getItems();
    setProducts(data);
  };

  const addProduct = async (newProduct: Omit<Product, "id">) => {
    await createItem(newProduct);
    fetchProducts();
  };

  const updateProduct = async (
    updatedProduct: { id: number } & Partial<Product>
  ) => {
    updateItem(updatedProduct.id, updatedProduct);
    setdraftProduct(undefined);
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
    const filteredList = data.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
    );
    setProducts(filteredList);
  };

  const sortProducts = async (newsort: string) => {
    setSort(newsort);
    let sortedList = products;
    switch (newsort) {
      case "Name":
        sortedList = products.toSorted(sortByName);
        break;
      case "Date":
        sortedList = products.toSorted(sortByDate);
        break;
      case "Price":
        sortedList = products.toSorted(sortByPrice);
        break;
      default:
    }
    setProducts(sortedList);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        fetchProducts,
        filterProducts,
        openProductForm,
        setOpenProductForm,
        updateProduct,
        editProduct,
        draftProduct,
        sortProducts,
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
