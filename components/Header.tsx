"use client";

import { useState, useEffect } from "react";
import type { JSX } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonCheckAvailability from "./ButtonCheckAvailability";
import logo from "@/app/icon.png";
import config from "@/config";
import React from 'react'

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/#properties",
    label: "Properties",
  },
  {
    href: "/manuals",
    label: "House Manuals",
  },
  {
    href: "/#blog",
    label: "Blog",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const cta: JSX.Element = <ButtonCheckAvailability extraStyle="btn-primary" />;

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
  const searchParams = useSearchParams();
  const [mobileMenuIsOpen, setMobileMenuOpen] = useState<boolean>(false);

  function useScrollDirection(){
    const [scrollDirection, setScrollDirection] = useState(null); // Q suggested useSatate("up")

    useEffect(() => { // useEffect is for code side-effects. It gets called after initial render and any re-render when dependency array vals have changed
        let lastScrollY = window.scrollY; // JS docs recommend window.pageYOffset for compatibility, it's struck through when I add it

        const updateScrollDirection = () => { // function to 
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)){
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        }

        window.addEventListener("scroll", updateScrollDirection); // add event listener
        return () => {
            window.removeEventListener("scroll", updateScrollDirection); // clean up event listener on component dismount and new useEffect calls
        }
    },[scrollDirection]);

    return scrollDirection;
  }

  // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [searchParams]); // TODO resolve issue of stale urls due to scroll-away causing mobile menu not to close

  const scrollDir = useScrollDirection();

  return (
  <header data-theme="mybrand" className={`sticky z-50 ${ scrollDir === "down" ? "-top-16 md:-top-20" : "top-0"} h-16 md:h-20 bg-base-200 transition-all duration-500`}>
      <nav
        className="container flex items-center justify-between px-4 lg:px-0 py-4 mx-auto"
        aria-label="Global"
      >
        {/* Logo and brand name - Responsive */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 "
            href="/"
            title={`${config.appName} homepage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>
        </div>

        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-base-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover"
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${mobileMenuIsOpen ? "" : "hidden"}`}>
        <div
        className={`fixed inset-y-0 right-0 z-10 w-full px-4 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          {/* Mobile menu logo & name */}
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0 "
              title={`${config.appName} homepage`}
              href="/"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="w-8"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-extrabold text-lg">{config.appName}</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu links */}
          <div className="flow-root px-4 mt-6">
            <div className="py-4">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="link link-hover"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            {/* Mobile menu CTA button*/}
            <div className="flex flex-col">{cta}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
