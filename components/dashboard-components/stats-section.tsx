import ChallengesOverview from "../common/challenges-overview";
import ScallingStatus from "../common/scalling-status";
import UpgradeSection from "./upgrade-section";

export default function StatsSection() {
  return (
    <div className="flex gap-4 justify-between flex-wrap lg:flex-nowrap">
      <ChallengesOverview />
      <ScallingStatus />
      <UpgradeSection />
    </div>
  );
}
