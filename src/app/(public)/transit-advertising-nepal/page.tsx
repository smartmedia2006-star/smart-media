import type { Metadata } from "next";
import { buildSEOMeta, buildLocalBusinessSchema, buildBreadcrumbSchema, buildServiceSchema, buildFAQSchema } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildSEOMeta({
  title: "Transit Advertising Nepal | Bus, Metro & Vehicle Branding",
  description: "Reach commuters on the move with Smart Media's transit advertising in Nepal. Bus wraps, shelter panels, and in-vehicle displays across Kathmandu Valley and major cities.",
  path: "/transit-advertising-nepal",
  keywords: ["transit advertising Nepal", "bus advertising Nepal", "vehicle branding Nepal", "commuter advertising Kathmandu", "bus shelter advertising Nepal"],
});

const faqs = [
  {
    question: "What types of transit advertising are available in Nepal?",
    answer: "Smart Media offers full bus wraps, partial bus panels, bus shelter advertising, taxi branding, micro-bus interiors, and station/terminal advertising. Kathmandu Valley has the most extensive network with 200+ buses and multiple major terminals.",
  },
  {
    question: "How long does a bus wrap campaign last?",
    answer: "Most transit campaigns run 3–12 months. Shorter bursts of 30–60 days are available for product launches and seasonal campaigns, subject to availability.",
  },
  {
    question: "What is the daily reach of transit advertising in Kathmandu?",
    answer: "Kathmandu Valley's public transit system carries over 800,000 passenger trips per day. A full bus wrap on a major route generates approximately 30,000–50,000 impressions per day.",
  },
  {
    question: "Can I target specific routes or areas?",
    answer: "Yes. Smart Media can select specific routes that pass through your target neighbourhoods — for example, Kalanki–Ratnapark for central Kathmandu, or Lagankhel–Chabahil for the east-west corridor.",
  },
  {
    question: "Who handles printing and installation?",
    answer: "Smart Media's in-house production team handles all vinyl printing, surface preparation, and professional installation. We also manage removal and substrate restoration at campaign end.",
  },
];

const formats = [
  {
    name: "Full Bus Wrap",
    coverage: "100% exterior",
    impressions: "40,000–60,000/day",
    minDuration: "3 months",
    description: "Maximum brand presence — every side of the bus becomes your canvas.",
  },
  {
    name: "Partial Bus Panel",
    coverage: "Side or rear panel",
    impressions: "20,000–35,000/day",
    minDuration: "1 month",
    description: "Cost-effective single-panel placement on high-frequency routes.",
  },
  {
    name: "Bus Shelter Panels",
    coverage: "Static backlit panel",
    impressions: "15,000–25,000/day",
    minDuration: "1 month",
    description: "Captive audience at busy stops — high dwell time for detailed messages.",
  },
  {
    name: "Taxi Branding",
    coverage: "Roof sign + door panels",
    impressions: "10,000–15,000/day per vehicle",
    minDuration: "1 month",
    description: "Reaches premium urban demographics across Kathmandu's taxi network.",
  },
  {
    name: "Micro-Bus Interiors",
    coverage: "Overhead panels, back panels",
    impressions: "1,200–2,500 passengers/day",
    minDuration: "1 month",
    description: "Intimate, distraction-free advertising to a captive seated audience.",
  },
  {
    name: "Terminal Advertising",
    coverage: "Banners, walls, lightboxes",
    impressions: "50,000+/day",
    minDuration: "1 month",
    description: "Dominant presence at Gongabu, Kalanki, Lagankhel and other major bus terminals.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://smartmedia.com.np/" },
      { name: "Transit Advertising Nepal", url: "https://smartmedia.com.np/transit-advertising-nepal" },
    ]),
    buildServiceSchema({
      name: "Transit Advertising Nepal",
      description: "Bus wraps, shelter panels and transit media across Nepal's largest public transport networks.",
      url: "https://smartmedia.com.np/transit-advertising-nepal",
    }),
    buildFAQSchema(faqs),
  ],
};

export default function TransitAdvertisingNepalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-900 to-brand-blue-700 text-white section-padding">
        <div className="container-xl">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Transit Advertising Nepal</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-brand-blue-500/30 text-brand-blue-200 text-sm font-semibold px-3 py-1 rounded-full mb-4 border border-brand-blue-400/30">
              Transit Media
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading leading-tight mb-4">
              Transit Advertising in Nepal
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Follow Nepal's 800,000 daily commuters with bus wraps, shelter panels and terminal advertising across the Valley and major cities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary bg-white text-brand-blue-700 hover:bg-gray-100 py-3 px-6">
                Get Transit Media Quote
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
              { value: "800K+", label: "Daily Transit Passengers" },
              { value: "200+", label: "Branded Buses" },
              { value: "15+", label: "Routes Covered" },
              { value: "6", label: "Major Terminals" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold font-heading text-brand-blue-700">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="section-padding">
        <div className="container-xl">
          <h2 className="section-heading">Transit Advertising Formats</h2>
          <p className="section-subheading">
            Six proven formats to intercept audiences at every stage of their journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {formats.map((fmt) => (
              <div key={fmt.name} className="card p-6 space-y-3">
                <h3 className="font-bold text-gray-900 font-heading">{fmt.name}</h3>
                <p className="text-sm text-gray-600">{fmt.description}</p>
                <dl className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                  <div>
                    <dt className="text-gray-400">Coverage</dt>
                    <dd className="font-semibold text-gray-700">{fmt.coverage}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Impressions</dt>
                    <dd className="font-semibold text-gray-700">{fmt.impressions}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Min. Duration</dt>
                    <dd className="font-semibold text-gray-700">{fmt.minDuration}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key routes */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="section-heading">Key Routes & Terminals</h2>
          <div className="card overflow-hidden mt-6 max-w-2xl mx-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["Route / Terminal", "Daily Passengers", "Type"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Kalanki → Ratnapark", "45,000", "Bus Route"],
                  ["Gongabu Terminal", "80,000", "Terminal"],
                  ["Lagankhel → Chabahil", "35,000", "Bus Route"],
                  ["Lagankhel Terminal", "60,000", "Terminal"],
                  ["Kalanki Terminal", "55,000", "Terminal"],
                  ["Koteshwor → Thamel", "28,000", "Bus Route"],
                  ["Suryabinayak → Koteshwor", "22,000", "Bus Route"],
                  ["Pokhara Bus Park", "40,000", "Terminal"],
                ].map(([route, passengers, type]) => (
                  <tr key={route} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-medium text-gray-900">{route}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{passengers}</td>
                    <td className="px-5 py-3 text-sm">
                      <span className={`badge text-xs ${type === "Terminal" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                        {type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            Put Your Brand on the Move
          </h2>
          <p className="text-white/80 mb-8">
            Contact Smart Media to plan a transit campaign that travels with your audience.
          </p>
          <Link href="/contact" className="btn-primary bg-white text-brand-blue-700 hover:bg-gray-100 py-3 px-8">
            Plan My Campaign
          </Link>
        </div>
      </section>
    </>
  );
}
