"use client";
import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/common/ContactForm/ContactForm";

type HeroProps = {
  hero: {
    title: string;
    description: string;
    buttonText: string;
    backgroundUrl?: string;
  } | null;
};

export default function Hero({ hero }: HeroProps) {
  console.log("Hero props:", hero);
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!hero) {
    return (
      <section className="hero">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  const title = hero.title?.trim() || "";
  const description = hero.description?.trim() || "";
  const buttonText = hero.buttonText?.trim() || "";
  const backgroundUrl = hero.backgroundUrl || "/images/hero-img.png";

  return (
    <section className="hero">
      <div className="container">
        <div className="section-wrapper">
          <h1 className="hero-title text-primary">{title}</h1>
          <div className="description-wrapper">
            <p className="description-txt">{description}</p>
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
          <li className="hero-item">
            <Image
              src="/images/icons/service-1.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Księgowość</h3>
            <a href="#services" className="btn-secondary">
              Sprawdź koszt →
            </a>
          </li>
          <li className="hero-item">
            <Image
              src="/images/icons/service-2.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Legalizacja pobytu</h3>
            <a href="#services" className="btn-secondary">
              Sprawdź koszt →
            </a>
          </li>
          <li className="hero-item invert">
            <Image
              src="/images/icons/service-3.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Skontaktuj się z nami</h3>
            <button
              className="btn-secondary btn-secondary--invert"
              onClick={() => setIsFormOpen(true)}
            >
              Zostaw prośbę →
            </button>

            <ContactForm
              mode="modal"
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              variant="comment"
            />
          </li>
          <li className="hero-item">
            <Image
              src="/images/icons/service-4.svg"
              alt="service"
              width={50}
              height={50}
              className="service-icon"
            />
            <h3 className="hero-service">Usługi dodatkowe</h3>
            <a href="#services" className="btn-secondary">
              Sprawdź koszt →
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
