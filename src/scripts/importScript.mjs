// importScript.js
import "dotenv/config";
import { pageDataForSanity } from "../data/pageData.js";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN, // 👈 Секретний токен
  useCdn: false,
});

async function importPageData() {
  try {
    const doc = {
      _id: "landingPage-content", // Унікальний ID для документа всієї сторінки
      _type: "landingPage",
      ...pageDataForSanity, // Включає heroSection, offersSection, aboutSection
    };

    const result = await client.createOrReplace(doc);
    console.log("Page data successfully imported:", result._id);
  } catch (err) {
    console.error("Помилка імпорту:", err);
  }
}

importPageData();
