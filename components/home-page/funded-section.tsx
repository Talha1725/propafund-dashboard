"use client";

import Image from "next/image";
import Container from "../common/container";
import SectionHeader from "../common/section-header";
import Frame from "../common/frame";
import { useState } from "react";
import coins from "@/public/assets/coins.svg";

export default function FundedSection() {
  const [hover, setHover] = useState<string>("card2");
  return (
    <div className="font-creato-display py-30">
      <Container>
        <SectionHeader
          title="From Citizen to Funded Hero"
          text="Our streamlined process transforms skilled traders into funded warriors."
        />

        <div className="grid grid-cols-3 gap-14 mt-15">
          <Frame variants={hover === "card1" ? "white" : "none"}>
            <div
              onMouseEnter={() => setHover("card1")}
              onMouseLeave={() => setHover("")}
              className={`p-4 border border-white/10 h-[313px] flex flex-col justify-end items-center transition-all duration-300 ease-in-out ${
                hover === "card1" ? "gradient-primary" : "gradient-dark"
              }`}
            >
              <Image src={coins} alt="price-stone" className="w-full h-full bg-no-repeat object-cover" />
              <h1 className="font-romanica text-xl uppercase">
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
          <Frame variants={hover === "card2" ? "white" : "none"}>
            <div
              onMouseEnter={() => setHover("card2")}
              onMouseLeave={() => setHover("")}
              className={`p-4 border border-white/10 h-[313px] flex flex-col justify-end items-center transition-all duration-300 ease-in-out ${
                hover === "card2" ? "gradient-primary" : "gradient-dark"
              }`}
            >
                            <Image src={coins} alt="price-stone" className="w-full h-full bg-no-repeat object-cover" />

              <h1 className="font-romanica text-xl uppercase">
                Prove Your Discipline{" "}
              </h1>
              <p
                className={`text-center mt-2 md:w-[70%] mx-auto ${
                  hover === "card1" ? "text-white" : "text-white/30"
                }`}
              >
                Trade responsibly, hit targets, and follow the rules.{" "}
              </p>
            </div>
          </Frame>
          <Frame variants={hover === "card3" ? "white" : "none"}>
            <div
              onMouseEnter={() => setHover("card3")}
              onMouseLeave={() => setHover("")}
              className={`p-4 border border-white/10 h-[313px] flex flex-col justify-end items-center transition-all duration-300 ease-in-out ${
                hover === "card3" ? "gradient-primary" : "gradient-dark"
              }`}
            >
              <Image src={coins} alt="price-stone" className="w-full h-full bg-no-repeat object-cover" />
              <h1 className="font-romanica text-xl uppercase">Get Funded </h1>
              <p
                className={`text-center mt-2 md:w-[70%] mx-auto ${
                  hover === "card1" ? "text-white" : "text-white/30"
                }`}
              >
                Receive capital and earn real profits with zero risk.{" "}
              </p>
            </div>
          </Frame>
        </div>
      </Container>
    </div>
  );
}
