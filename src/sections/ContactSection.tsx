"use client";

import ContactForm from "@/components/common/ContactForm/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/imageUtils";
import { ContactSectionData, FormFieldsData } from "@/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity"; // ✅ Додаємо імпорт для Sanity зображень

interface ContactSectionProps {
  data: ContactSectionData;
  formFields: FormFieldsData;
}

export default function ContactSection({
  data,
  formFields,
}: ContactSectionProps) {
  const { lang } = useLanguage();

  if (!data) return null;

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="standard-content">
            <div className="section-title">
              <Image
                src="/images/icons/arrows.svg"
                alt="arrows"
                width={20}
                height={20}
              />
              {/* ✅ Безпечне звернення до перекладу */}
              <p>{data.sectionTitle?.[lang]}</p>
            </div>

            <div className="phone-wrapper">
              <a href={`tel:${data.phone}`} className="contact-link">
                {data.phone}
              </a>
            </div>

            <div className="link-wrapper">
              <a
                href={data.addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <p>{data.addressLine1?.[lang]}</p>
                <p>{data.addressLine2?.[lang]}</p>
              </a>
            </div>

            <a href={`mailto:${data.email}`} className="contact-link">
              {data.email}
            </a>

            <div className="link-wrapper">
              <ul className="social-links">
                {/* ✅ Додано ?. перед map для безпеки */}
                {data.socials?.map((social) => {
                  // ✅ ОБЧИСЛЮЄМО SRC: Sanity asset -> mockPath -> null
                  const socialIconSrc = social.icon?.asset
                    ? urlFor(social.icon).url()
                    : social.icon?.mockPath || null;

                  return (
                    <li key={social._key}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="nofollow noopener"
                        className="contact-link"
                      >
                        {/* ✅ РЕНДЕРИМО Image ТІЛЬКИ ЯКЩО Є SRC */}
                        {socialIconSrc ? (
                          <Image
                            src={socialIconSrc}
                            alt="social icon"
                            width={32}
                            height={32}
                          />
                        ) : (
                          /* Заглушка, якщо іконку не додано */
                          <span style={{ fontSize: "12px" }}>Link</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <ContactForm
            formData={formFields}
            mode="static"
            variant="customBg"
            bgColor="#f9fafb"
          />
        </div>
      </div>
    </section>
  );
}
