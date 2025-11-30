// src/sections/ContactSection.tsx
"use client";

import ContactForm from "@/components/common/ContactForm/ContactForm";
import { STRAPI_URL } from "@/lib/strapi-utils";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

// Тип для компонента Form (для тексту)
type RawFormSettings = {
  id: number;
  title?: string; // Заголовок форми
  short_field?: string; // Плейсхолдер імені
  long_field?: string; // Плейсхолдер коментаря
  button?: string; // Текст кнопки
};

// Тип для всієї секції Contact (ОНОВЛЕНО)
type RawContactSection = {
  id: number;
  __component: string;
  mainTitle?: string; // Text: 'Kontakt'
  phone?: string; // Text
  addres?: string; // Text
  mail?: string; // Text

  // ✅ Поля для посилань:
  instagram_link?: string; // URL Instagram
  telegram_link?: string; // URL Telegram
  // Примітка: додайте тут будь-які інші поля, як-от facebook_link, якщо вони є у Strapi.

  form_settings?: RawFormSettings;
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---

// ✅ Тип для статичних соціальних посилань
type ProcessedSocialItem = {
  id: number;
  iconSrc: string; // Статичний шлях до іконки в проекті
  link: string; // Динамічний URL зі Strapi
  ariaLabel: string;
};

type ProcessedContactData = {
  mainTitle: string;
  phone: string;
  address: string;
  mail: string;

  // ✅ Масив оброблених соціальних посилань
  socialsLinks: ProcessedSocialItem[];

  // Пропси форми
  formProps: {
    title?: string;
    namePlaceholder?: string;
    commentPlaceholder?: string;
    buttonText?: string;
  };
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapContactData(rawData: RawContactSection): ProcessedContactData {
  const formSettings = rawData.form_settings;

  // ✅ СТВОРЕННЯ МАСИВУ СТАТИЧНИХ ІКОНОК З ДИНАМІЧНИМИ ПОСИЛАННЯМИ
  const socialsLinks: ProcessedSocialItem[] = [
    {
      id: 1,
      iconSrc: "/images/icons/instagram-blue.svg",
      link: rawData.instagram_link || "",
      ariaLabel: "Instagram",
    },
    {
      id: 2,
      iconSrc: "/images/icons/telegram-blue.svg",
      link: rawData.telegram_link || "",
      ariaLabel: "Telegram",
    },
    // Додайте інші статичні іконки тут:
    // { id: 3, iconSrc: "/images/icons/facebook.svg", link: rawData.facebook_link || "", ariaLabel: "Facebook" },
  ].filter((item) => item.link); // Фільтруємо лише ті, де є посилання

  return {
    mainTitle: rawData.mainTitle || "",
    phone: rawData.phone || "",
    address: rawData.addres || "",
    mail: rawData.mail || "",

    socialsLinks: socialsLinks,

    formProps: {
      title: formSettings?.title || "Zostaw prośbę",
      namePlaceholder:
        formSettings?.short_field || "Jak mam się do ciebie zwracać?",
      commentPlaceholder:
        formSettings?.long_field || "Napisz, w jakiej sprawie możemy Ci pomóc",
      buttonText: formSettings?.button || "Uzyskaj poradę",
    },
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---

type ContactSectionProps = {
  data: RawContactSection | null;
};

export default function ContactSection({ data: rawData }: ContactSectionProps) {
  if (!rawData) {
    return null;
  }

  // 1. Мапуємо дані
  const data = mapContactData(rawData);

  // 2. Парсимо адресу для зручності
  const [addressLine1, addressLine2] = data.address
    .split(",")
    .map((s) => s.trim());

  // 3. Форматуємо телефон для посилання
  const telLink = data.phone ? `tel:${data.phone.replace(/\s/g, "")}` : "#";

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="standard-content">
            {/* Підзаголовок */}
            {data.mainTitle && (
              <div className="section-title">
                <img src="/images/icons/arrows.svg" alt="section arrows" />
                <p>{data.mainTitle}</p>
              </div>
            )}

            {/* Телефон */}
            {data.phone && (
              <div className="phone-wrapper">
                <a href={telLink} className="contact-link">
                  {data.phone}
                </a>
              </div>
            )}

            {/* Адреса */}
            {data.address && (
              <div className="link-wrapper">
                <a
                  href="https://www.google.com/maps/place/Wrocław,+Parkowa+25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  {addressLine1 && <p>{addressLine1}</p>}
                  {addressLine2 && <p>{addressLine2}</p>}
                </a>
              </div>
            )}

            {/* Email */}
            {data.mail && (
              <a href={`mailto:${data.mail}`} className="contact-link">
                {data.mail}
              </a>
            )}

            {/* Соціальні мережі */}
            {data.socialsLinks.length > 0 && ( // ✅ Рендеримо за наявності посилань
              <div className="link-wrapper">
                <ul className="social-links" aria-label="Social media links">
                  {data.socialsLinks.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="nofollow noopener"
                        aria-label={social.ariaLabel}
                        className="contact-link"
                      >
                        {/* ✅ СТАТИЧНА ІКОНКА */}
                        <img src={social.iconSrc} alt={social.ariaLabel} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ФОРМА КОНТАКТУ: Статичний стиль, динамічний текст */}
          <ContactForm
            isOpen={true}
            onClose={() => {}}
            mode="static"
            formTitle={data.formProps.title}
            namePlaceholder={data.formProps.namePlaceholder}
            commentPlaceholder={data.formProps.commentPlaceholder}
            buttonText={data.formProps.buttonText}
            variant="customBg" // Статичний стиль
            bgColor="#f9fafb" // Статичний стиль
          />
        </div>
      </div>
    </section>
  );
}
