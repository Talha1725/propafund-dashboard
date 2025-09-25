import { SectionHeaderProps } from "@/types/common";

export default function SectionHeader({ title, text, className = "" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-center font-romanica uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-normal">
        {title}
      </h1>
      <p className="text-center mt-3">{text}</p>
    </div>
  );
}


