"use client";
import { usePathname } from "next/navigation";

export default function PageHeadings() {
  const pathname = usePathname();
  
  const getPageTitle = (path: string) => {
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    switch (path) {
      case "/user/dashboard":
        return "Dashboard";
      case "/user/leaderboard":
        return "Leaderboard";
      case "/user/accounts":
        return "Trading Accounts";
      case "/user/account-details":
        return "Trading Accounts";
      case "/user/challenges":
        return "Challenges";
      case "/user/analysis":
       return "AI Performance Analysis";
      case "/user/calendar":
        return "Economic Calendar";
      case "/user/billing":
        return "Billing";
      case "/user/academy":
        return "Academy";
      case "/user/certificates":
        return "Certificates";
      case "/user/settings":
        return "Settings";
      case "/user/help":
        return "Help";
      default:
        if (path.startsWith("/user/challenges/")) {
          return "Challenges";
        }
        if (path.startsWith("/user/certificates/") && path !== "/user/certificates") {
          return "Certificate";
        }
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
  };
  
  const pageTitle = getPageTitle(pathname);
  
  return (
    <div className="block xl:hidden px-4 mt-4">
      <h1 className="text-white text-2xl font-medium font-creato-display">
        {pageTitle}
      </h1>
    </div>
  );
}
