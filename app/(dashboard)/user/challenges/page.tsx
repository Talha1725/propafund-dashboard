import ChallengeStats from "@/components/challenges-components/challenge-stats";
import Credentials from "@/components/challenges-components/credentials";
import DashboardPageContainer from "@/components/common/dashboard-page-container";

export default function ChallengesPage() {
  return (
    <DashboardPageContainer>
      <Credentials />
      <ChallengeStats />
    </DashboardPageContainer>
  );
}