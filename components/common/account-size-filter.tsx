"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AccountSizeFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ACCOUNT_SIZE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "5k", label: "$5k" },
  { value: "10k", label: "$10k" },
  { value: "25k", label: "$25k" },
  { value: "50k", label: "$50k" },
  { value: "100k", label: "$100k" },
  { value: "500k", label: "$500k" },
  { value: "1M", label: "$1M" }
] as const;

export default function AccountSizeFilter({ 
  value, 
  onChange, 
  className 
}: AccountSizeFilterProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(newValue) => onChange(newValue || "all")}
      className={`flex gap-2 overflow-x-auto pb-2 ${className || ""}`}
    >
      {ACCOUNT_SIZE_OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={`px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
            value === option.value
              ? 'text-black font-medium'
              : 'text-[oklch(0.556_0_0)]'
          }`}
          style={{
            background: value === option.value 
              ? 'linear-gradient(180deg, #FFFFFF 0%, #4EB2E4 100%)'
              : 'transparent',
            border: 'none',
            boxShadow: 'none',
            fontFamily: 'Creato Display',
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: '14px'
          }}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
