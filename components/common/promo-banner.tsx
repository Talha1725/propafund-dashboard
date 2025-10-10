"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { banner } from "@/lib/api/endpoints/banner";
import type { BannerConfig } from "@/types/banner";

export default function PromoBanner() {
  const [bannerData, setBannerData] = useState<BannerConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      // Check if user has a token - banner is optional for non-authenticated users
      const token = localStorage.getItem('token');
      
      // Only attempt to fetch banner if user is authenticated
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await banner.getActiveBanner();
        if (response.success && response.data.isActive) {
          setBannerData(response.data);
        }
      } catch (error) {
        // Silently handle errors - banner is not critical
        console.debug('Banner not available:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // Don't render anything if loading, no banner data, or banner is inactive
  if (loading || !bannerData || !bannerData.isActive) {
    return null;
  }

  const bannerContent = (
    <div className="w-full h-[65px] flex items-center justify-center px-5 py-5 bg-gradient-to-b from-[#60A8E8] to-[#3B62B8]">
      <div className="flex items-center gap-2.5">
        <p className="text-white text-center font-lay-grotesk font-medium text-sm sm:text-xl leading-[130%] tracking-[-2%]">
          {bannerData.text}
        </p>
        <Link href="/promos">
          <Button className="w-[80px] sm:w-[101px] h-[35px] sm:h-[45px] rounded-xl border-[1.26px] py-2 sm:py-3 px-3 sm:px-5 text-white bg-white border-white font-lay-grotesk font-medium text-sm sm:text-base leading-[130%] tracking-[-2%]">
            Join Now
          </Button>
        </Link>
      </div>
    </div>
  );

  return bannerContent;
}
