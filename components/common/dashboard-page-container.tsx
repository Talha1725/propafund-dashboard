export default function DashboardPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 md:p-6 md:pb-4 space-y-5 xl:h-[86.1vh] overflow-auto relative outline-0">
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-blue to-blue/50 rotate-[14deg] blur-3xl opacity-20 z-0 pointer-events-none"></div>
      {children}
    </div>
  );
}