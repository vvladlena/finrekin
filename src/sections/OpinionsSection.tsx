"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { OpinionsData } from "@/types";
import Script from "next/script";

export default function OpinionsSection({ data }: { data: OpinionsData }) {
  const { lang } = useLanguage();

  if (!data || !data.mainTitle?.[lang]) return null;

  return (
    <section className="opinions">
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      <div className="container">
        <div className="section-title">
          <Image
            src="/images/icons/arrows.svg"
            alt="section arrows"
            width={20}
            height={20}
          />
          <p>{data.sectionTitle?.[lang]}</p>
        </div>

        <h2 className="standard-title" style={{ marginBottom: "40px" }}>
          <PortableText
            value={data.mainTitle[lang]}
            components={RICH_TEXT_COMPONENTS}
          />
        </h2>

        <div className="opinions-content">
          {/* Віджет Elfsight */}
          <div
            className="elfsight-app-45eb0560-689a-4fcf-a355-5fd5bba4787d"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
}
