"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/components/Header.module.scss";
import ContactForm from "@/components/common/ContactForm/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { FormFieldsData } from "@/types";

interface HeaderProps {
  data: any;
  formFields: FormFieldsData;
}

// Заглушка для підписки на зовнішнє сховище (необхідна для API)
const emptySubscribe = () => () => {};

export default function Header({ data, formFields }: HeaderProps) {
  // ✅ Професійний спосіб перевірки монтажу без useEffect/useState
  // Повертає false на сервері та true на клієнті після гідратації
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { lang, setLang } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Допоміжна функція для безпечного отримання текстів
  const getT = (field: any) => {
    if (!isMounted) return "";
    return field?.[lang] || field?.pl || "";
  };

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang as any);
    setIsLangMenuOpen(false);
  };

  // Блокування скролу
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="FinRekin"
            width={120}
            height={32}
            priority
          />
        </Link>

        <nav className={styles.navDesktop}>
          <Link href="#services">{getT(data?.navServices)}</Link>
          <Link href="#about">{getT(data?.navAbout)}</Link>
          <Link href="#contact">{getT(data?.navContact)}</Link>
        </nav>

        <div className={styles.rightSection}>
          <ul className={styles.contactList}>
            <li className={`${styles.contactItem} ${styles.addressItem}`}>
              <a
                href="https://www.google.com/maps/place/Wrocław,+Parkowa+25"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contact}
              >
                Wrocław, ul. Parkowa 25
              </a>
              <p className={styles.linkSmall}>{getT(data?.addressLabel)}</p>
            </li>

            <li className={styles.contactItem}>
              <a href={`tel:${data?.phone}`} className={styles.contact}>
                {data?.phone}
              </a>
              <button
                onClick={() => setIsContactOpen(true)}
                className={styles.linkSmall}
              >
                {getT(data?.contactButtonLabel)}
              </button>

              <ContactForm
                formData={formFields}
                isOpen={isContactOpen}
                mode="modal"
                onClose={() => setIsContactOpen(false)}
              />
            </li>
          </ul>

          <div className={styles.languageSwitcher}>
            <button
              onClick={() => setIsLangMenuOpen((prev) => !prev)}
              className={styles.langButton}
            >
              {isMounted ? lang.toUpperCase() : "..."}
              <svg
                className={`${styles.langArrow} ${isLangMenuOpen ? styles.arrowOpen : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className={styles.langMenu}>
                {["PL", "UA", "EN", "RU"].map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l.toLowerCase())}
                    className={`${styles.langOption} ${
                      isMounted && lang.toUpperCase() === l
                        ? styles.activeLang
                        : ""
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              className={styles.hamburgerIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.active : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <nav
        className={`${styles.navMobile} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        <Link href="#services" onClick={() => setIsMobileMenuOpen(false)}>
          {getT(data?.navServices)}
        </Link>
        <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>
          {getT(data?.navAbout)}
        </Link>
        <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
          {getT(data?.navContact)}
        </Link>

        <div className={styles.mobileAddress}>
          <a
            href={data?.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contact}
          >
            {getT(data?.addressLine1)}
          </a>
          <p className={styles.linkSmall}>{getT(data?.mapLabel)}</p>
        </div>
      </nav>
    </header>
  );
}
