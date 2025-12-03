// app/privacy/page.tsx

import { getStaticPageContent } from "@/lib/markdown";

// 1. Отримання даних під час збірки
const privacyData = getStaticPageContent("privacy-policy.md");

export function generateMetadata() {
  return {
    title: `${privacyData.frontmatter.title} | Finrekin`,
    description:
      "Polityka prywatności. Informacja o przetwarzaniu danych osobowych",
  };
}

export default function PrivacyPolicyPage() {
  const { frontmatter, content } = privacyData;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl py-16 px-6">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          {frontmatter.title}
        </h1>

        {/* 2. Відображення HTML-контенту */}
        {/* Використовуємо батьківський клас для стилізації через чистий CSS */}
        <div
          className="privacy-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
}
