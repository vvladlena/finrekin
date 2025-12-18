// delete_conflict.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "3r7lt5i2",
  dataset: "production",
  apiVersion: "2025-12-13",
  token:
    "sk9jmsh15SPf1dqcG2ymRmPrzrwwSqRcBYjgHaoOB8a7P2bVfe46RMl6Qt3HRGwxcy7xcyXoSbSsAhjixO7OsabpeO0FdqoNNTjQ0vfO3DZ2tRvaIqnvfStukDJQmRs3sr3xZ7LR0HiFJO3qxvblAEgf6WvKFR80l9MyhKwbIVvYIS3yC8oy",
  useCdn: false,
});

async function deleteConflictingDoc() {
  const conflictingId = "landingPage-content"; // ID, який викликає помилку
  try {
    const result = await client.delete(conflictingId);
    console.log(`✅ Документ "${conflictingId}" успішно видалено.`);
  } catch (err) {
    // Якщо його вже немає, це також успіх
    if (err.statusCode === 404) {
      console.log(`✅ Документ "${conflictingId}" вже був відсутній.`);
    } else {
      console.error(
        `❌ Помилка видалення документа "${conflictingId}":`,
        err.message
      );
    }
  }
}

deleteConflictingDoc();
