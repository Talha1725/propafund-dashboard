"use client";

import CertificateGrid from "@/components/certificates-components/certificate-grid";
import { USER_CERTIFICATES_DATA, UNLOCKABLE_CERTIFICATES_DATA } from "../../../../lib/data/certificates";
import { useState, useEffect, Suspense, useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import CertificateIcon from "@/public/assets/crtificat.svg";
import Image from "next/image";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import CertificateTabs from "@/components/common/certificate-tabs";
import { getTabConfig } from "@/constants/common-tabs";
import Pagination from "@/components/academy-components/pagination";

function CertificatesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [myCertificatesPage, setMyCertificatesPage] = useState(1);
  const [unlockableCertificatesPage, setUnlockableCertificatesPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const tabFromParams = searchParams.get("tab");
    
    if (tabFromParams && [
      "all",
      "core-skills", 
      "advanced-tactics",
      "pro-trader-level",
      "max-allocation",
      "performance-goals",
      "risk-control",
    ].includes(tabFromParams)) {
      setActiveTab(tabFromParams);
    } else if (!tabFromParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "all");
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [searchParams]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setMyCertificatesPage(1);
    setUnlockableCertificatesPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const handleMyCertificatesPageChange = (page: number) => {
    setMyCertificatesPage(page);
  };

  const handleUnlockableCertificatesPageChange = (page: number) => {
    setUnlockableCertificatesPage(page);
  };

  const { paginatedUserCertificates, userCertificatesTotalPages } = useMemo(() => {
    const filteredUserCertificates = USER_CERTIFICATES_DATA.filter((certificate) => {
      if (activeTab === "all") return true;
      return certificate.type === activeTab;
    });

    const totalPages = Math.ceil(filteredUserCertificates.length / itemsPerPage);
    const startIndex = (myCertificatesPage - 1) * itemsPerPage;
    const paginatedCertificates = filteredUserCertificates.slice(startIndex, startIndex + itemsPerPage);

    return {
      paginatedUserCertificates: paginatedCertificates,
      userCertificatesTotalPages: totalPages,
    };
  }, [activeTab, myCertificatesPage, itemsPerPage]);

  const { paginatedUnlockableCertificates, unlockableCertificatesTotalPages } = useMemo(() => {
    const filteredUnlockableCertificates = UNLOCKABLE_CERTIFICATES_DATA.filter((certificate) => {
      if (activeTab === "all") return true;
      return certificate.type === activeTab;
    });

    const totalPages = Math.ceil(filteredUnlockableCertificates.length / itemsPerPage);
    const startIndex = (unlockableCertificatesPage - 1) * itemsPerPage;
    const paginatedCertificates = filteredUnlockableCertificates.slice(startIndex, startIndex + itemsPerPage);

    return {
      paginatedUnlockableCertificates: paginatedCertificates,
      unlockableCertificatesTotalPages: totalPages,
    };
  }, [activeTab, unlockableCertificatesPage, itemsPerPage]);

  return (
    <DashboardPageContainer>
      <div className="gradient-dark-primary border border-white/10 rounded-[14px] p-5">

        {USER_CERTIFICATES_DATA.length > 0 ? (
          <>
            <div className="py-5">
              <h2 className="font-creato-display font-bold text-[20px] leading-[100%] text-white">
                My Certificates
              </h2>
            </div>
            <div className="mb-5">
              <CertificateTabs
                tabs={getTabConfig("certificates")}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            <CertificateGrid certificates={paginatedUserCertificates} />
            
            {userCertificatesTotalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={myCertificatesPage}
                  totalPages={userCertificatesTotalPages}
                  onPageChange={handleMyCertificatesPageChange}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
            
            <div className="pt-8">
              <div className="py-5">
                <h2 className="font-creato-display font-bold text-[20px] leading-[100%] text-white">
                  Unlockable Certificates
                </h2>
              </div>
              <div className="mb-5">
                <CertificateTabs
                  tabs={getTabConfig("certificates")}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
              <CertificateGrid certificates={paginatedUnlockableCertificates} />
              
              {unlockableCertificatesTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={unlockableCertificatesPage}
                    totalPages={unlockableCertificatesTotalPages}
                    onPageChange={handleUnlockableCertificatesPageChange}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              )}
            </div>
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
              <div className="py-5">
                <h2 className="font-creato-display font-bold text-[20px] leading-[100%] text-white">
                  Unlockable Certificates
                </h2>
              </div>
              <div className="mb-5">
                <CertificateTabs
                  tabs={getTabConfig("certificates")}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
              <CertificateGrid certificates={paginatedUnlockableCertificates} />
              
              {unlockableCertificatesTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={unlockableCertificatesPage}
                    totalPages={unlockableCertificatesTotalPages}
                    onPageChange={handleUnlockableCertificatesPageChange}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardPageContainer>
  );
}

export default function Certificates() {
  return (
    <Suspense fallback={
      <div className="h-screen overflow-hidden pb-10 md:pb-0">
        <DashboardPageContainer fullHeight={true}>
          <div className="h-full flex items-center justify-center">
            <Spinner variant="ring" className="h-8 w-8 text-white" />
          </div>
        </DashboardPageContainer>
      </div>
    }>
      <CertificatesContent />
    </Suspense>
  );
}
