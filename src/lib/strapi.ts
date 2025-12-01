// src/lib/strapi.ts
import "server-only";
import { STRAPI_URL } from "./strapi-utils";
import qs from "qs";

// --- Об'єкт populate (КОРЕКТНА ФІНАЛЬНА ВЕРСІЯ) ---
const DYNAMIC_ZONE_POPULATE = {
  Content_Blocks: {
    on: {
      // ✅ Section Hero: Вкладений компонент з медіа
      "sections.section-hero": {
        populate: { uslugi: { populate: ["image"] } },
      },
      // ✅ Section Offers: Вкладений компонент з медіа
      "sections.section-offers": {
        populate: { oferty: { populate: ["image"] } },
      },
      // ✅ Section About: Вкладений компонент з медіа
      "sections.section-about": {
        populate: { workers: { populate: ["photo"] } },
      },
      // ✅ Section Banner: Просто булеве значення
      "sections.section-banner": true,
      // ✅ Section Area: Вкладений компонент з медіа
      "sections.section-area": { populate: { areas: { populate: ["icon"] } } },

      // ✅ Section Transparency: Масив рядків для полів
      "sections.section-transparency": {
        populate: ["photo1", "photo2", "transparency_list"],
      },

      "sections.section-opinion": true,
      "sections.section-steps": { populate: ["image", "steps"] },
      "sections.section-price": { populate: ["prices"] },
      "sections.section-faq": { populate: ["questions"] },
      "sections.section-contact": {
        populate: ["form_settings"],
      },
      "sections.section-form": {
        populate: ["form_settings"],
      },
    },
  },
};
const HEADER_POPULATE = {
  header_data: {
    populate: {
      logo: true,
      menu: true,
    },
  },
};

const FOOTER_POPULATE = {
  footer_data: true,
};
export async function fetchStrapi(path: string, locale: string) {
  const combinedPopulate = {
    ...DYNAMIC_ZONE_POPULATE,
    ...HEADER_POPULATE,
    ...FOOTER_POPULATE,
  };

  const query = qs.stringify(
    {
      locale: locale,
      populate: combinedPopulate,
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "repeat",
    }
  );
  const url = `${STRAPI_URL}/api/${path}?${query}`;

  // console.log("Strapi Fetch URL:", url);

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();

  if (!res.ok || !json.data) {
    console.error("Strapi fetch failed:", json);
    throw new Error(
      `Failed to fetch Strapi data from ${url}. Status: ${
        res.status
      }. Details: ${JSON.stringify(json.error || "No error details")}`
    );
  }
  return json.data;
}

export async function getLandingPage(locale: string) {
  const data = await fetchStrapi("landing-page", locale);

  if (!data) {
    // Повертаємо обидва поля як null/порожній масив у разі помилки
    return { headerData: null, footerData: null, blocks: [] };
  }

  // ✅ Витягуємо дані хедера
  const headerData = data.header_data || null;

  // Витягуємо блоки
  const blocks = data.Content_Blocks || [];
  const footerData = data.footer_data || null;
  return {
    headerData,
    footerData,
    blocks: blocks,
  };
}
export async function getAvailableLocales(): Promise<{ code: string }[]> {
  const url = `${STRAPI_URL}/api/i18n/locales`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Кешуємо на годину
    const json = await res.json();

    if (!res.ok || !Array.isArray(json)) {
      console.error("Failed to fetch locales from Strapi:", json);
      // Повертаємо дефолтні локалі у випадку помилки
      return [{ code: "pl" }];
    }

    // Припускаємо, що API повертає масив об'єктів { id: 1, name: 'Ukrainian', code: 'uk', ... }
    // Ми повертаємо масив, де кожен елемент має 'code'
    return json.map((locale) => ({ code: locale.code })); // <-- Тут ми використовуємо 'code'
  } catch (error) {
    console.error("Error fetching locales:", error);
    // Повертаємо дефолтні локалі у випадку помилки
    return [{ code: "pl" }]; // <-- Тут також повертаємо 'code', а не 'lang'
  }
}
