"use client";

import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import bgMarble from "@/public/assets/bg-marble.svg";
import SectionHeader from "@/components/common/section-header";
import SupportForm from "@/components/support/support-form";
import FramedTable from "@/components/common/framed-table";
import Glow from "@/components/common/glow";
import {useState} from "react";
import { useRouter } from "next/navigation";
import { commonStyles, content } from "@/constants/funded";
import { challengeTypeOptions, platformOptions } from "@/constants/funded";
import OptionTabs from "@/components/funded/option-tabs";

export default function GetFundedPage() {
  const [selectedChallenge, setSelectedChallenge] = useState("stage-one");
  const [selectedPlatform, setSelectedPlatform] = useState("platform-5");
  const router = useRouter();

  const handleCompleteOrderClick = () => {
    router.push('/complete-purchase');
  };

  return (
    <>
      <HeroSection 
        image={bgMarble}
        titleLine1="Trading"
        titleLine2="Challenges"
        subtitle="Choose your challenge type and get funded to start your trading journey."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display pb-30 pt-27 relative overflow-hidden" id="funded">
        <Container>
          <SectionHeader title="Product Details & Summary" text="Configure your trading challenge and review your selection." />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-6">
              <h2 className={`${commonStyles.sectionTitle} pb-[10px]`}>
                {content.sections.product}
              </h2>
              
              <OptionTabs
                label="Challenge Type"
                options={challengeTypeOptions}
                selectedValue={selectedData.challengeType}
                onValueChange={(value) => updateSelection('challengeType', value)}
              />
              
              <div className="pt-[10px]">
                <div className="space-y-5">
                  <div>
                    <label className="font-romanica font-normal text-[20px] leading-[100%] tracking-[0%] uppercase text-white">
                      Account Type
                    </label>
                    <div className="pt-[20px]">
                      <div className="w-full h-[64px] px-5 py-5 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white focus-within:border-white/30 focus-within:outline-none rounded-none">
                        <select
                          value={selectedData.accountType}
                          onChange={(e) => updateSelection('accountType', e.target.value)}
                          className="w-full h-full bg-transparent text-white placeholder:text-white/70 focus:outline-none"
                        >
                          <option value="elite-50k">Elite ($50,000)</option>
                          <option value="pro-100k">Pro ($100,000)</option>
                          <option value="master-200k">Master ($200,000)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-[10px]">
                <OptionTabs
                  label="Platform"
                  options={platformOptions}
                  selectedValue={selectedData.platform}
                  onValueChange={(value) => updateSelection('platform', value)}
                />
              </div>
            </div>

            <div className="relative space-y-[10px]">
              <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center items-center">
                <Glow width={6000} height={2500} opacity={0.8} blur={100} />
              </div>
              
              <h2 className={commonStyles.sectionTitle}>
                {content.sections.summary}
              </h2>
              
              <FramedTable
                headers={["Parameter", "Value"]}
                rows={[
                  ["Challenge Type", summaryData.challengeType],
                  ["Account Size", summaryData.accountSize],
                  ["Challenge Duration", summaryData.challengeDuration],
                  ["Leverage", summaryData.leverage],
                  ["Minimum Trading Days", summaryData.minimumTradingDays],
                  ["Max Loss", summaryData.maxLoss],
                  ["Daily Loss", summaryData.dailyLoss],
                  ["Weekend / Crypto Trading", summaryData.weekendCryptoTrading],
                  ["EAs Enabled", summaryData.easEnabled],
                  ["Platform", summaryData.platform],
                  ["Order Total", summaryData.orderTotal],
                ]}
                showHeaders={false}
                showButton={true}
                buttonText={content.button}
                boldText={true}
                onButtonClick={handleCompleteOrderClick}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
