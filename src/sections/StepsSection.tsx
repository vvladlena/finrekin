"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/imageUtils";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import styles from "@/app/styles/components/StepsSection.module.scss";

interface StepsSectionProps {
  data: any; // Замініть на ваш інтерфейс StepsSectionData
}

export default function StepsSection({ data }: StepsSectionProps) {
  const { lang } = useLanguage();

  if (!data) return null;

  return (
    <section className={styles.stepsSection}>
      <div className="container">
        <div className="section-title">
          <Image
            src="/images/icons/arrows.svg"
            alt="arrows"
            width={20}
            height={20}
          />
          <p>{data.sectionTitle[lang]}</p>
        </div>

        {data?.mainTitle?.[lang] && (
          <h2 className="steps-main-title">
            <PortableText
              value={data.mainTitle[lang]}
              components={RICH_TEXT_COMPONENTS}
            />
          </h2>
        )}

        <div className={styles.stepsWrapper}>
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

          <div className={styles.steps}>
            {data.stepsList.map((step: any, index: number) => (
              <div
                key={step._key}
                className={`${styles.step} ${
                  index % 2 === 0 ? styles.top : styles.bottom
                }`}
              >
                <div className={styles.circle}>{index + 1}</div>
                <p>{step.title[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.stepsImage}>
          <Image
            src={getImageUrl(data.bgImage, "/images/background/steps-bg.png")}
            alt="Steps Illustration"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
