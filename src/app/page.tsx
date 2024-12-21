"use client";
import styles from "./page.module.css";
import AppHeader from "./components/AppHeader";
import { ProductProvider } from "./context/ProductsContext";
import ProductList from "./components/ProductsList";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import ListHeaderBar from "./components/ListHeaderBar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <ProductProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 700,
          }}
        >
          <AppHeader />

          <main className={styles.main}>
            <ListHeaderBar />
            <ProductList />
          </main>
          <footer className={styles.footer}></footer>
        </Box>
      </ProductProvider>
    </ThemeProvider>
  );
}
