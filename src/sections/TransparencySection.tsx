// src/sections/TransparencySection.tsx
"use client";

import Image from "next/image";
import { marked } from "marked";
import { STRAPI_URL } from "@/lib/strapi-utils";
import styles from "@/app/styles/components/TransparencySection.module.scss";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

type StrapiImageRelation = {
  url?: string;
  alternativeText?: string;
};

// Тип для окремого елемента (Repeatable Component: transparency_list)
type RawListItem = {
  id: number;
  title?: string; // Text
  description?: string; // Text
};

// Тип для всієї секції
type RawTransparencySection = {
  id: number;
  __component: string;
  title?: string; // Rich text (Markdown) -> Заголовок H2
  description?: string; // Text -> Опис
  photo1?: StrapiImageRelation; // Media -> Верхнє фото
  photo2?: StrapiImageRelation; // Media -> Нижнє фото
  transparency_list?: RawListItem[]; // Масив елементів
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---
type ProcessedListItem = {
  id: number;
  title: string;
  description: string;
};

type ProcessedTransparencyData = {
  titleHtml: string;
  description: string;
  photo1Url: string;
  photo1Alt: string;
  photo2Url: string;
  photo2Alt: string;
  list: ProcessedListItem[];
};

// --- ТИП ПРОПСІВ ---
type TransparencySectionProps = {
  data: RawTransparencySection | null;
};

// --- ДОПОМІЖНІ ФУНКЦІЇ ---
const mapStrapiUrl = (url: string | undefined, defaultPath: string): string => {
  if (!url) return defaultPath;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapTransparencyData(
  rawData: RawTransparencySection
): ProcessedTransparencyData {
  const list = (rawData.transparency_list || []).map((item) => {
    return {
      id: item.id,
      title: item.title || "",
      description: item.description || "", // Тут припускаємо, що це простий текст
    } as ProcessedListItem;
  });

  // Заголовок: Парсимо Rich Text (Markdown), щоб обробити <span> або **жирний**
  const titleHtml = marked.parse(
    rawData.title || "Opowiadamy się za przeźroрою ksiєgowošć"
  ) as string;

  // Опис: Простий текст, не парсимо
  const description =
    rawData.description || "Wyjaśniamy skomplikowane kwestie w prosty sposób.";

  // Фото 1
  const photo1Url = mapStrapiUrl(rawData.photo1?.url, "/images/team-1.png");
  const photo1Alt = rawData.photo1?.alternativeText || "accountant portrait";

  // Фото 2
  const photo2Url = mapStrapiUrl(rawData.photo2?.url, "/images/team-2.png");
  const photo2Alt = rawData.photo2?.alternativeText || "accountant working";

  return {
    titleHtml: titleHtml,
    description: description,
    photo1Url: photo1Url,
    photo1Alt: photo1Alt,
    photo2Url: photo2Url,
    photo2Alt: photo2Alt,
    list: list,
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---
export default function TransparencySection({
  data: rawData,
}: TransparencySectionProps) {
  if (!rawData) {
    return null;
  }

  const data = mapTransparencyData(rawData);
  const listItems = data.list;

  // Якщо немає даних, не рендеримо
  if (!data.titleHtml && !data.description && listItems.length === 0) {
    return null;
  }

  return (
    <section className={styles.transparency}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Ліва колонка */}
          <div className={styles.content}>
            {/* Заголовок (Парсився через marked, рендериться як HTML) */}
            {data.titleHtml && (
              <div
                className={styles.title} // Використовуємо div, оскільки marked.parse генерує HTML (включно з тегами <p>)
                dangerouslySetInnerHTML={{ __html: data.titleHtml }}
              />
            )}

            {/* Опис (Простий текст) */}
            {data.description && (
              <p className={styles.description}>{data.description}</p>
            )}

            {/* Список */}
            {listItems.length > 0 && (
              <ul className={styles.list}>
                {listItems.map((item) => (
                  <li className={styles.item} key={item.id}>
                    {/* Title (Простий текст) */}
                    {item.title && (
                      <p className={styles.itemTitle}>{item.title}</p>
                    )}
                    {/* Description (Простий текст) */}
                    {item.description && (
                      // 💡 Якщо тут може бути HTML/посилання, використовуйте dangerouslySetInnerHTML
                      <p className={styles.itemText}>{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Права колонка */}
          <div className={styles.images}>
            {/* Фото 1 */}
            <div className={styles.imageTop}>
              {data.photo1Url && (
                <Image
                  src={data.photo1Url}
                  alt={data.photo1Alt}
                  fill
                  className={styles.image}
                />
              )}
            </div>

            {/* Фото 2 */}
            <div className={styles.imageBottom}>
              {data.photo2Url && (
                <Image
                  src={data.photo2Url}
                  alt={data.photo2Alt}
                  fill
                  className={styles.image}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
