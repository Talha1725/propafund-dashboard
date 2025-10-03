import { NotificationSetting } from "@/types/notifications";

export const notificationSettingsData: NotificationSetting[] = [
  {
    id: "1",
    title: "Weekly Recap",
    description: "Get a summary of your trading performance, key market trends, and platform highlights every week.",
    enabled: true,
  },
  {
    id: "2",
    title: "Macro Events",
    description: "Stay informed about major economic events, central bank updates, and market-moving news.",
    enabled: false,
  },
  {
    id: "3",
    title: "Trade Alerts",
    description: "Receive instant notifications when your trades are executed or when a major price level is reached.",
    enabled: false,
  },
  {
    id: "4",
    title: "Challenge Updates",
    description: "Get notified about your challenge progress, verifications, and any changes to your account status.",
    enabled: false,
  },
  {
    id: "5",
    title: "Market Open/Close Alerts",
    description: "Reminders for global market openings and closings to plan your trading sessions effectively.",
    enabled: false,
  },
];
