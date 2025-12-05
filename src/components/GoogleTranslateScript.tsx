"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Додаємо Google Translate script
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.id = "google-translate-script";
    document.body.appendChild(script);

    // Створюємо глобальну функцію init
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "pl",
          includedLanguages: "pl,uk,en,ru",
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setLoaded(true);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;

    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      {/* Невидимий контейнер Google */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Наш dropdown */}
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-dropdown"
        disabled={!loaded}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontWeight: 600,
          fontSize: "0.9rem",
          cursor: loaded ? "pointer" : "not-allowed",
          padding: "6px 10px",
          appearance: "none", // прибирає стандартний стрілку у браузерах
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      >
        <option value="pl">PL</option>
        <option value="uk">UA</option>
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </>
  );
}
