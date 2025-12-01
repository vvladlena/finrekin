import { getLandingPage, getAvailableLocales } from "@/lib/strapi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactNode } from "react";

// ✅ Шлях до стилів і шрифти залишаємо як є
import "@/app/styles/globals.scss";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
});

// --- 1. Явне визначення типів для усунення помилки TypeScript ---
interface LanguageLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

// --- 2. Головний компонент Layout ---
// Використовуємо async, щоб викликати API
export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  // ✅ Використовуємо явно визначений тип

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
  // Отримуємо локалі зі Strapi
  try {
    const locales = await getAvailableLocales();
    // Повертаємо масив об'єктів { lang: 'uk' }
    return locales.map((locale) => ({ lang: locale.code }));
  } catch (error) {
    console.error(
      "Failed to generate static params from Strapi. Using fallback."
    );
    // Fallback на випадок, якщо Strapi недоступний під час збірки
    return [{ lang: "pl" }];
  }
}
