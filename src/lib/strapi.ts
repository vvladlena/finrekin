import "server-only";

export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchStrapi(path: string, locale: string) {
  const url = `${STRAPI_URL}/api/${path}?populate=*&locale=${locale}`;
  console.log("Fetching Strapi URL:", url); // <- дебаг
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    console.error("❌ Strapi error:", await res.text());
    return null;
  }

  const json = await res.json();
  console.log("Strapi response:", json);
  return json.data?.attributes || null;
}

export async function getHero(locale: string) {
  const data = await fetchStrapi("hero", locale);

  if (!data)
    return { title: "", description: "", buttonText: "", backgroundUrl: "" };

  return {
    title: data.title || "",
    description: data.description || "",
    buttonText: data.buttonText || "",
    backgroundUrl: data.background?.data?.attributes?.url || "",
  };
}
