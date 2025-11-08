import "./styles/globals.scss";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
    <html lang="pl">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
