// src/sections/BannerSection.tsx
"use client";

import { marked } from "marked";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

// Тип для всієї секції
type RawBannerSection = {
  id: number;
  __component: string;
  title?: string; // Strapi: title (Text)
  description?: string; // Strapi: description (Rich text/Markdown)
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---
type ProcessedBannerData = {
  title: string;
  descriptionHtml: string;
};

// --- ТИП ПРОПСІВ ---
type BannerSectionProps = {
  data: RawBannerSection | null;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapBannerData(rawData: RawBannerSection): ProcessedBannerData {
  const rawDescription = rawData.description || "";

  return {
    title: rawData.title || "",

    // ✅ ВИКОРИСТАННЯ MARKED: Перетворюємо Markdown (**текст**) на HTML (<b>текст</b>)
    descriptionHtml: marked.parse(rawDescription) as string,
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---
export default function BannerSection({ data: rawData }: BannerSectionProps) {
  if (!rawData) {
    return null;
  }

  const bannerData = mapBannerData(rawData);

  // Якщо обидва поля порожні, можемо приховати секцію
  if (!bannerData.title && !bannerData.descriptionHtml) {
    return null;
  }

  return (
    <section className="about">
      <div className="container">
        <div className="banner-content">
          {/* 1. Заголовок (Рендеримо тільки якщо є title) */}
          {bannerData.title && (
            <h2 className="banner-title">{bannerData.title}</h2>
          )}

          {/* 2. Опис (Рендеримо тільки якщо є description) */}
          {bannerData.descriptionHtml && (
            <div
              className="text-standard banner-desc"
              dangerouslySetInnerHTML={{ __html: bannerData.descriptionHtml }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
