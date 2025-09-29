"use client";

import Image from "next/image";
import Container from "../common/container";
import SectionHeader from "../common/section-header";
import Frame from "../common/frame";
import { useState } from "react";
import coins from "@/public/assets/coins.svg";
import marbleCoin from "@/public/assets/marble-money.svg";
import paperRoll from "@/public/assets/paper-roll.svg";
import { Button } from "../ui/button";
import Glow from "../common/glow";

export default function FundedSection() {
  const [hover, setHover] = useState<string>("card2");
  return (
    <div className="font-creato-display py-30">
      <Container>
      <div className="relative">
        <SectionHeader
          title="From Citizen to Funded Hero"
          text="Our streamlined process transforms skilled traders into funded warriors."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-14 mt-20 md:mt-15">
          <Frame variants={hover === "card1" ? "white" : "none"} edgesZIndex={5}>
            <div
              onMouseEnter={() => setHover("card1")}
              onMouseLeave={() => setHover("")}
              className={`p-4 border border-white/10 h-[240px] md:h-[313px] flex flex-col justify-end items-center transition-all duration-300 ease-in-out ${
                hover === "card1" ? "gradient-primary" : "gradient-dark"
              }`}
            >
              <Image src={marbleCoin} alt="price-stone" className="w-full h-full bg-no-repeat object-cover relative z-10" />
              <h1 className="font-romanica text-lg lg:text-xl uppercase text-center">
                Choose Your Challenge
              </h1>
              <p
                className={`text-center mt-2 md:w-[70%] mx-auto ${
                  hover === "card1" ? "text-white" : "text-white/30"
                }`}
              >
                Pick your funding level and start your journey.
              </p>
            </div>
          </Frame>
          <Frame variants={hover === "card2" ? "white" : "none"} edgesZIndex={5}>
            <div
              onMouseEnter={() => setHover("card2")}
              onMouseLeave={() => setHover("")}
              className={`p-4 border border-white/10 h-[240px] md:h-[313px] flex flex-col justify-end items-center transition-all duration-300 ease-in-out ${
                hover === "card2" ? "gradient-primary" : "gradient-dark"
              }`}
            >
              <Image src={paperRoll} alt="price-stone" className="w-full h-full bg-no-repeat object-cover relative z-10" />
              <h1 className="font-romanica text-lg lg:text-xl uppercase text-center">
                Prove Your Discipline{" "}
              </h1>
              <p
                className={`text-center mt-2 md:w-[70%] mx-auto ${
                  hover === "card2" ? "text-white" : "text-white/30"
                }`}
              >
                Trade responsibly, hit targets, and follow the rules.{" "}
              </p>
            </div>
          </Frame>
          <Frame variants={hover === "card3" ? "white" : "none"} edgesZIndex={5}>
            <div
              onMouseEnter={() => setHover("card3")}
              onMouseLeave={() => setHover("")}
              className={`p-4 border border-white/10 h-[240px] md:h-[313px] flex flex-col justify-end items-center transition-all duration-300 ease-in-out ${
                hover === "card3" ? "gradient-primary" : "gradient-dark"
              }`}
            >
              <Image src={coins} alt="price-stone" className="w-full h-full bg-no-repeat object-cover relative z-10" />
              <h1 className="font-romanica text-lg lg:text-xl uppercase text-center">Get Funded </h1>
              <p
                className={`text-center mt-2 md:w-[70%] mx-auto ${
                  hover === "card3" ? "text-white" : "text-white/30"
                }`}
              >
                Receive capital and earn real profits with zero risk.{" "}
              </p>
            </div>
          </Frame>
        </div>
        <div className="flex justify-center mt-15">
          <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded Now</Button>
        </div>  
        <div className="pointer-events-none absolute inset-x-0 -bottom-30 flex justify-center">
          <Glow width={2000} height={1200} opacity={0.55} shape="farthest-side" blur={100} />
        </div>
        </div>
      </Container>
    </div>
  );
}
