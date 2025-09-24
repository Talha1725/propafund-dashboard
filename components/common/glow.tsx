interface GlowProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
}

export default function Glow({ className = "", width = 1400, height = 900, opacity = 0.4 }: GlowProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    opacity,
    background:
      "radial-gradient(closest-side, #5684a3, #1c1d2c 45%, rgba(12, 15, 24, 0) 70%)",
    filter: "blur(64px)",
    borderRadius: "9999px",
  };

  return <div aria-hidden style={style} className={className} />;
}


