"use client";

import React from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { urlFor } from "@/lib/sanity"; // ✅ Додаємо імпорт для обробки зображень Sanity

import { AreaSectionData } from "@/types";

const AREA_RICH_TEXT_COMPONENTS: PortableTextComponents = {
  ...RICH_TEXT_COMPONENTS,
  block: {
    normal: ({ children }) => <p className="text-standard">{children}</p>,
  },
};

export default function AreaSection({ data }: { data: AreaSectionData }) {
  const { lang } = useLanguage();

  // ✅ Більш надійна перевірка наявності даних
  if (!data || !data.areasList) {
    return null;
  }

  // ✅ Використовуємо optional chaining (?.), щоб уникнути помилок "undefined"
  const mainTitle = data.mainTitle?.[lang];
  const mainSubtitle = data.mainSubtitle?.[lang];
  const additionalText = data.additionalText?.[lang];
  const areasList = data.areasList;

  return (
    <section className="area-section">
      <div className="container">
        <div className="standard-content">
          {/* ✅ Рендеримо заголовок тільки якщо він існує */}
          {mainTitle && (
            <h2 className="standard-title">
              <PortableText
                value={mainTitle}
                components={RICH_TEXT_COMPONENTS}
              />
            </h2>
          )}

          {mainSubtitle && (
            <PortableText
              value={mainSubtitle}
              components={AREA_RICH_TEXT_COMPONENTS}
            />
          )}
        </div>

        <ul className="area-list">
          {areasList.map((area) => {
            const imageSrc = area.icon?.asset
              ? urlFor(area.icon).url()
              : area.icon?.mockPath || null;

            return (
              <li className="area-item" key={area._key || Math.random()}>
                <div className="area-icon-wrapper">
                  {/* ✅ Рендеримо Image тільки якщо imageSrc не порожній */}
                  {imageSrc ? (
                    <Image
                      className="area-icon"
                      src={imageSrc}
                      alt={area.title?.[lang] || "area icon"}
                      width={65}
                      height={65}
                    />
                  ) : (
                    <div
                      className="area-icon-placeholder"
                      style={{ width: 50, height: 50 }}
                    />
                  )}
                </div>

                <p className="area-title text-standard">{area.title?.[lang]}</p>
              </li>
            );
          })}
        </ul>

        {additionalText && (
          <div className="area-add">
            <p>{additionalText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
