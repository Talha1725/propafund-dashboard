"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "./container";
import SectionHeader from "./section-header";
import PromoCard from "./promo-card";
import { Spinner } from "../ui/spinner";
import { promo } from "@/lib/api/endpoints/promo";
import type { PromoCardProps, PromoCardData } from "@/types/promo";

// Static fallback data
const staticPromoCards: PromoCardProps[] = [
  {
    icon: "/images/dollar.svg",
    iconAlt: "dollar icon",
    title: "SECURE A TREASURY OF 50,000 DENARII - BE GRANTED ANOTHER IN TRIBUTE",
    description: "Expand your trading power at no additional cost. For a limited time, when you purchase a $50K funded account with PropaFund, you'll receive a second $50K account free —instantly added to your dashboard.",
    buttonText: "Get Offer Now",
    buttonLink: "/challenges",
    tagText: "LIMITED TIME",
    timerText: "Offer ends in 7 days",
    initialDays: 7,
    initialHours: 0,
    initialMins: 0,
    seatsLeft: 47
  },
  {
    icon: "/images/percent.svg",
    iconAlt: "percent icon",
    title: "CLAIM 7% TRIBUTE ON ALL INSTANT FUNDING TREASURIES",
    description: "For a limited time, PropaFund gives you instant savings across all funding accounts. Grow your capital, reduce your risk, and trade with confidence.",
    buttonText: "Explore Accounts",
    buttonLink: "/challenges",
    tagText: "7% OFF",
    timerText: "Offer ends in 5 days",
    initialDays: 5,
    initialHours: 12,
    initialMins: 30,
    seatsLeft: 23
  },
  {
    icon: "/images/gift.svg",
    iconAlt: "gift icon",
    title: "CLAIM VICTORY WITH $50,000 IN TRADING CAPITAL",
    description: "Join our trading challenge and showcase your skills. The best performers will receive fully funded accounts and cash rewards — no entry fee required.",
    buttonText: "Register Now",
    buttonLink: "/challenges",
    tagText: "FREE ENTRY",
    timerText: "Registration ends in 3 days",
    initialDays: 3,
    initialHours: 6,
    initialMins: 45,
    seatsLeft: 156
  }
];


export default function PromoSection() {
  const [promoCards, setPromoCards] = useState<PromoCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromoCards = async () => {
      try {
        const response = await promo.getActivePromoCards();
        if (response.success && response.data.length > 0) {
          // Fixed icons for the three cards
          const fixedIcons = ['/images/dollar.svg', '/images/percent.svg', '/images/gift.svg'];
          const fixedIconAlts = ['dollar icon', 'percent icon', 'gift icon'];
          
          const mappedCards = response.data.slice(0, 3).map((card: PromoCardData, index: number) => ({
            icon: fixedIcons[index] || fixedIcons[0],
            iconAlt: fixedIconAlts[index] || fixedIconAlts[0],
            title: card.title,
            description: card.description,
            buttonText: card.buttonText,
            buttonLink: card.buttonLink,
            tagText: card.tagText,
            timerText: card.timerText,
            initialDays: card.initialDays,
            initialHours: card.initialHours,
            initialMins: card.initialMins,
            seatsLeft: card.seatsLeft
          }));
          setPromoCards(mappedCards);
        } else {
          setPromoCards(staticPromoCards);
        }
      } catch (error) {
        console.error('Error fetching promo cards:', error);
        setPromoCards(staticPromoCards);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCards();
  }, []);

  return (
    <div className="pt-[60px] lg:pt-[100px] bg-[#070707] md:bg-[#010101] relative">
      {/* Promo image bar */}
      <div className="flex justify-center z-[999] relative w-full md:w-auto">
        <div className="w-[375px] md:w-auto">
          <Image
            src="/assets/promo-bg.svg"
            alt="promo-image-bar"
            width={100}
            height={100}
            className="w-full h-auto"
          />
        </div>
      </div>
      
      <Container className="mt-10">
        <SectionHeader
          title="Seize the Exclusive PropaFund Rewards"
          text="Unlock limited-time deals, trading perks, and bonus opportunities designed to boost your journey to funded success."
        />
      </Container>
      
      {/* Promo Cards */}
      <Container className="relative mt-10 sm:mt-15">
        <div className="w-full max-w-[1076px] mx-auto px-[30px]">
          <div className="flex flex-col gap-[20px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Spinner variant="circle" className="w-8 h-8 text-white" />
                <div className="text-white text-center font-lay-grotesk font-medium">
                  Loading promo cards...
                </div>
              </div>
            ) : promoCards.length > 0 ? (
              promoCards.map((card, index) => (
                <PromoCard
                  key={index}
                  icon={card.icon}
                  iconAlt={card.iconAlt}
                  title={card.title}
                  description={card.description}
                  buttonText={card.buttonText}
                  buttonLink={card.buttonLink}
                  tagText={card.tagText}
                  timerText={card.timerText}
                  initialDays={card.initialDays}
                  initialHours={card.initialHours}
                  initialMins={card.initialMins}
                  seatsLeft={card.seatsLeft}
                />
              ))
            ) : (
              <div className="text-white text-center py-10 font-lay-grotesk font-medium">
                No active promotions available
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
