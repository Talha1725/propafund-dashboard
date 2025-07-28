interface FrameProps {
  children: React.ReactNode;
  variants?: "white" | "gradient";
  className?: string;
}

export default function Frame({ children, variants = "white", className = "" }: FrameProps) {
  const borderClass = variants === "gradient" ? "gradient-light" : "bg-white";
  
  return (
    <div className={`relative z-50 ${className}`}>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-[110%] ${borderClass}`}></div>
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-[110%] ${borderClass}`}></div>
      <div className={`absolute left-0 h-full w-[6px] ${borderClass}`}></div>
      <div className={`absolute right-0 h-full w-[6px] ${borderClass}`}></div>

      {children}
    </div>
  );
}