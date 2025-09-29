export default function ScallingSection({ className }: { className?: string }) {
  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full sm:w-[48.50%] lg:w-[33%] xl:w-[28%] ${className}`}
    >
      <div className="flex flex-col items-start gap-2.5">
        <h1 className="text-white md:font-medium md:text-lg font-creato-display">
          Scaling Status
        </h1>
        <div className="gradient-dark-primary border-white/10 border rounded-[10px] font-creato-display font-light py-2 px-3 text-sm">
          <span className="text-white/80">Next Milestone: </span>$60,000
        </div>
      </div>
    </div>
  );
}
