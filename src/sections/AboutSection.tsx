// src/sections/AboutSection.tsx
"use client";

import Image from "next/image";
import { STRAPI_URL } from "@/lib/strapi-utils";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

type StrapiImageRelation = {
  url?: string;
  alternativeText?: string;
};

// Тип для окремого працівника (Repeatable Component: workers)
type RawWorkerItem = {
  id: number;
  name?: string;
  description?: string;
  photo?: StrapiImageRelation;
};

// Тип для всієї секції (Залишається незмінним на верхньому рівні)
type RawAboutSection = {
  id: number;
  __component: string;
  mainTitle?: string; // Заголовок секції "O nas"
  title?: string; // Основний заголовок h2
  description?: string; // Опис під заголовком h2
  workers?: RawWorkerItem[]; // Масив працівників
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ та ПРОПСИ (Залишаються незмінними) ---
type ProcessedWorkerItem = {
  id: number;
  name: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
};

type ProcessedAboutData = {
  sectionTitle: string;
  mainTitleHtml: string;
  mainDescription: string;
  members: ProcessedWorkerItem[];
};

type AboutSectionProps = {
  data: RawAboutSection | null;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

const mapStrapiUrl = (url: string | undefined, defaultPath: string): string => {
  if (!url) return defaultPath;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

function mapAboutData(rawData: RawAboutSection): ProcessedAboutData {
  const membersList = (rawData.workers || []).map((item) => {
    // 💡 БЕЗ ДЕФОЛТНИХ СТАТИЧНИХ РЯДКІВ (залишаємо defaultPath для зображення)
    const imageUrl = mapStrapiUrl(
      item.photo?.url,
      "/images/member-default.png"
    );
    const imageAlt = item.photo?.alternativeText || item.name || ""; // Зображення без alt-тексту

    return {
      id: item.id,
      name: item.name || "",
      imageUrl: imageUrl,
      imageAlt: imageAlt,
      description: item.description || "",
    } as ProcessedWorkerItem;
  });

  return {
    // 💡 БЕЗ ДЕФОЛТНИХ СТАТИЧНИХ РЯДКІВ
    sectionTitle: rawData.mainTitle || "",
    mainTitleHtml: rawData.title || "",
    mainDescription: rawData.description || "",
    members: membersList,
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---
export default function AboutSection({ data: rawData }: AboutSectionProps) {
  if (!rawData) {
    return null;
  }

  const aboutData = mapAboutData(rawData);
  const members = aboutData.members;

  // Якщо основні заголовки відсутні, і немає працівників, не рендеримо секцію
  if (
    !aboutData.sectionTitle &&
    !aboutData.mainTitleHtml &&
    members.length === 0
  ) {
    return null;
  }

  return (
    <section className="about" id="about">
      <div className="container">
        {/* Верхній заголовок (Рендеримо тільки якщо є дані) */}
        {aboutData.sectionTitle && (
          <div className="section-title">
            <img src="/images/icons/arrows.svg" alt="section arrows" />
            <p>{aboutData.sectionTitle}</p>
          </div>
        )}

        {/* Основний контент (Рендеримо тільки якщо є хоча б один заголовок або опис) */}
        {(aboutData.mainTitleHtml || aboutData.mainDescription) && (
          <div className="standard-content">
            {aboutData.mainTitleHtml && (
              <h2
                className="standard-title"
                dangerouslySetInnerHTML={{ __html: aboutData.mainTitleHtml }}
              />
            )}
            {aboutData.mainDescription && (
              <p className="text-standard">{aboutData.mainDescription}</p>
            )}
          </div>
        )}

        {/* Список працівників (Рендеримо тільки якщо є елементи) */}
        {members.length > 0 && (
          <ul className="member-list">
            {members.map(
              (member) =>
                // Рендеримо елемент лише якщо є ім'я або опис
                (member.name || member.description) && (
                  <li
                    className="member-item"
                    // ВИКОРИСТАННЯ ОБРОБЛЕНОГО URL
                    style={{ backgroundImage: `url(${member.imageUrl})` }}
                    key={member.id}
                  >
                    <p className="member-name">{member.name}</p>
                    <p className="text-standard member-desc">
                      {member.description}
                    </p>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
