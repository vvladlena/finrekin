// src/components/common/ContactForm/ContactForm.tsx
"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// Припускаємо, що цей шлях коректний
import styles from "@/app/styles/components/ContactForm.module.scss";

// --- Типізація (залишаємо як було) ---
interface ContactFormProps {
  mode?: "static" | "modal";
  isOpen?: boolean;
  onClose?: () => void;
  variant?: "default" | "comment" | "customBg";
  bgColor?: string;

  formTitle?: string;
  namePlaceholder?: string;
  commentPlaceholder?: string;
  buttonText?: string;
}

// --- Компонент ContactForm ---
export default function ContactForm({
  mode = "static",
  isOpen = true,
  onClose,
  variant = "default",
  bgColor,

  // Деструктуризація пропсів з дефолтними значеннями
  formTitle = "Zostaw prośbę",
  namePlaceholder = "Jak mam się do ciebie zwracać?",
  commentPlaceholder = "Napisz, w jakiej sprawie możemy Ci pomóc",
  buttonText = "Uzyskaj poradę",
}: ContactFormProps) {
  // ✅ НОВІ СТАНИ ДЛЯ ПОЛІВ ФОРМИ
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState(""); // Використовує PhoneInput

  // ✅ СТАН ДЛЯ ОБРОБКИ ЗАПИТУ
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const isSubmitting = status === "loading";

  if (mode === "modal" && !isOpen) return null;

  // ✅ АСИНХРОННА ФУНКЦІЯ ОБРОБКИ ВІДПРАВКИ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return; // Запобігання подвійній відправці

    setStatus("loading");

    const dataToSend = {
      name: name,
      phone: phone,
      message: message,
    };

    try {
      const response = await fetch("/api/contact", {
        // Шлях до вашого API Route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Перевірка, чи відповідав API Route успішно
      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          setStatus("success");
          // Очищення форми
          setName("");
          setMessage("");
          setPhone("");
        } else {
          // Це помилка від API, наприклад, проблема з Telegram-токеном
          setStatus("error");
          console.error("Telegram API Route error:", result.message);
        }
      } else {
        // Це помилка мережі або помилка сервера (500)
        setStatus("error");
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Fetch error during form submission:", error);
      setStatus("error");
    }
  };

  // Допоміжна функція для динамічного тексту кнопки
  const getButtonContent = () => {
    switch (status) {
      case "loading":
        return "Wysyłanie...";
      case "success":
        return "Wysłano!";
      case "error":
        return "Błąd, spróbuj ponownie";
      default:
        return buttonText;
    }
  };

  // --- Рендер компонента ---
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

        <h2 className={styles.contactForm__title}>{formTitle}</h2>

        <form className={styles.contactForm__body} onSubmit={handleSubmit}>
          <div className={styles.contactForm__group}>
            {/* Поле Ім'я */}
            <input
              type="text"
              name="name"
              className={styles.contactForm__input}
              placeholder={namePlaceholder}
              required
              value={name} // ✅ Прив'язка стану
              onChange={(e) => setName(e.target.value)} // ✅ Обробник змін
            />

            {/* Поле Телефон */}
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

          {/* Поле Повідомлення (textarea) */}
          {variant !== "default" && (
            <textarea
              name="message" // Додано name
              className={styles.contactForm__textarea}
              placeholder={commentPlaceholder}
              value={message} // ✅ Прив'язка стану
              onChange={(e) => setMessage(e.target.value)} // ✅ Обробник змін
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

          {/* Кнопка відправки */}
          <button
            type="submit"
            className={styles.contactForm__submit}
            disabled={isSubmitting || status === "success"} // ✅ Блокування
          >
            {getButtonContent()}
          </button>

          {/* Повідомлення про статус */}
          {status === "success" && (
            <p
              className={`${styles.contactForm__status} ${styles.contactForm__status_success}`}
            >
              Dziękujemy! Dane wysłane pomyślnie.
            </p>
          )}
          {status === "error" && (
            <p
              className={`${styles.contactForm__status} ${styles.contactForm__status_error}`}
            >
              Niestety, wystąpił błąd podczas wysyłania. Spróbuj ponownie.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
