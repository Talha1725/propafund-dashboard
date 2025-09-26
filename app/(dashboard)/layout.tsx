import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { Navbar } from "@/components/common/dashboard_navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-dark w-screen overflow-x-hidden">
      <div className="bg-dark w-full">
        <SidebarProvider className="w-full"
          style={{
            "--sidebar-width": "280px",
          } as React.CSSProperties}
        >
          <AppSidebar />
          <main className="flex-1 xl:border border-l-0 xl:my-3 border-white/10 xl:mr-3 xl:rounded-r-[20px]">
            <Navbar />
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
