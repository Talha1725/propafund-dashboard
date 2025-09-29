import CoinImage from "@/public/assets/coin-icon";

export default function UpgradeSection({ className }: { className?: string }) {
  return (
    <div
      className={`border border-t-white border-l-[#b6dbef] border-r-[#7fc6ec] border-b-[#4EB2E4] w-full sm:w-[48.50%] lg:w-[33%] xl:w-[25%] rounded-[14px] p-4 bg-gradient-to-b from-white to-blue relative overflow-hidden h-[290px] sm:h-auto ${className}`}
    >
      <CoinImage className="absolute bottom-[-8%] right-0 sm:w-[80%]" />
      <div className="h-full flex flex-col justify-between">
        <div>
          <h1 className="text-black font-creato-display text-lg font-medium">
            Level Up Your Account
          </h1>
          <p className="text-black/60 mt-1 text-sm font-creato-display">
            You’re currently on a $10,000 challenge. Upgrade to $25,000 or
            $50,000 for bigger profit potential and better rewards.
          </p>
        </div>
        <button className="mt-auto border border-white bg-[#0B0E1233] rounded-[10px] w-full z-50 relative backdrop-blur-2xl font-creato-display text-sm h-9.5">
          Upgrade Challenge
        </button>
      </div>
    </div>
  );
}
