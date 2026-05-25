import Link from "next/link";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

const services = [
  { name: "Airport Advertising", href: "/services/airport-advertising" },
  { name: "Highway Billboards", href: "/services/billboards" },
  { name: "Digital Screens", href: "/services/digital-screens" },
  { name: "Transit Advertising", href: "/services/transit-advertising" },
  { name: "Mall Advertising", href: "/services/mall-advertising" },
  { name: "Street Furniture", href: "/services/street-furniture" },
  { name: "Production & Printing", href: "/services/production" },
];

const seoPages = [
  { name: "Advertising in Nepal", href: "/advertising-nepal" },
  { name: "Airport Advertising Nepal", href: "/airport-advertising-nepal" },
  { name: "OOH Advertising Nepal", href: "/ooh-nepal" },
  { name: "Billboard Nepal", href: "/billboard-nepal" },
  { name: "Digital Screens Nepal", href: "/digital-screens-nepal" },
  { name: "Transit Advertising Nepal", href: "/transit-advertising-nepal" },
  { name: "Mall Advertising Nepal", href: "/mall-advertising-nepal" },
];

const company = [
  { name: "About Smart Media", href: "/about" },
  { name: "Our Locations", href: "/locations" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog & Insights", href: "/blog" },
  { name: "Media Kit", href: "/media-kit" },
  { name: "Contact Us", href: "/contact" },
];

const social = [
  {
    name: "Facebook",
    href: "https://facebook.com/SmartMediaNepal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/SmartMediaNepal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/smart-media-nepal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300">
      {/* CTA strip */}
      <div className="bg-brand-blue-600">
        <div className="container-xl py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white font-heading">
              Ready to amplify your brand across Nepal?
            </h3>
            <p className="text-blue-100 mt-1">
              Get a customised media plan for your campaign today.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 bg-white text-brand-blue-600 hover:bg-blue-50 font-bold px-8 py-3 rounded-xl transition-colors shadow-lg"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base font-heading">SM</span>
              </div>
              <div>
                <p className="font-bold text-white font-heading leading-none">Smart Media</p>
                <p className="text-xs text-gray-400 leading-none">Nepal</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Nepal&apos;s largest DOOH advertising network. Connecting brands with millions of Nepali consumers through premium outdoor media.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href="tel:+97714444444" className="flex items-center gap-2 hover:text-white transition-colors">
                <PhoneIcon className="w-4 h-4 flex-shrink-0 text-brand-blue-400" />
                +977-1-4444444
              </a>
              <a href="mailto:info@smartmedia.com.np" className="flex items-center gap-2 hover:text-white transition-colors">
                <EnvelopeIcon className="w-4 h-4 flex-shrink-0 text-brand-blue-400" />
                info@smartmedia.com.np
              </a>
              <p className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 flex-shrink-0 text-brand-blue-400 mt-0.5" />
                Putalisadak, Kathmandu, Nepal
              </p>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 bg-white/10 hover:bg-brand-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Our Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources / SEO pages */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Advertising in Nepal</h4>
            <ul className="space-y-2">
              {seoPages.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Company</h4>
            <ul className="space-y-2">
              {company.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Smart Media Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
