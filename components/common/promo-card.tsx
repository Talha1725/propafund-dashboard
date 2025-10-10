"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import type { PromoCardProps } from "@/types/promo";

export default function PromoCard({
  icon,
  iconAlt,
  title,
  description,
  buttonText,
  buttonLink,
  tagText,
  timerText,
  initialDays,
  initialHours,
  initialMins,
  seatsLeft,
}: PromoCardProps) {
  return (
    <div className="relative w-full max-w-[1076px] mx-auto">
      <div className="relative overflow-hidden w-full h-auto rounded-[20px] p-6 md:p-8 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-white/10">
        {/* Background gradient effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#9B78C3]/10 to-[#3B65CF]/10 pointer-events-none" />
        
        {/* Top border line */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[85%] h-px"
          style={{
            background: 'linear-gradient(90deg, rgba(155, 120, 195, 0) 0%, rgba(155, 120, 195, 0.5) 30%, rgba(155, 120, 195, 0.5) 70%, rgba(155, 120, 195, 0) 100%)'
          }}
        />
        
        {/* Bottom border line */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] h-px"
          style={{
            background: 'linear-gradient(90deg, rgba(59, 101, 207, 0) 0%, rgba(59, 101, 207, 0.5) 30%, rgba(59, 101, 207, 0.5) 70%, rgba(59, 101, 207, 0) 100%)'
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon and Tag Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative">
              <Image
                src={icon}
                alt={iconAlt}
                width={60}
                height={60}
                className="w-15 h-15 object-contain"
              />
              {tagText && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#9B78C3] to-[#3B65CF] text-white text-xs font-medium px-2 py-1 rounded-full">
                  {tagText}
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-white font-lay-grotesk font-semibold text-xl md:text-2xl leading-tight mb-2">
                {title}
              </h3>
              <p className="text-white/70 font-lay-grotesk font-normal text-base leading-relaxed">
                {description}
              </p>
              
              {/* Timer and Seats Info */}
              {(timerText || seatsLeft) && (
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {timerText && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <div className="w-2 h-2 bg-[#9B78C3] rounded-full" />
                      <span>{timerText}</span>
                    </div>
                  )}
                  {seatsLeft && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <div className="w-2 h-2 bg-[#3B65CF] rounded-full" />
                      <span>{seatsLeft} seats left</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Button Section */}
            <div className="flex-shrink-0">
              <Link href={buttonLink}>
                <Button className="w-full md:w-auto min-w-[140px] h-12 rounded-xl bg-gradient-to-r from-[#9B78C3] to-[#3B65CF] hover:from-[#8A6BB8] hover:to-[#2A4FB8] text-white font-lay-grotesk font-medium text-base transition-all duration-200 border-0">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
