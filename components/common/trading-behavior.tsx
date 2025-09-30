import DashboardHeadings from "./dashboard-headings";

export default function TradingBehaviorSection({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`border border-t-white border-l-[#b6dbef] border-r-[#7fc6ec] border-b-[#4EB2E4] w-full sm:w-[48.50%] lg:w-[33%] xl:w-[25%] rounded-[14px] p-4 bg-gradient-to-b from-white to-blue relative overflow-hidden h-[290px] sm:h-auto ${className}`}
    >
      <div className="h-full flex flex-col gap-2 justify-between">
        <div>
          <DashboardHeadings title="Your Trading Behavior" className="!text-black" />
        </div>

        <div>
          <div className="border-b-2 border-[#0B0E121A] flex justify-between py-3">
            <p className="font-creato-display text-sm text-[#0B0E12]/70">Avg. trade duration</p>
            <p className="font-creato-display text-sm text-dark font-medium">45m</p>
          </div>
          <div className="border-b-2 border-[#0B0E121A] flex justify-between py-3">
            <p className="font-creato-display text-sm text-[#0B0E12]/70">Avg. win size vs loss size</p>
            <p className="font-creato-display text-sm text-dark font-medium">+$95 vs -$65</p>
          </div>
          <div className="border-b-2 border-[#0B0E121A] flex justify-between py-3">
            <p className="font-creato-display text-sm text-[#0B0E12]/70">Most traded symbol</p>
            <p className="font-creato-display text-sm text-dark font-medium">XAUUSD</p>
          </div>
          <div className="border-b-2 border-[#0B0E121A] flex justify-between py-3">
            <p className="font-creato-display text-sm text-[#0B0E12]/70">Peak trading hour</p>
            <p className="font-creato-display text-sm text-dark font-medium">2-4PM</p>
          </div>
          <div className="border-b-2 border-[#0B0E121A] flex justify-between py-3">
            <p className="font-creato-display text-sm text-[#0B0E12]/70">Consistent activity</p>
            <p className="font-creato-display text-sm text-dark font-medium">2-4PM</p>
          </div>
          <div className="flex justify-between py-3">
            <p className="font-creato-display text-sm text-[#0B0E12]/70">Winning Streak Record</p>
            <p className="font-creato-display text-sm text-dark font-medium">06</p>
          </div>
        </div>
      </div>
    </div>
  );
}
