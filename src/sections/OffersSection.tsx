"use client";

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import ContactForm from "@/components/common/ContactForm/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { urlFor } from "@/lib/sanity";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { OffersSectionData, FormFieldsData } from "@/types";

interface OffersSectionProps {
  data: OffersSectionData;
  formFields: FormFieldsData;
}

export default function OffersSection({
  data,
  formFields,
}: OffersSectionProps) {
  const { lang } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!data || !data.offersList) return null;

  const handleOpenForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  const { mainTitle, mainSubtitle, mainButtonText, offersList } = data;

  return (
    <section className="offers">
      <div className="container">
        <div className="offers-grid">
          <div className="offer-content offer-content--main">
            <h2 className="standard-title">
              {mainTitle?.[lang] && (
                <PortableText
                  value={mainTitle[lang]}
                  components={RICH_TEXT_COMPONENTS}
                />
              )}
            </h2>
            <p className="text-standard">{mainSubtitle?.[lang]}</p>
            <button className="btn-bold" onClick={handleOpenForm}>
              {mainButtonText?.[lang]}
            </button>
          </div>

          {offersList.map((offer) => {
            const bgUrl = offer.bg?.asset
              ? urlFor(offer.bg).url()
              : offer.bg?.mockPath || null;

            const iconSrc = offer.icon?.asset
              ? urlFor(offer.icon).url()
              : offer.icon?.mockPath || "/images/icons/offer-fallback.svg";

            return (
              <div
                className="offer-card"
                style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : {}}
                key={offer._key}
              >
                <div className="offer-content">
                  {iconSrc && (
                    <Image
                      src={iconSrc}
                      alt={offer.title?.[lang] || "offer icon"}
                      width={60}
                      height={60}
                      className="offer-icon"
                    />
                  )}
                  <p className="offer-text">{offer.title?.[lang]}</p>
                  <button
                    type="button"
                    className="btn-secondary btn-secondary--invert"
                    onClick={handleOpenForm}
                  >
                    {offer.buttonText?.[lang]}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ContactForm
        formData={formFields}
        mode="modal"
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        variant="comment"
      />
    </section>
  );
}
