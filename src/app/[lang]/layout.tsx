import { getLandingPage, getAvailableLocales } from "@/lib/strapi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactNode } from "react";

// ✅ Шлях до стилів залишаємо, оскільки вони потрібні тут
import "@/app/styles/globals.scss";

// --- 1. Явне визначення типів для усунення помилки TypeScript ---
// Спрощений тип, що відповідає очікуванням Next.js для цього сегмента
interface LanguageLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

// --- 2. Головний компонент Layout ---
// Використовуємо async, щоб викликати API
export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  // ✅ Використовуємо вбудовану типізацію прямо тут

  // ✅ Викликаємо Strapi API для локалі з параметрів
  const { headerData, footerData } = await getLandingPage(params.lang);

  return (
    <>
      {/* 3. Оскільки це компонент, він не повинен включати <html> або <body>. 
      Вони вже визначені в кореневому layout.tsx */}
      <Header data={headerData} />
      <main>{children}</main>
      <Footer data={footerData} />
    </>
  );
}

// --- 4. generateStaticParams: Обов'язково для динамічного маршруту [lang] ---
export async function generateStaticParams() {
  // Визначаємо тип об'єкта локалі для безпечного мапінгу
  type Locale = { code: string };

  // Отримуємо локалі зі Strapi
  try {
    // Явно вказуємо, що getAvailableLocales повертає масив Locale
    const locales: Locale[] = (await getAvailableLocales()) as Locale[];

    // ✅ БЕЗПЕЧНИЙ МЕПІНГ: Тепер TypeScript знає, що 'locale' має 'code'
    return locales.map((locale) => ({ lang: locale.code }));
  } catch (error) {
    console.error(
      "Failed to generate static params from Strapi. Using fallback."
    );
    // Fallback на випадок, якщо Strapi недоступний під час збірки
    return [{ lang: "pl" }];
  }
}
