"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search by name or ID",
  className 
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 font-creato-display bg-instant-funding border-gradient-to-b w-full md:w-[580px] h-[38px] font-normal text-sm"
      />
    </div>
  );
}
