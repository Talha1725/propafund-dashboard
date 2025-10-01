export default function Container({ 
  children, 
  className, 
  reducedMargin = false 
}: { 
  children?: React.ReactNode, 
  className?: string,
  reducedMargin?: boolean 
}) {
  const containerClass = reducedMargin 
    ? 'w-[95%] lg:w-[92%]' 
    : 'w-[90%] lg:w-[86%]';
  
  return (
    <div className="w-full flex justify-center">
      <div className={`${containerClass} ${className}`}>{children}</div>
    </div>
  );
}