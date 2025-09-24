import Frame from "./frame";
import { TestimonialCardPropsType } from "@/constants/homepage";

export default function TestimonialCard({
  quote,
  isActive = false,
  bottomMode,
  authorName,
  authorMeta,
  stats = [],
}: TestimonialCardPropsType) {
  const quoteClass = "font-romanica font-normal text-[20px] leading-[1] tracking-[0] uppercase";

  if (isActive) {
    return (
      <Frame variants="white">
        <div className="p-8 text-center gradient-primary text-white">
          <p className={quoteClass}>{quote}</p>

          {bottomMode === "author" ? (
            <div className="mt-6 text-[16px] font-creato-display">
              {authorName && (
                <p className="text-white/90">{authorName}</p>
              )}
              {authorMeta && (
                <p className="text-white/80 text-sm">{authorMeta}</p>
              )}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-2">
              {stats.slice(0, 2).map((s, idx) => (
                <div key={idx} className="text-center">
                  <p className="font-creato-display font-medium text-[20px] leading-[115%] tracking-[-0.03em]">
                    {s.heading}
                  </p>
                  <p className="font-creato-display font-normal text-[16px] leading-[130%] tracking-[-0.01em] opacity-90">
                    {s.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Frame>
    );
  }

  return (
    <div
      className="relative h-full p-8 text-center text-white/90 shadow-lg"
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
      }}
    >
      <p className={quoteClass}>{quote}</p>

      {bottomMode === "author" ? (
        <div className="mt-6 font-creato-display">
          {authorName && <p className="text-white/60 text-sm">{authorName}</p>}
          {authorMeta && <p className="text-white/50 text-xs">{authorMeta}</p>}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-2">
          {stats.slice(0, 2).map((s, idx) => (
            <div key={idx} className="text-center">
              <p className="font-creato-display font-medium text-[20px] leading-[115%] tracking-[-0.03em] text-white/40">
                {s.heading}
              </p>
              <p className="font-creato-display font-normal text-[16px] leading-[130%] tracking-[-0.01em] text-white/40">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


