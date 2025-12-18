"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from "@/app/styles/components/Footer.module.scss";

export default function Footer({ data }: { data: any }) {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  if (!data) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__col}>
            <p>
              {lang === "pl"
                ? "Wszelkie prawa zastrzeżone"
                : lang === "ua"
                  ? "Всі права захищені"
                  : lang === "ru"
                    ? "Все права защищены"
                    : "All rights reserved"}{" "}
              © {currentYear}
            </p>
            <p>{data.companyName?.[lang]}</p>
          </div>

          <div className={styles.footer__col}>
            <p>{data.address?.[lang]}</p>
            <p>{data.city?.[lang]}</p>
          </div>

          <div className={styles.footer__col}>
            <p>NIP {data.taxId}</p>
            <p>REGON {data.regId}</p>
            <p>{data.capital?.[lang]}</p>
          </div>

          <div className={styles.footer__links}>
            <a href="mailto:tsenzeria.v@gmail.com">{data.devLabel?.[lang]}</a>
            <a href="/privacy">{data.privacyPolicyLabel?.[lang]}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
