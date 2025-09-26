"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

export default function SidebarProfile() {
  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 !rounded-lg">
                <AvatarImage
                  className="!rounded-lg"
                  src={""}
                  alt={"User"}
                />
                <AvatarFallback className="bg-gradient-to-b from-blue to-dark-blue text-white text-xs font-medium !rounded-lg">
                  US
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-white font-lay-grotesk">
                  User
                </span>
                <span className="text-xs text-white/50 font-lay-grotesk">
                  email@example.com
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-[#1a1a1a] border border-white/10 rounded-lg p-2 !z-[9999999]"
          align="center"
        >
          <DropdownMenuItem
            onClick={() => {}}
            className="text-white hover:!text-white hover:!bg-white/5 cursor-pointer"
          >
            <LogOut className="mr-1 h-4 w-4 text-white" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
