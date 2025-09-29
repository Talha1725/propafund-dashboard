"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import BrandsMarquee from "./brands-marquee";

export default function GlobalSection() {
  return (
    <div className="font-creato-display">
      <Container>
        <SectionHeader
          title="AS SEEN AROUND THE WORLD"
          text=""
        />
        <div className="mt-10">
          <BrandsMarquee />
        </div>
      </Container>
    </div>
  );
}
