"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { FAQSectionData, FAQItem } from "@/types";

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { lang } = useLanguage();
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
      el.style.marginTop = "0.8rem";
    } else {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
      el.style.marginTop = "0";
    }
  }, [isOpen]);

  return (
    <div
      className={`faq-item ${isOpen ? "open" : ""}`}
      onClick={onToggle}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
    >
      <div className="faq-question">
        <span className="dot" />
        <h3>{item.question[lang]}</h3>
        <ChevronDown className={`icon ${isOpen ? "rotated" : ""}`} size={20} />
      </div>

      <div className="faq-answer" ref={contentRef} aria-hidden={!isOpen}>
        <div className="rich-text-wrapper">
          <PortableText
            value={item.answer[lang]}
            components={RICH_TEXT_COMPONENTS}
          />
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ data }: { data: FAQSectionData }) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data || !data.faqList) return null;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-title">
          <Image
            src="/images/icons/arrows.svg"
            alt="arrows"
            width={20}
            height={20}
          />
          <p>{data.sectionTitle?.[lang]}</p>
        </div>

        <h2 className="standard-title" style={{ marginBottom: 40 }}>
          {data.mainTitle?.[lang]}
        </h2>

        <div className="faq-grid">
          {data.faqList.map((item, index) => (
            <AccordionItem
              key={item._key || index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
