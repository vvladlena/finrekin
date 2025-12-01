// src/app/layout.tsx
import { ReactNode } from "react";

// ✅ Імпортуємо глобальні стилі SCSS тут, у кореневому layout
import "@/app/styles/globals.scss";

// ✅ Імпортуємо та визначаємо шрифти тут
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
});

// ✅ Визначення Metadata (для SEO)
export const metadata = {
  title: "My Strapi Next App",
  description: "Powered by Strapi and Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // ⚠️ У цьому файлі немає params
  return (
    // Тег <html> відповідає за атрибут lang
    <html lang="pl" suppressHydrationWarning={true}>
      <head>{/* Тут можуть бути ваші метатеги */}</head>

      {/* Застосовуємо змінну шрифту до <body> */}
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
