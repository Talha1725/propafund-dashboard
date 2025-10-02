"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { Navbar } from "@/components/common/dashboard_navbar";
import { isAuthenticatedAtom } from '@/lib/store/atoms';
import PageHeadings from "@/components/common/page-headings";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-dark flex items-center justify-center">
  //       <div className="text-white text-lg">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-dark overflow-hidden">
      <SidebarProvider
        style={{
          "--sidebar-width": "280px",
        } as React.CSSProperties}
      >
        <AppSidebar />
        <SidebarInset className="bg-dark w-full">
          <main className="flex-1 xl:border border-l-0 xl:my-3 border-white/10 xl:mr-3 xl:rounded-r-[20px]">
            <Navbar />
            <PageHeadings />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

