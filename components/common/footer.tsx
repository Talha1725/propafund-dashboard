import Image from "next/image";
import Link from "next/link";
import Container from "./container";
import Logo from "@/public/assets/propafund-logo.svg";
import { Youtube, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import Glow from "./glow";

export default function Footer() {
  const headingClass = "font-romanica font-normal text-[22px] leading-[1] uppercase";
  const itemClass = "text-white/70 font-creato-display font-normal text-[16px] leading-[1]";

  const quicklinks = [
    { label: "Evaluation", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Testimonials", href: "#" },
    { label: "FAQs", href: "#" },
  ];

  const legal = [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Legal Disclosure", href: "#" },
  ];

  const socials = [
    { label: "YouTube", href: "#", Icon: Youtube },
    { label: "Instagram", href: "#", Icon: Instagram },
    { label: "Discord", href: "#", Icon: MessageCircle },
    { label: "Twitter", href: "#", Icon: Twitter },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-16 pb-10 font-creato-display">
      <div className="pointer-events-none absolute -top-50 inset-0 z-0 flex items-start justify-center">
        <Glow className="-translate-y-24" width={1400} height={900} opacity={0.4} />
      </div>
      <Container>
        <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-40">
          <div className="flex flex-col">
            <div className="flex items-center gap-[10px]">
              <div className="w-[180.35226440429688px] h-[37.80293655395508px]">
                <Image src={Logo} alt="Propafund" className="w-full h-full" />
              </div>
            </div>

            <div className="mt-[40px]">
              <p
                className="font-romanica font-regular text-[22px] leading-[1] tracking-[0] uppercase"
              >
                Join thousands of traders and become the hero of your own trading story.
              </p>
            </div>

              <div className="mt-6 translate-x-2 flex">
                <Button variant="secondary">Start My Challenge</Button>
              </div>  
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[90px]">
            <div className="flex flex-col gap-[10px]">
              <h4 className={headingClass}>Quicklinks</h4>
              <ul className="flex flex-col gap-[10px] text-left sm:text-left">
                {quicklinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={itemClass}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-[10px]">
              <h4 className={headingClass}>Legal</h4>
              <ul className="flex flex-col gap-[10px] text-left sm:text-left">
                {legal.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={itemClass}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-[10px]">
              <h4 className={headingClass}>Socials</h4>
              <div className="flex items-center gap-[14px]">
                {socials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex items-center justify-center w-[20.549375534057617px] h-[21px]"
                  >
                    <Icon className="text-white/70" width={21} height={21} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="space-y-4">
            <p className="font-creato-display font-medium text-[18px] leading-[1]">Disclaimer:</p>
            <p className="text-white/70 font-creato-display font-normal text-[14px] leading-[1] opacity-80">
              Propafund provides access to simulated trading environments strictly for educational and evaluative purposes. No live trading occurs, and no real funds are invested, traded, or managed. All activities are demo-based using virtual balances with no cash value. Participation in our challenges does not constitute a financial service or investment opportunity. We do not offer financial advice or facilitate real-market trading. Payments are for platform access only and are non-refundable. Use of our services is subject to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
        </div>
      </Container>
    </footer>
  );
}


