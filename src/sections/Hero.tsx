// src/components/Hero/Hero.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/common/ContactForm/ContactForm";
import { ServiceItem, mapServiceItem, STRAPI_URL } from "@/lib/strapi-utils";
import Link from "next/link";
type RawHeroSection = {
  id: number;
  __component: string;
  title?: string;
  description?: string;
  buttonText?: string;
  background?: { url?: string };
  uslugi?: any[]; // Сирий масив, який ми обробляємо нижче
};

// 💡 ТИП, який компонент буде використовувати після обробки
export type ProcessedHeroData = {
  title: string;
  description: string;
  buttonText: string;
  backgroundUrl: string;
  services: ServiceItem[];
};

type HeroProps = {
  hero: RawHeroSection | null;
};
function mapHeroData(rawHero: RawHeroSection): ProcessedHeroData {
  let backgroundUrl = "/images/hero-img.png";
  if (rawHero.background?.url) {
    const url = rawHero.background.url;
    backgroundUrl = url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
  }

  const servicesList = (rawHero.uslugi || []).map(mapServiceItem);

  return {
    title: rawHero.title || "",
    description: rawHero.description || "",
    buttonText: rawHero.buttonText || "",
    backgroundUrl,
    services: servicesList,
  };
}

export default function Hero({ hero: rawHero }: HeroProps) {
  // Перейменовуємо для ясності
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!rawHero) {
    return (
      <section className="hero">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }
  const hero = mapHeroData(rawHero);
  const title = hero.title.trim();
  const description = hero.description.trim();
  const buttonText = hero.buttonText.trim();
  const backgroundUrl = hero.backgroundUrl;
  const services = hero.services;

  return (
    <section className="hero">
      <div className="container">
        <div className="section-wrapper">
          <h1
            className="hero-title text-primary"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="description-wrapper">
            <p
              className="description-txt"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
              {buttonText}
              <Image
                src="/images/icons/arrows.svg"
                alt="strzałki"
                width={20}
                height={20}
                className="btn-icon"
              />
            </button>
          </div>
        </div>

        <div className="hero-image">
          <Image
            src={backgroundUrl}
            alt="hero image"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <ul className="hero-list">
          {services.map((item) => (
            <li
              key={item.id}
              className={`hero-item ${item.isSelected ? "invert" : ""}`}
            >
              <Image
                src={item.image.url}
                alt={item.image.alt}
                width={50}
                height={50}
                className="service-icon"
              />
              <h3 className="hero-service">{item.title}</h3>
              {item.isSelected ? (
                // Кнопка форми
                <button
                  className="btn-secondary btn-secondary--invert"
                  onClick={() => setIsFormOpen(true)}
                >
                  {item.buttonText} →
                </button>
              ) : (
                // Звичайне посилання
                // <a href="#{item.link} " className="btn-secondary">
                //   {item.buttonText} →
                // </a>
                <Link href="#services" className="btn-secondary" scroll={true}>
                  {item.buttonText} →
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ContactForm
          mode="modal"
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          variant="comment"
        />
      </div>
    </section>
  );
}
