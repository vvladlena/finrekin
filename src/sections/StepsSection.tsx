// src/sections/StepsSection.tsx
"use client";

import Image from "next/image";
import { marked } from "marked";
import { STRAPI_URL } from "@/lib/strapi-utils";
import styles from "@/app/styles/components/StepsSection.module.scss";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

type StrapiImageRelation = {
  url?: string;
  alternativeText?: string;
};

// Тип для окремого елемента (Repeatable Component: steps)
type RawStepItem = {
  id: number;
  title?: string; // Text
};

// Тип для всієї секції
type RawStepsSection = {
  id: number;
  __component: string;
  mainTitle?: string; // Text -> 'Etapy pracy'
  title?: string; // Rich text (Markdown) -> Основний заголовок H2
  image?: StrapiImageRelation; // Media -> Ілюстрація
  steps?: RawStepItem[]; // Масив кроків
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---
type ProcessedStepItem = {
  id: number;
  title: string;
};

type ProcessedStepsData = {
  mainTitle: string;
  titleHtml: string;
  imageUrl: string;
  imageAlt: string;
  steps: ProcessedStepItem[];
};

// --- ТИП ПРОПСІВ ---
type StepsSectionProps = {
  data: RawStepsSection | null;
};

// --- ДОПОМІЖНІ ФУНКЦІЇ ---

const mapStrapiUrl = (url: string | undefined, defaultPath: string): string => {
  // Використовуємо реальні шляхи згідно зі структурою Strapi Section Steps
  if (!url) return "/images/background/steps-bg.png"; // Fallback
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapStepsData(rawData: RawStepsSection): ProcessedStepsData {
  const stepsList = (rawData.steps || []).map((item) => {
    return {
      id: item.id,
      title: item.title || "Tytuł nieokreślony", // Fallback для кроку
    } as ProcessedStepItem;
  });

  // Main Title: Простий текст
  const mainTitle = rawData.mainTitle || "Etapy pracy";

  // Title: Rich Text (Markdown), парсимо
  const titleHtml = marked.parse(rawData.title || "") as string;

  // Image
  const imageUrl = mapStrapiUrl(
    rawData.image?.url,
    "/images/background/steps-bg.png"
  );
  const imageAlt = rawData.image?.alternativeText || "Steps Illustration";

  return {
    mainTitle: mainTitle,
    titleHtml: titleHtml,
    imageUrl: imageUrl,
    imageAlt: imageAlt,
    steps: stepsList,
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---
export default function StepsSection({ data: rawData }: StepsSectionProps) {
  if (!rawData) {
    return null;
  }

  const data = mapStepsData(rawData);
  const steps = data.steps;

  // Якщо немає кроків і немає заголовків, не рендеримо секцію
  if (!data.titleHtml && !data.mainTitle && steps.length === 0) {
    return null;
  }

  return (
    <section className={styles.stepsSection}>
      <div className="container">
        {/* Main Title (Etapy pracy) */}
        {data.mainTitle && (
          <div className="section-title">
            <img src="/images/icons/arrows.svg" alt="section arrows" />
            <p>{data.mainTitle}</p>
          </div>
        )}

        {/* H2 Title (Парсився, рендериться як HTML) */}
        {data.titleHtml && (
          // Використовуємо <div>, оскільки marked.parse генерує <p>
          <h2 dangerouslySetInnerHTML={{ __html: data.titleHtml }} />
        )}

        <div className={styles.stepsWrapper}>
          {/* Статичний SVG для лінії залишається, оскільки він декоративний */}
          <svg
            className={styles.pathLine}
            viewBox="0 0 1200 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="95,80 295,180 495,80 695,180 895,80 1095,180"
              stroke="#36a8c3"
              strokeWidth="3"
              fill="transparent"
            />
          </svg>

          {/* Динамічний список кроків */}
          {steps.length > 0 && (
            <div className={styles.steps}>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  // Чергуємо класи для розташування (top/bottom)
                  className={`${styles.step} ${
                    index % 2 === 0 ? styles.top : styles.bottom
                  }`}
                >
                  <div className={styles.circle}>{index + 1}</div>{" "}
                  {/* Використовуємо index + 1 для номера кроку */}
                  <p>{step.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Динамічне зображення */}
        {data.imageUrl && (
          <div className={styles.stepsImage}>
            <Image
              src={data.imageUrl}
              alt={data.imageAlt}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
