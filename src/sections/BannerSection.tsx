"use client";

import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react"; // ✅ Додаємо PortableTextComponents
import { useLanguage } from "@/context/LanguageContext";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";

// 💡 ЛОКАЛЬНЕ ВИЗНАЧЕННЯ ТИПІВ
// Багатомовний рядок
interface LocaleString {
  [key: string]: string; // en, pl, ua, ru
}

// Багатомовний Portable Text
interface LocalePortableText {
  [key: string]: any; // Об'єкт Portable Text блоки
}

// Інтерфейс для даних BannerSection
interface BannerSectionData {
  bannerTitle: LocaleString;
  bannerDescription: LocalePortableText;
}

// === АДАПТАЦІЯ КОМПОНЕНТІВ PORTABLE TEXT ДЛЯ ЦІЄЇ СЕКЦІЇ ===
// Створюємо адаптований об'єкт, який додає потрібні класи до параграфів
const BANNER_RICH_TEXT_COMPONENTS: PortableTextComponents = {
  ...RICH_TEXT_COMPONENTS, // Копіюємо всі маркери, посилання, і т.д.
  block: {
    // Перевизначаємо нормальний блок лише для цієї секції, щоб додати класи
    normal: ({ children }) => (
      <p className="text-standard banner-desc">{children}</p>
    ),
  },
};
// ==========================================================

// ✅ Компонент приймає 'bannerData' через пропси
export default function BannerSection({
  bannerData,
}: {
  bannerData: BannerSectionData;
}) {
  const { lang } = useLanguage();

  // ✅ ПЕРЕВІРКА НАЯВНОСТІ ДАНИХ ТА ПЕРЕКЛАДУ
  if (
    !bannerData ||
    !bannerData.bannerTitle?.[lang] ||
    !bannerData.bannerDescription?.[lang]
  ) {
    return null;
  }

  // Витягуємо локалізовані дані
  const title = bannerData.bannerTitle[lang];
  const description = bannerData.bannerDescription[lang];

  return (
    <section className="about">
      <div className="container">
        <div className="banner-content">
          <h2 className="banner-title">{title}</h2>
          <div className="banner-content-wrapper">
            {/* ✅ ВИКОРИСТОВУЄМО АДАПТОВАНИЙ ОБ'ЄКТ З КЛАСАМИ */}
            <PortableText
              value={description}
              components={BANNER_RICH_TEXT_COMPONENTS}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
