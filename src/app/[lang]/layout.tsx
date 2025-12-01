// src/app/[lang]/layout.tsx
import { getLandingPage, getAvailableLocales } from "@/lib/strapi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactNode } from "react";

// --- Головний компонент Layout ---
// ✅ ВИПРАВЛЕННЯ: Використовуємо async компонент з найпростішою вбудованою типізацією
export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  // ✅ Викликаємо Strapi API для локалі з параметрів
  const { headerData, footerData } = await getLandingPage(params.lang);

  return (
    // ⚠️ Компонент повертає лише фрагмент, оскільки <html> та <body> вже визначені
    <>
      <Header data={headerData} />
      <main>{children}</main>
      <Footer data={footerData} />
    </>
  );
}

// --- generateStaticParams: Обов'язково для динамічного маршруту [lang] ---
export async function generateStaticParams() {
  // Визначаємо тип об'єкта локалі для безпечного мапінгу
  type Locale = { code: string };

  // Отримуємо локалі зі Strapi
  try {
    // Явно приводимо до типу Locale[] для усунення помилки 'code'
    const locales: Locale[] = (await getAvailableLocales()) as Locale[];

    return locales.map((locale) => ({ lang: locale.code }));
  } catch (error) {
    console.error(
      "Failed to generate static params from Strapi. Using fallback."
    );
    // Fallback
    return [{ lang: "pl" }];
  }
}
