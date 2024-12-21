"use client";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useProductContext } from "../context/ProductsContext";
import ProductItem from "./ProductItem";
import { Product } from "../types/Product";
import { deleteProduct } from "../utils/api";

const ProductList: React.FC = () => {
  const { products } = useProductContext();

  const handleDelete = (product: Product) => {
    console.log("try delete", product);
    // deleteProduct(product.id); // todo: add
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
