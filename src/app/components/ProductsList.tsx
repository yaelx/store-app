"use client";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useProductContext } from "../context/ProductsContext";
import ProductItem from "./ProductItem";
import { Product } from "../types/Product";

const ProductList: React.FC = () => {
  const { products, deleteProduct } = useProductContext();

  const handleDelete = (product: Product) => {
    deleteProduct(product.id);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
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
