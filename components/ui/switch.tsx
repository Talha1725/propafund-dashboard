"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-600 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-4 w-7 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block w-3 h-3 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:bg-black data-[state=unchecked]:bg-white relative flex items-center justify-center"
        )}
      >
        {/* Center dot for checked state (white dot on black knob) */}
        <div className="group-data-[state=checked]:block group-data-[state=unchecked]:hidden w-1 h-1 rounded-full bg-white" />
        {/* Center dot for unchecked state (black dot on white knob) */}
        <div className="group-data-[state=checked]:hidden group-data-[state=unchecked]:block w-1 h-1 rounded-full bg-black" />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
