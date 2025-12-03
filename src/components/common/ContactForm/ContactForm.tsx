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

// ✅ ОГОЛОШЕННЯ СТАНУ НА ВЕРХНЬОМУ РІВНІ
type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({
  mode = "static",
  isOpen = true,
  onClose,
  variant = "default",
  bgColor,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState(""); // Використовує PhoneInput
  const [status, setStatus] = useState<Status>("idle");

  // Видаляємо isSubmitted і використовуємо status === "success"

  const isSubmitting = status === "loading";

  if (mode === "modal" && !isOpen) return null;

  // ✅ АСИНХРОННА ФУНКЦІЯ ОБРОБКИ ВІДПРАВКИ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Запобігаємо стандартній відправці форми

    if (isSubmitting) return; // Запобігання подвійній відправці

    // ✅ ДОДАТКОВА ПЕРЕВІРКА: чи користувач дійсно ввів дані?
    if (!name || !phone) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const dataToSend = {
      name: name,
      phone: phone,
      message: message, // Поле message буде порожнім, якщо воно не відображається
    };

    try {
      // ✅ Змінюємо шлях, щоб він відповідав стандартній практиці (наприклад, /api/telegram)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();

        // Перевірка, чи API Route повернув успішний результат
        if (result.success) {
          setStatus("success");
          // Очищення форми
          setName("");
          setMessage("");
          setPhone("");
          // Якщо потрібно закрити модалку після успіху: onClose?.();
        } else {
          // Помилка від API Route (наприклад, Telegram Bot API повернув помилку)
          setStatus("error");
          console.error(
            "Telegram API Route error:",
            result.message || "Unknown error"
          );
        }
      } else {
        // Помилка мережі або помилка сервера (4xx/5xx)
        setStatus("error");
        console.error("HTTP error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Fetch error during form submission:", error);
      setStatus("error");
    }
  };

  // Допоміжна функція для динамічного тексту кнопки
  const getButtonContent = (defaultText: string) => {
    switch (status) {
      case "loading":
        return "Wysyłanie...";
      case "success":
        return "Wysłano!";
      case "error":
        return "Błąd, spróbuj ponownie";
      default:
        return defaultText;
    }
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
            {/* ✅ ПРИВ'ЯЗКА ПОЛЯ NAME ДО СТАНУ */}
            <input
              type="text"
              name="name"
              className={styles.contactForm__input}
              placeholder="Jak mam się do ciebie zwracać?"
              required
              value={name} // ✅ VALUE
              onChange={(e) => setName(e.target.value)} // ✅ ONCHANGE
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
            // ✅ ПРИВ'ЯЗКА ПОЛЯ MESSAGE ДО СТАНУ
            <textarea
              className={styles.contactForm__textarea}
              placeholder="Napisz, w jakiej sprawie możemy Ci pomóc"
              value={message} // ✅ VALUE
              onChange={(e) => setMessage(e.target.value)} // ✅ ONCHANGE
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

          <button
            type="submit"
            className={styles.contactForm__submit}
            disabled={isSubmitting} // Запобігаємо повторній відправці під час "loading"
          >
            {getButtonContent("Uzyskaj poradę")}
          </button>

          {/* ✅ ВИКОРИСТАННЯ НОВОГО СТАТУСУ */}
          {status === "success" && (
            <p className={styles.contactForm__success}>
              Dziękujemy! Dane wysłane pomyślnie.
            </p>
          )}

          {status === "error" && (
            <p className={styles.contactForm__error}>
              Wystąpił błąd. Proszę spróbować ponownie później.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
