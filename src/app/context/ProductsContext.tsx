"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { Product } from "../types/Product";
import { updateItem, deleteItem, createItem, getItems } from "../utils/api";
import { _sortProducts } from "../utils/helperFunctions";

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
  sort: string;
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
  const [sort, setSort] = React.useState<string>("Name");

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const editProduct = (product: { id: number } & Partial<Product>) => {
    console.log("Editing product:", product);
    setdraftProduct(product);
    setOpenProductForm(true);
  };

  const fetchProducts = React.useCallback(async () => {
    const data = await getItems();
    const sortedData = _sortProducts(sort, data);
    setProducts(sortedData);
  }, [sort]);

  const addProduct = React.useCallback(
    async (newProduct: Omit<Product, "id">) => {
      await createItem(newProduct);
      fetchProducts();
    },
    [fetchProducts]
  );

  const updateProduct = React.useCallback(
    async (updatedProduct: { id: number } & Partial<Product>) => {
      await updateItem(updatedProduct.id, updatedProduct);
      setdraftProduct(undefined);
      fetchProducts();
    },
    [fetchProducts]
  );

  const deleteProduct = React.useCallback(
    async (id: number) => {
      await deleteItem(id);
      fetchProducts();
    },
    [fetchProducts]
  );

  const filterProducts = React.useCallback(
    async (query: string) => {
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
    },
    [fetchProducts]
  );

  const sortProducts = React.useCallback(
    (newsort: string) => {
      setSort(newsort);
      const sortedList = _sortProducts(newsort, [...products]);
      setProducts(sortedList); // Update state with the sorted list
    },
    [products]
  );

  const value = React.useMemo(
    () => ({
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
      sort,
    }),
    [
      products,
      addProduct,
      deleteProduct,
      fetchProducts,
      filterProducts,
      openProductForm,
      updateProduct,
      draftProduct,
      sortProducts,
      sort,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("No provider was provided for ProductContext");
  }
  return context;
};
