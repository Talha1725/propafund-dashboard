"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
// import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import type { DataTableProps } from "@/types/common";

export default function DataTable({
  data,
  columns,
  className = "",
  responsive = true,
  dateHeader,
  showDateHeaders = false,
}: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [isResponsive, setIsResponsive] = useState(false);
  const [visibleRows, setVisibleRows] = useState<number>(data.length);
  const [visibleColumns, setVisibleColumns] = useState<number>(columns.length);
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    undefined
  );

  // Check if screen size is below breakpoint for column responsiveness
  React.useEffect(() => {
    // Auto-responsive logic for number of rows to show
    const getVisibleRowsCount = () => {
      if (!responsive) return data.length;

      // Since pagination is commented out, show all rows on all screen sizes
      return data.length;
    };

    // Auto-responsive logic for number of columns to show
    const getVisibleColumnsCount = (width: number) => {
      if (!responsive) return columns.length;

      if (width >= 1024) return columns.length; // lg and above - show all columns
      if (width >= 768) return Math.min(5, columns.length); // md - show up to 4 columns
      if (width >= 640) return Math.min(3, columns.length); // sm - show up to 3 columns
      return Math.min(2, columns.length); // below sm - show up to 2 columns
    };

    const checkScreenSize = () => {
      const breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      };
      const currentBreakpoint = breakpoints.lg;

      // Update visible columns count based on screen size
      const newVisibleColumns = getVisibleColumnsCount(window.innerWidth);
      setVisibleColumns(newVisibleColumns);

      // Only set isResponsive to true if there are hidden columns (need expand button)
      const hasHiddenColumns = newVisibleColumns < columns.length;
      setIsResponsive(
        window.innerWidth < currentBreakpoint && hasHiddenColumns
      );

      // Update visible rows count based on screen size
      const newVisibleRows = getVisibleRowsCount();
      setVisibleRows(newVisibleRows);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [responsive, data.length, columns.length]);

  // Sort data and limit visible rows
  const sortedData = useMemo(() => {
    let sorted = data;

    if (sortConfig.key) {
      sorted = [...data].sort((a, b) => {
        const aValue = (a as Record<string, unknown>)[sortConfig.key!];
        const bValue = (b as Record<string, unknown>)[sortConfig.key!];

        // Convert to strings for comparison
        const aStr = String(aValue || "");
        const bStr = String(bValue || "");

        if (aStr < bStr) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aStr > bStr) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    // Limit visible rows based on responsive settings
    return sorted.slice(0, visibleRows);
  }, [data, sortConfig, visibleRows]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
        setAccordionValue(undefined);
      } else {
        newSet.add(index);
        setAccordionValue(`item-${index}`);
      }
      return newSet;
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table */}
      <div>
        <Table>
          <TableHeader className="!border-b-0">
            <TableRow className="!border-b-0">
              {/* Mobile expand button header */}
              {isResponsive && columns.length > visibleColumns && (
                <TableHead className="w-12 p-2 bg-gradient-to-b from-white to-blue"></TableHead>
              )}

              {(isResponsive ? columns.slice(0, visibleColumns) : columns).map(
                (column) => (
                  <TableHead
                    key={String(column.key)}
                    className={`text-black font-creato-display font-semibold bg-gradient-to-b from-white to-blue pl-5`}
                  >
                    {column.sortable === true ? (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="font-semibold bg-transparent text-black font-creato-display p-0 hover:bg-transparent cursor-pointer border-none outline-none"
                      >
                        <span className="flex items-center gap-1">
                          {column.label}
                          <div className="flex flex-col">
                            <ChevronUp className="w-4 h-4 text-black translate-y-1" />
                            <ChevronDown className="w-4 h-4 text-black -translate-y-1" />
                          </div>
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Date Header Row */}
            {dateHeader && (
              <TableRow className="!border-b-0 hover:!bg-white/5">
                <TableCell
                  colSpan={columns.length}
                  className="px-6 py-3 dark-gradient border-b border-white/10 hover:!bg-white/5"
                >
                  <h2 className="text-white font-creato-display">
                    {dateHeader}
                  </h2>
                </TableCell>
              </TableRow>
            )}
            
            {sortedData.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-gray-400 py-8"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, index) => {
                const rowData = row as Record<string, unknown>;

                // Handle date header rows
                if (showDateHeaders && rowData.type === 'date-header') {
                  return (
                    <TableRow key={String(rowData.id)} className="!border-b-0 hover:!bg-white/5">
                      <TableCell
                        colSpan={columns.length}
                        className="px-4 py-3 dark-gradient border-b border-white/10 hover:!bg-white/5"
                      >
                        <h2 className="text-white font-creato-display">
                          {new Date(rowData.date as string).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </h2>
                      </TableCell>
                    </TableRow>
                  );
                }

                // Split columns for mobile view
                const visibleColumnsList = isResponsive
                  ? columns.slice(0, visibleColumns)
                  : columns;
                const hiddenColumns = isResponsive
                  ? columns.slice(visibleColumns)
                  : [];

                return (
                  <React.Fragment key={index}>
                    <TableRow
                      className={`border-none transition-colors relative hover:bg-transparent
                       ${
                        index !== sortedData.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      {/* Mobile expand button */}
                      {isResponsive && hiddenColumns.length > 0 && (
                        <TableCell
                          className={`w-12 p-2 overflow-hidden relative z-10 bg-transparent ${index !== sortedData.length - 1 ? "border-b border-white/10" : ""}`}
                        >
                          <button
                            onClick={() => toggleRow(index)}
                            className="w-8 h-8 p-0 bg-transparent hover:bg-transparent rounded-full overflow-hidden cursor-pointer border-none outline-none"
                          >
                            <Plus
                              className={`w-4 h-4 text-[ffffff06] transition-transform ${
                                expandedRows.has(index) ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                        </TableCell>
                      )}

                      {visibleColumnsList.map((column) => (
                        <TableCell
                          key={String(column.key)}
                          className={`text-white py-2 md:py-3 pl-5 font-creato-display overflow-hidden relative z-10 bg-transparent ${index !== sortedData.length - 1 ? "border-b border-white/10" : ""}`}
                        >
                          {column.render
                            ? column.render(rowData[column.key], row)
                            : rowData[column.key]?.toString() || "-"}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Accordion for expanded row content on mobile */}
                    {isResponsive && hiddenColumns.length > 0 && (
                      <TableRow className="!border-none hover:!bg-transparent">
                        <TableCell
                          colSpan={visibleColumnsList.length + 1}
                          className="p-0 !border-none overflow-hidden"
                        >
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full !border-none hover:bg-transparent"
                            value={accordionValue}
                            onValueChange={(value) => {
                              if (value === `item-${index}`) {
                                setAccordionValue(value);
                                setExpandedRows(
                                  (prev) => new Set([...prev, index])
                                );
                              } else {
                                setAccordionValue(undefined);
                                setExpandedRows((prev) => {
                                  const newSet = new Set(prev);
                                  newSet.delete(index);
                                  return newSet;
                                });
                              }
                            }}
                          >
                            <AccordionItem
                              value={`item-${index}`}
                              className="!border-none hover:!bg-transparent"
                            >
                              <AccordionContent
                                className={`p-4 font-creato-display bg-[#ffffff06] backdrop-blur-2xl relative overflow-hidden border-0`}
                              >
                                <div className="absolute w-full h-full top-0 left-0 border border-white/10 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[3px] rounded-xl bg-gradient-to-b from-purple to-blue blur opacity-70 pointer-events-none"></div>

                                <div className="space-y-3">
                                  {hiddenColumns.map((column) => (
                                    <div
                                      key={column.key}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-gray-400 font-medium font-creato-display">
                                        {column.label}:
                                      </span>
                                      <span className="text-white font-creato-display">
                                        {column.render
                                          ? column.render(
                                              rowData[column.key],
                                              row
                                            )
                                          : rowData[column.key]?.toString() ||
                                            "-"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results count */}
      {/* {responsive && (
        <div className="text-sm text-gray-400">
          Showing {sortedData.length} of {data.length} results
        </div>
      )} */}
    </div>
  );
}
