import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Billboard Advertising Nepal | Highway & City Billboards – Rates & Locations | Smart Media",
  description:
    "Billboard advertising across Nepal – Kathmandu Ring Road, Prithvi Highway, Araniko Highway, Terai highways & major cities. 200+ billboard locations. Get specifications, rates & availability from Smart Media.",
  keywords: ["billboard Nepal", "billboard advertising Nepal", "highway billboard Nepal", "outdoor hoarding Nepal", "billboard rates Nepal"],
  alternates: { canonical: "/billboard-nepal" },
};

const locations = [
  { area: "Kalanki Chowk", type: "Unipole", size: "10m × 5m", daily: "120,000+", status: "VACANT" },
  { area: "Koteshwor Junction", type: "Billboard", size: "8m × 4m", daily: "85,000+", status: "BOOKED" },
  { area: "Maitighar Mandala", type: "Unipole", size: "12m × 6m", daily: "80,000+", status: "VACANT" },
  { area: "Sinamangal Junction", type: "Billboard", size: "6m × 3m", daily: "65,000+", status: "VACANT" },
  { area: "Prithvi Highway Km 12", type: "Billboard", size: "8m × 4m", daily: "55,000+", status: "VACANT" },
  { area: "Dhading Junction", type: "Unipole", size: "10m × 5m", daily: "45,000+", status: "BOOKED" },
  { area: "Mugling (KTM–PKR)", type: "Billboard", size: "8m × 4m", daily: "50,000+", status: "VACANT" },
  { area: "Pokhara Lakeside", type: "Billboard", size: "6m × 3m", daily: "30,000+", status: "VACANT" },
];

const specs = [
  { format: "Standard Billboard", sizes: ["6m × 3m", "8m × 4m"], material: "Flex vinyl / Aluminium composite", lead: "5–7 days" },
  { format: "Unipole / Monopole", sizes: ["10m × 5m", "12m × 6m"], material: "Digital print on aluminium", lead: "7–10 days" },
  { format: "Backlit Hoarding", sizes: ["6m × 3m", "8m × 4m"], material: "Translucent flex, fluorescent/LED lit", lead: "7–10 days" },
  { format: "Tri-Vision", sizes: ["6m × 3m"], material: "Rotating triangular slats", lead: "3 creatives per slot" },
];

const faqs = [
  { q: "What is the standard billboard size in Nepal?", a: "Standard billboards in Nepal are typically 6m × 3m (20ft × 10ft) or 8m × 4m (26ft × 13ft). Unipoles and monopoles are larger at 10m × 5m or 12m × 6m. Highway locations often use larger formats for visibility at vehicular speeds." },
  { q: "How long does it take to install a billboard in Nepal?", a: "Printing takes 3–5 days. Installation takes 1–2 days depending on location access. We recommend providing final artwork at least 10 days before your campaign start date for full-sized hoardings and 7 days for standard billboards." },
  { q: "What are the billboard advertising rates in Nepal?", a: "Rates depend on location, size, illumination, and duration. Typical ranges: Standard billboard NPR 15,000–60,000/month; Unipole NPR 30,000–120,000/month; Backlit billboard NPR 20,000–80,000/month. Volume and long-term discounts are available." },
  { q: "Can Smart Media help with billboard design?", a: "Yes. Our in-house creative team can design billboard artwork based on your brand guidelines. We also offer free design adaptation if you provide existing digital assets. Billboard design follows our '7-word rule' for maximum impact at driving speeds." },
  { q: "Do billboards require any government permits in Nepal?", a: "Yes. Billboard installation in Nepal requires permits from the concerned municipality or road department. Smart Media handles all permit applications and renewals as part of our service. Existing network sites already have valid permits." },
];

export default function BillboardNepalPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Billboard Advertising Nepal", url: "/billboard-nepal" },
  ]);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-blue-700 py-20 md:py-28">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Billboard Nepal</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight max-w-4xl mb-6">
            Billboard Advertising
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
              Across Nepal
            </span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-8">
            200+ premium billboard locations on Nepal&apos;s busiest roads — from Kathmandu&apos;s Ring Road to
            the Prithvi and Mahendra highways. Large-format impact at Nepal&apos;s highest-traffic intersections.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-secondary">Check Availability & Rates</Link>
            <Link href="#locations" className="border-2 border-white/40 text-white hover:border-white font-semibold px-6 py-3 rounded-xl transition-colors">
              View Locations
            </Link>
          </div>
        </div>
      </section>

      {/* Why Billboards */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">
            Why Billboard Advertising in Nepal Works
          </h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p>
              Nepal&apos;s rapid urbanisation and growing vehicle ownership make highway and city billboards
              one of the most cost-effective reach media available. Kathmandu&apos;s notorious traffic congestion —
              while frustrating for commuters — creates extraordinary dwell time for billboard advertising,
              with average vehicle stops at major junctions lasting 3–8 minutes.
            </p>
            <p className="mt-4">
              Unlike digital media, billboards command physical space that cannot be blocked, skipped, or
              turned off. They build brand familiarity through repeated daily exposure to commuters, and
              provide the largest canvas for visual storytelling in any city.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { v: "200+", l: "Billboard Sites" },
              { v: "3–8 min", l: "Junction Dwell Time" },
              { v: "365", l: "Days/Year Exposure" },
              { v: "75%", l: "Adults Recall Rate" },
            ].map((s) => (
              <div key={s.l} className="card p-4 text-center">
                <p className="text-xl font-extrabold text-brand-blue-600 font-heading">{s.v}</p>
                <p className="text-xs text-gray-600 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location table */}
      <section id="locations" className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-3 text-center">
            Available Billboard Locations
          </h2>
          <p className="text-gray-600 text-center mb-8">Live availability — updated weekly</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["Location", "Format", "Size", "Daily Impressions", "Status", ""].map((h) => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {locations.map((loc) => (
                  <tr key={loc.area} className="hover:bg-gray-50">
                    <td className="table-cell font-semibold">{loc.area}</td>
                    <td className="table-cell">{loc.type}</td>
                    <td className="table-cell font-mono text-xs">{loc.size}</td>
                    <td className="table-cell font-semibold text-brand-blue-600">{loc.daily}</td>
                    <td className="table-cell">
                      <span className={`badge ${loc.status === "VACANT" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {loc.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <Link href="/contact" className="text-xs text-brand-blue-600 font-semibold hover:underline">
                        {loc.status === "VACANT" ? "Book Now" : "Waitlist"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Showing 8 of 200+ locations. Contact us for the complete availability list.</p>
        </div>
      </section>

      {/* Specs */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-8 text-center">
            Billboard Format Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {specs.map((spec) => (
              <div key={spec.format} className="card p-6">
                <h3 className="font-bold text-gray-900 mb-3">{spec.format}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available sizes:</span>
                    <span className="font-medium">{spec.sizes.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Material:</span>
                    <span className="font-medium text-right max-w-[200px]">{spec.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lead time:</span>
                    <span className="font-medium">{spec.lead}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 card p-6 max-w-4xl mx-auto bg-blue-50">
            <h3 className="font-bold text-gray-900 mb-2">Design File Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <ul className="space-y-1">
                <li>• File formats: AI, PDF, EPS (vector preferred)</li>
                <li>• Resolution: Minimum 100 DPI at final print size</li>
                <li>• Color mode: CMYK</li>
                <li>• Bleed: 15cm on all sides</li>
              </ul>
              <ul className="space-y-1">
                <li>• Text: Minimum 10cm height for highway readability</li>
                <li>• Safe zone: Keep all text 20cm from edges</li>
                <li>• File delivery: WeTransfer or Google Drive</li>
                <li>• Approval: 1 revision included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-10 text-center">
            Billboard Advertising FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-blue-600">
        <div className="container-xl text-center">
          <h2 className="text-3xl font-bold font-heading text-white mb-4">
            Get Billboard Rates & Availability
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Share your target locations and budget — our team will prepare a customised billboard media plan within 24 hours.
          </p>
          <Link href="/contact" className="bg-white text-brand-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg inline-block">
            Request a Free Media Plan
          </Link>
        </div>
      </section>
    </>
  );
}
