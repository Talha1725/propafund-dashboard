"use client";

import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import DataTable from "../common/data-table";
import { eventsData, eventsColumns } from "@/lib/data/events";
import DashboardHeadings from "../common/dashboard-headings";

export default function EventsSection({ className }: { className?: string }) {

  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] w-full lg:w-[33%] xl:w-[43%] flex flex-col justify-between max-h-[500px] overflow-y-auto ${className}`}
    >
      <div className="flex flex-row justify-between items-center gap-2.5 px-5 py-4">
        <DashboardHeadings title="Upcoming News Events" />

        <DropdownMenu>
          <DropdownMenuTrigger className="md:w-[117px] h-10 border border-white/10 rounded-lg md:px-2 px-3 light-white-gradient hover:opacity-50 cursor-pointer bg-gradient-to-b from-white/5 to-transparent flex gap-2 items-center justify-center outline-0">
            <span className="text-white font-creato-display text-sm">
              0-3 Days
            </span>
            <ChevronDown className="w-4 h-4 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark border border-white/10 outline-0">
            <DropdownMenuItem className="text-white">0-3 Days</DropdownMenuItem>
            <DropdownMenuItem className="text-white">3-5 Days</DropdownMenuItem>
            <DropdownMenuItem className="text-white">1-3 Days</DropdownMenuItem>
            <DropdownMenuItem className="text-white">1-2 Days</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="">
        <DataTable
          data={eventsData}
          columns={eventsColumns}
          className="events-table"
          responsive={true}
        />
      </div>
    </div>
  );
}
