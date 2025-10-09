"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp } from "lucide-react";

interface BillingPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange?: (items: number) => void;
}

export default function BillingPagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange
}: BillingPaginationProps) {
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);
  const perPageOptions = [5, 10, 20, 50];
  
  // Generate page numbers for mobile view (show up to 8 pages)
  const generatePageNumbers = (): number[] => {
    const maxVisible = 8; // Show up to 8 page numbers
    const pages: number[] = [];
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, currentPage - 3);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex flex-col space-y-4">
      {/* Desktop view - full pagination with page info and items per page */}
      <div className="hidden md:flex items-center justify-between">
        {/* Page info */}
        <div className="text-white/80 text-sm font-creato-display">
          Page {currentPage} of {totalPages}
        </div>
        
        {/* Pagination controls */}
        <div className="flex items-center space-x-1">
          {/* First page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          
          {/* Previous page */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Page numbers */}
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium font-creato-display transition-colors ${
                currentPage === page
                  ? "bg-gradient-to-b from-white to-blue text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {page}
            </button>
          ))}
          
          {/* Next page */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          {/* Last page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Items per page dropdown */}
        {onItemsPerPageChange && (
          <div className="relative">
            <button
              onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 text-white text-sm font-creato-display hover:bg-white/20 transition-colors"
            >
              <span>{itemsPerPage} per page</span>
              <ChevronUp className="w-4 h-4" />
            </button>
            
            {showPerPageDropdown && (
              <div className="absolute right-0 bottom-full mb-1 bg-gray-800 border border-white/10 rounded-lg shadow-lg z-10 min-w-[120px]">
                {perPageOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onItemsPerPageChange(option);
                      setShowPerPageDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm font-creato-display hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      itemsPerPage === option ? "bg-white/20 text-white" : "text-white/80"
                    }`}
                  >
                    {option} per page
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile view - clean horizontal layout */}
      <div className="flex md:hidden items-center justify-center space-x-2">
        {/* Previous arrow */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {/* Page numbers - horizontal layout with wider buttons */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-14 h-8 rounded-lg text-sm font-bold font-creato-display transition-all duration-200 ${
              currentPage === page
                ? "bg-gradient-to-b from-white to-blue text-black shadow-lg" // Same as web view
                : "text-white hover:text-white/80"
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Next arrow */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
