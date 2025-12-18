// schemas/schemaTypes.js (ВИПРАВЛЕНО)

import landingPage from './landingPage'
import landingPageSecondary from './landingPageSecondary'

// ✅ 1. ІМПОРТУЄМО ВСІ НОВІ МОДУЛЬНІ СХЕМИ
import heroSection from './heroSection'
import offersSection from './offersSection'
import localePortableText from './localePortableText'
import localeString from './localeString'
import aboutSection from './aboutSection'
import bannerSection from './bannerSection'
import areaSection from './areaSection'
import areaItem from './objects/areaItem'
import contactFormSection from './contactFormSection'
import globalFormFields from './objects/formFields'
import transparencySection from './transparencySection'
import opinionsSection from './opinionsSection'
import contactSection from './contactSection'
import stepsSection from './stepsSection'
import priceSection from './priceSection'
import faqSection from './faqSection'
import footer from './footer'
export const schemaTypes = [
  landingPage,
  landingPageSecondary,
  heroSection,
  offersSection,
  aboutSection,
  localeString,
  localePortableText,
  bannerSection,
  areaSection,
  areaItem,
  globalFormFields,
  contactFormSection,
  transparencySection,
  opinionsSection,
  stepsSection,
  priceSection,
  faqSection,
  contactSection,
  footer,
]
