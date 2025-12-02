// src/app/[lang]/layout.tsx
import { getLandingPage, getAvailableLocales } from "@/lib/strapi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactNode } from "react";

// export const dynamic = "force-dynamic";
export default async function LanguageLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const resolvedLang = lang ?? "pl"; // дефолтна мова

  const { headerData, footerData } = await getLandingPage(resolvedLang);
  return (
    <>
      <Header data={headerData} />
      <main>{children}</main>
      <Footer data={footerData} />
    </>
  );
}

export async function generateStaticParams() {
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
