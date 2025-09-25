interface GlowProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  shape?: "closest-side" | "farthest-side";
  blur?: number;
  zIndex?: number; // allow placing behind content; default -1
}

export default function Glow({ className = "", width = 1400, height = 900, opacity = 0.4, shape = "closest-side", blur = 64, zIndex = -1 }: GlowProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    opacity,
    background:
      `radial-gradient(${shape}, #5684a3, #1c1d2c 45%, rgba(12, 15, 24, 0) 70%)`,
    filter: `blur(${blur}px)`,
    borderRadius: "9999px",
    zIndex,
    pointerEvents: "none",
  };

  return <div aria-hidden style={style} className={className} />;
}


