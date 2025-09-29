import { TradeUp } from "../common/icon";

export default function StatusCard({ title, value, active = false }: { title: string, value: string, active?: boolean }) {
  return (
      <div
        className={`border p-1 rounded-[14px] ${
          active
            ? "border-t-white border-l-[#b6dbef] border-r-[#b6dbef] border-b-[#4EB2E4] gradient-blue"
            : "border-white/10 gradient-dark-primary"
        }`}
      >
        <div className="p-3">
          <h1 className="font-creato-display text-white uppercase sm:text-sm text-xs font-medium">
            {title}
          </h1>
        </div>

        <div
          className={`${
            active
              ? "bg-gradient-to-t from-[#4EB2E4] to-white"
              : "bg-gradient-to-b from-[#FFFFFF12] to-[#FFFFFF08]"
          } rounded-[10px] p-3 mt-2 md:mt-1 flex gap-2 items-center`}
        >
          <p
            className={`font-creato-display sm:text-2xl text-xl font-medium ${
              active ? "text-black" : "text-white"
            }`}
          >
            {value}
          </p>
          <TradeUp fill={active ? "#009952" : "#00EB6E"} />
        </div>
      </div>
  );
}
