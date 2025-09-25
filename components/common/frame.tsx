interface FrameProps {
  children: React.ReactNode;
  variants?: "white" | "gradient" | "none";
  className?: string;
  topBottomThicknessPx?: number;
  sideThicknessPx?: number;
  edgeStretchPercent?: number; // controls the width of top/bottom edges relative to content
  edgesZIndex?: number; // allow overriding edge z-index per usage
}

export default function Frame({ children, variants = "white", className = "", topBottomThicknessPx = 3, sideThicknessPx = 6, edgeStretchPercent = 110, edgesZIndex = 0 }: FrameProps) {
  const borderClass = variants === "gradient" ? "gradient-light" : variants === "white" ? "bg-white" : "";
  
  return (
    <div className={`relative z-50 ${className}`}>
      {variants !== "none" && (
        <>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${borderClass} transition-all duration-300 ease-in-out`} style={{ height: `${topBottomThicknessPx}px`, width: `${edgeStretchPercent}%`, zIndex: edgesZIndex }}></div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${borderClass} transition-all duration-300 ease-in-out`} style={{ height: `${topBottomThicknessPx}px`, width: `${edgeStretchPercent}%`, zIndex: edgesZIndex }}></div>
          <div className={`absolute left-0 h-full ${borderClass} transition-all duration-300 ease-in-out`} style={{ width: `${sideThicknessPx}px`, zIndex: edgesZIndex }}></div>
          <div className={`absolute right-0 h-full ${borderClass} transition-all duration-300 ease-in-out`} style={{ width: `${sideThicknessPx}px`, zIndex: edgesZIndex }}></div>
        </>
      )}

      {children}
    </div>
  );
}