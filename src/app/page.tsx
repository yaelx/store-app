"use client";
import styles from "./page.module.css";
import AppHeader from "./components/AppHeader";
import { ProductProvider } from "./context/ProductsContext";
import ProductList from "./components/ProductsList";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import Grid from "@mui/material/Grid2";
import ListHeaderBar from "./components/ListHeaderBar";
import { Box, styled } from "@mui/material";
import ProductForm from "./components/ProductForm";
import { ProductFormProvider } from "./context/ProductFormContext";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <ProductProvider>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: theme.palette.background.default,
            width: "100%",
          }}
        >
          <AppHeader />
          <ProductFormProvider>
            <Grid container spacing={3} sx={{ paddingTop: 10 }}>
              <Grid size={6}>
                <StyledBox>
                  <ListHeaderBar />
                  <ProductList />
                </StyledBox>
              </Grid>
              <Grid size={6}>
                <StyledBox
                  sx={{
                    maxWidth: 600,
                    backgroundColor: "#F4F4F4",
                  }}
                >
                  <ProductForm />
                </StyledBox>
              </Grid>
            </Grid>
          </ProductFormProvider>
          <footer className={styles.footer}></footer>
        </Box>
      </ProductProvider>
    </ThemeProvider>
  );
}

const StyledBox = styled(Box)({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  width: "100%",
  maxWidth: 700,
  height: "100%",
});
