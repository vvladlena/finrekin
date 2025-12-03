"use client";
import styles from "@/app/styles/components/Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__col}>
            <p>Wszelkie prawa zastrzeżone © {currentYear}</p>
            <p>Finrekin spółka z ograniczoną odpowiedzialnością</p>
          </div>

          <div className={styles.footer__col}>
            <p>ul. Parkowa 25 lok. 58</p>
            <p>51-616 Wrocław</p>
          </div>

          <div className={styles.footer__col}>
            <p>NIP 8982310567</p>
            <p>REGON 529341562</p>
            <p>Kapitał zakładowy 5000 zł</p>
          </div>

          <div className={styles.footer__links}>
            <a href="mailto:tsenzeria.v@gmail.com">Tworzenie stron</a>
            <a href="/privacy">Polityka prywatności</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
