"use client";

import Image from "next/image";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { FilterDropdownProps, FilterGroup, FilterOption } from "@/types/filter";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function FilterDropdown({
  filterGroups,
  filterState,
  onFilterChange,
  onClearAllFilters,
  triggerLabel = "Filters",
  triggerIcon,
  className = "",
}: FilterDropdownProps) {
  const getActiveFiltersCount = () => {
    let count = 0;
    
    filterGroups.forEach(group => {
      if (group.type === 'radio') {
        const value = filterState[group.id];
        if (value && value !== 'all' && value !== '') count++;
      } else if (group.type === 'checkbox') {
        const values = filterState[group.id] as string[];
        if (values && values.length > 0) count++;
      }
    });
    
    return count;
  };

  const handleRadioChange = (groupId: string, value: string) => {
    onFilterChange(groupId, value);
  };

  const handleCheckboxChange = (groupId: string, optionId: string) => {
    const currentValues = (filterState[groupId] as string[]) || [];
    const newValues = currentValues.includes(optionId)
      ? currentValues.filter(id => id !== optionId)
      : [...currentValues, optionId];
    onFilterChange(groupId, newValues);
  };

  const renderOption = (group: FilterGroup, option: FilterOption) => {
    if (group.id === 'currencies' && option.countryCode) {
      return (
        <div className="w-4 h-4 rounded-full flex items-center justify-center overflow-hidden mr-2">
          <ReactCountryFlag
            countryCode={option.countryCode}
            svg
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%'
            }}
            title={option.label}
          />
        </div>
      );
    }
    
    if (option.color) {
      return <span className={option.color}>●</span>;
    }
    
    return null;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-white/10 to-transparent rounded-lg border border-white/5 h-10 text-white transition-colors w-fit ${className}`}>
          {triggerIcon && <Image src={triggerIcon} alt="Filter" />}
          <span className="text-white font-creato-display text-sm">{triggerLabel}</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-white text-black text-xs flex items-center justify-center rounded-full w-5 h-5 text-center font-medium">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 bg-[#1a1a1a] border-white/20 text-white !z-[99999]"
        align="end"
      >
        <DropdownMenuLabel className="text-white font-medium">
          Filter Items
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        
        {filterGroups.map((group, groupIndex) => (
          <div key={group.id}>
            <DropdownMenuLabel className="text-white/70 text-xs font-medium px-2 py-1">
              {group.label}
            </DropdownMenuLabel>
            
            {group.type === 'radio' ? (
              <DropdownMenuRadioGroup 
                value={filterState[group.id] as string || 'all'} 
                onValueChange={(value) => handleRadioChange(group.id, value)}
              >
                {group.options.map((option) => (
                  <DropdownMenuRadioItem 
                    key={option.id} 
                    value={option.id}
                    className="text-white hover:bg-white/10"
                  >
                    {renderOption(group, option)}
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            ) : (
              group.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.id}
                  checked={(filterState[group.id] as string[] || []).includes(option.id)}
                  onCheckedChange={() => handleCheckboxChange(group.id, option.id)}
                  className="text-white hover:bg-white/10"
                >
                  {renderOption(group, option)}
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))
            )}
            
            {groupIndex < filterGroups.length - 1 && (
              <DropdownMenuSeparator className="bg-white/20" />
            )}
          </div>
        ))}
        
        <DropdownMenuSeparator className="bg-white/20" />
        
        {/* Clear Filters */}
        <DropdownMenuItem 
          onClick={onClearAllFilters}
          className="text-red-400 hover:bg-red-400/10 cursor-pointer"
        >
          Clear All Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
