import morning from "@/public/images/morningstar-icon.svg";
import journal from "@/public/images/journal-icon.svg";
import benzinga from "@/public/images/benziga.svg";
import fox from "@/public/images/fox-icon.svg";
import insider from "@/public/images/insider-icon.svg";
import canadian from "@/public/images/canadian-icon.png";

export interface BrandItem {
  src: any;
  alt: string;
  className: string;
}

export const BRANDS: BrandItem[] = [
  { src: morning, alt: "morning", className: "w-auto md:h-[24px] h-[13px]" },
  { src: journal, alt: "journal", className: "w-auto md:h-[24px] h-[16px]" },
  { src: benzinga, alt: "benzinga", className: "w-auto md:h-[24px] h-[16px]" },
  { src: fox, alt: "fox", className: "w-auto md:h-[24px] h-[16px]" },
  { src: insider, alt: "insider", className: "w-auto md:h-[24px] h-[16px]" },
  { src: canadian, alt: "canadian", className: "w-auto md:min-h-[24px] min-h-[16px] object-cover" },
];
