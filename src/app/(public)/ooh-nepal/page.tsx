import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "OOH Advertising Nepal | Out-of-Home & DOOH Network | Smart Media Nepal",
  description:
    "Nepal's largest Out-of-Home (OOH) and Digital OOH (DOOH) advertising network. Understand OOH formats, advantages, and how Smart Media's 500+ site network reaches 10M+ Nepalis daily.",
  keywords: ["OOH Nepal", "out of home advertising Nepal", "DOOH Nepal", "digital out of home Nepal", "OOH advertising network Nepal"],
  alternates: { canonical: "/ooh-nepal" },
};

const faqs = [
  { q: "What is OOH advertising?", a: "Out-of-Home (OOH) advertising refers to any advertising that reaches consumers while they are outside their homes — billboards, transit ads, airport displays, mall panels, and street furniture. OOH is Nepal's most impactful mass medium due to unavoidable physical presence." },
  { q: "What is DOOH advertising?", a: "Digital Out-of-Home (DOOH) is the digital evolution of OOH — using LED screens, LCD displays, and connected digital panels to deliver dynamic, updateable content. DOOH allows multiple advertisers, dayparted content, and real-time data-driven campaigns in ways static OOH cannot." },
  { q: "How does OOH advertising complement digital campaigns?", a: "OOH drives top-of-funnel brand awareness at massive scale, while digital channels handle conversion. Studies show campaigns that combine OOH with digital see 2–4× higher search lift. OOH also drives social media engagement when displayed in Instagram-worthy locations." },
  { q: "What is Smart Media's OOH network in Nepal?", a: "Smart Media operates Nepal's largest OOH network with 500+ sites including the exclusive TIA airport concession, 200+ billboards, 100+ digital screens, transit partnerships, and mall formats across 10+ cities." },
  { q: "How is OOH advertising measured in Nepal?", a: "Smart Media provides traffic count data, footfall estimates, and for digital screens — content play logs. We use established pedestrian and vehicular traffic surveys to estimate impressions. Digital formats support proof-of-play reporting via our CMS." },
];

export default function OOHNepalPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "OOH Advertising Nepal", url: "/ooh-nepal" },
  ]);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-br from-brand-dark to-brand-blue-700 py-20 md:py-28">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">OOH Advertising Nepal</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-white leading-tight max-w-4xl mb-6">
            Out-of-Home (OOH) Advertising
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
              in Nepal
            </span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-8">
            Nepal&apos;s most powerful mass medium — unavoidable, always-on, and reaching
            10M+ consumers daily. Smart Media operates the country&apos;s largest OOH and DOOH network.
          </p>
          <Link href="/contact" className="btn-secondary">Get an OOH Media Plan</Link>
        </div>
      </section>

      {/* OOH explained */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">
            OOH vs DOOH: Understanding Nepal&apos;s Outdoor Advertising Landscape
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6 border-brand-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-brand-blue-600 font-bold">OOH</div>
                <h3 className="font-bold text-gray-900">Traditional OOH</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Static billboards & hoardings", "Backlit lightboxes & panels", "Printed bus wraps & transit ads", "Physical kiosks & street furniture", "Lower production cost per unit", "Always visible, 24/7"].map(p => (
                  <li key={p} className="flex items-center gap-2"><span className="text-blue-500">●</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="card p-6 border-brand-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-brand-red-600 font-bold text-xs">DOOH</div>
                <h3 className="font-bold text-gray-900">Digital OOH (DOOH)</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {["LED & LCD digital screens", "Multiple advertisers per screen", "Dynamic, updateable content", "Dayparted & contextual campaigns", "Real-time content management", "Proof-of-play reporting"].map(p => (
                  <li key={p} className="flex items-center gap-2"><span className="text-red-500">●</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Network map data */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-8 text-center">
            Smart Media&apos;s OOH Network in Nepal
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
            {[
              { v: "500+", l: "Total OOH Sites" },
              { v: "100+", l: "Digital Screens" },
              { v: "200+", l: "Static Billboards" },
              { v: "15+", l: "Cities Covered" },
            ].map((s) => (
              <div key={s.l} className="card p-6 text-center">
                <p className="text-3xl font-extrabold text-brand-blue-600 font-heading">{s.v}</p>
                <p className="text-sm text-gray-600 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 max-w-4xl mx-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["Format Type", "Sites", "Key Locations", "Daily Impressions"].map(h => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {[
                  ["Airport (TIA)", "20+", "Arrival, Departure, Domestic", "25,000+"],
                  ["Highway Billboards", "80+", "Ring Road, Prithvi, Araniko", "500,000+"],
                  ["City Billboards", "120+", "Kathmandu, Pokhara, Chitwan", "300,000+"],
                  ["Digital Screens", "100+", "Commercial zones, junctions", "200,000+"],
                  ["Transit", "150+", "Bus routes, taxi fleet", "150,000+"],
                  ["Mall", "30+", "Civil Mall, Labim, Sherpa", "30,000+"],
                ].map(([fmt, sites, locs, imp]) => (
                  <tr key={fmt} className="hover:bg-gray-50">
                    <td className="table-cell font-semibold">{fmt}</td>
                    <td className="table-cell font-bold text-brand-blue-600">{sites}</td>
                    <td className="table-cell text-sm text-gray-500">{locs}</td>
                    <td className="table-cell font-semibold">{imp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-10 text-center">OOH Advertising FAQs</h2>
          <div className="space-y-6">
            {faqs.map(faq => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-blue-600">
        <div className="container-xl text-center">
          <h2 className="text-3xl font-bold font-heading text-white mb-4">Plan Your OOH Campaign in Nepal</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Our media strategists will design the most effective OOH mix for your target audience and budget.</p>
          <Link href="/contact" className="bg-white text-brand-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg inline-block">
            Start Your Campaign
          </Link>
        </div>
      </section>
    </>
  );
}
