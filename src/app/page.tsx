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
export default function HomePage() {
  return (
    <>
      <Hero />
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
