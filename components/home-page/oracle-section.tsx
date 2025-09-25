"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import GradientRow from "../common/gradient-row";
import Frame from "../common/frame";
import { useState } from "react";
import { ORACLE_FAQ_ITEMS } from "@/constants/homepage";

export default function OracleSection({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const questionClass = "font-romanica font-normal text-[20px] leading-[1] tracking-[0] uppercase";
  return (
    <div className={`font-creato-display py-30 ${className || ''}`}>
      <Container>
        <SectionHeader
          title="Oracle of Propafund"
          text="Answers to your most pressing questions, straight from the temple."
        />

        <div className="mt-10 flex flex-col items-center gap-5">
          {ORACLE_FAQ_ITEMS.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={q} className="w-full sm:w-[820px]">
                  <Frame variants={isOpen ? "white" : "none"}>
                  {isOpen ? (
                    <div className="gradient-primary p-[24px] min-h-[76px] flex flex-col gap-2 text-white" onClick={() => setOpenIndex(null)}>
                      <p className={questionClass}>
                        {q}
                      </p>
                      <p className="font-creato-display font-normal text-[16px] leading-[1] whitespace-pre-line">
                        {a}
                      </p>
                    </div>
                  ) : (
                    <GradientRow onClick={() => setOpenIndex(i)}>
                      <p className={questionClass}>
                        {q}
                      </p>
                    </GradientRow>
                  )}
                </Frame>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
