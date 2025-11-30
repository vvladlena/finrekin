// src/sections/ContactFormSection.tsx
"use client";

import ContactForm from "@/components/common/ContactForm/ContactForm";
import { marked } from "marked";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

// Тип для компонента Form (для тексту форми)
type RawFormSettings = {
  id: number;
  title?: string; // Заголовок форми
  short_field?: string; // Плейсхолдер імені
  long_field?: string; // Плейсхолдер коментаря
  button?: string; // Текст кнопки
};

// Тип для нової секції "Section Form" (ОНОВЛЕНО)
type RawContactFormSection = {
  id: number;
  __component: string;
  mainTitle?: string;
  title?: string;
  description?: string;
  phone?: string;
  telegram_link?: string;
  instagram_link?: string;
  // ✅ НОВЕ: Компонент налаштувань форми
  form_settings?: RawFormSettings;
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---

// Тип для статичних соціальних посилань
type ProcessedSocialItem = {
  id: number;
  iconSrc: string;
  link: string;
  ariaLabel: string;
};

// ОНОВЛЕНО: Додано пропси форми
type ProcessedContactFormData = {
  mainTitle: string;
  titleHtml: string;
  description: string;
  phone: string;
  phoneLink: string;
  socialsLinks: ProcessedSocialItem[];
  // ✅ НОВЕ: Пропси для ContactForm
  formProps: {
    title?: string;
    namePlaceholder?: string;
    commentPlaceholder?: string;
    buttonText?: string;
  };
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapContactFormData(
  rawData: RawContactFormSection
): ProcessedContactFormData {
  // ✅ ВИДОБУВАЄМО НАЛАШТУВАННЯ ФОРМИ
  const formSettings = rawData.form_settings;

  const socialsLinks: ProcessedSocialItem[] = [
    {
      id: 1,
      iconSrc: "/images/icons/telegram.svg",
      link: rawData.telegram_link || "",
      ariaLabel: "Telegram",
    },
    {
      id: 2,
      iconSrc: "/images/icons/instagram.svg",
      link: rawData.instagram_link || "",
      ariaLabel: "Instagram",
    },
  ].filter((item) => item.link);

  const titleHtml = marked.parse(rawData.title || "") as string;

  const telLink = rawData.phone
    ? `tel:${rawData.phone.replace(/\s/g, "")}`
    : "#";

  return {
    mainTitle: rawData.mainTitle || "Skontaktuj się z nami",
    titleHtml: titleHtml,
    description:
      rawData.description ||
      "Zostaw swoje dane kontaktowe, a my skontaktujemy się z Tobą w celu przeprowadzenia bezpłatnej konsultacji",
    phone: rawData.phone || "+48 608 771 993",
    phoneLink: telLink,
    socialsLinks: socialsLinks,
    // ✅ НОВЕ: Мапуємо пропси форми
    formProps: {
      title: formSettings?.title,
      namePlaceholder: formSettings?.short_field,
      commentPlaceholder: formSettings?.long_field,
      buttonText: formSettings?.button,
    },
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---

type ContactFormSectionProps = {
  data: RawContactFormSection | null;
};

export default function ContactFormSection({
  data: rawData,
}: ContactFormSectionProps) {
  if (!rawData) {
    return null;
  }

  const data = mapContactFormData(rawData);

  // Використовуємо div, оскільки marked.parse генерує <p> або інші теги
  const titleContent = data.titleHtml.startsWith("<p>")
    ? data.titleHtml.substring(3, data.titleHtml.length - 5)
    : data.titleHtml;

  return (
    <section className="contact-form-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-text">
            {/* Main Title (Skontaktuj się z nami) */}
            {data.mainTitle && (
              <div className="section-title">
                <img src="/images/icons/arrows.svg" alt="section arrows" />
                <p>{data.mainTitle}</p>
              </div>
            )}

            <div className="standard-content">
              {/* Title (Markdown) */}
              {data.titleHtml && (
                <h2
                  className="standard-title"
                  dangerouslySetInnerHTML={{ __html: titleContent }}
                />
              )}

              {/* Description */}
              {data.description && (
                <p className="text-standard">{data.description}</p>
              )}

              <div className="social-wrapper">
                {/* Соціальні мережі */}
                {data.socialsLinks.length > 0 && (
                  <ul className="socialLinks" aria-label="Social media links">
                    {data.socialsLinks.map((social) => (
                      <li key={social.id}>
                        <a
                          href={social.link}
                          target="_blank"
                          rel="nofollow noopener"
                          aria-label={social.ariaLabel}
                        >
                          <img src={social.iconSrc} alt={social.ariaLabel} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Телефон */}
                {data.phone && (
                  <div className="phone-wrapper">
                    <a href={data.phoneLink} className="phone-number">
                      {data.phone}
                    </a>
                    {/* Примітка: Час роботи (10:00 do 17:00) є статичним, оскільки його немає у Strapi */}
                    <p>• 10:00 do 17:00</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ✅ ФОРМА: ТЕПЕР ВИКОРИСТОВУЄ ДИНАМІЧНІ ПРОПСИ ЗІ STRAPI */}
          <ContactForm
            isOpen={true}
            onClose={() => {}}
            variant="comment"
            formTitle={data.formProps.title}
            namePlaceholder={data.formProps.namePlaceholder}
            commentPlaceholder={data.formProps.commentPlaceholder}
            buttonText={data.formProps.buttonText}
          />
        </div>
      </div>
    </section>
  );
}
