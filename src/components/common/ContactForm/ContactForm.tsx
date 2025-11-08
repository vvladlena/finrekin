"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "@/app/styles/components/ContactForm.module.scss";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.contactForm} onClick={(e) => e.stopPropagation()}>
        <button className={styles.contactForm__close} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.contactForm__title}>Zarezerwuj połączenie</h2>

        <form className={styles.contactForm__body} onSubmit={handleSubmit}>
          <div className={styles.contactForm__group}>
            <input
              type="text"
              name="name"
              className={styles.contactForm__input}
              placeholder="Jak mam się do ciebie zwracać?"
              required
            />

            {/* Поле телефону */}
            <div className={styles.phoneWrapper}>
              <PhoneInput
                country={"pl"}
                value={phone}
                onChange={setPhone}
                enableSearch={true}
                inputClass={styles.contactForm__input} // стилі для самого інпуту
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                containerStyle={{ width: "100%", background: "none" }}
                buttonStyle={{
                  border: "none",
                  borderRadius: "8px 0 0 8px",
                  background: "rgba(255, 255, 255, 0.2)",
                  height: "40px",
                }}
                dropdownStyle={{
                  borderRadius: "8px",
                  maxHeight: "200px",
                }}
              />
            </div>
          </div>

          <label className={styles.contactForm__checkbox}>
            <input type="checkbox" name="privacy" required />
            <span>
              Kliknięcie przycisku oznacza akceptację{" "}
              <a href="/politika" target="_blank" rel="noreferrer noopener">
                polityki prywatności
              </a>
            </span>
          </label>

          <button type="submit" className={styles.contactForm__submit}>
            Wyślij zastosowanie
          </button>

          {isSubmitted && (
            <p className={styles.contactForm__success}>
              Dziękujemy! Dane wysłane pomyślnie.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
