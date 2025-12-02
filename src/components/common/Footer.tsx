import styles from "@/app/styles/components/Footer.module.scss";

// 1. СТРУКТУРА ДАНИХ Strapi
interface FooterData {
  prawa?: string;
  company?: string;
  street?: string;
  city?: string;
  nip?: string;
  regon?: string;
  kapital?: string;
  polityka?: string;

  privacyPolicyUrl?: string;
}

interface FooterProps {
  data: FooterData | null;
}

// ✅ Видаляємо "use client" і робимо його Server Component
export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const {
    prawa = "© Company",
    company = "",
    street = "",
    city = "",
    nip = "",
    regon = "",
    kapital = "",
    polityka = "",
  } = data || {};
  // Деструктуризація для зручності
  // const { prawa, company, street, city, nip, regon, kapital, polityka } = data;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__inner}>
          {/* Блок 1: Авторське право та назва компанії */}
          <div className={styles.footer__col}>
            {/* Використовуємо поле 'prawa' зі Strapi та додаємо поточний рік */}
            <p>
              {prawa} © {currentYear}
            </p>
            <p>{company}</p>
          </div>

          {/* Блок 2: Адреса */}
          <div className={styles.footer__col}>
            {/* Strapi має поле 'address', використовуємо його */}
            <p>{street}</p>
            {/* Якщо потрібно окремо місто/індекс, створіть для них окремі поля у Strapi */}
            <p>{city}</p>
          </div>

          {/* Блок 3: Реєстраційні дані */}
          <div className={styles.footer__col}>
            <p>{nip}</p>
            <p>{regon}</p>
            <p>{kapital}</p>
          </div>

          {/* Блок 4: Посилання */}
          <div className={styles.footer__links}>
            <a href="mailto:tsenzeria.v@gmail.com">Website development</a>

            <a href="#polityka-prywatnosci">{polityka}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
