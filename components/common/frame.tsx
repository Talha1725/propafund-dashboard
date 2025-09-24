interface FrameProps {
  children: React.ReactNode;
  variants?: "white" | "gradient" | "none";
  className?: string;
  topBottomThicknessPx?: number;
  sideThicknessPx?: number;
}

export default function Frame({ children, variants = "white", className = "", topBottomThicknessPx = 3, sideThicknessPx = 6 }: FrameProps) {
  const borderClass = variants === "gradient" ? "gradient-light" : variants === "white" ? "bg-white" : "";
  
  return (
    <div className={`relative z-50 ${className}`}>
      {variants !== "none" && (
        <>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[110%] ${borderClass} transition-all duration-300 ease-in-out`} style={{ height: `${topBottomThicknessPx}px` }}></div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] ${borderClass} transition-all duration-300 ease-in-out`} style={{ height: `${topBottomThicknessPx}px` }}></div>
          <div className={`absolute left-0 h-full ${borderClass} transition-all duration-300 ease-in-out`} style={{ width: `${sideThicknessPx}px` }}></div>
          <div className={`absolute right-0 h-full ${borderClass} transition-all duration-300 ease-in-out`} style={{ width: `${sideThicknessPx}px` }}></div>
        </>
      )}

      {children}
    </div>
  );
}