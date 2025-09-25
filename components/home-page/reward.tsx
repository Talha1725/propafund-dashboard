"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import RewardsMarquee from "./rewards-marquee";
import Glow from "../common/glow";

export default function RewardSection() {
  return (
    <div className="font-creato-display py-30">
      <Container>
        <div className="relative">
        <SectionHeader
          title="Swift & Secure Rewards"
          text="At PropaFund, we deliver your payouts quickly and reliably. Select Rise, PayPal, or Crypto — whichever works best for you."
        />
         <div className="mt-10">
          <RewardsMarquee />
        </div>
          <div className="pointer-events-none absolute inset-x-0 -bottom-120 flex justify-center -z-10">
            <Glow width={2000} height={1200} opacity={0.55} shape="farthest-side" blur={100} zIndex={-10} />
          </div>
        </div>
      </Container>
    </div>
  );
}
