"use client";

import Container from "../common/container";
import Frame from "../common/frame";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROMO_OFFERS, type PromoOffer } from "@/constants/promos";
import Glow from "../common/glow";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { promo } from "@/lib/api/endpoints/promo";
import type { PromoCardData } from "@/types/promo";

export default function PromoOffersSection() {
  const router = useRouter();
  const [promoOffers, setPromoOffers] = useState<PromoOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetFundedClick = (buttonLink?: string) => {
    if (buttonLink) {
      router.push(buttonLink);
    } else {
      router.push('/challenges');
    }
  };

  useEffect(() => {
    const fetchPromoOffers = async () => {
      try {
        const response = await promo.getActivePromoCards();
        if (response.success && response.data.length > 0) {
          const staticImages = ["/assets/chest-1.svg", "/assets/chest-2.svg", "/assets/chest-3.svg"];
          const mappedOffers = response.data.map((card: PromoCardData, index: number) => ({
            title: card.title,
            description: card.description,
            buttonText: card.buttonText,
            buttonLink: card.buttonLink,
            image: staticImages[index] || staticImages[0]
          }));
          setPromoOffers(mappedOffers);
        } else {
          setPromoOffers(PROMO_OFFERS);
        }
      } catch (error) {
        console.error('Error fetching promo offers:', error);
        setPromoOffers(PROMO_OFFERS);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoOffers();
  }, []);

  return (
    <div className="font-creato-display relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-0">
        <Glow width={2600} height={1800} opacity={0.75} shape="farthest-side" blur={120} />
      </div>
      <Container>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner variant="circle" className="w-8 h-8 text-white" />
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:gap-15">
            {promoOffers.map((offer, index) => (
              <PromoOfferRow key={index} offer={offer} index={index} onGetFundedClick={handleGetFundedClick} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

function PromoOfferRow({ offer, index, onGetFundedClick }: { offer: PromoOffer; index: number; onGetFundedClick: (buttonLink?: string) => void }) {
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
              <Button variant="secondary" className="px-[30px] py-[12px] gap-[15px] max-w-full">
                <Link href="/get-funded">Get Funded Now</Link>
              </Button>
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
