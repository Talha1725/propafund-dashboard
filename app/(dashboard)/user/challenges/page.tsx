import ChallengeMonitoringSection from "@/components/challenges-components/challenge-monitoring-section";
import ChallengeStatistics from "@/components/challenges-components/challenge-statistics";
import ChallengeStats from "@/components/challenges-components/challenge-stats";
import Credentials from "@/components/challenges-components/credentials";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import MonitoringSection from "@/components/dashboard-components/monitoring-section";
import StatsSection from "@/components/dashboard-components/stats-section";

export default function ChallengesPage() {
  return (
    <DashboardPageContainer>
      <Credentials />
      <ChallengeStats />
      <ChallengeMonitoringSection />
      <StatsSection />
      <ChallengeStatistics />
    </DashboardPageContainer>
  );
}