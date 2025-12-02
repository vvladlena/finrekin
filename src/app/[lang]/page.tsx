// src/app/[lang]/page.tsx

import { getLandingPage } from "@/lib/strapi";
import DynamicZoneRenderer from "@/components/DynamicZoneRenderer/DynamicZoneRenderer";

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  console.log("PARAMS:", params);
  // // Вирішуємо params, щоб гарантовано отримати об'єкт.

  const lang = params.lang;
  if (!lang) {
    console.error("Language parameter is missing.");
    return (
      <main className="container pt-20">
        <h1>Не вдалося визначити мову.</h1>
      </main>
    );
  }

  // КРОК 1: Завантажуємо ВСІ дані сторінки одним запитом
  const pageData = await getLandingPage(lang);
  if (!pageData || !pageData.blocks || pageData.blocks.length === 0) {
    return (
      <main className="container pt-20">
        <h1>Помилка завантаження контенту або контент відсутній.</h1>
      </main>
    );
  }

  // КРОК 2: Передаємо масив блоків у рендерер
  return <DynamicZoneRenderer blocks={pageData.blocks} />;
}
