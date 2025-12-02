// src/app/[lang]/layout.tsx
import { getLandingPage, getAvailableLocales } from "@/lib/strapi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactNode } from "react";

// 1. Оголошуємо тип явно
interface Props {
  children: ReactNode;
  params: { lang: string };
}

// 2. Явно експортуємо, щоб уникнути проблем із динамічною оцінкою
export const dynamic = "auto";

// 3. Використовуємо async компонент з явною Props
export default async function LanguageLayout({ children, params }: Props) {
  // ✅ ВИПРАВЛЕННЯ: Гарантуємо, що lang має значення, використовуючи 'pl' як відкат
  const lang = params.lang || "pl";

  // Викликаємо Strapi API для локалі з параметрів
  const { headerData, footerData } = await getLandingPage(lang);

  return (
    <>
      {/* ✅ ПЕРЕДАЄМО: Тепер передаємо безпечну змінну lang */}
      <Header data={headerData} />
      <main>{children}</main>
      <Footer data={footerData} />
    </>
  );
}

// 4. generateStaticParams залишається, щоб Next.js знав, які сторінки генерувати
export async function generateStaticParams() {
  // Визначаємо тип об'єкта локалі для безпечного мапінгу
  type Locale = { code: string };

  try {
    const locales: Locale[] = (await getAvailableLocales()) as Locale[];

    return locales.map((locale) => ({ lang: locale.code }));
  } catch (error) {
    console.error(
      "Failed to generate static params from Strapi. Using fallback."
    );
    return [{ lang: "pl" }];
  }
}
