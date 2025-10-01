import { type FieldConfig } from "@/components/support/support-form";

export const purchaseFields: FieldConfig[] = [
  { type: "text", name: "firstName", label: "First Name", placeholder: "First Name" },
  { type: "text", name: "lastName", label: "Last Name", placeholder: "Last Name" },
  { type: "select", name: "country", label: "Country/Region", placeholder: "Select Country", fullWidth: true, options: [
    { label: "United States (US)", value: "us" },
    { label: "United Kingdom (UK)", value: "uk" },
    { label: "Canada (CA)", value: "ca" },
    { label: "Australia (AU)", value: "au" },
    { label: "Germany (DE)", value: "de" },
    { label: "France (FR)", value: "fr" },
  ]},
  { type: "text", name: "streetAddress", label: "Street Address", placeholder: "Street Address", fullWidth: true },
  { type: "text", name: "city", label: "Town / City", placeholder: "Town / City" },
  { type: "select", name: "state", label: "State", placeholder: "Select State", options: [
    { label: "California", value: "ca" },
    { label: "New York", value: "ny" },
    { label: "Texas", value: "tx" },
    { label: "Florida", value: "fl" },
    { label: "Illinois", value: "il" },
  ]},
  { type: "text", name: "zipCode", label: "ZIP Code", placeholder: "ZIP Code", fullWidth: true },
  { type: "text", name: "phone", label: "Phone", placeholder: "Phone" },
  { type: "email", name: "email", label: "Email Address", placeholder: "Email Address" },
];

export const orderDetails = [
  ["Challenge Duration", "Unlimited"],
  ["Leverage", "1:100"],
  ["Minimum Trading Days", "1 Day"],
  ["Max Loss", "8%"],
  ["Daily Loss", "5%"],
  ["Weekend / Crypto Trading", "Yes"],
  ["EAs Enabled", "Yes"],
  ["Order Total", "$279.00"],
];

export const paymentMethods = [
  { value: "crypto", label: "Crypto" },
  { value: "credit", label: "Credit Card" },
];

export const commonStyles = {
  sectionTitle: "font-romanica font-normal text-[32px] leading-[100%] tracking-[0%] uppercase text-white mb-5",
  label: "font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white",
  input: "w-full h-[64px] px-5 py-5 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 placeholder:font-creato-display placeholder:font-medium placeholder:text-[18px] placeholder:leading-[100%] placeholder:tracking-[-5%] focus:border-white/30 focus:outline-none rounded-none",
  legalText: "text-white/70 font-creato-display font-normal text-[14px] leading-[1.4] space-y-4 my-4",
  button: "w-full h-[45px] px-[30px] py-[12px] gap-[15px]",
};

export const content = {
  hero: {
    titleLine1: "Complete Your",
    titleLine2: "Purchase",
    subtitle: "Fill in your details and proceed to secure your trading challenge.",
  },
  sections: {
    billing: "Billing Details",
    order: "Order Details",
    payment: "Payment Method",
  },
  labels: {
    coupon: "Have a coupon?",
    couponPlaceholder: "Enter your coupon code",
  },
  legal: {
    privacy: "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.",
    terms: {
      prefix: "By proceeding, you agree to our ",
      terms: "Terms and Conditions",
      middle: " and ",
      privacy: "Privacy Policy",
      suffix: ".",
    },
  },
  button: "Proceed To Payment",
};
