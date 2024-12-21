"use client";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useProductContext } from "../context/ProductsContext";
import ProductItem from "./ProductItem";
import { Product } from "../types/Product";

const ProductList: React.FC = () => {
  const { products, deleteProduct, fetchProducts, addProduct } =
    useProductContext();

  // const handleAddProduct = () => {
  //   const newProduct = {
  //     id: Date.now(), // Generate a unique ID
  //     name: "New Product",
  //     description: "Description of the new product.",
  //     price: 19.99,
  //     imageUrl: "https://via.placeholder.com/150",
  //   };

  //   addProduct(newProduct);
  //   fetchProducts();
  // };

  const handleDelete = (product: Product) => {
    deleteProduct(product.id);
    fetchProducts();
  };

  return (
    <List sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}>
      {products.map((product) => (
        <ListItem key={product.id} alignItems="flex-start">
          <ProductItem
            key={product.id}
            product={product}
            deleteProduct={() => handleDelete(product)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
