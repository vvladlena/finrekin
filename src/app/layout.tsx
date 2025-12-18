import "./styles/globals.scss";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Montserrat } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { getFullPageData } from "@/lib/dataFetcher";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"], // Додано cyrillic для UA/RU мов
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
});

export const metadata = {
  title: "FinRekin — Profesjonalne usługi księgowe",
  description:
    "Pomagamy Twojej firmie skupić się na rozwoju, zajmując się księgowością.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Отримуємо дані з Sanity (Server-side)
  const data = await getFullPageData();

  return (
    <html lang="pl" className={montserrat.variable}>
      <body>
        <LanguageProvider>
          {/* Header зазвичай отримує дані через контекст або напряму, 
              якщо там є контакти, можна також передати data.contact 
          */}
          {/* <Header data={data.contactSection} formFields={data.formFields} /> */}
          <Header data={data?.contactSection} formFields={data?.formFields} />
          <main>{children}</main>

          {/* Передаємо дані футера, які прийшли з Sanity */}
          <Footer data={data.footer} />
          {/* <Footer data={data?.contactSection} /> */}
        </LanguageProvider>
      </body>
    </html>
  );
}
