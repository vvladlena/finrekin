// app/privacy/page.tsx

import { getStaticPageContent } from "@/lib/markdown";

// 1. Отримання даних (залишаємо зовні, якщо воно синхронне)
const privacyData = getStaticPageContent("privacy-policy.md");

export function generateMetadata() {
  // Додаємо перевірку на всяк випадок
  const title = privacyData?.frontmatter?.title || "Polityka prywatności";
  return {
    title: `${title} | Finrekin`,
    description:
      "Polityka prywatności. Informacja o przetwarzaniu danych osobowych",
  };
}

// Додаємо async, щоб TypeScript дозволив обробку складних типів даних
export default async function PrivacyPolicyPage() {
  // Отримуємо дані всередині компонента
  const { frontmatter, content } = privacyData;

  // Перетворюємо content на рядок, якщо він раптом прийшов як Promise або об'єкт
  const htmlContent = typeof content === "string" ? content : await content;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl py-16 px-6">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          {frontmatter?.title || "Polityka prywatności"}
        </h1>

        {/* 2. Відображення HTML-контенту */}
        <div
          className="privacy-content"
          // Використовуємо гарантовано строковий htmlContent
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </main>
  );
}
