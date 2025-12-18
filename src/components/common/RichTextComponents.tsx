import React from "react";
import {
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";

// Визначаємо інтерфейси, що розширюють базовий тип Sanity
interface HighlightValue {
  _type: "highlight";
  color?: "text-primary" | "text-secondary";
}

interface LinkValue {
  _type: "link";
  href: string;
}

const customMarks: PortableTextComponents["marks"] = {
  highlight: ({
    children,
    value,
  }: PortableTextMarkComponentProps<HighlightValue>) => {
    const colorClass = value?.color || "text-secondary";
    return <span className={colorClass}>{children}</span>;
  },

  link: ({ children, value }: PortableTextMarkComponentProps<LinkValue>) => {
    const href = value?.href || "";
    const isExternal = !href.startsWith("/");

    return (
      <a
        href={href}
        rel={isExternal ? "noreferrer noopener" : undefined}
        target={isExternal ? "_blank" : undefined}
        className="link-standard"
      >
        {children}
      </a>
    );
  },
};

export const RICH_TEXT_COMPONENTS: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: customMarks,
};
