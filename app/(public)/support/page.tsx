"use client";

import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import supportBg from "@/public/assets/support-bg.svg";
import SectionHeader from "@/components/common/section-header";
import SupportForm from "@/components/support/support-form";
import TestimonialCard from "@/components/common/testimonial-card";
import Glow from "@/components/common/glow";
import * as React from "react";
import { supportInfo, supportFields } from "@/constants/support";

export default function SupportPage() {
  const defaultIndex = 1;
  const [active, setActive] = React.useState<number>(defaultIndex);

  return (
    <>
      <HeroSection 
        image={supportBg}
        titleLine1="Reach Out to "
        titleLine2="the Propafund Pantheon"
        subtitle="Need support, have a question, or want to collaborate? We're listening."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display pb-30 pt-27 relative overflow-hidden" id="support">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2">
            <Glow width={1800} height={1200} opacity={0.35} />
          </div>
        </div>
        <Container>
          <div className="mt-10 grid grid-cols-1 gap-10">
            <SupportForm
              fields={supportFields}
              onSubmit={async (values) => {
                console.log("Support form submitted", values);
              }}
            />
            <div className="mt-15">
              <SectionHeader title="Support Info" text="" />
              <div className="relative grid mt-12 grid-cols-1 md:grid-cols-3 gap-6 items-stretch pb-10">
                {supportInfo.map(({ quote, author }, idx) => {
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
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
           </div>
        </Container>
      </div>
    </>
  );
}
