import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// Функція читання та парсингу MarkDown
export function getStaticPageContent(fileName: string) {
  // Визначаємо шлях до папки 'src/data'
  const dataDir = path.join(process.cwd(), "src", "data");
  const fullPath = path.join(dataDir, fileName);

  // Якщо файл не існує (наприклад, під час збірки), повертаємо пустий об'єкт
  if (!fs.existsSync(fullPath)) {
    return { frontmatter: { title: "Error" }, content: "Файл не знайдено." };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Використовуємо 'marked' для конвертації MarkDown у HTML
  const htmlContent = marked(content);

  return {
    frontmatter: data,
    content: htmlContent,
  };
}
