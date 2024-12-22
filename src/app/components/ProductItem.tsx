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
import { useProductContext } from "../context/ProductsContext";
import { Link } from "@mui/material";

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
  const { editProduct } = useProductContext();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        width: "100%",
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
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
            <Link
              underline="none"
              href=""
              sx={{ color: "text.tertiary" }}
              onClick={() => editProduct(product)}
            >
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
            </Link>
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
