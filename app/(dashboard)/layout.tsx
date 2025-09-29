import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { Navbar } from "@/components/common/dashboard_navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-dark w-screen">
      <SidebarProvider
        style={{
          "--sidebar-width": "280px",
        } as React.CSSProperties}
      >
        <AppSidebar />
        <SidebarInset className="bg-dark">
          <main className="flex-1 xl:border border-l-0 xl:my-3 border-white/10 xl:mr-3 xl:rounded-r-[20px]">
            <Navbar />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
