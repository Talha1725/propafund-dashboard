import DashboardPageContainer from "@/components/common/dashboard-page-container";
import CertificatesSection from "@/components/dashboard-components/certificates-section";
import MonitoringSection from "@/components/dashboard-components/monitoring-section";
import RecentTrades from "@/components/dashboard-components/recent-trades";
import StatsSection from "@/components/dashboard-components/stats-section";
import StatusCardSection from "@/components/dashboard-components/status-card-section";

export default function Dashboard() {
  return (
    <DashboardPageContainer>
      <StatusCardSection />
      <StatsSection />
      <MonitoringSection />
      <CertificatesSection />
      <RecentTrades />
    </DashboardPageContainer>
  );
}
