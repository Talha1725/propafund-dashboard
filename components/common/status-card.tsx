import { TradeDown, TradeUp } from "../common/icon";

export default function StatusCard({
  title,
  value,
  active = false,
  small = false,
  tradeUp = true,
  challenges = false,
  icon,
  tradeIcon = true,
  iconClick,
  titleShort = false
}: {
  title: string;
  value: string;
  active?: boolean;
  small?: boolean;
  tradeUp?: boolean;
  challenges?: boolean;
  icon?: React.ReactNode;
  tradeIcon?: boolean;
  iconClick?: () => void;
  titleShort?: boolean;
}) {
  return (
    <div
      className={`border p-1 rounded-[14px] ${
        active
          ? "border-t-white border-l-[#b6dbef] border-r-[#b6dbef] border-b-[#4EB2E4] gradient-blue"
          : "border-white/10 gradient-dark-primary"
      }`}
    >
      <div
        className={`${
          small ? "py-2 px-3" : "p-3"
        } flex justify-between items-center`}
      >
        <h1 className={`font-creato-display text-white uppercase ${small ? "text-sm" : "sm:text-sm text-xs"} font-medium`}>
          {titleShort && title.length > 15 ? title.slice(0, 10) + "..." : title}
        </h1>

        <button onClick={iconClick} className="cursor-pointer">
          {icon}
        </button>
      </div>

      <div
        className={`${
          active
            ? "bg-gradient-to-t from-[#4EB2E4] to-white"
            : "bg-gradient-to-b from-[#FFFFFF12] to-[#FFFFFF08]"
        } rounded-[10px] ${
          small ? "py-2 px-3" : "p-3"
        } mt-2 md:mt-1 flex gap-2 items-center ${
          challenges ? "justify-between" : "justify-start"
        }`}
      >
        <p
          className={`font-creato-display ${
            small ? "text-lg" : "sm:text-2xl text-xl"
          } font-medium ${active ? "text-black" : "text-white"}`}
        >
          {value}
        </p>
        {tradeIcon &&
          (tradeUp ? (
            <TradeUp fill={active ? "#009952" : "#00EB6E"} />
          ) : (
            <TradeDown />
          ))}
      </div>
    </div>
  );
}
