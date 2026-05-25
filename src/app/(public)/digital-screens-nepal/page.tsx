import type { Metadata } from "next";
import { buildSEOMeta, buildLocalBusinessSchema, buildBreadcrumbSchema, buildServiceSchema, buildFAQSchema } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildSEOMeta({
  title: "Digital Screen Advertising Nepal | LED Billboard & DOOH Networks",
  description: "Nepal's largest digital out-of-home (DOOH) advertising network. LED billboards, digital screens and programmatic DOOH at premium locations across Kathmandu and major cities.",
  path: "/digital-screens-nepal",
  keywords: ["digital screens Nepal", "LED billboard Nepal", "DOOH Nepal", "digital advertising Nepal", "programmatic DOOH", "digital OOH Kathmandu"],
});

const faqs = [
  {
    question: "What is DOOH advertising?",
    answer: "Digital Out-of-Home (DOOH) advertising uses LED and LCD screens in public spaces to display dynamic, high-impact campaigns. Unlike traditional static billboards, DOOH allows multiple advertisers, real-time content updates, and measurable audience data.",
  },
  {
    question: "Can I change my ad content remotely?",
    answer: "Yes. Smart Media's digital network supports remote content management. Approved content can be uploaded via our portal and deployed across selected screens within hours.",
  },
  {
    question: "What is the minimum booking period for digital screens?",
    answer: "Most digital screen slots are available on weekly packages, with daily slot options at high-traffic locations like TIA and major malls. Contact us for current availability.",
  },
  {
    question: "What file formats do you accept for digital screens?",
    answer: "We accept MP4 (H.264), still images (JPG/PNG at 1920×1080 minimum), and HTML5 creatives. Maximum file size is 50MB per slot. Our team can assist with content production.",
  },
  {
    question: "Do you offer programmatic DOOH buying?",
    answer: "Smart Media is piloting programmatic DOOH integration for 2025. Contact our digital team for early-access partnerships with DSPs and programmatic platforms.",
  },
];

const screenTypes = [
  {
    name: "Large-Format LED Billboards",
    size: "40×20 ft and above",
    resolution: "6mm–10mm pixel pitch",
    brightness: "5,000–8,000 nits",
    locations: "Expressways, Ring Road junctions, highways",
    slots: "8–12 advertisers/hour",
  },
  {
    name: "Street-Level Digital Panels",
    size: "6×8 ft",
    resolution: "4mm pixel pitch",
    brightness: "3,000 nits",
    locations: "New Road, Putali Sadak, Baneshwor",
    slots: "6–8 advertisers/hour",
  },
  {
    name: "Airport Digital Displays",
    size: "12×6 ft (indoor)",
    resolution: "2mm pixel pitch",
    brightness: "2,000 nits",
    locations: "TIA Arrivals, Departures, Immigration",
    slots: "4–6 advertisers/hour",
  },
  {
    name: "Mall Digital Screens",
    size: "4×6 ft (portrait)",
    resolution: "2mm pixel pitch",
    brightness: "1,500 nits",
    locations: "Civil Mall, Labim Mall, Sherpa Mall",
    slots: "6 advertisers/hour",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://smartmedia.com.np/" },
      { name: "Digital Screens Nepal", url: "https://smartmedia.com.np/digital-screens-nepal" },
    ]),
    buildServiceSchema({
      name: "Digital Screen Advertising Nepal",
      description: "High-impact digital OOH advertising across Nepal's premium LED billboard and digital display network.",
      url: "https://smartmedia.com.np/digital-screens-nepal",
    }),
    buildFAQSchema(faqs),
  ],
};

export default function DigitalScreensNepalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-brand-blue-900 to-brand-blue-800 text-white section-padding">
        <div className="container-xl">
          <nav className="text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Digital Screens Nepal</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-brand-blue-500/30 text-brand-blue-200 text-sm font-semibold px-3 py-1 rounded-full mb-4 border border-brand-blue-400/30">
              DOOH Advertising
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading leading-tight mb-4">
              Digital Screen Advertising in Nepal
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Nepal's largest DOOH network — LED billboards, digital panels, and airport screens delivering 10M+ daily impressions across Kathmandu and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary bg-white text-brand-blue-700 hover:bg-gray-100 py-3 px-6">
                Check Screen Availability
              </Link>
              <Link href="/ooh-nepal" className="btn-outline border-white/40 text-white hover:bg-white/10 py-3 px-6">
                Compare OOH vs DOOH
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 py-8">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "120+", label: "Digital Screens" },
              { value: "10M+", label: "Daily Impressions" },
              { value: "4K", label: "Max Resolution" },
              { value: "24/7", label: "Uptime Guarantee" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold font-heading text-brand-blue-700">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen types */}
      <section className="section-padding">
        <div className="container-xl">
          <h2 className="section-heading">Our Digital Screen Network</h2>
          <p className="section-subheading">
            Four categories of high-brightness displays for every campaign objective.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {screenTypes.map((screen) => (
              <div key={screen.name} className="card p-6 space-y-4">
                <h3 className="font-bold text-lg font-heading text-gray-900">{screen.name}</h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-gray-500">Size</dt>
                    <dd className="font-medium">{screen.size}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Resolution</dt>
                    <dd className="font-medium">{screen.resolution}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Brightness</dt>
                    <dd className="font-medium">{screen.brightness}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Slots/hour</dt>
                    <dd className="font-medium">{screen.slots}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-gray-500">Key Locations</dt>
                    <dd className="font-medium">{screen.locations}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DOOH */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="section-heading">Why Choose Digital Over Static?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                icon: "⚡",
                title: "Real-Time Updates",
                desc: "Change your creative, pricing, or message within hours — no reprinting, no reinstallation.",
              },
              {
                icon: "👥",
                title: "Multiple Advertisers",
                desc: "Share screen time with other brands in the same slot rotation — starting at lower minimum spends.",
              },
              {
                icon: "📊",
                title: "Audience Analytics",
                desc: "Receive impression counts, time-of-day breakdowns, and audience dwell reports with every campaign.",
              },
              {
                icon: "🎨",
                title: "Rich Creative",
                desc: "Full motion video, animations, and interactive elements that static simply cannot match.",
              },
              {
                icon: "🕐",
                title: "Dayparting",
                desc: "Schedule your ads for peak times — morning rush, lunch hour, evening commute — to maximise relevance.",
              },
              {
                icon: "🌐",
                title: "Network Buys",
                desc: "Book a single creative across 20+ screens simultaneously with one order, one invoice.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical specifications */}
      <section className="section-padding">
        <div className="container-xl max-w-3xl">
          <h2 className="section-heading">Creative Specifications</h2>
          <div className="card overflow-hidden mt-6">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["Requirement", "Specification"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Video Format", "MP4 (H.264/H.265)"],
                  ["Still Image", "JPG, PNG (1920×1080 minimum)"],
                  ["Aspect Ratio", "16:9 (landscape) or 9:16 (portrait screens)"],
                  ["Max File Size", "50MB per creative"],
                  ["Slot Duration", "10–15 seconds per slot"],
                  ["Colour Space", "RGB, sRGB"],
                  ["Submission Lead Time", "48 hours before go-live"],
                  ["HTML5", "Supported (contact us for guidelines)"],
                ].map(([req, spec]) => (
                  <tr key={req} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{req}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl max-w-3xl">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="ml-3 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-blue-700 text-white text-center">
        <div className="container-xl max-w-2xl">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Ready to Go Digital?
          </h2>
          <p className="text-white/80 mb-8">
            Check screen availability and get a tailored DOOH plan for your brand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-brand-blue-700 hover:bg-gray-100 py-3 px-8">
              Get a Quote
            </Link>
            <a
              href="https://wa.me/9779801234567?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20digital%20screen%20advertising%20in%20Nepal."
              className="btn-outline border-white/40 text-white hover:bg-white/10 py-3 px-8"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
