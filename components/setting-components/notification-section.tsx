"use client";

import { Switch } from "@/components/ui/switch";
import ComponentContainer from "@/components/common/component-container";
import { NotificationSetting } from "@/types/notifications";
import { notificationSettingsData } from "@/lib/data/notifications";
import { useState } from "react";
// Button import removed - using custom button styling
import Image from "next/image";
import downloadIcon from "@/public/assets/save-disk.svg";

export default function NotificationSection() {
  const [settings, setSettings] = useState<NotificationSetting[]>(notificationSettingsData);

  const handleToggle = (settingId: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <div className="pb-5 flex-1">
    <ComponentContainer>
      <div className="settings-heading text-white text-lg font-normal">Notifications</div>
      <div className="flex flex-col gap-4 mt-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-start gap-2">
            <div className="-mt-[3px]">
              <Switch 
                checked={setting.enabled}
                onCheckedChange={() => handleToggle(setting.id)}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white settings-label">{setting.title}</h1>
              <p className="text-white/40 text-sm settings-label">
                {setting.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ComponentContainer>
    <button
          type="submit"
          className="mt-4 flex items-center justify-center gap-[10px] w-fit min-w-[180px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-white bg-[#0B0E1233] backdrop-blur-[44px] font-creato-display font-medium text-sm leading-[100%] text-white whitespace-nowrap"
        >
          <Image className="w-4 h-4" src={downloadIcon} alt="save-icon" />
          <span>
            Save Changes
          </span>
        </button>
    </div>
  );
}
