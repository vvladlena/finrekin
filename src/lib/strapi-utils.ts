// src/lib/strapi-utils.ts (НОВИЙ ФАЙЛ)

// Це публічний URL, він не є секретним
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// --- Типи для Спільних Компонентів ---
type StrapiImage = {
  url: string;
  alt: string;
};

export type ServiceItem = {
  id: number;
  title: string;
  image: StrapiImage;
  buttonText: string;
  isSelected: boolean;
};
type RawServiceItem = {
  id: number;
  title?: string;
  button?: string;
  selected?: boolean;
  image?: {
    url?: string;
    alternativeText?: string;
  };
};

// Функція мапування, що використовується в Hero.tsx
export function mapServiceItem(item: RawServiceItem): ServiceItem {
  let imageUrl = "/images/icons/default-service.svg";
  let imageAlt = "service icon";

  if (item.image?.url) {
    const url = item.image.url;
    imageUrl = url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
    imageAlt = item.image.alternativeText || item.title || imageAlt;
  }

  return {
    id: item.id,
    title: item.title || "",
    image: {
      url: imageUrl,
      alt: imageAlt,
    },
    buttonText: item.button || "Детальніше →",
    isSelected: item.selected || false,
  };
}
