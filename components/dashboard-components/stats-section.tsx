import { IconComplete } from "../common/icon";
import ChallengesComponent from "./challenges-component";
import ScallingSection from "./scalling-section";
import UpgradeSection from "./upgrade-section";

export default function StatsSection() {
  return (
    <div className="flex gap-4 justify-between flex-wrap lg:flex-nowrap">
      <ChallengesComponent />
      <ScallingSection />
      <UpgradeSection />
    </div>
  );
}
