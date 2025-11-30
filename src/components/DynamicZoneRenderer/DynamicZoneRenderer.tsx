// src/components/DynamicZoneRenderer/DynamicZoneRenderer.tsx
"use client";

// Імпортуємо ВСІ секції
import Hero from "@/sections/Hero";
import OffersSection from "@/sections/OffersSection";
import AboutSection from "@/sections/AboutSection";
import BannerSection from "@/sections/BannerSection";
import AreaSection from "@/sections/AreaSection";
import TransparencySection from "@/sections/TransparencySection";
import OpinionsSection from "@/sections/OpinionsSection";
import StepsSection from "@/sections/StepsSection";
import FAQSection from "@/sections/FAQSection";
import PriceSection from "@/sections/PriceSection";
import ContactFormSection from "@/sections/ContactFormSection";
import ContactSection from "@/sections/ContactSection";

type DynamicZoneRendererProps = {
  // Кожен блок — це сирий об'єкт зі Strapi
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any[];
};

export default function DynamicZoneRenderer({
  blocks,
}: DynamicZoneRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const componentId = block.__component;

        if (!componentId) {
          console.warn("Component ID missing for a block.", block);
          return null;
        }

        // Розділяємо "components.section-hero" -> ["components", "section-hero"]
        const [category, componentName] = componentId.split(".");

        // Вибір компонента для рендерингу.
        // Всі компоненти приймають сирий об'єкт 'block' як пропс.
        switch (componentName) {
          case "section-hero":
            // Приймає пропс 'hero', який тепер містить СИРІ дані
            return <Hero key={block.id} hero={block} />;

          case "section-offers":
            return <OffersSection key={block.id} data={block} />;

          case "section-about":
            return <AboutSection key={block.id} data={block} />;

          case "section-banner":
            return <BannerSection key={block.id} data={block} />;

          case "section-area":
            return <AreaSection key={block.id} data={block} />;

          case "section-transparency":
            return <TransparencySection key={block.id} data={block} />;

          case "section-opinion":
            return <OpinionsSection key={block.id} data={block} />;

          case "section-steps":
            return <StepsSection key={block.id} data={block} />;

          case "section-price":
            return <PriceSection key={block.id} data={block} />;

          case "section-faq":
            return <FAQSection key={block.id} data={block} />;

          case "section-form":
            return <ContactFormSection key={block.id} data={block} />;

          case "section-contact":
            return <ContactSection key={block.id} data={block} />;

          default:
            console.warn(
              `Unknown component detected in Dynamic Zone: ${componentId}`
            );
            return null;
        }
      })}
    </>
  );
}
