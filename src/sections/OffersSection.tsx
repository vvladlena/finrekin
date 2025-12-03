"use client";

import { useState } from "react";
import Image from "next/image";
import ContactForm from "@/components/common/ContactForm/ContactForm";

const offers = [
  {
    id: 1,
    title: "Dla nowych klientów oferujemy atrakcyjne zniżki!",
    image: "/images/offer-1.png",
    icon: "/images/icons/offer.svg",
    buttonText: "Zostaw prośbę →",
    bg: "/images/background/offer-bg-1.png",
  },
  {
    id: 2,
    title:
      "Poleć nasze usługi księgowe swoim przyjaciołom i znajomym, a otrzymasz atrakcyjne bonusy",
    image: "/images/offer-2.png",
    icon: "/images/icons/offer.svg",
    buttonText: "Zostaw prośbę →",
    bg: "/images/background/offer-bg-2.png",
  },
  {
    id: 3,
    title: "Zniżki i bonusy dla stałych klientów",
    image: "/images/offer-3.png",
    icon: "/images/icons/offer.svg",
    buttonText: "Zostaw prośbę →",
    bg: "/images/background/offer-bg-3.png",
  },
];

export default function OffersSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
            <h2 className="standard-title">
              <span className="text-secondary">Aktualne oferty</span> dla
              naszych klientów
            </h2>
            <p className="text-standard">
              Skontaktuj się z nami, aby uzyskać więcej informacji!
            </p>
            <button className="btn-bold" onClick={handleOpenForm}>
              Zostaw prośbę
            </button>
          </div>

          {/* Карточки пропозицій */}
          {offers.map((offer) => (
            <div
              className="offer-card"
              style={{ backgroundImage: `url(${offer.bg})` }}
              key={offer.id}
            >
              <div className="offer-content">
                <Image
                  src={offer.icon}
                  alt="icon"
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
                  {offer.buttonText}
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
