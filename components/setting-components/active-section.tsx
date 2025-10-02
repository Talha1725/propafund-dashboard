"use client";

import ComponentContainer from "@/components/common/component-container";
import Image from "next/image";
import { X } from "lucide-react";
import { activeSessionsData } from "@/lib/data/active-sessions";
import { ActiveSession } from "@/types/active-sessions";

import { useState } from "react";

export default function ActiveSection() {
  const [sessions, setSessions] = useState<ActiveSession[]>(activeSessionsData);

  const handleRemoveSession = (sessionId: string) => {
    setSessions(prevSessions => 
      prevSessions.filter(session => session.id !== sessionId)
    );
  };

  return (
    <ComponentContainer className={`mt-5 ${sessions.length > 0 ? "" : "hidden"}`}>
          <div className="settings-heading text-white text-lg font-normal">Active Sessions</div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className="dark-gradient p-4 rounded-[10px] border border-white/10 flex items-center gap-4"
          >
            <div className="min-w-9 min-h-9 bg-white/5 rounded-full flex items-center justify-center">
              <Image 
                src={session.icon} 
                alt={session.iconAlt} 
                width={16} 
                height={16} 
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-white text-sm settings-label">
                  {session.deviceName}
                </p>
                <p className="text-white/50 text-xs settings-label">
                  ({session.lastActive})
                </p>
              </div>
              <p className="text-white/50 text-xs settings-label">
                {session.location}
              </p>
            </div>
            <button 
              onClick={() => handleRemoveSession(session.id)}
              className="text-white size-4 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ComponentContainer>
  );
}
