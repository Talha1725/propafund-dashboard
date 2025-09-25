import { StaticImageData } from "next/image";

export interface HeroSectionProps {
  image?: StaticImageData;
  title?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  isHomepage?: boolean;
}
