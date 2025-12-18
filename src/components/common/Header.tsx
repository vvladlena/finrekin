"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/components/Header.module.scss";
import ContactForm from "@/components/common/ContactForm/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { FormFieldsData } from "@/types";
import { urlFor } from "@/lib/sanity";

interface HeaderProps {
  data: any;
  formFields: FormFieldsData;
}

const emptySubscribe = () => () => {};

// ✅ 1. Виносимо компонент за межі Header
const SocialLinks = ({ socials }: { socials: any[] }) => {
  if (!socials || socials.length === 0) return null;

  return (
    <ul className={styles.socialLinks} aria-label="Social media links">
      {socials.map((social: any, index: number) => (
        <li key={index}>
          <a
            href={social.url}
            target="_blank"
            rel="nofollow noopener"
            aria-label={social.name}
          >
            {social.icon ? (
              <Image
                src={urlFor(social.icon).url()}
                alt={social.name}
                width={28}
                height={28}
                className={styles.socialIcon}
              />
            ) : (
              <span>{social.name}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default function Header({ data, formFields }: HeaderProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { lang, setLang } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const getT = (field: any) => {
    if (!isMounted) return "";
    return field?.[lang] || field?.pl || "";
  };

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang as any);
    setIsLangMenuOpen(false);
  };

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
              <a href={data?.addressUrl} className={styles.contact}>
                {`Wrocław, ${getT(data?.addressLine1).split(" lok.")[0]}`}
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
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
                    className={`${styles.langOption} ${isMounted && lang.toUpperCase() === l ? styles.activeLang : ""}`}
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
        <div className={styles.navMobileLinks}>
          <Link href="#services" onClick={() => setIsMobileMenuOpen(false)}>
            {getT(data?.navServices)}
          </Link>
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>
            {getT(data?.navAbout)}
          </Link>
          <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            {getT(data?.navContact)}
          </Link>
        </div>

        <div className={styles.mobileAddress}>
          <a
            href={
              data?.addressUrl ||
              "https://www.google.com/maps/search/?api=1&query=Wrocław+ul.+Parkowa+25"
            }
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contact}
          >
            {/* Виводимо Місто, потім Вулицю */}
            {`Wrocław, ${getT(data?.addressLine1)}`}
          </a>
          <p className={styles.linkSmall}>{getT(data?.mapLabel)}</p>

          {/* ✅ 2. Передаємо дані в пропсу */}
          <SocialLinks socials={data?.socials} />
        </div>
      </nav>
    </header>
  );
}
