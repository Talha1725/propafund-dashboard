"use client";
import React, { useState } from "react";
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
} from "./icon";
import { usePathname, useRouter } from "next/navigation";
import SidebarProfile from "./sidebar-profile";
import ThunderIcon from "@/public/assets/thunder-icon";
import HelpModal from "./help-modal";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: <IconDashboard active={false} />,
  },
  {
    title: "Trading Accounts",
    url: "/user/accounts",
    icon: <IconAccount active={false} />,
  },
  {
    title: "Challenges",
    url: "/user/challenges",
    icon: <IconChallenge active={false} />,
  },
  {
    title: "Leaderboard",
    url: "/user/leaderboard",
    icon: <IconLeaderboard active={false} />,
  },
  {
    title: "Academy",
    url: "/user/academy",
    icon: <IconAcademy active={false} />,
  },
  {
    title: "Economic Calendar",
    url: "/user/economic-calender",
    icon: <IconCalendar active={false} />,
  },
  {
    title: "Billing",
    url: "/user/billing",
    icon: <IconBill active={false} />,
  },
  {
    title: "Certificates",
    url: "/user/certificates",
    icon: <IconCertificate active={false} />,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: <IconSettings active={false} />,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };
  
  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-dark overflow-hidden border-r-0 xl:border-r border-white/10 xl:border-none relative">
        <div className="xl:p-3 xl:pr-0 h-full backdrop-blur-2xl">
          <ThunderIcon className="absolute bottom-[-69px] xl:bottom-[-57px] right-[-150px] -z-10 " />
          <div className="w-full h-full pt-6 flex flex-col xl:rounded-l-[20px] gradient-white xl:border border-white/10">
            <div className="px-6 w-full border-b border-white/10 flex items-center justify-center max-h-14 pb-5 mb-6">
              <Image
                src={logo}
                alt="FX Utopia"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col flex-1 px-6">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="list-none w-full">
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.url ||
                      (item.url === "/user/challenges" &&
                        pathname.startsWith("/user/challenges/"))
                    }
                    className={`text-white opacity-50 h-10 hover:opacity-100 rounded-sm px-3 py-2 hover:bg-transparent hover:text-white cursor-pointer active:bg-transparent active:text-white font-creato-display ${
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
                      {item.title === "AI Performance Analysis"
                        ? item.icon
                        : React.cloneElement(item.icon, {
                            active:
                              pathname === item.url ||
                              (item.url === "/user/challenges" &&
                                pathname.startsWith("/user/challenges/")),
                          })}
                      <span className="text-sm font-creato-display mt-[1px]">
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
            <div className="px-6 py-2 relative z-50">
              <button
                onClick={openHelpModal}
                className="w-full text-white opacity-50 h-10 hover:opacity-100 rounded-sm px-3 py-2 hover:text-white cursor-pointer active:bg-transparent active:text-white font-creato-display flex items-center gap-1 relative z-50"
              >
                <IconHelp active={false} />
                <span className="text-sm font-creato-display mt-[1px]">
                  Help
                </span>
              </button>
            </div>

            <div className="px-8 py-4 border-t border-white/10 backdrop-blur-2xl relative z-[1]">
              <SidebarProfile />
            </div>
          </div>
        </div>
      </SidebarContent>
      
      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={closeHelpModal} 
      />
    </Sidebar>
  );
}
