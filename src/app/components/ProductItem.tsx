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

  const handleEditClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent any default behavior (e.g., navigation or form submission)
    editProduct(product);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        width: "100%",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
      onClick={handleEditClick}
    >
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 100,
          marginTop: "18px",
          marginLeft: "16px",
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
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event from triggering
                deleteProduct();
              }}
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
