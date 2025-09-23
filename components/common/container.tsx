export default function Container({ children, className }: { children?: React.ReactNode, className?: string }) {
  return <div className={`container mx-auto w-[90%] lg:w-[86%] ${className}`}>{children}</div>;
}