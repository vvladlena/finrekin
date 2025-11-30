// src/app/[lang]/layout.tsx - ВИПРАВЛЕНА ВЕРСІЯ

import { getLandingPage } from "@/lib/strapi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// ✅ Шрифти та стилі можна залишити тут, якщо вони залежать від теми/локалі
import "@/app/styles/globals.scss";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
});

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;

  const { headerData, footerData } = await getLandingPage(lang);

  return (
    <>
      <Header data={headerData} />
      <main>{children}</main>
      <Footer data={footerData} />
    </>
  );
}
