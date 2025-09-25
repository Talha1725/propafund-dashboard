"use client";

import { TESTIMONIALS } from "@/constants/homepage";
import Container from "../common/container";
import SectionHeader from "../common/section-header";
import TestimonialCard from "../common/testimonial-card";
import { useState } from "react";
import Glow from "../common/glow";

export default function TradeCardsSection() {
  const [active, setActive] = useState(0);
  const defaultIndex = 0;

  return (
    <div className="font-creato-display">
      <Container>
        <div className="relative">
        <SectionHeader
          title="WHERE TRADERS BECOME TITANS"
          text="Real traders, real wins—see how PropaFund turns ambition into action."
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
                <TestimonialCard
                  quote={quote}
                  isActive={isActive}
                  bottomMode="author"
                  authorName={author}
                  authorMeta="25K Account"
                  extraHeading="Growth"
                  extraContent="100K"
                />
              </div>
            </div>
          );})}
        </div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-16 flex justify-center -z-10">
          <Glow width={1800} height={1000} opacity={0.55} shape="farthest-side" blur={100} zIndex={-10} />
        </div>
        </div>
      </Container>
    </div>
  );
}
