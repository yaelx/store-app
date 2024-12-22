"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Product } from "../types/Product";
import Grid from "@mui/material/Grid2";
import { theme } from "../styles/theme";

interface ProductItemProps {
  product: Product;
  deleteProduct: () => void;
}

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.button.delete,
  height: "30px",
}));

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  deleteProduct,
}) => {
  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 100,
          bgcolor: theme.palette.background.default,
        }}
        image={product.url}
        alt={product.name}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingRight: 0,
            width: "100",
          }}
        >
          <Grid size={6}>
            <Typography component="div" variant="subtitle1">
              {product.name}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {product.description}
              <p>${product.price.toFixed(2)}</p>
            </Typography>
          </Grid>
          <Grid
            size={6}
            sx={{
              justifyContent: "flex-end",
              display: "flex",
              alignSelf: "flex-end",
            }}
          >
            <DeleteButton
              variant="contained"
              size="small"
              onClick={deleteProduct}
            >
              Delete
            </DeleteButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
