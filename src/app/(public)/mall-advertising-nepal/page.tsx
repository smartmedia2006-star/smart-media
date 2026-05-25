import type { Metadata } from "next";
import { buildSEOMeta, buildLocalBusinessSchema, buildBreadcrumbSchema, buildServiceSchema, buildFAQSchema } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildSEOMeta({
  title: "Mall Advertising Nepal | Shopping Centre OOH & In-Store Media",
  description: "Premium mall advertising in Nepal's top shopping centres. Digital screens, atrium banners, elevator panels, and in-mall activations at Civil Mall, Labim, Sherpa, and Bhatbhateni.",
  path: "/mall-advertising-nepal",
  keywords: ["mall advertising Nepal", "shopping mall advertising Kathmandu", "in-mall branding Nepal", "Civil Mall advertising", "Labim Mall advertising", "retail advertising Nepal"],
});

const faqs = [
  {
    question: "Which malls does Smart Media cover?",
    answer: "Smart Media manages advertising rights at Civil Mall (New Road), Labim Mall (Pulchowk), Sherpa Mall (Durbar Marg), Bhatbhateni Superstore (multiple branches), City Centre (Kamalpokhari), and Sundhara Mall. New partnerships are added regularly.",
  },
  {
    question: "What mall advertising formats are available?",
    answer: "We offer atrium banners, digital LCD/LED panels, elevator wraps, escalator panels, food court screens, parking gate displays, in-store shelf talkers, floor graphics, pillar wraps, and experiential activation zones.",
  },
  {
    question: "What is the typical footfall in Kathmandu malls?",
    answer: "Kathmandu's major malls attract 10,000–25,000 visitors per day on weekdays and 30,000–50,000 on weekends. Civil Mall and Labim Mall lead footfall figures among dedicated shopping complexes.",
  },
  {
    question: "Can I run a product activation or sampling event at a mall?",
    answer: "Yes. Smart Media arranges experiential activation spaces at designated zones within partner malls. This includes product sampling, demos, competitions, and branded pop-up setups. Minimum 3-day bookings apply.",
  },
  {
    question: "How far in advance do I need to book mall advertising?",
    answer: "We recommend booking 2–4 weeks in advance for standard placements. For festive periods (Dashain, Tihar, New Year) and high-demand spots like atriums, 6–8 weeks' notice is strongly advised.",
  },
];

const malls = [
  {
    name: "Civil Mall",
    location: "New Road, Kathmandu",
    weekdayFootfall: "18,000",
    weekendFootfall: "40,000",
    formats: ["Atrium LED", "Digital Panels", "Escalator Panels", "Elevator Wraps"],
  },
  {
    name: "Labim Mall",
    location: "Pulchowk, Lalitpur",
    weekdayFootfall: "14,000",
    weekendFootfall: "32,000",
    formats: ["Atrium Banner", "Food Court Screen", "Pillar Wraps", "Activation Zone"],
  },
  {
    name: "Sherpa Mall",
    location: "Durbar Marg, Kathmandu",
    weekdayFootfall: "10,000",
    weekendFootfall: "22,000",
    formats: ["Digital Panels", "Window Branding", "Elevator Wraps"],
  },
  {
    name: "City Centre",
    location: "Kamalpokhari, Kathmandu",
    weekdayFootfall: "12,000",
    weekendFootfall: "28,000",
    formats: ["Atrium Banner", "Digital Screens", "Floor Graphics"],
  },
  {
    name: "Bhatbhateni Superstore",
    location: "Multiple locations",
    weekdayFootfall: "8,000/branch",
    weekendFootfall: "20,000/branch",
    formats: ["In-store Banners", "Shelf Talkers", "Checkout Area"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://smartmedia.com.np/" },
      { name: "Mall Advertising Nepal", url: "https://smartmedia.com.np/mall-advertising-nepal" },
    ]),
    buildServiceSchema({
      name: "Mall Advertising Nepal",
      description: "Premium advertising placements inside Nepal's top shopping malls, including digital screens, banners, and activation zones.",
      url: "https://smartmedia.com.np/mall-advertising-nepal",
    }),
    buildFAQSchema(faqs),
  ],
};

export default function MallAdvertisingNepalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-red-700 via-brand-red-800 to-gray-900 text-white section-padding">
        <div className="container-xl">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Mall Advertising Nepal</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-brand-red-500/30 text-red-200 text-sm font-semibold px-3 py-1 rounded-full mb-4 border border-red-400/30">
              Mall & Retail Media
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading leading-tight mb-4">
              Mall Advertising in Nepal
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Engage shoppers in the buying mindset at Nepal's premium malls — atrium screens, digital panels, activations, and in-store media under one roof.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary bg-white text-brand-red-700 hover:bg-gray-100 py-3 px-6">
                Check Mall Availability
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
              { value: "5+", label: "Partner Malls" },
              { value: "150K+", label: "Weekly Shoppers" },
              { value: "12+", label: "Ad Formats" },
              { value: "NPR 45K", label: "Starting Rate/Week" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold font-heading text-brand-blue-700">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mall network */}
      <section className="section-padding">
        <div className="container-xl">
          <h2 className="section-heading">Our Mall Network</h2>
          <p className="section-subheading">
            Premium placements in Nepal's top-performing retail destinations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {malls.map((mall) => (
              <div key={mall.name} className="card p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900">{mall.name}</h3>
                  <p className="text-sm text-gray-500">{mall.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-gray-100 pt-3">
                  <div>
                    <p className="text-gray-400">Weekday</p>
                    <p className="font-semibold text-gray-700">{mall.weekdayFootfall} visitors</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Weekend</p>
                    <p className="font-semibold text-gray-700">{mall.weekendFootfall} visitors</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1.5">Available formats</p>
                  <div className="flex flex-wrap gap-1">
                    {mall.formats.map((fmt) => (
                      <span key={fmt} className="badge bg-blue-50 text-blue-700 text-xs">{fmt}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why mall advertising */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="section-heading">Why Advertise in Malls?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                icon: "🛍️",
                title: "Purchase Intent Audience",
                desc: "Mall visitors are already in shopping mode — brand recall and conversion rates are significantly higher than outdoor advertising.",
              },
              {
                icon: "⏱️",
                title: "Extended Dwell Time",
                desc: "Average mall visit is 90–120 minutes, giving your brand repeated exposures per visit versus a 3-second billboard glance.",
              },
              {
                icon: "💰",
                title: "Premium Demographics",
                desc: "Urban, middle-to-high income consumers — ideal for FMCG, electronics, fashion, banking, automotive, and lifestyle brands.",
              },
              {
                icon: "📅",
                title: "Festive Season Surges",
                desc: "Footfall multiplies 3–5× during Dashain, Tihar, and New Year — the most critical retail moments for brand visibility.",
              },
              {
                icon: "🎯",
                title: "Contextual Relevance",
                desc: "Your ad is seen at the moment consumers are actively evaluating and comparing products — maximum decision-making influence.",
              },
              {
                icon: "🤝",
                title: "On-Ground Activations",
                desc: "Supplement media with live sampling, demonstrations, competitions, and branded experiences in our dedicated activation zones.",
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

      {/* FAQ */}
      <section className="section-padding">
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
            Capture Shoppers at the Point of Purchase
          </h2>
          <p className="text-white/80 mb-8">
            Get a tailored mall advertising plan for your next campaign.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-brand-blue-700 hover:bg-gray-100 py-3 px-8">
              Get a Quote
            </Link>
            <a
              href="https://wa.me/9779801234567?text=Hi%2C%20I'm%20interested%20in%20mall%20advertising%20in%20Nepal."
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
