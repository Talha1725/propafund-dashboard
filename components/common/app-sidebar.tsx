"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/assets/dashbaord-logo.svg";
import {
  IconDashboard,
  IconAccount,
  IconChallenge,
  IconLeaderboard,
  IconCalendar,
  IconBill,
  IconAcademy,
  IconCertificate,
  IconSettings,
  IconHelp,
  IconAnalysis,
} from "./icon";
import { usePathname, useRouter } from "next/navigation";
import SidebarProfile from "./sidebar-profile";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: <IconDashboard />,
  },
  {
    title: "Trading Accounts",
    url: "/user/accounts",
    icon: <IconAccount />,
  },
  {
    title: "Challenges",
    url: "/user/challenges",
    icon: <IconChallenge />,
  },
  {
    title: "Leaderboard",
    url: "/user/leaderboard",
    icon: <IconLeaderboard />,
  },
  {
    title: "AI Performance Analysis",
    url: "/user/analysis",
    icon: <IconAnalysis />,
  },
  {
    title: "Economic Calendar",
    url: "/user/economic-calender",
    icon: <IconCalendar />,
  },
  {
    title: "Billing",
    url: "/user/billing",
    icon: <IconBill />,
  },
  {
    title: "Utopia Academy",
    url: "/user/academy",
    icon: <IconAcademy />,
  },
  {
    title: "Certificates",
    url: "/user/certificates",
    icon: <IconCertificate />,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: <IconSettings />,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-dark overflow-hidden border-r border-white/10 xl:border-none">
        <div className="xl:p-3 xl:pr-0 h-full backdrop-blur-2xl">
          <div className="w-full h-full py-6 flex flex-col xl:rounded-l-[20px] gradient-white xl:border border-white/10">
            {/* Logo Section */}
            <div className="px-6 w-full border-b border-white/10 flex items-center justify-center max-h-14 pb-5 mb-6">
              <Image
                src={logo}
                alt="FX Utopia"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Main Navigation Items */}
            <div className="flex flex-col flex-1 px-6">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="list-none w-full">
                  <SidebarMenuButton
                    asChild
                    className={`text-white opacity-50 h-10 hover:opacity-100 rounded-sm p-1 hover: px-3 py-2 hover:bg-transparent hover:text-white cursor-pointer active:bg-transparent active:text-white font-creato-display ${
                      pathname === item.url ||
                      (item.url === "/user/challenges" &&
                        pathname.startsWith("/user/challenges/"))
                        ? "bg-gradient-to-b from-white to-blue opacity-100 text-black hover:text-black"
                        : ""
                    }`}
                    onClick={() => {
                      router.push(item.url);
                    }}
                  >
                    <div className="flex items-center gap-1 h-full relative">
                      {item.icon}
                      <span className="text-sm font-lay-grotesk mt-[1px]">
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>

            {/* Bottom Section - Help and Settings */}
            <div className="flex flex-col gap-1 px-7">
              {/* Help - Highlighted */}
              <SidebarMenuItem className="list-none w-full">
                <SidebarMenuButton
                  asChild
                  className={`text-white opacity-50 h-10 hover:opacity-100 rounded-lg  p-1 hover: px-3 py-2 hover:bg-transparent hover:text-white cursor-pointer active:bg-transparent active:text-white ${
                    pathname === "/user/help"
                      ? "light-purple-gradient border-2 overflow-visible border-t-purple border-b-blue border-l-purple border-r-blue opacity-100 pl-4.5"
                      : ""
                  }`}
                  onClick={() => {
                    router.push("/user/help");
                  }}
                >
                  <div className="flex items-center gap-1 h-full relative">
                    {pathname === "/user/help" && (
                      <>
                        <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2  w-[70%] h-[2px] bg-white/50 rounded-full blur-sm z-50"></div>
                        <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2  w-[70%] h-[2px] bg-gradient-to-r from-blue via-white to-blue rounded-lg z-[999]"></div>
                      </>
                    )}
                    <IconHelp />
                    <span className="text-sm font-lay-grotesk mt-[1px]">
                      Help
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
            <div className="px-5 -translate-y-1">
              <SidebarProfile />
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
