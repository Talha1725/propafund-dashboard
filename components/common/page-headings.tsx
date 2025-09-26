"use client";
import { usePathname } from "next/navigation";

export default function PageHeadings() {
  const pathname = usePathname();
  
  // Don't show heading on dashboard page
  if (pathname === "/user/dashboard") {
    return null;
  }
  
  // Define page titles based on URL
  const getPageTitle = (path: string) => {
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    switch (path) {
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
        return "Utopia Academy";
      case "/user/certificates":
        return "Certificates";
      case "/user/settings":
        return "Settings";
      case "/user/help":
        return "Help";
      default:
        // Handle dynamic challenge routes like /user/challenges/[id]
        if (path.startsWith("/user/challenges/")) {
          return "Challenges";
        }
        // Handle dynamic certificate routes like /user/certificates/[id]
        if (path.startsWith("/user/certificates/") && path !== "/user/certificates") {
          return "Certificate";
        }
        // Fallback: capitalize the last segment of the URL
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
  };
  
  const pageTitle = getPageTitle(pathname);
  
  return (
    <div className="xl:hidden px-4 mt-4">
      <h1 className="text-white text-2xl font-medium font-lay-grotesk">
        {pageTitle}
      </h1>
    </div>
  );
}
