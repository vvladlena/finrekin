// src/sections/AreaSection.tsx
"use client";

import Image from "next/image";
import { marked } from "marked";
import { STRAPI_URL } from "@/lib/strapi-utils";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

type StrapiImageRelation = {
  url?: string;
  alternativeText?: string;
};

// Тип для окремого елемента (Repeatable Component: areas)
type RawAreaItem = {
  id: number;
  icon?: StrapiImageRelation; // Media
  description?: string; // Rich text (Markdown)
};

// Тип для всієї секції
type RawAreaSection = {
  id: number;
  __component: string;
  title?: string; // Rich text (Markdown) -> Основний заголовок H2
  description?: string; // Rich text (Markdown) -> Основний опис під H2
  areas?: RawAreaItem[]; // Масив елементів
  additionalText?: string; // 💡 НОВЕ ПОЛЕ: additionalText (Text)
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---
type ProcessedAreaItem = {
  id: number;
  iconUrl: string;
  iconAlt: string;
  descriptionHtml: string;
};

type ProcessedAreaData = {
  titleHtml: string;
  descriptionHtml: string;
  areas: ProcessedAreaItem[];
  additionalText: string; // 💡 НОВЕ ПОЛЕ
};

// --- ТИП ПРОПСІВ ---
type AreaSectionProps = {
  data: RawAreaSection | null;
};

// --- ДОПОМІЖНІ ФУНКЦІЇ ---

const mapStrapiUrl = (url: string | undefined, defaultPath: string): string => {
  if (!url) return defaultPath;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapAreaData(rawData: RawAreaSection): ProcessedAreaData {
  const areasList = (rawData.areas || []).map((item) => {
    // Мапуємо дані іконки
    const iconUrl = mapStrapiUrl(item.icon?.url, "/images/icons/default.svg");
    const iconAlt = item.icon?.alternativeText || "Area icon";

    // Елементи списку (item.description): ПАРСИМО Markdown
    const descriptionHtml = marked.parse(item.description || "") as string;

    return {
      id: item.id,
      iconUrl: iconUrl,
      iconAlt: iconAlt,
      descriptionHtml: descriptionHtml,
    } as ProcessedAreaItem;
  });

  // Title: НЕ ПАРСИМО (для вставки чистого HTML/<span>)
  const titleHtml = rawData.title || "";

  // Description: ПАРСИМО Markdown
  const descriptionHtml = marked.parse(rawData.description || "") as string;

  // 💡 НОВЕ ПОЛЕ: Простий текст, не парсимо
  const additionalText = rawData.additionalText || "";

  return {
    titleHtml: titleHtml,
    descriptionHtml: descriptionHtml,
    areas: areasList,
    additionalText: additionalText, // 💡 ПОВЕРТАЄМО НОВЕ ПОЛЕ
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---
export default function AreaSection({ data: rawData }: AreaSectionProps) {
  if (!rawData) {
    return null;
  }

  const areaData = mapAreaData(rawData);
  const areas = areaData.areas;

  // Якщо немає заголовків, елементів чи додаткового тексту, не рендеримо секцію
  if (
    !areaData.titleHtml &&
    !areaData.descriptionHtml &&
    !areaData.additionalText && // 💡 ПЕРЕВІРКА НОВОГО ПОЛЯ
    areas.length === 0
  ) {
    return null;
  }

  return (
    <section className="about">
      <div className="container">
        {/* Заголовки (Рендеримо тільки якщо є title або description) */}
        {(areaData.titleHtml || areaData.descriptionHtml) && (
          <div className="standard-content">
            {/* H2 - Title */}
            {areaData.titleHtml && (
              <h2
                className="standard-title"
                dangerouslySetInnerHTML={{ __html: areaData.titleHtml }}
              />
            )}
            {/* Опис - Description */}
            {areaData.descriptionHtml && (
              <div
                className="text-standard"
                dangerouslySetInnerHTML={{ __html: areaData.descriptionHtml }}
              />
            )}
          </div>
        )}

        {/* Список елементів (areas) */}
        {areas.length > 0 && (
          <ul className="area-list">
            {areas.map((area) => (
              <li className="area-item" key={area.id}>
                {/* Іконка */}
                <img
                  className="area-icon"
                  src={area.iconUrl}
                  alt={area.iconAlt}
                />
                {/* Опис елемента */}
                {area.descriptionHtml && (
                  <div
                    className="area-title text-standard"
                    dangerouslySetInnerHTML={{ __html: area.descriptionHtml }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        {/* 💡 НОВИЙ БЛОК additionalText */}
        {areaData.additionalText && (
          <div className="area-add">
            <p>{areaData.additionalText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
