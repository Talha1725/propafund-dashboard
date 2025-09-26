"use client";

import Container from "../common/container";
import Frame from "../common/frame";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROMO_OFFERS, type PromoOffer } from "@/constants/promos";
import Glow from "../common/glow";

export default function PromoOffersSection() {
  return (
    <div className="font-creato-display relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-0">
        <Glow width={2600} height={1800} opacity={0.75} shape="farthest-side" blur={120} />
      </div>
      <Container>
        <div className="flex flex-col gap-8 lg:gap-15">
          {PROMO_OFFERS.map((offer, index) => (
            <PromoOfferRow key={index} offer={offer} index={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}

function PromoOfferRow({ offer, index }: { offer: PromoOffer; index: number }) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [blockHeight, setBlockHeight] = useState<number>(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const update = () => setBlockHeight(el.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-15 items-stretch">
      <div className="order-2 lg:order-1 h-full">
        <Frame variants="white">
          <div ref={textRef} className="gradient-primary p-6 min-h-[200px] h-full flex flex-col gap-7 text-white">
            <h3 className="font-creato-display font-normal text-[20px] leading-[1] tracking-[0] uppercase">
              {offer.title}
            </h3>
            <p className="font-creato-display font-normal text-[16px] leading-[1.4] whitespace-pre-line">
              {offer.description}
            </p>
            <div className="flex justify-left">
              <Button variant="secondary" className="px-[30px] py-[12px] gap-[15px] max-w-full">Get Funded Now</Button>
            </div>
          </div>
        </Frame>
      </div>

      <div className="order-1 lg:order-2 h-full">
        <div className="relative w-full rounded-sm overflow-hidden" style={{ height: blockHeight || 300 }}>
          <Image
            src={offer.image}
            alt={`Promo offer ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      </div>
    </div>
  );
}
