"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"

interface CalendarPopupProps {
  selectedDate?: Date
  onDateSelect?: (date: Date | undefined) => void
  isOpen: boolean
  className?: string
}

export function CalendarPopup({
  selectedDate,
  onDateSelect,
  isOpen,
  className,
}: CalendarPopupProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const handleDateSelect = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation()
    onDateSelect?.(date)
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const startDate = new Date(monthStart)
  startDate.setDate(startDate.getDate() - startDate.getDay()) // Start from Sunday
  const endDate = new Date(monthEnd)
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay())) // End on Saturday

  const days = eachDayOfInterval({ start: startDate, end: endDate })
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  if (!isOpen) return null

  return (
    <div 
      className={cn(
        "bg-black rounded-lg p-4 w-[280px] relative z-[99999]",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Calendar */}
      <div>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={(e) => handlePrevMonth(e)}
            className="h-6 w-6 p-0 text-white hover:bg-gray-800 rounded flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-base font-medium text-white">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <button
            onClick={(e) => handleNextMonth(e)}
            className="h-6 w-6 p-0 text-white hover:bg-gray-800 rounded flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Weekdays */}
        <div className="flex mb-2">
          {weekdays.map((day) => (
            <div key={day} className="w-10 h-6 flex items-center justify-center text-xs text-white">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-0">
          {days.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isTodayDate = isToday(day)
            
            return (
              <button
                key={index}
                onClick={(e) => handleDateSelect(day, e)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors",
                  "hover:bg-gray-800",
                  !isCurrentMonth && "text-gray-500",
                  isCurrentMonth && "text-white",
                  isTodayDate && "bg-gray-500 text-black font-medium",
                  isSelected && "bg-blue-600 text-white font-medium"
                )}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
