"use client";

import { Certificate } from "@/types/certificates";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CertificateIcon from "@/public/assets/certificate.png";
import { useState } from "react";
import { UnlockableCertificateTabId } from "@/types/certificates";
import { CertificateGridProps } from "@/types/certificates";
import DownloadIcon from "@/public/assets/download.svg";
import UploadIcon from "@/public/assets/upload.svg";
import CertificateTabs from "@/components/common/certificate-tabs";
import { getTabConfig } from "@/constants/common-tabs";

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/user/certificates/${certificate.id}`);
  };

  // Determine category based on certificate ID (alternating between Gold and Silver)
  const getCategory = (id: string) => {
    const numId = parseInt(id);
    return numId % 2 === 0 ? 'silver' : 'gold';
  };

  const category = getCategory(certificate.id);
  const isGold = category === 'gold';

  return (
    <div 
      className="dark-gradient p-5 border border-white/10 rounded-[20px] group cursor-pointer hover:border-white/20 transition-colors"
      onClick={handleCardClick}
    >
      <div className="w-full">
        <Image 
          src={CertificateIcon} 
          alt="Certificate" 
          className="w-full h-auto object-contain"
        />
        <div className="mt-5 border-t border-white/10"></div>
      </div>
    
      <div className="mt-5 w-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 overflow-hidden">
            <span className="text-white font-lay-grotesk text-[18px] font-medium truncate block">
              {certificate.title}
            </span>
            <p className="text-white mt-0 font-lay-grotesk text-[14px] font-medium truncate block">
              Overall payouts $5,238.6
            </p>
            <div className="mt-1">
              <div 
                className="flex items-center justify-center px-[14px] py-[10px] rounded-[10px] whitespace-nowrap"
                style={{
                  background: isGold 
                    ? "linear-gradient(270deg, rgba(217, 147, 33, 0.5) 0%, #D99321 100%)"
                    : "linear-gradient(270deg, rgba(192, 192, 192, 0.5) 0%, #C0C0C0 100%)",
                  width: "120px",
                  height: "37px"
                }}
              >
                <span className="text-white font-creato-display font-medium text-[14px] leading-[100%] whitespace-nowrap">
                  {isGold ? 'Gold Category' : 'Silver Category'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-5.5 flex-shrink-0">
            <Image src={DownloadIcon} alt="Certificate" width={15} height={15} className="text-white/30" />
            <Image src={UploadIcon} alt="Certificate" width={15} height={15} className="text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateGrid = ({ certificates }: CertificateGridProps) => {
  const [unlockableActiveTab, setUnlockableActiveTab] = useState<UnlockableCertificateTabId>("all");

  const firstSixCertificates = certificates.slice(0, 6);
  const remainingCertificates = certificates.slice(6);

  const filteredRemainingCertificates = remainingCertificates.filter((certificate) => {
    if (unlockableActiveTab === "all") return true;
    return certificate.type === unlockableActiveTab;
  }).slice(0, 3);

  const handleTabChange = (id: string) => {
    setUnlockableActiveTab(id as UnlockableCertificateTabId);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstSixCertificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>

      <div>
        <span className="text-[20px] font-medium text-white">Unlockable Certificates</span>
        <div className="mt-5">
          <CertificateTabs
            tabs={getTabConfig("certificates")}
            activeTab={unlockableActiveTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRemainingCertificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </div>
  );
};

export default CertificateGrid;
