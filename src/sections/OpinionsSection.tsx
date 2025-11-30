// src/sections/OpinionsSection.tsx
"use client";

import { marked } from "marked";
import dynamic from "next/dynamic";
// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---
// 💡 Динамічний імпорт компонента з відключенням SSR
const DynamicElfsightWidget = dynamic(
  () => import("@/components/ElfsightWidget"),
  {
    ssr: false, // 👈 ЦЕ ВИРІШУЄ ПРОБЛЕМУ
  }
);
// Тип для всієї секції (Section Opinion)
type RawOpinionSection = {
  id: number;
  __component: string;
  mainTitle?: string; // Text -> 'Opinie'
  title?: string; // Rich text (Markdown) -> Основний заголовок H2
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---
type ProcessedOpinionData = {
  mainTitle: string;
  titleHtml: string;
};

// --- ТИП ПРОПСІВ ---
type OpinionsSectionProps = {
  data: RawOpinionSection | null;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapOpinionData(rawData: RawOpinionSection): ProcessedOpinionData {
  // mainTitle: Простий текст, використовується для підзаголовка ('Opinie')
  const mainTitle = rawData.mainTitle || "Opinie";

  // title: Rich Text (Markdown), парсимо, щоб обробити <span> або **жирний**
  const titleHtml = marked.parse(rawData.title || "") as string;

  return {
    mainTitle: mainTitle,
    titleHtml: titleHtml,
  };
}
export default function OpinionsSection({
  data: rawData,
}: OpinionsSectionProps) {
  // Якщо дані відсутні, створюємо fallback-дані
  const data = rawData
    ? mapOpinionData(rawData)
    : {
        mainTitle: "Opinie",
        titleHtml: marked.parse(
          "Twoja opinia czyni **nas lepszymi**"
        ) as string,
      };

  // Вирішуємо, чи потрібно рендерити секцію взагалі (наприклад, якщо немає даних і немає віджета)
  // У цьому випадку ми припускаємо, що віджет Elfsight має завжди відображатися,
  // тому секція рендериться, навіть якщо заголовки Strapi відсутні.

  return (
    <section className="opinions">
      <div className="container">
        {/* Підзаголовок (mainTitle) */}
        {data.mainTitle && (
          <div className="section-title">
            <img src="/images/icons/arrows.svg" alt="section arrows" />
            <p>{data.mainTitle}</p>
          </div>
        )}

        {/* Заголовок H2 (titleHtml - Парсився, рендериться як HTML) */}
        {data.titleHtml && (
          <div
            className="standard-title"
            style={{ marginBottom: "40px" }}
            dangerouslySetInnerHTML={{ __html: data.titleHtml }}
          />
        )}

        {/* ✅ Єдине місце для рендерингу віджету Elfsight */}
        <div className="opinions-content">
          <DynamicElfsightWidget />
        </div>
      </div>
    </section>
  );
}
