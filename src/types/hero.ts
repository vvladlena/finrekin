// types/hero.ts
import { PortableTextBlock } from "@portabletext/types";

export interface ServiceItem {
  title: Record<string, string>;
  icon: string;
  buttonText: Record<string, string>;
}

export interface HeroData {
  title: Record<string, PortableTextBlock[]>;
  subtitle: Record<string, string>;
  buttonText: Record<string, string>;
  image: string;
  services: ServiceItem[];
}
