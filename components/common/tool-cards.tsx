"use client";

import Image, { StaticImageData } from "next/image";
import Glow from "./glow";
import { Button } from "../ui/button";
import { IconPosition, IconType, ToolCardsProps } from "@/types/common";
import { useState } from "react";

function Card({
  title,
  content,
  image,
  icon,
  blobClass,
  imageWrapperClass,
  iconPosition = "bottom-left",
  iconType = "icon",
  buttonText = "Contact",
}: {
  title: string;
  content: string;
  image: StaticImageData;
  icon?: StaticImageData;
  blobClass?: string;
  imageWrapperClass?: string;
  iconPosition?: IconPosition;
  iconType?: IconType;
  buttonText?: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="border border-[#FFFFFF1A] relative w-full !p-0 flex-col flex justify-between transition-all duration-300 ease-in-out"
      style={{ background: hover ? "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)" : "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <>
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-30 h-[3px] w-[110%] bg-white" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-30 h-[3px] w-[110%] bg-white" />
          <div className="pointer-events-none absolute left-0 h-full z-30 w-[6px] bg-white" />
          <div className="pointer-events-none absolute right-0 h-full z-30 w-[6px] bg-white" />
        </>
      )}
      
      <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center">
        <Glow width={800} height={500} opacity={0.25} />
      </div>
      {hover && <div className="absolute inset-0 gradient-primary z-5" />}
      {blobClass && <div className={blobClass}></div>}

      <div className="pt-4 px-4 pb-0 relative z-10">
        <h1 className="md:text-[22px] font-lay-grotesk text-white z-50">{title}</h1>
        <p className={`h-fit mb-2 font-lay-grotesk mt-1 z-50 md:text-[16px] text-[16px] lg:w-[90%] transition-colors duration-300 ${hover ? 'text-white' : 'text-white/50'}`}>{content}</p>

        {iconPosition === "below-text" && iconType === "icon" && icon && (
          <div className="mt-3 w-[39px]">
            <Image src={icon} alt="tool-icon" width={100} height={100} className="w-full z-50 relative" />
          </div>
        )}
        {iconPosition === "below-text" && iconType === "button" && (
          <div className=" translate-x-2 flex">
          <Button>{buttonText}</Button>
        </div>  
        )}
      </div>

      {iconPosition === "bottom-left" && icon && (
        <div className="w-[39px] absolute bottom-[10px] left-[10px] z-10">
          <Image src={icon} alt="tool-icon" width={100} height={100} className="w-full z-50 relative" />
        </div>
      )}

      {iconPosition === "below-text" ? (
        <div className={`${imageWrapperClass ?? ""} relative z-10 -mt-4`}>
          <Image src={image} alt="card-image" width={100} height={100} className="w-full z-50 relative" />
        </div>
      ) : (
        <div className={`${imageWrapperClass ?? ""} relative z-10`}>
          <Image src={image} alt="card-image" width={100} height={100} className="w-full z-50 relative" />
        </div>
      )}
    </div>
  );
}

export default function ToolCards({
  title1, title2, title3,
  content1, content2, content3,
  image1, image2, image3,
  icon1, icon2, icon3,
  iconPosition = "bottom-left",
  iconType = "icon",
  buttonText1 = "Contact", buttonText2 = "Contact", buttonText3 = "Contact",
  blobClasses = ["", "", ""],
  imageWrapperClasses = ["", "", ""],
  className = "",
}: ToolCardsProps) {
  return (
    <div className={`w-full grid md:grid-cols-3 gap-10 relative mt-5 sm:mt-15 ${className}`}>
      <Card title={title1} content={content1} image={image1} icon={icon1} blobClass={blobClasses[0]} imageWrapperClass={imageWrapperClasses[0]} iconPosition={iconPosition} iconType={iconType} buttonText={buttonText1} />
      <Card title={title2} content={content2} image={image2} icon={icon2} blobClass={blobClasses[1]} imageWrapperClass={imageWrapperClasses[1]} iconPosition={iconPosition} iconType={iconType} buttonText={buttonText2} />
      <Card title={title3} content={content3} image={image3} icon={icon3} blobClass={blobClasses[2]} imageWrapperClass={imageWrapperClasses[2]} iconPosition={iconPosition} iconType={iconType} buttonText={buttonText3} />
    </div>
  );
}


