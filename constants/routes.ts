export type Route = {
  href: string;
  label: string;
  description?: string;
};

export const NAVBAR_ROUTES: Route[] = [
  { href: "/home", label: "Home" },
  { href: "/challenges", label: "Challenges" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
];

export const FOOTER_QUICKLINKS: Route[] = [
  { href: "/about-us", label: "About Us" },
  { href: "#", label: "Evaluation" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "Testimonials" },
  { href: "/faq", label: "FAQs" },
];

export const FOOTER_LEGAL: Route[] = [
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Legal Disclosure" },
];

export const ACTION_ROUTES: Route[] = [
  { href: "/challenges", label: "Get Funded Now", description: "Start your trading challenge" },
  { href: "/process", label: "Our Process", description: "Learn about our funding process" },
  { href: "/get-funded", label: "Get Funded", description: "Complete funding process" },
  { href: "/complete-purchase", label: "Complete Purchase", description: "Finish your purchase" },
  { href: "/promos", label: "Promotions", description: "View current promotions" },
];

export const ALL_ROUTES: Route[] = [
  ...NAVBAR_ROUTES,
  ...FOOTER_QUICKLINKS,
  ...ACTION_ROUTES,
];

export const isValidRoute = (href: string): boolean => {
  return ALL_ROUTES.some(route => route.href === href);
};

export const getRouteByHref = (href: string): Route | undefined => {
  return ALL_ROUTES.find(route => route.href === href);
};
