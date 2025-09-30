import Image from "next/image";
import { BRANDS } from "@/constants/brands";

export default function BrandsMarquee() {
  return (
    <div className="relative z-50 mt-3 lg:mt-12 overflow-hidden">
      <div className="h-20 w-26 bg-black rounded-full -left-5 absolute top-1/2 -translate-y-1/2 blur-md opacity-80 z-[9999] lg:block hidden"></div>
      <div className="h-20 w-26 bg-black rounded-full -right-5 absolute top-1/2 -translate-y-1/2 blur-2xl lg:blur-md opacity-80 z-[9999] lg:block hidden"></div>
    
      <div className="brands-marquee-container">
        <div className="flex items-center gap-10">
          {Array.from({ length: 8 }, (_, setIndex) =>
            BRANDS.map((brand, brandIndex) => (
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
