"use client";
import styles from "./page.module.css";
import AppHeader from "./components/AppHeader";
import { ProductProvider } from "./context/ProductsContext";
import ProductList from "./components/ProductsList";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <ProductProvider>
        <div className={styles.page}>
          <AppHeader />

          <main className={styles.main}>
            <ProductList />
          </main>
          <footer className={styles.footer}></footer>
        </div>
      </ProductProvider>
    </ThemeProvider>
  );
}
