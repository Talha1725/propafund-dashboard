import Image from "next/image";
import morning from "@/public/images/morningstar-icon.svg";
import journal from "@/public/images/journal-icon.svg";
import benzinga from "@/public/images/benziga.svg";
import fox from "@/public/images/fox-icon.svg";
import insider from "@/public/images/insider-icon.svg";
import canadian from "@/public/images/canadian-icon.png";

export default function BrandsMarquee() {
  return (
    <div className="relative z-50 mt-3 lg:mt-12 overflow-hidden">
        <div className="h-20 w-26 bg-black rounded-full -left-5 absolute top-1/2 -translate-y-1/2 blur-md opacity-80 z-[9999] lg:block hidden"></div>
        <div className="h-20 w-26 bg-black rounded-full -right-5 absolute top-1/2 -translate-y-1/2 blur-2xl lg:blur-md opacity-80 z-[9999] lg:block hidden"></div>
      <div className="brands-marquee-container">
        <div className="flex items-center gap-10">
          <Image src={morning} alt="morning" width={100} height={100} className="w-auto md:h-[24px] h-[13px]" />
          <Image src={journal} alt="journal" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={benzinga} alt="benzinga" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={fox} alt="fox" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={insider} alt="insider" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={canadian} alt="canadian" width={100} height={100} className="w-auto md:min-h-[24px] min-h-[16px] object-cover" />
          {/* Duplicate for seamless loop */}
          <Image src={morning} alt="morning" width={100} height={100} className="w-auto md:h-[24px] h-[13px]" />
          <Image src={journal} alt="journal" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={benzinga} alt="benzinga" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={fox} alt="fox" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={insider} alt="insider" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={canadian} alt="canadian" width={100} height={100} className="w-auto md:min-h-[24px] min-h-[16px] object-cover" />
          {/* Duplicate for seamless loop */}
          <Image src={morning} alt="morning" width={100} height={100} className="w-auto md:h-[24px] h-[13px]" />
          <Image src={journal} alt="journal" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={benzinga} alt="benzinga" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={fox} alt="fox" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={insider} alt="insider" width={100} height={100} className="w-auto md:h-[24px] h-[16px]" />
          <Image src={canadian} alt="canadian" width={100} height={100} className="w-auto md:min-h-[24px] min-h-[16px] object-cover" />
        </div>
      </div>
    </div>
  );
}
