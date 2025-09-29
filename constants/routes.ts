export type Route = {
  href: string;
  label: string;
  description?: string;
};

// Main navigation routes (appear in navbar)
export const NAVBAR_ROUTES: Route[] = [
  { href: "/home", label: "Home" },
  { href: "/challenges", label: "Challenges" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
];

// Footer quicklinks
export const FOOTER_QUICKLINKS: Route[] = [
  { href: "/about-us", label: "About Us" },
  { href: "#", label: "Evaluation" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "Testimonials" },
  { href: "/faq", label: "FAQs" },
];

// Footer legal links
export const FOOTER_LEGAL: Route[] = [
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Legal Disclosure" },
];

// Action/CTA routes (accessed via buttons, not navigation)
export const ACTION_ROUTES: Route[] = [
  { href: "/challenges", label: "Get Funded Now", description: "Start your trading challenge" },
  { href: "/get-funded", label: "Get Funded", description: "Complete funding process" },
  { href: "/complete-purchase", label: "Complete Purchase", description: "Finish your purchase" },
  { href: "/promos", label: "Promotions", description: "View current promotions" },
];

// All available routes
export const ALL_ROUTES: Route[] = [
  ...NAVBAR_ROUTES,
  ...FOOTER_QUICKLINKS,
  ...ACTION_ROUTES,
];

// Route validation helper
export const isValidRoute = (href: string): boolean => {
  return ALL_ROUTES.some(route => route.href === href);
};

// Get route by href
export const getRouteByHref = (href: string): Route | undefined => {
  return ALL_ROUTES.find(route => route.href === href);
};
