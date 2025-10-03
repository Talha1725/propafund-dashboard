"use client";

import { IconCalendarCustom } from "./icon";

// Wrapper component for calendar icon to match Tab interface
export const CalendarIcon = ({ className }: { className?: string }) => {
  const isActive = className?.includes('text-black') || false;
  return <IconCalendarCustom active={isActive} />;
};
