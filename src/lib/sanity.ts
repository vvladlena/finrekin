import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "3r7lt5i2", // беремо з sanity.json
  dataset: "production",
  apiVersion: "2023-03-01", // поточна дата або остання стабільна
  useCdn: true, // швидке читання, без приватних даних
});
// Функція для генерації URL для зображень
const builder = createImageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
