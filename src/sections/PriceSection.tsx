// src/sections/PriceSection.tsx
"use client";

import { marked as markedLegacy } from "marked";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

type StrapiPriceItem = {
  id: number;
  service_title?: string; // Text: Назва конкретної послуги/пакету
  service_name?: string; // Text: Назва групи (наприклад, "Księgowość i kadry")
  service_description?: string; // Rich Text: Деталі, ціни, списки
};

type RawPriceSection = {
  id: number;
  __component: string;
  mainTitle?: string; // Text: 'Usługi'
  title?: string; // Rich text (Markdown): Заголовок H2
  prices?: StrapiPriceItem[]; // Масив блоків послуг
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---

type ProcessedPriceItem = {
  id: number;
  serviceTitle: string;
  serviceName: string;
  serviceDescriptionHtml: string;
};

type ProcessedPriceData = {
  mainTitle: string;
  titleHtml: string;
  priceBlocks: ProcessedPriceItem[];
};

// --- ТИП ПРОПСІВ ---
type PriceSectionProps = {
  data: RawPriceSection | null;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapPriceData(rawData: RawPriceSection): ProcessedPriceData {
  const priceBlocks = (rawData.prices || []).map((item) => {
    // Парсимо Rich Text. Якщо поле порожнє, повертаємо порожній рядок.
    const descriptionHtml = markedLegacy.parse(
      item.service_description || ""
    ) as string;

    return {
      id: item.id,
      serviceTitle: item.service_title || "",
      serviceName: item.service_name || "",
      serviceDescriptionHtml: descriptionHtml,
    } as ProcessedPriceItem;
  });

  const mainTitle = rawData.mainTitle || ""; // Немає статичних заглушок
  const titleHtml = markedLegacy.parse(rawData.title || "") as string; // Немає статичних заглушок

  return {
    mainTitle: mainTitle,
    titleHtml: titleHtml,
    priceBlocks: priceBlocks,
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---
export default function PriceSection({ data: rawData }: PriceSectionProps) {
  if (!rawData) {
    return null; // Якщо немає сирих даних, нічого не рендеримо
  }

  const data = mapPriceData(rawData);
  const blocks = data.priceBlocks;

  // Не рендеримо, якщо немає заголовків і немає блоків
  if (!data.titleHtml && !data.mainTitle && blocks.length === 0) {
    return null;
  }

  // Групування блоків за service_name
  const groupedBlocks = blocks.reduce((acc, item) => {
    // Якщо serviceName порожнє, використовуємо fallback-ключ, щоб уникнути помилок
    const key = item.serviceTitle || "Uncategorized";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, ProcessedPriceItem[]>);

  return (
    <section className="price-section" id="services">
      <div className="container">
        {/* Main Title (Usługi) */}
        {data.mainTitle && (
          <div className="section-title">
            <img src="/images/icons/arrows.svg" alt="section arrows" />
            <p>{data.mainTitle}</p>
          </div>
        )}

        {/* H2 Title (Rich Text) */}
        {data.titleHtml && (
          <div
            className="standard-title"
            style={{ marginBottom: 40 }}
            dangerouslySetInnerHTML={{ __html: data.titleHtml }}
          />
        )}

        {/* ІТЕРАЦІЯ ПО БЛОКАХ (ГРУПАХ) */}
        {Object.entries(groupedBlocks).map(
          ([blockTitle, subBlocks], idx) =>
            // Використовуємо div тільки якщо blockTitle не "Uncategorized"
            blockTitle !== "Uncategorized" && (
              <div key={idx}>
                {/* blockTitle: Назва групи послуг */}
                <p className="card-title">{blockTitle}</p>

                {/* ІТЕРАЦІЯ ПО КАРТКАХ (ВНУТРІШНІХ СПИСКАХ) */}
                {subBlocks.map((sub, subIdx) => (
                  <div className="price-card static" key={subIdx}>
                    <div className="card-header">
                      <div className="title-wrapper">
                        <span className="dot" />
                        {/* SubBlock : Назва картки */}
                        <h3>{sub.serviceName}</h3>
                      </div>
                    </div>

                    <div className="divider" />

                    {/* Card Content: HTML з service_description */}
                    {sub.serviceDescriptionHtml && (
                      <div
                        className="card-content"
                        dangerouslySetInnerHTML={{
                          __html: sub.serviceDescriptionHtml,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </section>
  );
}
