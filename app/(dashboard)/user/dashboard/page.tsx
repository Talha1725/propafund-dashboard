import CertificatesSection from "@/components/dashboard-components/certificates-section";
import MonitoringSection from "@/components/dashboard-components/monitoring-section";
import RecentTrades from "@/components/dashboard-components/recent-trades";
import StatsSection from "@/components/dashboard-components/stats-section";
import StatusCardSection from "@/components/dashboard-components/status-card-section";

export default function Dashboard() {
  return (
    <div className="p-3 md:p-6 md:pb-4 space-y-5 xl:h-[85vh] overflow-auto">
      <StatusCardSection />
      <StatsSection />
      <MonitoringSection />
      <CertificatesSection />
      <RecentTrades />
    </div>
  );
}
