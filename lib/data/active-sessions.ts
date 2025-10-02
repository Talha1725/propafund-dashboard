import { ActiveSession } from "@/types/active-sessions";
// Using existing icons from assets
import laptopIcon from "@/public/assets/laptop-icon.svg";
import mozillaIcon from "@/public/assets/mozilla-icon.svg";
import chromeIcon from "@/public/assets/chrome-icon.svg";
import phoneIcon from "@/public/assets/phone.svg";

export const activeSessionsData: ActiveSession[] = [
  {
    id: "1",
    deviceName: "Macbook Pro",
    lastActive: "15 mins ago",
    location: "Chicago, United States",
    icon: laptopIcon,
    iconAlt: "laptop-icon",
  },
  {
    id: "2",
    deviceName: "Mozilla Firefox",
    lastActive: "45 mins ago",
    location: "Chicago, United States",
    icon: mozillaIcon,
    iconAlt: "mozilla-icon",
  },
  {
    id: "3",
    deviceName: "iPhone X",
    lastActive: "30 mins ago",
    location: "Chicago, United States",
    icon: phoneIcon,
    iconAlt: "phone-icon",
  },
  {
    id: "4",
    deviceName: "Google Chrome",
    lastActive: "2 hours ago",
    location: "Chicago, United States",
    icon: chromeIcon,
    iconAlt: "chrome-icon",
  },
];
