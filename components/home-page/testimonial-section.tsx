"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import Image from "next/image";
import trustPilotLogo from "@/public/assets/trustpilot.svg";
import trustAdvisorLogo from "@/public/assets/trust-advisor.svg";
import savingTradersLogo from "@/public/assets/saving-traders.svg";
import { TESTIMONIALS, QUESTION_CLASS } from "@/constants/homepage";
import Frame from "../common/frame";
import * as React from "react";
import Glow from "../common/glow";
import { Button } from "../ui/button";


export default function TestimonialSection() {
  const defaultIndex = 1;
  const [active, setActive] = React.useState<number>(defaultIndex);
  const logos = [
    { src: trustPilotLogo, alt: "trustpilot-logo" },
    { src: trustAdvisorLogo, alt: "trustadvisor-logo" },
    { src: savingTradersLogo, alt: "savingtraders-logo" },
  ];
  return (
    <div className="relative font-creato-display py-17 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2">
          <Glow width={1600} height={1000} opacity={0.35} />
        </div>
        <div className="absolute -bottom-1/3 left-1/2 -translate-x-1/2">
          <Glow width={1600} height={1000} opacity={0.3} />
        </div>
      </div>
      <Container>
        <SectionHeader
          title="Voices of Victory"
          text="Read what our funded traders have to say."
        />
        <div className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pb-10">
          {TESTIMONIALS.map(({ quote, author }, idx) => {
            const isActive = active === idx;
            const orderClass = isActive
              ? "md:order-2"
              : idx < active
              ? "md:order-1"
              : "md:order-3";
            const overlapClass = isActive
              ? ""
              : idx < active
              ? "md:-mr-8"
              : "md:-ml-8";
            return (
            <div
              key={idx}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(defaultIndex)}
              className={`relative z-10 flex transition-transform duration-300 ${orderClass} ${overlapClass} ${
                isActive ? "z-20" : "z-0 md:scale-[0.98] md:-translate-y-1"
              }`}
            >
              <div className="relative w-full">
                {isActive ? (
                  <Frame variants="white">
                    <div className="p-8 text-center  gradient-primary text-white">
                      <p className={QUESTION_CLASS || "font-romanica uppercase font-regular text-[22px] md:text-2xl leading-snug"}>
                        {quote}
                      </p>
                      <p className="mt-6 text-[16px] creato-display font-regular text-white/90">{author}</p>
                    </div>
                  </Frame>
                ) : (
                  <div className="relative h-full p-8 text-center text-white/90 shadow-lg" style={{ background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)" }}>
                    <p className={QUESTION_CLASS || "font-romanica uppercase text-xl md:text-2xl leading-snug"}>
                      {quote}
                    </p>
                    <p className="mt-6 text-sm text-white/50">{author}</p>
                  </div>
                )}
              </div>
            </div>
          );})}
        </div>
        <div className="gradient-border-top-white">
            <div className="p-5 sm:grid grid-cols-3 gap-2 sm:gap-0">
              {logos.map(({ src, alt }, i) => (
                <Image
                  key={alt}
                  src={src}
                  alt={alt}
                  width={100}
                  height={100}
                  className="w-full h-auto z-[9999] relative"
                />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded</Button>
            </div>
          </div>
      </Container>
    </div>
  );
}
