// 📁 src/lib/dataFetcher.ts
import { client } from "@/lib/sanity";
import { mockPageData } from "@/data/pageData";

// -----------------------------------------------------------------
// 1. ЛОКАЛЬНІ ІНТЕРФЕЙСИ
// -----------------------------------------------------------------
interface LocaleString {
  [key: string]: string;
}
interface LocalePortableText {
  [key: string]: any;
}

interface BannerSectionData {
  bannerTitle: LocaleString;
  bannerDescription: LocalePortableText;
}

interface AreaSectionData {
  mainTitle: LocalePortableText;
  mainSubtitle: LocalePortableText;
  additionalText: LocaleString;
  areasList: any[];
}

interface ContactSectionData {
  sectionTitle: LocaleString;
  phone: string;
  email: string;
  addressLine1: LocaleString;
  addressLine2: LocaleString;
  addressUrl: string;
  socials: any[];
}

export interface FullPageData {
  hero: any;
  offersSection: any;
  aboutSection: any;
  bannerSection: BannerSectionData;
  areaSection: AreaSectionData;
  transparencySection: any;
  opinionsSection: any;
  stepsSection: any;
  priceSection: any;
  faqSection: any;
  contactFormSection: any;
  contactSection: ContactSectionData;
  formFields: any;
  footer: any;
}

// -----------------------------------------------------------------
// 2. ВИПРАВЛЕНИЙ GROQ ЗАПИТ
// -----------------------------------------------------------------
const PAGE_QUERY = `{
  "primary": *[_type == "landingPage"][0] {
    hero,
    offersSection,
    aboutSection,
    bannerSection,
    areaSection,
    transparencySection,
    opinionsSection,
    stepsSection,
    "formFields": globalFormFields,
    contactFormSection,
    contactSection
  },
  "secondary": *[_type == "landingPageSecondary"][0] {
    priceSection,
    faqSection
  },
  "footer": *[_type == "footer"][0]
}`;

// -----------------------------------------------------------------
// 3. ФУНКЦІЯ ОТРИМАННЯ ДАНИХ
// -----------------------------------------------------------------
export async function getFullPageData(): Promise<FullPageData> {
  try {
    const data = await client.fetch(PAGE_QUERY);

    // Перевірка наявності основних даних (хоча б першої частини)
    if (!data || !data.primary) {
      console.warn("Sanity primary data not found. Using mock fallback.");
      return mockPageData as FullPageData;
    }

    const { primary, secondary, footer } = data;

    const finalData: FullPageData = {
      // ✅ Дані з ПЕРШОЇ частини (landingPage)
      hero: primary.hero ?? mockPageData.hero,
      offersSection: primary.offersSection ?? mockPageData.offersSection,
      aboutSection: primary.aboutSection ?? mockPageData.aboutSection,
      bannerSection: primary.bannerSection ?? mockPageData.bannerSection,
      areaSection: primary.areaSection ?? mockPageData.areaSection,
      transparencySection:
        primary.transparencySection ?? mockPageData.transparencySection,
      opinionsSection: primary.opinionsSection ?? mockPageData.opinionsSection,
      stepsSection: primary.stepsSection ?? mockPageData.stepsSection,
      contactFormSection:
        primary.contactFormSection ?? mockPageData.contactFormSection,
      formFields: primary.formFields ?? mockPageData.formFields,
      contactSection: primary.contactSection ?? mockPageData.contactSection,

      // ✅ Дані з ДРУГОЇ частини (landingPageSecondary)
      priceSection: secondary?.priceSection ?? mockPageData.priceSection,
      faqSection: secondary?.faqSection ?? mockPageData.faqSection,

      // ✅ Дані з футера
      footer: footer ?? mockPageData.footer,
    };

    return finalData;
  } catch (error) {
    console.error("Critical fetch error:", error);
    return mockPageData as FullPageData;
  }
}
