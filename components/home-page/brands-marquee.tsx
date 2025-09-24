import Image from "next/image";
import morning from "@/public/assets/morningstar-icon.svg";
import journal from "@/public/assets/insider-icon.svg";
import benzinga from "@/public/assets/benziga.svg";
import fox from "@/public/assets/fox-icon.svg";
import insider from "@/public/assets/insider-icon.svg";
import canadian from "@/public/assets/canadian-icon.svg";

export default function BrandsMarquee() {
  const logos = [
    { src: morning, alt: "morning", className: "w-auto md:h-[24px] h-[13px]" },
    { src: journal, alt: "journal", className: "w-auto md:h-[24px] h-[16px]" },
    { src: benzinga, alt: "benzinga", className: "w-auto md:h-[24px] h-[16px]" },
    { src: fox, alt: "fox", className: "w-auto md:h-[24px] h-[16px]" },
    { src: insider, alt: "insider", className: "w-auto md:h-[24px] h-[16px]" },
    { src: canadian, alt: "canadian", className: "w-auto md:min-h-[24px] min-h-[16px] object-cover" },
  ];

  const renderLoop = (repeat: number) =>
    Array.from({ length: repeat }).map((_, loopIndex) => (
      <>
        {logos.map(({ src, alt, className }) => (
          <Image
            key={`${alt}-${loopIndex}`}
            src={src}
            alt={alt}
            width={100}
            height={100}
            className={className}
          />
        ))}
      </>
    ));

  return (
    <div className="relative z-50 mt-3 lg:mt-12 overflow-hidden">
        <div className="h-20 w-26 bg-black rounded-full -left-5 absolute top-1/2 -translate-y-1/2 blur-md opacity-80 z-[9999] lg:block hidden"></div>
        <div className="h-20 w-26 bg-black rounded-full -right-5 absolute top-1/2 -translate-y-1/2 blur-2xl lg:blur-md opacity-80 z-[9999] lg:block hidden"></div>
      <div className="brands-marquee-container">
        <div className="flex items-center gap-10">
          {renderLoop(3)}
        </div>
      </div>
    </div>
  );
}
