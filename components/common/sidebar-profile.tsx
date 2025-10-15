"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { clearAuthAtom, userAtom } from "@/lib/store/atoms";
import { auth } from "@/lib/api/endpoints/auth";
import { toast } from "sonner";

export default function SidebarProfile() {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [, clearAuth] = useAtom(clearAuthAtom);

  const handleLogout = async () => {
    try {
      await auth.logout();
      clearAuth();
      toast.success("Logged out successfully");
      
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getUserInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map(name => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 !rounded-full">
                <AvatarImage
                  className="!rounded-full"
                  src={user?.picture || ""}
                  alt={user?.fullName || "User"}
                />
                <AvatarFallback className="bg-gradient-to-b from-blue to-dark-blue text-white text-xs font-medium !rounded-lg">
                  {user?.fullName ? getUserInitials(user.fullName) : "US"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-white font-lay-grotesk">
                  {user?.userName || "User"}
                </span>
                <span className="text-xs text-gray-400 font-lay-grotesk">
                  {user?.email || ""}
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
            onClick={handleLogout}
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
