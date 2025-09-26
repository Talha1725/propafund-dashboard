import Image from "next/image";
import morning from "@/public/images/morningstar-icon.svg";
import journal from "@/public/images/journal-icon.svg";
import benzinga from "@/public/images/benziga.svg";
import fox from "@/public/images/fox-icon.svg";
import insider from "@/public/images/insider-icon.svg";
import canadian from "@/public/images/canadian-icon.png";

const brands = [
  { src: morning, alt: "morning", className: "w-auto md:h-[24px] h-[13px]" },
  { src: journal, alt: "journal", className: "w-auto md:h-[24px] h-[16px]" },
  { src: benzinga, alt: "benzinga", className: "w-auto md:h-[24px] h-[16px]" },
  { src: fox, alt: "fox", className: "w-auto md:h-[24px] h-[16px]" },
  { src: insider, alt: "insider", className: "w-auto md:h-[24px] h-[16px]" },
  { src: canadian, alt: "canadian", className: "w-auto md:min-h-[24px] min-h-[16px] object-cover" },
];

export default function BrandsMarquee() {
  return (
    <div className="relative z-50 mt-3 lg:mt-12 overflow-hidden">
      <div className="h-20 w-26 bg-black rounded-full -left-5 absolute top-1/2 -translate-y-1/2 blur-md opacity-80 z-[9999] lg:block hidden"></div>
      <div className="h-20 w-26 bg-black rounded-full -right-5 absolute top-1/2 -translate-y-1/2 blur-2xl lg:blur-md opacity-80 z-[9999] lg:block hidden"></div>
      
      <div className="brands-marquee-container">
        <div className="flex items-center gap-10">
          {/* Render brands multiple times for seamless loop */}
          {Array.from({ length: 8 }, (_, setIndex) =>
            brands.map((brand, brandIndex) => (
              <Image
                key={`${setIndex}-${brandIndex}`}
                src={brand.src}
                alt={brand.alt}
                width={100}
                height={100}
                className={brand.className}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
