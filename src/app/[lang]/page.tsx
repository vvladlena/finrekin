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
import { getHero } from "@/lib/strapi";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  console.log("LANG PARAM:", lang); // DEBUG

  const hero = await getHero(lang);
  return (
    <>
      <Hero hero={hero} />
      <OffersSection />
      <AboutSection />
      <BannerSection />
      <AreaSection />
      <ContactFormSection />
      <TransparencySection />
      <OpinionsSection />
      <StepsSection />
      <PriceSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
