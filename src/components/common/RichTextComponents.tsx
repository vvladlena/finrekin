import React from "react";
import {
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";

interface HighlightValue {
  _type: "highlight";
  color?: "text-primary" | "text-secondary";
}

const customMarks: PortableTextComponents["marks"] = {
  highlight: ({
    children,
    value,
  }: PortableTextMarkComponentProps<HighlightValue>) => {
    // У нових версіях PortableText дані лежать у 'value', а не в 'mark'
    const colorClass = value?.color || "text-secondary";
    return <span className={colorClass}>{children}</span>;
  },

  link: ({
    children,
    value,
  }: PortableTextMarkComponentProps<{ href: string }>) => {
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
