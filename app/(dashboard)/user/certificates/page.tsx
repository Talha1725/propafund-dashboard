"use client";

import CertificateGrid from "@/components/certificates-components/certificate-grid";
import { CERTIFICATES_DATA } from "../../../../lib/data/certificates";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CertificateTabId } from "@/types/certificates";
import CertificateIcon from "@/public/assets/crtificat.svg";
import Image from "next/image";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import CertificateTabs from "@/components/common/certificate-tabs";
import { getTabConfig } from "@/constants/common-tabs";

function CertificatesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<CertificateTabId>("all");

  useEffect(() => {
    const tabFromParams = searchParams.get("tab");
    if (
      tabFromParams &&
      [
        "all",
        "core-skills",
        "advanced-tactics",
        "pro-trader-level",
        "max-allocation",
        "performance-goals",
        "risk-control",
      ].includes(tabFromParams)
    ) {
      setActiveTab(tabFromParams as CertificateTabId);
    } else if (!tabFromParams) {
      // Set default tab in URL if no tab is specified
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "all");
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [searchParams]);

  const filteredCertificates = CERTIFICATES_DATA.filter((certificate) => {
    if (activeTab === "all") return true;
    return certificate.type === activeTab;
  });


  const handleTabChange = (id: string) => {
    setActiveTab(id as CertificateTabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <DashboardPageContainer>
      <div className="gradient-dark-primary border border-white/10 rounded-[14px] p-5">
        <div className="flex justify-start pb-3">
          <CertificateTabs
            tabs={getTabConfig("certificates")}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        {filteredCertificates.length > 0 ? (
          <>
            <div className="py-5">
              <h2 className="font-creato-display font-bold text-[20px] leading-[100%] text-white">
                My Certificates
              </h2>
            </div>

            <CertificateGrid certificates={filteredCertificates} />
          </>
        ) : (
          <>
            <div className="text-center space-y-4 border border-white/10 rounded-[14px] p-10 gradient-dark-primary">
              <div className="flex justify-center">
                <Image 
                  src={CertificateIcon} 
                  alt="Certificate" 
                  width={52} 
                  height={57} 
                  className="opacity-100" 
                  style={{ top: '3.33px', left: '6px' }}
                />
              </div>
              <h1 className="text-[26px] font-bold text-white font-creato-display">
                No Certificates Yet, 
                <br />
                But Yours Could Be Next
              </h1>
              
              <p className="text-white/70 text-[18px] font-regular font-creato-display max-w-2xl mx-auto">
                Your journey with Propafund is just beginning. Conquer the Propafund Challenge and unlock your trading certificate as proof of skill, discipline, and achievement.
              </p>
            </div>
            <div className="pt-5">
              <CertificateGrid certificates={CERTIFICATES_DATA} />
            </div>
          </>
        )}
      </div>
    </DashboardPageContainer>
  );
}

export default function CertificatesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading certificates...</div>
      </div>
    }>
      <CertificatesContent />
    </Suspense>
  );
}