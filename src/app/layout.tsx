import "./styles/globals.scss";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={montserrat.variable}>
      <body>
        <Header /> {/* Тут буде перемикач мов */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
