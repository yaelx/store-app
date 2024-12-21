"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Product } from "../types/Product";

interface ProductItemProps {
  product: Product;
  deleteProduct: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  deleteProduct,
}) => {
  const theme = useTheme();
  //   <p>Price: ${product.price.toFixed(2)}</p>
  // <p>Created on: {product.creation_date}</p>

  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 100 }}
        image={product.url}
        alt={product.name}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={deleteProduct}
          >
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductItem;