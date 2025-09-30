import ChallengeProgress from "./challenge-progress";
import { IconColoredCheck, IconComplete } from "./icon";

export default function ChallengesOverview({
  className,
  phaseCompleted,
}: {
  className?: string;
  phaseCompleted?: boolean;
}) {
  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full lg:w-[33%] xl:w-[47%] flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col xl:flex-row items-start gap-2 xl:justify-between xl:items-center">
        <h1 className="text-white md:font-medium md:text-lg font-creato-display">
          Challenge Stats Overview
        </h1>
        <div
          className={`border-white/10 border rounded-[10px] font-creato-display font-light py-2 px-3 text-sm ${
            phaseCompleted
              ? "bg-gradient-to-b from-white to-blue border-b-0 text-black"
              : "gradient-dark-primary text-white"
          }`}
        >
          <span className="opacity-70">Phase 1:</span> In Progress
        </div>
      </div>

      <div className="mt-5 space-y-4.5">
        <ChallengeProgress challengeCompleted={false} title="Drawdown" value="$540/$1,000" />
        <ChallengeProgress challengeCompleted={true} title="Profit Target" value="$800/$1,000" />
        <ChallengeProgress challengeCompleted={false} title="Remaining Days" value="17/30" />
        <ChallengeProgress challengeCompleted={false} title="Win Rate" value="63%" />
      </div>
    </div>
  );
}
