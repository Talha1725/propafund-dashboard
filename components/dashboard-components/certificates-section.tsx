"use client";

import ResponsiveTabs from "@/components/common/responsive-tabs";
import Image from "next/image";
import certificate from "@/public/assets/certificate.png";

export default function CertificatesSection() {
  const tabs = [
    { value: "all-time", label: "All time" },
    { value: "evaluation", label: "Evaluation process" },
    { value: "payouts", label: "Payouts" },
    { value: "allocation", label: "Max Allocation" },
    { value: "overall", label: "Overall Payouts" },
  ];

  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] py-4 overflow-hidden grid">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 px-4">
        <h1 className="text-white md:font-medium md:text-lg font-creato-display">
          Certificates
        </h1>

        <ResponsiveTabs
          tabs={tabs}
          defaultValue="all-time"
          visibleTabsCount={3}
        />
      </div>

      <div className="overflow-auto grid mt-5 pl-4 sm:pr-0 pr-4 max-h-[500px] sm:max-h-auto">
        <div className="flex sm:flex-row flex-col sm:flex-nowrap gap-4">
          <div className="w-full sm:min-w-[246px] min-h-[146px] rounded overflow-hidden">
            <Image
              src={certificate}
              alt="Certificate"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full sm:min-w-[246px] min-h-[146px] rounded overflow-hidden">
            <Image
              src={certificate}
              alt="Certificate"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full sm:min-w-[246px] min-h-[146px] rounded overflow-hidden">
            <Image
              src={certificate}
              alt="Certificate"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full sm:min-w-[246px] min-h-[146px] rounded overflow-hidden">
            <Image
              src={certificate}
              alt="Certificate"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full sm:min-w-[246px] min-h-[146px] rounded overflow-hidden">
            <Image
              src={certificate}
              alt="Certificate"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
