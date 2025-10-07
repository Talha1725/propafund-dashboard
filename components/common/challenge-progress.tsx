import { IconColoredCheck, IconComplete } from "./icon";

export default function ChallengeProgress({ challengeCompleted, title, value, progress = 0 }: { challengeCompleted: boolean, title: string, value: string, progress?: number }) {
  return (
    <div className="flex justify-between gap-2">
          <div className="w-full">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-white/50 sm:text-sm text-xs font-light font-creato-display">
                {title}
              </h1>
              <p className={`${challengeCompleted ? "gradient-text-secondary" : "text-white"} sm:text-sm text-xs font-creato-display`}>
                {value}
              </p>
            </div>
            <div className="mt-2 relative">
              <div 
                className={`absolute top-1/2 -translate-y-1/2 left-0 h-1 ${challengeCompleted ? "bg-gradient-to-b from-[#7AD3FF] to-[#4FBAF0]" : "bg-gradient-to-b from-white to-blue"} rounded-[10px]`}
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              ></div>
              <div className="w-full h-[2.5px] bg-white/10 rounded-[10px]"></div>
            </div>
          </div>
          {challengeCompleted ? <IconColoredCheck /> : <IconComplete />}
        </div>
  );
}