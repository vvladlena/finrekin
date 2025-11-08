"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Jakiego rodzaju usługi księgowe świadczysz?",
    answer:
      "Świadczymy pełen zakres usług księgowych dla firm. Szczegółową listę można znaleźć tutaj.",
  },
  {
    question: "Czy możliwa jest praca zdalna?",
    answer:
      "Tak, możesz w pełni współpracować z nami online - wszystkie procesy są organizowane zdalnie.",
  },
  {
    question: "Czy pomagacie w rejestracji firmy w Polsce?",
    answer:
      "Tak, pomagamy w rejestracji działalności gospodarczej w Polsce - zarówno jednoosobowej działalności gospodarczej, jak i różnych form spółek (w tym sp. z o.o., komandytowa i inne). Towarzyszymy w procesie od przygotowania dokumentów do uzyskania NIP, REGON i KRS (jeśli są wymagane).",
  },
  {
    question: "Jakie dokumenty są potrzebne do założenia firmy?",
    answer:
      "Lista dokumentów zależy od formy działalności i sytuacji. Możesz umówić się na bezpłatną konsultację.",
  },
  {
    question: "Czy można otworzyć firmę w Polsce bez polskiego obywatelstwa?",
    answer:
      "Tak, cudzoziemcy mogą otworzyć spółkę w Polsce - zarówno jednoosobową działalność gospodarczą, jak i osobę prawną. Możesz umówić się na bezpłatną konsultację.",
  },
  {
    question: "Jak przekazać dokumenty do działu księgowości?",
    answer:
      "Pracujemy za pośrednictwem wygodnego systemu SaldeoSmart - wystarczy zrobić zdjęcie lub zeskanować dokumenty i przesłać je za pośrednictwem aplikacji lub interfejsu internetowego.",
  },
  {
    question: "Ile kosztują usługi?",
    answer:
      "Koszt zależy od formy działalności i ilości pracy. Więcej informacji można znaleźć tutaj.",
  },
  {
    question: "Jak zawrzeć umowę o świadczenie usług księgowych?",
    answer:
      "Umowę możesz zawrzeć online lub w naszym biurze - jak wolisz. My wszystko przygotujemy.",
  },
  {
    question: "Czy można zmienić księgowego w firmie?",
    answer:
      "Tak, możesz przejść do nas w dowolnym momencie. Pomożemy w prawidłowym przeniesieniu dokumentów i zapewnimy płynne przejście bez przerwy w opiece.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // коли відкрито — ставимо maxHeight = scrollHeight, інакше = 0
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
      el.style.marginTop = "0.8rem";
    } else {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
      el.style.marginTop = "0";
    }
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

      <div
        className="faq-answer"
        ref={contentRef}
        // не рендеримо умовно — елемент завжди в DOM
        aria-hidden={!isOpen}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-title">
          <img src="/images/icons/arrows.svg" alt="section arrows" />
          <p>FAQ</p>
        </div>

        <h2 className="standard-title" style={{ marginBottom: 40 }}>
          Częste pytania
        </h2>

        <div className="faq-grid">
          {faqs.map((item, index) => (
            <AccordionItem
              key={index}
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
