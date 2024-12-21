import styles from "./page.module.css";
import AppHeader from "./components/AppHeader";

export default function Home() {
  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>test</main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
