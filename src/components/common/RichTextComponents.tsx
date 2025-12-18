// src/components/common/RichTextComponents.tsx (ОСТАТОЧНА, НАЙБІЛЬШ СТІЙКА ВЕРСІЯ З ВИРІШЕННЯМ КОНФЛІКТУ ТИПІВ)

import React from "react";
import {
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";

// === ТИПІЗАЦІЯ ДЛЯ НАШОЇ CUSTOM ANNOTATION 'highlight' ===
// Визначаємо структуру, яку очікуємо отримати від Sanity
interface CustomMarkFields {
  mark: {
    _type: "highlight";
    // Робимо color опціональним, щоб уникнути runtime-збоїв,
    // якщо контент-менеджер не обрав колір.
    color?: "text-primary" | "text-secondary";
    [key: string]: any;
  };
}

// Визначаємо тип обробника, який будемо використовувати
type HighlightComponentProps = PortableTextMarkComponentProps<any> &
  CustomMarkFields;

// === ОБРОБНИКИ ДЛЯ MARKERS (РОЗМІТКИ) ===
const customMarks = {
  highlight: ({ children, mark }: HighlightComponentProps) => {
    const colorClass = mark?.color || "text-secondary";

    return <span className={colorClass}>{children}</span>;
  },

  link: ({ children, value }) => {
    const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
    return (
      <a href={value.href} rel={rel} className="link-standard">
        {children}
      </a>
    );
  },
} as PortableTextComponents["marks"];

// === ГОЛОВНИЙ ОБ'ЄКТ КОМПОНЕНТІВ ===
export const RICH_TEXT_COMPONENTS: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },

  marks: customMarks,
  types: {},
};
