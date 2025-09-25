"use client";

import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import Container from "./container";
import { NAVBAR_ROUTES } from "@/constants/routes";

const NavLink = memo(({ href, label, isActive, onClick }: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={`hover:text-blue transition-all duration-300 ${
        isActive ? "text-blue" : ""
      }`}
    >
      {label}
    </Link>
  </li>
));

const MobileNavLink = memo(({ href, label, isActive, onClick }: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={`block text-lg hover:text-blue transition-all duration-300 ${
        isActive ? "text-blue" : "text-white"
      }`}
    >
      {label}
    </Link>
  </li>
));

const HamburgerButton = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
    onClick={onClick}
    aria-label="Toggle menu"
  >
    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
  </button>
));

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const isActiveLink = useCallback((href: string) => pathname === href, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        hamburgerRef.current?.contains(target)
      ) return;
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container>
      <div className="py-5 flex justify-between items-center font-creato-display relative">
      <div className="sm:w-[180px] sm:h-[37px] w-[120px] h-[25px]">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-8">
          {NAVBAR_ROUTES.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-blue transition-all duration-300 ${
                  isActiveLink(href) ? "text-blue" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Button>
          <Link href="/challenges">Get Funded Now</Link>
        </Button>
      </div>

      <div className="md:hidden flex items-center gap-4">
        <Button>
          <Link href="/challenges">Get Funded Now</Link>
        </Button>
        <button
          ref={hamburgerRef}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[80vw] z-50 bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 py-6 px-6">
            <ul className="flex flex-col gap-6">
              {NAVBAR_ROUTES.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className={`block text-lg hover:text-blue transition-all duration-300 ${
                      isActiveLink(href) ? "text-blue" : "text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </Container>
  );
}
