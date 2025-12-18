"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { urlFor } from "@/lib/sanity"; // ✅ Використовуємо urlFor
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import styles from "@/app/styles/components/TransparencySection.module.scss";

interface TransparencyFeature {
  _key: string;
  title: Record<string, string>;
  text: Record<string, string>;
}

interface TransparencyData {
  mainTitle: any;
  description: Record<string, string>;
  featuresList: TransparencyFeature[];
  imageTop: any;
  imageBottom: any;
}

export default function TransparencySection({
  data,
}: {
  data: TransparencyData;
}) {
  const { lang } = useLanguage();

  if (!data) return null;

  return (
    <section className={styles.transparency}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Ліва колонка */}
          <div className={styles.content}>
            <div className={styles.title}>
              {data.mainTitle?.[lang] && (
                <PortableText
                  value={data.mainTitle[lang]}
                  components={RICH_TEXT_COMPONENTS}
                />
              )}
            </div>

            <p className={styles.description}>{data.description?.[lang]}</p>

            <ul className={styles.list}>
              {data.featuresList?.map((item) => (
                <li className={styles.item} key={item._key}>
                  <p className={styles.itemTitle}>{item.title?.[lang]}</p>
                  <p className={styles.itemText}>
                    {/* ✅ Прибрали dangerouslySetInnerHTML, якщо це звичайний текст */}
                    {item.text?.[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Права колонка */}
          <div className={styles.images}>
            <div className={styles.imageTop}>
              <Image
                src={
                  data.imageTop?.asset
                    ? urlFor(data.imageTop).url()
                    : "/images/team-1.png"
                }
                alt="accountant portrait"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
            <div className={styles.imageBottom}>
              <Image
                src={
                  data.imageBottom?.asset
                    ? urlFor(data.imageBottom).url()
                    : "/images/team-2.png"
                }
                alt="accountant working"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
