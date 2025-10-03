export default function ComponentContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`p-5 border border-white/10 rounded-[20px] dark-gradient relative ${className}`}>
      {children}
    </div>
  );
}