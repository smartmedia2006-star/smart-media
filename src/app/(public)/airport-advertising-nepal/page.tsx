import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema, buildFAQSchema, buildServiceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Airport Advertising Nepal | TIA Kathmandu DOOH Advertising Concession – Smart Media",
  description:
    "Advertise at Tribhuvan International Airport (TIA) Kathmandu. Smart Media holds exclusive advertising rights. Digital screens, lightboxes & banners in International Arrival, Departure & Domestic terminals. 5M+ annual passengers.",
  keywords: ["airport advertising Nepal", "TIA advertising", "Tribhuvan airport advertising", "airport billboard Nepal", "airport digital screen Nepal"],
  alternates: { canonical: "/airport-advertising-nepal" },
};

const airportFormats = [
  {
    name: "International Arrival Hall Screens",
    size: "55\" – 85\" LCD",
    location: "Baggage claim area",
    impressions: "15,000+ daily",
    dwell: "12–18 minutes average",
    desc: "The very first branded touchpoint for every international visitor to Nepal. Maximum dwell time while passengers wait for luggage.",
  },
  {
    name: "International Departure Lounge Screens",
    size: "65\" – 98\" LED",
    location: "Departure gates 1–10",
    impressions: "12,000+ daily",
    dwell: "45–90 minutes",
    desc: "Captive, relaxed audience in the departure lounge. Ideal for travel, luxury, banking, and export brands.",
  },
  {
    name: "Immigration Hall Lightboxes",
    size: "3m × 2m backlit",
    location: "Immigration queues",
    impressions: "10,000+ daily",
    dwell: "15–25 minutes",
    desc: "Premium static backlit panels alongside immigration queues — unavoidable visibility for all departing passengers.",
  },
  {
    name: "Domestic Terminal Displays",
    size: "43\" LCD screens",
    location: "Check-in & gates",
    impressions: "8,000+ daily",
    dwell: "20–30 minutes",
    desc: "Connect with domestic travellers heading to Nepal's tourist and business destinations.",
  },
  {
    name: "Airport Entrance Unipoles",
    size: "10m × 5m",
    location: "Airport approach road",
    impressions: "50,000+ daily",
    dwell: "Roadside",
    desc: "Large-format outdoor unipoles visible to all traffic entering and exiting the airport. Maximum roadside impact.",
  },
  {
    name: "Baggage Trolley Branding",
    size: "Full trolley wrap",
    location: "All terminals",
    impressions: "8,000+ handles/day",
    dwell: "Entire journey",
    desc: "Unique format that travels with every international passenger from arrival to exit. 100% visibility guaranteed.",
  },
];

const faqs = [
  {
    q: "Who has the advertising concession at TIA Kathmandu?",
    a: "Smart Media Pvt. Ltd. holds the exclusive advertising concession at Tribhuvan International Airport (TIA). We manage all indoor and outdoor advertising placements across the International Arrival, International Departure, and Domestic terminals.",
  },
  {
    q: "How many passengers pass through TIA annually?",
    a: "Tribhuvan International Airport handles approximately 5 million passengers per year (pre-COVID baseline, and recovering rapidly). Of these, roughly 2.5 million are international passengers and 2.5 million are domestic travellers, making it Nepal's most trafficked public space.",
  },
  {
    q: "What are the minimum booking durations for airport advertising?",
    a: "Minimum booking durations vary by format. Digital screens: 1 week minimum. Static backlit panels and lightboxes: 1 month minimum. Large-format outdoor unipoles: 3 months minimum. We recommend 3-month campaigns for brand building.",
  },
  {
    q: "Can digital screen content be changed during a campaign?",
    a: "Yes. Our airport digital screens support remote content management. You can update creative assets, schedule dayparted content, and run multiple messages within your booked slot — all managed through our content management system.",
  },
  {
    q: "What creative specifications are required for airport advertising?",
    a: "Creative specs vary by format. LED screens: 1920×1080px or 3840×2160px, H.264 video or static PNG/JPG. Static lightboxes: Vectorised files at 200 DPI minimum. Our production team can assist with artwork adaptation for all formats.",
  },
];

export default function AirportAdvertisingPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Airport Advertising Nepal", url: "/airport-advertising-nepal" },
  ]);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-brand-dark to-brand-blue-800 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="absolute top-10 right-10 text-9xl opacity-10">✈️</div>
        <div className="container-xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Airport Advertising Nepal</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red-600/20 border border-brand-red-500/40 rounded-full text-brand-red-300 text-sm font-semibold mb-6">
            ✈️ Exclusive TIA Concession Holder
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight max-w-4xl mb-6">
            Airport Advertising at
            <span className="block gradient-text">Tribhuvan International Airport</span>
            Kathmandu, Nepal
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl leading-relaxed mb-8">
            Reach 5 million+ passengers per year — executives, tourists, expats, and business
            travellers — through Smart Media&apos;s exclusive advertising network at Nepal&apos;s
            only international airport.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-secondary">Book Airport Advertising</Link>
            <Link href="#formats" className="border-2 border-white/40 text-white hover:border-white font-semibold px-6 py-3 rounded-xl transition-colors">
              View All Formats
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/20">
            {[
              { v: "5M+", l: "Annual Passengers" },
              { v: "2.5M", l: "International Travellers" },
              { v: "6", l: "Ad Format Types" },
              { v: "100%", l: "Captive Audience" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-extrabold text-white font-heading">{s.v}</p>
                <p className="text-sm text-blue-200 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Airport Advertising */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">
            Why Advertise at Tribhuvan International Airport?
          </h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p>
              Tribhuvan International Airport (TIA) is Nepal&apos;s single busiest public space and its
              only international gateway. Unlike any other advertising location in Nepal, TIA delivers
              a uniquely captive, high-income, and international audience with guaranteed minimum dwell times
              of 12–90 minutes across different zones.
            </p>
            <p className="mt-4">
              The international passenger mix at TIA includes: corporate travellers, embassy personnel,
              NGO/INGO staff, international tourists (over 1 million annually), Nepali diaspora returning
              home, and high-spending business executives. This demographic profile makes TIA advertising
              incomparable for premium brand positioning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Captive Audience", desc: "Passengers wait 12–90 minutes in ad-visible zones. No scroll-away, no ad-blocking.", icon: "🎯" },
              { title: "Premium Demographics", desc: "International visitors, executives, and high-income diaspora — Nepal's most valuable ad audience.", icon: "💼" },
              { title: "Exclusive Network", desc: "Smart Media holds exclusive concession rights. No competitor advertising. Premium share of voice.", icon: "🔒" },
            ].map((item) => (
              <div key={item.title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-3 text-center">
            Airport Advertising Formats at TIA
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Six distinct format types covering every terminal and passenger touchpoint.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airportFormats.map((fmt) => (
              <div key={fmt.name} className="card p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-sm">{fmt.name}</h3>
                  <span className="badge bg-blue-100 text-blue-700 text-xs">{fmt.size}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{fmt.desc}</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium text-gray-700">{fmt.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily impressions:</span>
                    <span className="font-semibold text-brand-blue-600">{fmt.impressions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dwell time:</span>
                    <span className="font-medium text-gray-700">{fmt.dwell}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study snippet */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-8">
            Airport Advertising Case Study
          </h2>
          <div className="card p-8 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-brand-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">NB</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Nabil Bank – International Arrival Campaign</h3>
                <p className="text-gray-500 text-sm">Banking & Financial Services | 3-month campaign</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-brand-blue-600 font-heading">1.2M</p>
                <p className="text-sm text-gray-600">Estimated impressions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-green-600 font-heading">+23%</p>
                <p className="text-sm text-gray-600">NRI account enquiries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-purple-600 font-heading">95%</p>
                <p className="text-sm text-gray-600">Brand recall (survey)</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nabil Bank ran a 3-month campaign targeting international arrivals to promote their NRI banking
              services. Screens in the baggage claim area and immigration hall delivered over 1.2 million
              impressions. A post-campaign survey found 95% brand recall among surveyed travellers, and
              NRI account enquiries increased 23% during the campaign period.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-10 text-center">
            Airport Advertising FAQs
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
      <section className="section-padding bg-brand-dark">
        <div className="container-xl text-center">
          <h2 className="text-3xl font-bold font-heading text-white mb-4">
            Book Your Airport Advertising Slot Today
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Prime locations fill fast. Contact our team to check availability and receive a customised
            proposal for your airport advertising campaign at TIA Kathmandu.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-secondary">Request Availability & Rates</Link>
            <a href="mailto:info@smartmedia.com.np" className="border-2 border-white/40 text-white hover:border-white font-semibold px-6 py-3 rounded-xl transition-colors">
              info@smartmedia.com.np
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
