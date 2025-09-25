"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import Image from "next/image";
import { useState } from "react";
import Glow from "../common/glow";
import {
  TITAN_LEFT_CARDS,
  TITAN_MIDDLE_CARD,
  TITAN_RIGHT_CARDS,
  type TitanCardConfig,
} from "@/constants/homepage";

type TitanCard = TitanCardConfig;

function TitanTile({ title, img, tall = false }: TitanCard & { tall?: boolean }) {
  const [hover, setHover] = useState(false);
  const content = (
    <div
      className={`${tall ? "w-full h-[480px] md:h-[656px]" : "w-full h-[220px] md:h-[313px]"} relative`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <>
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-30 h-[6px] w-[110%] bg-white" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-30 h-[6px] w-[110%] bg-white" />
        </>
      )}

      <div className={`absolute inset-0 overflow-hidden border-[6px] ${hover ? "border-white" : "border-none"}`}>
        {!tall && <div className="absolute inset-0 gradient-dark z-0" />}
        {hover && <div className="absolute inset-0 gradient-primary z-5" />}
        <div className="absolute inset-0 z-10">
          <Image src={img} alt={title} fill priority className="object-cover" />
        </div>
        <div className={`absolute top-0 left-0 z-20 ${tall ? "px-[20px] py-[24px]" : "p-[24px]"}`}>
          <h3 className="font-romanica uppercase text-white font-regular md:text-[22px] text-[22px]">{title}</h3>
        </div>
      </div>
    </div>
  );
  return content;
}

export default function TitanTraderSection() {
  return (
    <div className="font-creato-display py-30">
      <Container>
        <div className="relative">
          <SectionHeader
            title="Trade Like a TitaN"
            text="Powerful tools and a battle-tested system."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-[30px] items-stretch">
            <div className="flex flex-col gap-[30px] w-full">
              {TITAN_LEFT_CARDS.map((c) => (
                <TitanTile key={c.title} title={c.title} img={c.img} />
              ))}
            </div>
            <div className="flex justify-center w-full">
              <TitanTile title={TITAN_MIDDLE_CARD.title} img={TITAN_MIDDLE_CARD.img} tall />
            </div>
            <div className="flex flex-col gap-[30px] w-full">
              {TITAN_RIGHT_CARDS.map((c) => (
                <TitanTile key={c.title} title={c.title} img={c.img} />
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center -z-10">
            <Glow width={2000} height={1200} opacity={0.55} shape="farthest-side" blur={100} zIndex={-10} />
          </div>
        </div>
      </Container>
    </div>
  );
}
