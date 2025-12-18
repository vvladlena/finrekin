// src/lib/imageUtils.ts

// Припускаємо, що urlFor знаходиться тут:
import { urlFor } from "@/lib/sanity";

// 💡 Важливо: Вам може знадобитися визначити тип SanityImageSource,
// якщо ви використовуєте TypeScript і хочете суворо типізувати
type SanityImageSource = any;

/**
 * Отримує URL зображення, пріоритезуючи Sanity URL,
 * використовуючи Mock-шлях, якщо він є, або повертаючи fallback.
 * * @param img - Об'єкт зображення Sanity або об'єкт з mockPath.
 * @param fallback - Шлях до резервного зображення.
 * @returns Фінальний URL зображення.
 */
export const getImageUrl = (
  img: SanityImageSource,
  fallback: string
): string => {
  if (!img) return fallback;

  // 1. Сценарій Mock-даних
  if (img.mockPath) {
    return img.mockPath;
  }

  // 2. Сценарій Sanity (обробляємо лише якщо є ref)
  if (img.asset?._ref) {
    // ВАЖЛИВО: Переконайтеся, що urlFor коректно імпортовано з вашого Sanity-файлу
    // Ви можете додати .width().height() тут, якщо потрібна оптимізація розмірів
    try {
      const imageUrl = urlFor(img).url();
      return imageUrl || fallback;
    } catch (e) {
      console.error("Error generating Sanity URL, using fallback:", e);
      return fallback;
    }
  }

  // 3. Якщо це простий рядок (наприклад, /images/icon.svg)
  if (typeof img === "string") return img;

  return fallback;
};
