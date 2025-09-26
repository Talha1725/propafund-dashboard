"use client";

import { ChevronDown, Search } from "lucide-react";
import { Input } from "../ui/input";
import bell from "@/public/assets/bell.svg";
import toggle from "@/public/assets/toggle-icon.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import logo from "@/public/assets/dashbaord-logo.svg";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Navbar() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const getPageTitle = (path: string) => {
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    switch (path) {
      case "/user/leaderboard":
        return "Leaderboard";
      case "/user/accounts":
        return "Trading Accounts";
      case "/user/account-details":
        return "Trading Accounts";
      case "/user/challenges":
        return "Challenges";
      case "/user/analysis":
        return "AI Performance Analysis";
      case "/user/calendar":
        return "Economic Calendar";
      case "/user/billing":
        return "Billing";
      case "/user/academy":
        return "Utopia Academy";
      case "/user/certificates":
        return "Certificates";
      case "/user/settings":
        return "Settings";
      case "/user/help":
        return "Help Center";
      default:
        if (path.startsWith("/user/challenges/")) {
          return "Challenges";
        }
        if (path.startsWith("/user/certificates/")) {
          return "Certificate";
        }
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="md:h-[80px] h-[60px] w-full px-6 border-b border-white/10 bg-[#0F0F0F] md:bg-transparent">
      <div className="flex items-center justify-between h-full w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer xl:hidden block"
          >
            <Image src={toggle} alt="logo" className="w-7 h-7" />
          </button>
          <h1 className="xl:block hidden text-2xl font-creato-display font-semibold text-white">
            {pageTitle}
          </h1>
          <div className="xl:hidden block">
            <Image
              src={logo}
              alt="FX Utopia"
              width={165}
              height={45}
              className="w-[150px] sm:w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-center sm:gap-2 gap-1">
          <button className="flex h-10 w-10 items-center justify-center border border-white/10 rounded-lg px-2 light-white-gradient hover:opacity-50 cursor-pointer bg-gradient-to-b from-white/5 to-transparent">
            <Image src={bell} alt="bell" className="w-4 h-4" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="md:w-[117px] h-10 border border-white/10 rounded-lg md:px-2 px-3 light-white-gradient hover:opacity-50 cursor-pointer bg-gradient-to-b from-white/5 to-transparent flex gap-2 items-center justify-center outline-0">
              <span className="md:block hidden text-white font-creato-display text-sm">
                #2138931
              </span>
              <ChevronDown className="w-4 h-4 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark border border-white/10 outline-0">
              <DropdownMenuItem className="text-white">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-white">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
