"use client";

import Image from "next/image";
import { useState } from "react";
import { PortableText } from "@portabletext/react";
import ContactForm from "@/components/common/ContactForm/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { urlFor } from "@/lib/sanity";
import { HeroData, FormFieldsData } from "@/types";

interface HeroProps {
  heroData: HeroData;
  formFields: FormFieldsData;
}

export default function Hero({ heroData, formFields }: HeroProps) {
  const { lang } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!heroData || !heroData.title?.[lang]) {
    return null;
  }

  const handleClick = () => setIsFormOpen(true);

  return (
    <section className="hero">
      <div className="container">
        <div className="section-wrapper">
          <h1 className="hero-title text-primary">
            <PortableText
              value={heroData.title[lang]}
              components={RICH_TEXT_COMPONENTS}
            />
          </h1>

          <div className="description-wrapper">
            <p className="description-txt">{heroData.subtitle?.[lang]}</p>
            <button className="btn-primary" onClick={handleClick}>
              {heroData.buttonText?.[lang]}
              <Image
                src="/images/icons/arrows.svg"
                alt="arrows"
                width={20}
                height={20}
                className="btn-icon"
              />
            </button>
          </div>
        </div>

        <div className="hero-image">
          {/* ✅ Використовуємо Sanity URL або fallback */}
          <Image
            src={
              heroData.image?.asset
                ? urlFor(heroData.image).url()
                : "/images/hero-fallback.png"
            }
            alt="Hero image"
            width={900}
            height={600}
            priority
            sizes="100vw"
          />
        </div>

        <ul className="hero-list">
          {heroData.services?.map((service, idx) => {
            const isModalService = idx === 2;
            const serviceIcon = service.icon?.asset
              ? urlFor(service.icon).url()
              : service.icon?.mockPath || "/images/icons/service-fallback.svg";

            return (
              <li
                key={service._key || idx}
                className={`hero-item${isModalService ? " invert" : ""}`}
              >
                <Image
                  src={serviceIcon}
                  alt={service.title?.[lang] || "service icon"}
                  width={50}
                  height={50}
                  className="service-icon"
                />
                <h3 className="hero-service">{service.title?.[lang]}</h3>

                {isModalService ? (
                  <>
                    <button
                      className="btn-secondary btn-secondary--invert"
                      onClick={handleClick}
                    >
                      {service.buttonText?.[lang]}
                    </button>
                    <ContactForm
                      formData={formFields}
                      mode="modal"
                      isOpen={isFormOpen}
                      onClose={() => setIsFormOpen(false)}
                      variant="comment"
                    />
                  </>
                ) : (
                  <a href="#services" className="btn-secondary">
                    {service.buttonText?.[lang]}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
