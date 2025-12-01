import { ReactNode } from "react";
// Припустимо, що ваш файл зі стилями називається globals.css
import "@/app/styles/globals.scss";

// 1. Імпортуємо ваші компоненти
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
// 2. Імпортуємо функцію для отримання даних
import { getLandingPage, getAvailableLocales } from "@/lib/strapi";

// --- 3. ВИЗНАЧЕННЯ ТИПІВ ---
interface LayoutProps {
  children: ReactNode;
  params: {
    lang: string; // Це динамічний сегмент [lang]
  };
}

// --- 4. ASYNC Layout Component ---
// Використовуємо 'async' для завантаження даних (Server Component)
export default async function RootLayout({ children, params }: LayoutProps) {
  // 5. Викликаємо Strapi API
  // Вважаємо, що getLandingPage повертає { headerData, footerData, blocks }
  const { headerData, footerData } = await getLandingPage(params.lang);

  // 6. Передаємо дані в компоненти
  return (
    <html lang={params.lang}>
      <body>
        {/* Компонент Header */}
        {headerData && <Header data={headerData} />}

        {/* Основний вміст сторінки */}
        <main>{children}</main>

        {/* Компонент Footer */}
        {footerData && <Footer data={footerData} />}
      </body>
    </html>
  );
}

// --- 7. (ОПЦІЙНО) Не забудьте про generateStaticParams ---
// Ця функція допомагає Next.js знати, які мови він повинен підтримувати
export async function generateStaticParams() {
  // ✅ НОВИЙ ВИКЛИК: Динамічно отримуємо локалі зі Strapi
  const locales = await getAvailableLocales();

  // Повертаємо отриманий масив у форматі Next.js: [{ lang: 'pl' }, { lang: 'uk' }, ...]
  return locales;
}
