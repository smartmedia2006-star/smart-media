"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, ChevronDownIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const services = [
  { name: "Airport Advertising", href: "/services/airport-advertising", desc: "TIA Kathmandu – prime airport concessions" },
  { name: "Billboards", href: "/services/billboards", desc: "Highway & city billboards across Nepal" },
  { name: "Digital Screens", href: "/services/digital-screens", desc: "High-impact digital out-of-home displays" },
  { name: "Transit Advertising", href: "/services/transit-advertising", desc: "Metro, bus & taxi branding" },
  { name: "Mall Advertising", href: "/services/mall-advertising", desc: "Premium mall & retail display formats" },
  { name: "Street Furniture", href: "/services/street-furniture", desc: "Bus shelters, kiosks & lamp posts" },
  { name: "Production", href: "/services/production", desc: "In-house printing & installation" },
];

const nav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Locations", href: "/locations" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-brand-dark text-gray-300 text-xs">
        <div className="container-xl flex justify-between items-center py-1.5">
          <span>Nepal&apos;s #1 Digital Out-of-Home Advertising Network</span>
          <a href="tel:+97714444444" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <PhoneIcon className="w-3.5 h-3.5" />
            +977-1-4444444
          </a>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100"
            : "bg-white shadow-sm"
        )}
      >
        <nav className="container-xl">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="relative w-10 h-10 bg-brand-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">SM</span>
              </div>
              <div>
                <p className="font-bold text-brand-dark font-heading leading-none text-base">Smart Media</p>
                <p className="text-xs text-gray-500 leading-none">Nepal</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {nav.map((item) =>
                item.hasDropdown ? (
                  <div key={item.name} className="relative group">
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        pathname.startsWith("/services")
                          ? "text-brand-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-brand-blue-600 hover:bg-gray-50"
                      )}
                    >
                      {item.name}
                      <ChevronDownIcon className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
                    </button>

                    {/* Mega dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2">
                      <div className="grid grid-cols-2 gap-2">
                        {services.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="flex flex-col p-3 rounded-xl hover:bg-blue-50 transition-colors group/item"
                          >
                            <span className="text-sm font-semibold text-gray-900 group-hover/item:text-brand-blue-600">
                              {s.name}
                            </span>
                            <span className="text-xs text-gray-500 mt-0.5">{s.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <Link
                          href="/services"
                          className="text-sm text-brand-blue-600 font-semibold hover:underline"
                        >
                          View all services →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                        ? "text-brand-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-brand-blue-600 hover:bg-gray-50"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="btn-primary py-2 px-4 text-sm"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container-xl py-4 space-y-1">
              {nav.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        {item.name}
                        <ChevronDownIcon className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
                      </button>
                      {servicesOpen && (
                        <div className="mt-1 ml-3 space-y-1">
                          {services.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-brand-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              {s.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                        pathname === item.href
                          ? "text-brand-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Link href="/contact" className="btn-primary w-full justify-center text-sm py-2.5">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
