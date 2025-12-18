// 📁 src/types/index.d.ts

// -----------------------------------------------------------------
// 1. Базові багатомовні типи
// -----------------------------------------------------------------

export interface LocaleString {
  [key: string]: string;
}

export interface LocalePortableText {
  [key: string]: any; // Масив блоків Portable Text
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  mockPath?: string; // Для локальних зображень з папки public
}

export interface FormFieldsData {
  title: LocaleString;
  namePlaceholder: LocaleString;
  messagePlaceholder: LocaleString;
  privacyText: LocaleString;
  privacyLink: LocaleString;
  submitButton: LocaleString;
  sendingText: LocaleString;
  successText: LocaleString;
  errorText: LocaleString;
  thankYouMessage: LocaleString;
}

// -----------------------------------------------------------------
// 2. Допоміжні типи для елементів списків
// -----------------------------------------------------------------

export interface SocialLink {
  _key: string;
  name: string;
  url: string;
  icon: SanityImage;
}

export interface Member {
  _key: string;
  name: string;
  image: SanityImage;
  description: LocaleString;
}

export interface TransparencyFeature {
  _key: string;
  title: LocaleString;
  text: LocaleString;
}
export interface StepItem {
  _key: string;
  title: LocaleString;
}

// -----------------------------------------------------------------
// 3. Типи для кожної секції (Sections)
// -----------------------------------------------------------------

export interface HeroData {
  title: LocalePortableText;
  subtitle: LocaleString;
  buttonText: LocaleString;
  image: SanityImage;
  services: {
    _key: string;
    title: LocaleString;
    icon: SanityImage;
    buttonText: LocaleString;
  }[];
}

export interface AboutData {
  sectionTitle: LocaleString;
  mainTitle: LocalePortableText;
  mainSubtitle: LocaleString;
  members: Member[];
}

export interface AreaSectionData {
  mainTitle: LocalePortableText;
  mainSubtitle: LocalePortableText;
  additionalText: LocaleString;
  areasList: {
    _key: string;
    title: LocaleString;
    icon: SanityImage;
  }[];
}

export interface TransparencyData {
  mainTitle: LocalePortableText;
  description: LocaleString;
  featuresList: TransparencyFeature[];
  imageTop: SanityImage;
  imageBottom: SanityImage;
}

export interface ContactData {
  sectionTitle: LocaleString;
  mainTitle: LocalePortableText;
  mainDescription: LocaleString;
  phoneText: string;
  phoneNumber: string;
  socialLinks: SocialLink[];
  formFields: any; // Об'єкт з перекладами для форми (placeholders, buttons)
}
export interface OpinionsData {
  sectionTitle: LocaleString;
  mainTitle: LocalePortableText;
}
export interface StepsSectionData {
  sectionTitle: LocaleString;
  mainTitle: LocalePortableText;
  stepsList: StepItem[]; // Тут буде рівно 6 елементів за схемою
  bgImage: SanityImage;
}
export interface BannerSectionData {
  bannerTitle: LocaleString;
  bannerDescription: LocalePortableText;
}
// Тип для Offers (Актуальні пропозиції)
export interface OffersSectionData {
  mainTitle: LocalePortableText;
  mainSubtitle: LocaleString;
  mainButtonText: LocaleString;
  offersList: {
    _key: string;
    title: LocaleString;
    icon: SanityImage;
    bg: SanityImage;
    buttonText: LocaleString;
  }[];
}
export interface ContactSectionData {
  sectionTitle: LocaleString; // "Kontakt"
  phone: string; // "+48 608 771 993"
  email: string; // "finrekin.wro@gmail.com"
  addressLine1: LocaleString; // "ul. Parkowa 25"
  addressLine2: LocaleString; // "51-516 Wrocław"
  addressUrl: string; // Посилання на Google Maps
  socials: {
    _key: string;
    icon: SanityImage;
    url: string;
  }[];
}
export interface PriceServiceItem {
  _key: string;
  description: LocaleString;
  price?: LocaleString;
}

export interface PriceSubBlock {
  _key: string;
  title: LocaleString;
  content: LocalePortableText;
}

export interface PriceServiceBlock {
  _key: string;
  blockTitle: LocaleString;
  subBlocks: PriceSubBlock[];
}

export interface PriceSectionData {
  sectionTitle: LocaleString;
  mainTitle: LocalePortableText;
  services: PriceServiceBlock[];
}
export interface FAQItem {
  _key: string;
  question: LocaleString;
  answer: LocalePortableText;
}

export interface FAQSectionData {
  sectionTitle: LocaleString;
  mainTitle: LocaleString;
  faqList: FAQItem[];
}
export interface FooterData {
  companyName: LocaleString;
  address: LocaleString;
  city: LocaleString;
  taxId: string;
  regId: string;
  capital: LocaleString;
  privacyPolicyLabel: LocaleString;
  devLabel: LocaleString;
}
// -----------------------------------------------------------------
// 4. Глобальний об'єкт даних сторінки
// -----------------------------------------------------------------

export interface PageData {
  hero: HeroData;
  offersSection: OffersSectionData;
  aboutSection: AboutData;
  areaSection: AreaSectionData;
  bannerSection: BannerSectionData;
  transparencySection: TransparencyData;
  stepsSection: StepsSectionData;
  contactFormSection: ContactData;
  opinionsSection: OpinionsData;
  contactSection: ContactSectionData;
  formFields: FormFieldsData;
  priceSection: PriceSectionData;
  faqSection: FAQSectionData;
  footer: FooterData;
}
