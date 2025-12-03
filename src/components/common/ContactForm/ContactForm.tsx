"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "@/app/styles/components/ContactForm.module.scss";

interface ContactFormProps {
  mode?: "static" | "modal";
  isOpen?: boolean; // тільки для modal
  onClose?: () => void; // тільки для modal
  variant?: "default" | "comment" | "customBg";
  bgColor?: string;
}

export default function ContactForm({
  mode = "static",
  isOpen = true,
  onClose,
  variant = "default",
  bgColor,
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  if (mode === "modal" && !isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div
      className={mode === "modal" ? styles.overlay : undefined}
      onClick={mode === "modal" ? onClose : undefined}
    >
      <div
        className={`${styles.contactForm} ${
          variant === "customBg" ? styles.contactForm__customBg : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        style={
          variant === "customBg" ? { backgroundColor: bgColor } : undefined
        }
      >
        {mode === "modal" && (
          <button className={styles.contactForm__close} onClick={onClose}>
            ×
          </button>
        )}

        <h2 className={styles.contactForm__title}>Zostaw prośbę</h2>

        <form className={styles.contactForm__body} onSubmit={handleSubmit}>
          <div className={styles.contactForm__group}>
            <input
              type="text"
              name="name"
              className={styles.contactForm__input}
              placeholder="Jak mam się do ciebie zwracać?"
              required
            />

            {/* Телефон */}
            <div className={styles.phoneWrapper}>
              <PhoneInput
                country={"pl"}
                value={phone}
                onChange={setPhone}
                enableSearch={true}
                inputClass={styles.contactForm__input}
                inputProps={{ name: "phone", required: true }}
              />
            </div>
          </div>

          {variant !== "default" && (
            <textarea
              className={styles.contactForm__textarea}
              placeholder="Napisz, w jakiej sprawie możemy Ci pomóc"
            />
          )}

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
            Uzyskaj poradę
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
