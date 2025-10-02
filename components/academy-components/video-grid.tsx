"use client";

import { Video, VideoGridProps } from "@/types/academy";
import { Clock } from "lucide-react";
import Image from "next/image";
import PlayIcon from "@/public/assets/polygon.svg";

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="dark-gradient p-5 border border-white/10 rounded-[20px] group cursor-pointer hover:border-white/20 transition-colors">
          <div className="aspect-video rounded-md overflow-hidden">
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={400}
              height={225}
              className="object-cover w-full h-full rounded"
            />
          </div>
          <div className="mt-5 h-10">
            <span className="text-white font-creato-display text-[18px] font-medium leading-tight line-clamp-2 overflow-hidden">
              {video.title.length > 80 
                ? `${video.title.substring(0, 80)}...` 
                : video.title
              }
            </span>
          </div>

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/80" />
              <p className="text-white font-creato-display text-[14px] font-regular">{video.duration}</p>
            </div>
            <div>
              <button 
                className="border border-white/10 rounded-md p-2 hover:bg-white/10 transition-colors"
                style={{
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                }}
              >
                <Image src={PlayIcon} alt="play-icon" className="w-3.5 h-3.5 fill-white text-white" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
