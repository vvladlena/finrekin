import "./styles/globals.scss";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main", // створює CSS-змінну
  display: "swap", // щоб не миготів при завантаженні
});

export const metadata = {
  title: "FinRekin — Profesjonalne usługi księgowe",
  description:
    "Pomagamy Twojej firmie skupić się na rozwoju, zajmując się księgowością.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={montserrat.variable}>
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
