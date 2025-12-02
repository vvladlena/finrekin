// src/app/[lang]/layout.tsx
import { getLandingPage, getAvailableLocales } from "@/lib/strapi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactNode } from "react";

export const dynamic = "auto";

export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang ?? "pl";

  const { headerData, footerData } = await getLandingPage(lang);

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
