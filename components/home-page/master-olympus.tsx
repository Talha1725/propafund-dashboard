"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import FramedTable from "../common/framed-table";
import PriceBar from "../common/price-bar";
import { Button } from "../ui/button";
import Glow from "../common/glow";

export default function MasterOlympusSection() {
  return (
    <div className="font-creato-display py-30">
      <Container>
        <div className="relative">
        <SectionHeader
          title="Climb the Levels of Olympus"
          text="Choose your tier and begin your funded quest."
        />
        <div className="mt-10 max-w-[747px] mx-auto w-full px-4 sm:px-6 md:px-8">
          <PriceBar prices={[5000, 15000, 25000, 50000, 100000, 200000, 400000]} />
        </div>
        <div className="mt-[60px]" />
        <div className="mt-10">
          <FramedTable className="max-w-[747px] mx-auto w-full"
            caption="Stage One vs Funded"
            headers={["", "Stage One", "Funded"]}
            rows={[
              ["Trading Days", "Unlimited", "Unlimited"],
              ["Minimum Trading Days", "1 Day", "1 Day"],
              ["Leverage", "1:100", "1:100"],
              ["Maximum Loss Daily", "$2,500 (5%)", "$2,500 (5%)"],
              ["Maximum Loss Overall", "$5,000 (10%)", "$5,000 (10%)"],
              ["Profit Target", "$4,000 (8%)", "$4,000 (8%)"],
              ["Weekend Holding", "Yes", "Yes"],
              ["EAs Enabled", "Yes", "Yes"],
              ["Crypto Trading", "Yes", "Yes"],
              ["Fees", "$279", "$279"],
            ]}
          />
        </div>
        <div className="flex justify-center mt-15">
          <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded Now</Button>
        </div>  
        <div className="pointer-events-none absolute inset-x-0 bottom-35 flex justify-center -z-10">
          <Glow width={2000} height={1200} opacity={0.55} shape="farthest-side" blur={100} zIndex={-10} />
        </div>
        </div>
      </Container>
    </div>
  );
}
