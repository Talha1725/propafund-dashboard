interface GradientRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GradientRow({ children, className = "", onClick }: GradientRowProps) {
  return (
    <div
      className={`border w-full sm:w-[820px] h-[76px] p-[24px] flex items-center cursor-pointer ${className}`}
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
        borderColor: "#FFFFFF1A",
        opacity: 1,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}


