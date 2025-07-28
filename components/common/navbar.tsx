"use client";

import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  return (
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

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <div>
          <ul className="flex gap-8">
            <li>
              <Link
                href="/"
                className={`hover:text-blue transition-all duration-300 ${
                  isActiveLink("/") ? "text-blue" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/challenges"
                className={`hover:text-blue transition-all duration-300 ${
                  isActiveLink("/challenges") ? "text-blue" : ""
                }`}
              >
                Challenges
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className={`hover:text-blue transition-all duration-300 ${
                  isActiveLink("/faq") ? "text-blue" : ""
                }`}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className={`hover:text-blue transition-all duration-300 ${
                  isActiveLink("/support") ? "text-blue" : ""
                }`}
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Button>
            <Link href="/">Get Funded Now</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center gap-4">
        <div>
          <Button>
            <Link href="/">Get Funded Now</Link>
          </Button>
        </div>
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

      {/* Mobile Menu Sidebar */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[80vw] z-50 bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation links */}
          <div className="flex-1 py-6 px-6">
            <ul className="flex flex-col gap-6">
              <li>
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className={`block text-lg hover:text-blue transition-all duration-300 ${
                    isActiveLink("/") ? "text-blue" : "text-white"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/challenges"
                  onClick={handleLinkClick}
                  className={`block text-lg hover:text-blue transition-all duration-300 ${
                    isActiveLink("/challenges") ? "text-blue" : "text-white"
                  }`}
                >
                  Challenges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  onClick={handleLinkClick}
                  className={`block text-lg hover:text-blue transition-all duration-300 ${
                    isActiveLink("/faq") ? "text-blue" : "text-white"
                  }`}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  onClick={handleLinkClick}
                  className={`block text-lg hover:text-blue transition-all duration-300 ${
                    isActiveLink("/support") ? "text-blue" : "text-white"
                  }`}
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
