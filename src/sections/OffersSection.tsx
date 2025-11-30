// src/sections/OffersSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import ContactForm from "@/components/common/ContactForm/ContactForm";
import { STRAPI_URL } from "@/lib/strapi-utils";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

type StrapiImageRelation = {
  url?: string;
};

// 1. ОНОВЛЕНО: Тип для окремої пропозиції (з полями Strapi: image, button)
type RawOfferItem = {
  id: number;
  title?: string;
  image?: StrapiImageRelation; // Strapi: image (використовується як фон)
  button?: string; // Strapi: button
  selected?: boolean;
};

// 2. ОНОВЛЕНО: Тип для всієї секції (з полями Strapi: title, description, buttonText, oferty)
type RawOffersSection = {
  id: number;
  __component: string;
  title?: string; // Strapi: title (Rich Text)
  description?: string; // Strapi: description
  buttonText?: string; // Strapi: buttonText
  oferty?: RawOfferItem[]; // Strapi: oferty (Repeatable Component)
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ (Processed Data for Component) ---
type ProcessedOfferItem = {
  id: number;
  title: string;
  iconUrl: string; // Для статичної іконки
  buttonText: string;
  bgUrl: string; // Оброблене Strapi 'image'
};

type ProcessedOffersData = {
  mainTitle: string;
  mainSubtitle: string;
  mainButtonText: string;
  offers: ProcessedOfferItem[];
};

// --- ТИП ПРОПСІВ ---
type OffersSectionProps = {
  data: RawOffersSection | null;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

const mapStrapiUrl = (url: string | undefined, defaultPath: string): string => {
  if (!url) return defaultPath;
  // Припускаємо, що STRAPI_URL імпортовано з правильного шляху
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

function mapOffersData(rawData: RawOffersSection): ProcessedOffersData {
  // 3. ВИПРАВЛЕНО: Використовуємо rawData.oferty
  const offersList = (rawData.oferty || []).map((item) => {
    return {
      id: item.id,
      title: item.title || "Tytuł oferty",
      // Припускаємо, що іконка є статичною частиною дизайну
      iconUrl: "/images/icons/offer.svg",
      // ВИПРАВЛЕНО: Мапимо item.button
      buttonText: item.button || "Zostaw prośbę →",
      // ВИПРАВЛЕНО: Мапимо Strapi image до bgUrl
      bgUrl: mapStrapiUrl(
        item.image?.url,
        "/images/background/offer-bg-default.png"
      ),
    } as ProcessedOfferItem;
  });

  return {
    // ВИПРАВЛЕНО: Мапимо з коректних полів Strapi (title, description, buttonText)
    mainTitle: rawData.title || "Aktualne oferty",
    mainSubtitle:
      rawData.description ||
      "Skontaktuj się z nami, aby uzyskać więcej informacji!",
    mainButtonText: rawData.buttonText || "Zostaw prośbę",
    offers: offersList,
  };
}

// --- ОСНОВНИЙ КОМПОНЕНТ ---
export default function OffersSection({ data: rawData }: OffersSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!rawData) {
    return null;
  }

  const offersData = mapOffersData(rawData);
  const offers = offersData.offers;

  const handleOpenForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <section className="offers">
      <div className="container">
        <div className="offers-grid">
          {/* Основна пропозиція */}
          <div className="offer-content offer-content--main">
            <h2
              className="standard-title"
              // 4. ВИПРАВЛЕНО: Використовуємо dangerouslySetInnerHTML для Rich Text заголовка
              dangerouslySetInnerHTML={{ __html: offersData.mainTitle }}
            />
            <p className="text-standard">{offersData.mainSubtitle}</p>
            <button className="btn-bold" onClick={handleOpenForm}>
              {offersData.mainButtonText}
            </button>
          </div>

          {/* Карточки пропозицій */}
          {offers.map((offer) => (
            <div
              className="offer-card"
              // Використовуємо оброблену фонову картинку
              style={{ backgroundImage: `url(${offer.bgUrl})` }}
              key={offer.id}
            >
              <div className="offer-content">
                <Image
                  src={offer.iconUrl}
                  alt={offer.title} // Використовуємо title як alt
                  width={60}
                  height={60}
                  className="offer-icon"
                />
                <p className="offer-text">{offer.title}</p>
                <button
                  type="button"
                  className="btn-secondary btn-secondary--invert"
                  onClick={handleOpenForm}
                >
                  {offer.buttonText} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальне вікно з формою */}
      <ContactForm
        mode="modal"
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        variant="comment"
      />
    </section>
  );
}
