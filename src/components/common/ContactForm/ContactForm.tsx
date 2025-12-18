"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "@/app/styles/components/ContactForm.module.scss";
import { useLanguage } from "@/context/LanguageContext";

interface ContactFormProps {
  formData: any; // Об'єкт formFieldsData
  mode?: "static" | "modal";
  isOpen?: boolean;
  onClose?: () => void;
  variant?: "default" | "comment" | "customBg";
  bgColor?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({
  formData,
  mode = "static",
  isOpen = true,
  onClose,
  variant = "default",
  bgColor,
}: ContactFormProps) {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (mode === "modal" && !isOpen) return null;
  if (!formData) return null;

  const isSubmitting = status === "loading";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setMessage("");
        setPhone("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div
      className={mode === "modal" ? styles.overlay : undefined}
      onClick={mode === "modal" ? onClose : undefined}
    >
      <div
        className={`${styles.contactForm} ${variant === "customBg" ? styles.contactForm__customBg : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={
          variant === "customBg" ? { backgroundColor: bgColor } : undefined
        }
      >
        <h2 className={styles.contactForm__title}>{formData.title[lang]}</h2>

        <form className={styles.contactForm__body} onSubmit={handleSubmit}>
          <div className={styles.contactForm__group}>
            <input
              type="text"
              className={styles.contactForm__input}
              placeholder={formData.namePlaceholder[lang]}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.phoneWrapper}>
              <PhoneInput
                country={"pl"}
                value={phone}
                onChange={setPhone}
                inputClass={styles.contactForm__input}
                inputProps={{ name: "phone", required: true }}
              />
            </div>
          </div>

          {variant !== "default" && (
            <textarea
              className={styles.contactForm__textarea}
              placeholder={formData.messagePlaceholder[lang]}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          )}

          <label className={styles.contactForm__checkbox}>
            <input type="checkbox" required />
            <span>
              {formData.privacyText[lang]}
              <a href="/privacy" target="_blank">
                {formData.privacyLink[lang]}
              </a>
            </span>
          </label>

          <button
            type="submit"
            className={styles.contactForm__submit}
            disabled={isSubmitting}
          >
            {status === "loading"
              ? formData.sendingText[lang]
              : status === "success"
                ? formData.successText[lang]
                : status === "error"
                  ? formData.errorText[lang]
                  : formData.submitButton[lang]}
          </button>

          {status === "success" && (
            <p className={styles.contactForm__success}>
              {formData.thankYouMessage[lang]}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
