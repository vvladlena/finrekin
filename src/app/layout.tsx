// src/app/layout.tsx

// ✅ Імпортуємо шрифти (вони мають бути визначені тут один раз)
import { Montserrat } from "next/font/google";

// Визначення шрифту Монтсеррат
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
});

// ✅ Визначення Metadata (для SEO, тощо)
export const metadata = {
  title: "My Strapi Next App",
  description: "Powered by Strapi and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⚠️ Немає params, тут ми не знаємо, яка локаль

  return (
    <html lang="pl" suppressHydrationWarning={true}>
      <head>{/* Тут можуть бути ваші метатеги */}</head>

      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
