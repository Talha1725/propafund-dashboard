import { IconComplete } from "../common/icon";

export default function ChallengesComponent({className}: {className?: string}) {
  return (
    <div className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full lg:w-[33%] xl:w-[47%] flex flex-col justify-between ${className}`}>
        <div className="flex flex-col xl:flex-row items-start gap-2 xl:justify-between xl:items-center">
          <h1 className="text-white md:font-medium md:text-lg font-creato-display">
            Challenge Stats Overview
          </h1>
          <div className="gradient-dark-primary border-white/10 border rounded-[10px] font-creato-display font-light py-2 px-3 text-sm">
            <span className="text-white/60">Phase 1:</span> In Progress
          </div>
        </div>

        <div className="mt-5 space-y-4.5">
          <div className="flex justify-between gap-2">
            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-white/50 sm:text-sm text-xs font-light font-creato-display">
                  Drawdown
                </h1>
                <p className="text-white sm:text-sm text-xs font-creato-display">
                  $540/$1,000
                </p>
              </div>
              <div className="mt-2 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[40%] h-1 bg-gradient-to-b from-white to-blue rounded-[10px]"></div>
                <div className="w-full h-[2.5px] bg-white/10 rounded-[10px]"></div>
              </div>
            </div>
            <IconComplete />
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-white/50 sm:text-sm text-xs font-light font-creato-display">
                Profit Target
                </h1>
                <p className="text-white sm:text-sm text-xs font-creato-display">
                $800/$1,000
                </p>
              </div>
              <div className="mt-2 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[80%] h-1 bg-gradient-to-b from-white to-blue rounded-[10px]"></div>
                <div className="w-full h-[2.5px] bg-white/10 rounded-[10px]"></div>
              </div>
            </div>
            <IconComplete />
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-white/50 sm:text-sm text-xs font-light font-creato-display">
                Remaining Days
                </h1>
                <p className="text-white sm:text-sm text-xs font-creato-display">
                17/30
                </p>
              </div>
              <div className="mt-2 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[40%] h-1 bg-gradient-to-b from-white to-blue rounded-[10px]"></div>
                <div className="w-full h-[2.5px] bg-white/10 rounded-[10px]"></div>
              </div>
            </div>
            <IconComplete />
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-white/50 sm:text-sm text-xs font-light font-creato-display">
                Win Rate
                </h1>
                <p className="text-white sm:text-sm text-xs font-creato-display">
                63%
                </p>
              </div>
              <div className="mt-2 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[60%] h-1 bg-gradient-to-b from-white to-blue rounded-[10px]"></div>
                <div className="w-full h-[2.5px] bg-white/10 rounded-[10px]"></div>
              </div>
            </div>
            <IconComplete />
          </div>
        </div>
      </div>
  );
}