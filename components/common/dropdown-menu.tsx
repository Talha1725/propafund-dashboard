"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function DropdownMenuComponent({ 
  items, 
  onValueChange,
  className
}: { 
  items: string[],
  onValueChange?: (value: string) => void,
  className?: string
}) {
  const [selectedValue, setSelectedValue] = useState(items[0] || "");
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setOpen(false);
    onValueChange?.(value);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className={`bg-gradient-to-b from-[#FFFFFF12] to-[#FFFFFF07] rounded-lg px-4 py-2 border border-white/5 focus-within:outline-none text-white font-creato-display text-[14px] flex items-center gap-2 h-10 ${className}`}>
        <p>{selectedValue}</p> 
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!bg-[#1A1A1A] z-[9999] border-white/5">
        {items.map((item) => (
          <div
            key={item}
            className="text-white font-creato-display text-[14px] cursor-pointer px-2 py-1.5 hover:bg-white/10 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(item);
            }}
          >
            {item}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
