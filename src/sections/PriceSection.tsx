"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { PriceSectionData } from "@/types";

export default function PriceSection({ data }: { data: PriceSectionData }) {
  const { lang } = useLanguage();

  if (!data) return null;

  return (
    <section className="price-section" id="services">
      <div className="container">
        <div className="section-title">
          <Image
            src="/images/icons/arrows.svg"
            alt="arrows"
            width={20}
            height={20}
          />
          <p>{data.sectionTitle?.[lang]}</p>
        </div>

        <h2 className="standard-title" style={{ marginBottom: 40 }}>
          <PortableText
            value={data.mainTitle?.[lang]}
            components={RICH_TEXT_COMPONENTS}
          />
        </h2>

        {data.services?.map((block: any) => (
          <div key={block._key} className="service-category">
            <p className="card-title">{block.blockTitle?.[lang]}</p>

            {block.subBlocks?.map((sub: any) => (
              <div className="price-card static" key={sub._key}>
                <div className="card-header">
                  <div className="title-wrapper">
                    <span className="dot" />
                    <h3>{sub.title?.[lang]}</h3>
                  </div>
                </div>

                <div className="divider" />

                <div className="card-content rich-price-content">
                  {/* ✅ ВСЕ РЕДАГУЄТЬСЯ ЯК ОДНЕ ПОЛЕ */}
                  <PortableText
                    value={sub.content?.[lang]}
                    components={RICH_TEXT_COMPONENTS}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
