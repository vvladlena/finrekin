// src/sections/FAQSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// --- ТИПИ СИРИХ ДАНИХ (Raw Data from Strapi) ---

// Repeatable Component: questions
type RawQuestionItem = {
  id: number;
  title?: string; // Запитання
  description?: string; // Відповідь
};

// Тип для всієї секції
type RawFAQSection = {
  id: number;
  __component: string;
  mainTitle?: string; // Text: 'FAQ'
  title?: string; // Text: 'Częste pytania'
  questions?: RawQuestionItem[]; // Масив запитань
};

// --- ТИПИ ОБРОБЛЕНИХ ДАНИХ ---
type ProcessedFAQItem = {
  id: number;
  question: string;
  answer: string;
};

type ProcessedFAQData = {
  mainTitle: string;
  title: string;
  faqs: ProcessedFAQItem[];
};

// --- ТИП ПРОПСІВ ---
type FAQSectionProps = {
  data: RawFAQSection | null;
};

// --- ФУНКЦІЯ МАПУВАННЯ ---

function mapFAQData(rawData: RawFAQSection): ProcessedFAQData {
  const faqsList = (rawData.questions || []).map((item) => {
    return {
      id: item.id,
      question: item.title || "Brak pytania",
      answer: item.description || "Brak odpowiedzi",
    } as ProcessedFAQItem;
  });

  // Немає статичних заглушок, якщо дані порожні - повертаємо порожній рядок
  const mainTitle = rawData.mainTitle || "";
  const title = rawData.title || "";

  return {
    mainTitle: mainTitle,
    title: title,
    faqs: faqsList,
  };
}

// --- КОМПОНЕНТ ACCORDION ITEM ---

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: ProcessedFAQItem; // Використовуємо динамічний тип
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Встановлюємо висоту залежно від стану
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
      el.style.marginTop = "0.8rem";
    } else {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
      el.style.marginTop = "0";
    }

    // Коригуємо maxHeight після завершення анімації
    const onTransitionEnd = () => {
      if (isOpen && el) {
        el.style.maxHeight = el.scrollHeight + "px";
      }
    };
    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [isOpen]);

  return (
    <div
      className={`faq-item ${isOpen ? "open" : ""}`}
      onClick={onToggle}
      ref={containerRef}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
    >
      <div className="faq-question">
        <span className="dot" />
        <h3>{item.question}</h3>
        <ChevronDown className={`icon ${isOpen ? "rotated" : ""}`} size={20} />
      </div>

      <div className="faq-answer" ref={contentRef} aria-hidden={!isOpen}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

// --- ОСНОВНИЙ КОМПОНЕНТ СЕКЦІЇ ---

export default function FAQSection({ data: rawData }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!rawData) {
    return null;
  }

  const data = mapFAQData(rawData);
  const faqs = data.faqs;

  // Не рендеримо, якщо немає заголовків і запитань
  if (!data.title && !data.mainTitle && faqs.length === 0) {
    return null;
  }

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <div className="container">
        {/* Main Title (FAQ) */}
        {data.mainTitle && (
          <div className="section-title">
            <img src="/images/icons/arrows.svg" alt="section arrows" />
            <p>{data.mainTitle}</p>
          </div>
        )}

        {/* Title (Częste pytania) */}
        {data.title && (
          <h2 className="standard-title" style={{ marginBottom: 40 }}>
            {data.title}
          </h2>
        )}

        {/* Динамічний список запитань */}
        <div className="faq-grid">
          {faqs.map((item, index) => (
            <AccordionItem
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
