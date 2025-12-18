"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import ContactForm from "@/components/common/ContactForm/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { urlFor } from "@/lib/sanity";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { ContactData, SocialLink, FormFieldsData } from "@/types";

interface ContactFormSectionProps {
  data: ContactData;
  formFields: FormFieldsData; // ✅ Отримуємо тексти форми з глобальних налаштувань
}

export default function ContactFormSection({
  data,
  formFields,
}: ContactFormSectionProps) {
  const { lang } = useLanguage();

  if (!data || !data.mainTitle?.[lang]) {
    return null;
  }

  const {
    sectionTitle,
    mainTitle,
    mainDescription,
    phoneNumber,
    phoneText,
    socialLinks,
  } = data;

  return (
    <section className="contact-form-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-text">
            <div className="section-title">
              <Image
                src="/images/icons/arrows.svg"
                alt="icon"
                width={20}
                height={20}
              />
              <p>{sectionTitle?.[lang]}</p>
            </div>

            <div className="standard-content">
              <div className="standard-title">
                <PortableText
                  value={mainTitle[lang]}
                  components={RICH_TEXT_COMPONENTS}
                />
              </div>

              <p className="text-standard">{mainDescription?.[lang]}</p>

              <div className="social-wrapper">
                <ul className="socialLinks">
                  {socialLinks?.map((link: SocialLink) => {
                    const iconUrl = link.icon?.asset
                      ? urlFor(link.icon).url()
                      : "/images/icons/fallback-social.svg";

                    return (
                      <li key={link._key}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="nofollow noopener"
                        >
                          <Image
                            src={iconUrl}
                            alt={link.name || "social icon"}
                            width={24}
                            height={24}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className="phone-wrapper">
                  <a href={`tel:${phoneNumber}`} className="phone-number">
                    {phoneNumber}
                  </a>
                  {/* ✅ phoneText тепер рядок, React виведе його без помилок */}
                  <p>{phoneText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Використовуємо глобальні тексти форми */}
          <ContactForm formData={formFields} mode="static" variant="comment" />
        </div>
      </div>
    </section>
  );
}
