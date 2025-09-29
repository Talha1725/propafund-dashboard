"use client";

import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import bgMarble from "@/public/assets/bg-marble.svg";
import SectionHeader from "@/components/common/section-header";
import SupportForm from "@/components/support/support-form";
import FramedTable from "@/components/common/framed-table";
import Glow from "@/components/common/glow";
import * as React from "react";
import { summaryDetails, commonStyles, content, challengeTypeOptions, platformOptions } from "@/constants/funded";
import OptionTabs from "@/components/funded/option-tabs";

export default function GetFundedPage() {
  const [selectedChallenge, setSelectedChallenge] = React.useState("stage-one");
  const [selectedPlatform, setSelectedPlatform] = React.useState("platform-5");

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
                selectedValue={selectedChallenge}
                onValueChange={setSelectedChallenge}
              />
              
              <div className="pt-[10px]">
                <div className="space-y-5">
                  <div>
                    <label className="font-romanica font-normal text-[20px] leading-[100%] tracking-[0%] uppercase text-white">
                      Account Type
                    </label>
                    <div className="pt-[20px]">
                      <SupportForm
                        fields={[{
                          type: "select",
                          name: "accountType",
                          label: "",
                          placeholder: "Select Account Type",
                          fullWidth: true,
                          options: [
                            { label: "Elite ($50,000)", value: "elite-50k" },
                            { label: "Pro ($100,000)", value: "pro-100k" },
                            { label: "Master ($200,000)", value: "master-200k" },
                          ]
                        }]}
                        showFrame={false}
                        showSubmitButton={false}
                        onSubmit={async (values) => {
                          console.log("Product form submitted", values);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-[10px]">
                <OptionTabs
                  label="Platform"
                  options={platformOptions}
                  selectedValue={selectedPlatform}
                  onValueChange={setSelectedPlatform}
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
                rows={summaryDetails}
                showHeaders={false}
                showButton={true}
                buttonText={content.button}
                boldText={true}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
