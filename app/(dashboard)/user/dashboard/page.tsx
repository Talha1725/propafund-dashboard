import CertificatesSection from "@/components/dashboard-components/certificates-section";
import MonitoringSection from "@/components/dashboard-components/monitoring-section";
import RecentTrades from "@/components/dashboard-components/recent-trades";
import StatsSection from "@/components/dashboard-components/stats-section";
import StatusCardSection from "@/components/dashboard-components/status-card-section";
import Image from "next/image";
import gradient from "@/public/assets/dashboard-gradient.png"

export default function Dashboard() {
  return (
    <div className="p-3 md:p-6 md:pb-4 space-y-5 xl:h-[85vh] overflow-auto relative">
      {/* <Image src={gradient} alt="gradient" className="fixed top-0 right-0 w-full h-[500px] object-cover md:object-fill md:h-full pointer-events-none" /> */}

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-blue to-blue/50 rotate-[14deg] blur-3xl opacity-20 z-0 pointer-events-none"></div>
      <StatusCardSection />
      <StatsSection />
      <MonitoringSection />
      <CertificatesSection />
      <RecentTrades />
    </div>
  );
}
