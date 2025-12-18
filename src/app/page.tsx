import { getFullPageData } from "@/lib/dataFetcher";
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

export const revalidate = 60;

export default async function HomePage() {
  // ✅ 1. Використовуємо готову функцію, яку ми створили в dataFetcher.ts
  // Вона вже об'єднує primary та secondary документи всередині себе.
  const data = await getFullPageData();

  // Якщо даних взагалі немає (навіть моків), повертаємо null або loader
  if (!data) return null;

  return (
    <>
      {/* 2. Рендеринг компонентів з передачею об'єднаних даних */}
      <Hero heroData={data.hero} formFields={data.formFields} />

      <OffersSection data={data.offersSection} formFields={data.formFields} />

      <AboutSection data={data.aboutSection} />

      <BannerSection bannerData={data.bannerSection} />

      <AreaSection data={data.areaSection} />

      {/* Секція форми тепер отримує глобальні поля formFields */}
      <ContactFormSection
        data={data.contactFormSection}
        formFields={data.formFields}
      />

      <TransparencySection data={data.transparencySection} />

      <OpinionsSection data={data.opinionsSection} />

      <StepsSection data={data.stepsSection} />

      {/* Ці дві секції тепер приходять з 'secondary' документа через dataFetcher */}
      <PriceSection data={data.priceSection} />

      <FAQSection data={data.faqSection} />

      <ContactSection data={data.contactSection} formFields={data.formFields} />
    </>
  );
}
