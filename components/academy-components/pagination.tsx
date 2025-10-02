"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import DropdownMenuComponent from "@/components/common/dropdown-menu";
import { PaginationProps } from "@/types/academy";

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
}: PaginationProps) {
  const maxVisiblePages = 4;
  const pages = Array.from({ length: Math.min(totalPages, maxVisiblePages) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center md:justify-between mt-8">
      <div className="text-white/80 text-[14px] font-creato-display md:block hidden">
        Page {currentPage} of {totalPages}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-white hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-white hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-md text-sm font-medium font-creato-display transition-colors ${
              currentPage === page
                ? "bg-gradient-to-b from-white to-blue border-white/80 text-black"
                : "border border border-white/10 text-white hover:text-white hover:bg-white/10"
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-white hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-white hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
      
      <DropdownMenuComponent items={["1 / page", "2 / page", "3 / page", "4 / page"]} onValueChange={(value) => onPageChange(parseInt(value))} className="md:flex hidden" />
    </div>
  );
}
