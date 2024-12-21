"use client";
import styles from "./page.module.css";
import AppHeader from "./components/AppHeader";
import { ProductProvider } from "./context/ProductsContext";
import ProductList from "./components/ProductsList";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggler from "./components/ThemeToggler";

export default function Home() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <div className={styles.page}>
          <AppHeader />

          <main className={styles.main}>
            <ProductList />
          </main>
          <footer className={styles.footer}>
            <ThemeToggler />
          </footer>
        </div>
      </ProductProvider>
    </ThemeProvider>
  );
}
