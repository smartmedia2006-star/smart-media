import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema, buildFAQSchema, buildServiceSchema, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Advertising in Nepal | OOH, DOOH, Billboard & Airport Advertising Guide 2025",
  description:
    "Complete guide to advertising in Nepal. Explore outdoor advertising options including airport ads at TIA, highway billboards, digital OOH screens, mall & transit advertising. Get rates & availability from Nepal's #1 DOOH company.",
  keywords: ["advertising Nepal", "outdoor advertising Nepal", "OOH Nepal", "DOOH Nepal", "media planning Nepal", "advertising rates Nepal"],
  alternates: { canonical: "/advertising-nepal" },
  openGraph: {
    title: "Advertising in Nepal – Complete OOH & DOOH Guide | Smart Media",
    description: "Everything you need to know about out-of-home advertising in Nepal. Formats, locations, rates, and strategy from Smart Media – Nepal's largest DOOH network.",
  },
};

const faqs = [
  {
    q: "What types of advertising are available in Nepal?",
    a: "Nepal offers a wide range of advertising formats including airport advertising at TIA Kathmandu, highway and city billboards, LED/LCD digital screens, transit advertising (bus wraps, taxi branding), mall advertising, street furniture (bus shelters, kiosks), and newspaper/radio/digital advertising. Out-of-home (OOH) advertising is particularly effective due to high traffic volumes and limited ad-blocking.",
  },
  {
    q: "How much does advertising cost in Nepal?",
    a: "OOH advertising costs in Nepal vary by format, location, and duration. Prime airport digital screens can range from NPR 50,000–500,000/month. Highway billboards range NPR 15,000–150,000/month. Digital screens NPR 20,000–200,000/month. Transit wraps NPR 10,000–80,000/month. Smart Media offers flexible campaign packages tailored to any budget.",
  },
  {
    q: "Which is the best advertising medium in Nepal?",
    a: "The most effective advertising in Nepal combines OOH (outdoor) formats. Airport advertising at TIA provides the most premium reach. Highway billboards and unipoles deliver high daily impressions. Digital screens offer flexibility and creative impact. The best strategy integrates multiple formats for comprehensive coverage.",
  },
  {
    q: "Who handles advertising at Tribhuvan International Airport?",
    a: "Smart Media holds exclusive advertising concessions at Tribhuvan International Airport (TIA), covering the International Arrival, International Departure, and Domestic terminals. We manage all indoor and outdoor advertising placements at Nepal's busiest gateway.",
  },
  {
    q: "How do I book outdoor advertising in Nepal?",
    a: "Contact Smart Media directly via our enquiry form, call +977-1-4444444, or email info@smartmedia.com.np. Our team will prepare a customised media plan with site recommendations, availability, and pricing within 24 hours.",
  },
];

const formats = [
  {
    name: "Airport Advertising",
    reach: "5M+ annual passengers",
    formats: ["Digital light boxes", "LED screens", "Backlit panels", "Floor graphics", "Entry gates"],
    bestFor: "Premium brands, international campaigns, product launches",
    href: "/airport-advertising-nepal",
  },
  {
    name: "Highway Billboards",
    reach: "100K+ daily vehicular impressions",
    formats: ["Static billboards", "Unipoles", "Backlit hoardings", "Tri-vision"],
    bestFor: "Mass market, FMCG, real estate, automotive",
    href: "/billboard-nepal",
  },
  {
    name: "Digital OOH Screens",
    reach: "50K+ daily impressions per screen",
    formats: ["LED roadside screens", "LCD mall screens", "Airport digital panels", "Kiosk screens"],
    bestFor: "Time-sensitive campaigns, multiple ads, dynamic content",
    href: "/digital-screens-nepal",
  },
  {
    name: "Transit Advertising",
    reach: "City-wide audience",
    formats: ["Bus full wraps", "Taxi branding", "Microbus side panels", "Interior cards"],
    bestFor: "Local awareness, youth targeting, events",
    href: "/transit-advertising-nepal",
  },
  {
    name: "Mall Advertising",
    reach: "High-income shoppers",
    formats: ["Atrium banners", "LED screens", "Escalator wraps", "Floor stickers"],
    bestFor: "Retail, lifestyle, banking, insurance",
    href: "/mall-advertising-nepal",
  },
];

export default function AdvertisingNepalPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Advertising in Nepal", url: "/advertising-nepal" },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const serviceSchema = buildServiceSchema({
    name: "Advertising Services in Nepal",
    description: "Comprehensive outdoor and digital OOH advertising solutions across Nepal",
    url: "/advertising-nepal",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-blue-700 py-20 md:py-28">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Advertising in Nepal</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight max-w-3xl">
            The Complete Guide to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
              Advertising in Nepal
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            From Tribhuvan Airport to highway billboards — Nepal&apos;s advertising landscape is growing fast.
            Smart Media is your strategic partner for outdoor, digital, and transit media across the country.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-secondary">Get a Free Media Plan</Link>
            <Link href="#formats" className="btn-outline border-white text-white hover:bg-white hover:text-brand-dark">
              Explore Ad Formats
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">
            Why Advertise in Nepal?
          </h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p>
              Nepal&apos;s advertising market is one of South Asia&apos;s most dynamic and underserved. With a
              population of 30 million, growing urbanisation, a booming middle class, and 1+ million international
              tourist arrivals annually, the opportunity for brands to establish strong presence is immense —
              and competition for premium placements is still relatively limited compared to India and Bangladesh.
            </p>
            <p className="mt-4">
              Out-of-Home (OOH) advertising is the dominant impactful medium in Nepal because:
            </p>
            <ul className="mt-4 space-y-2 list-none pl-0">
              {[
                "High vehicular and pedestrian traffic in Kathmandu Valley — often at standstill due to traffic congestion, maximising dwell time",
                "Limited broadband and cable TV penetration outside Kathmandu, making physical media uniquely effective in tier-2 cities",
                "Low digital ad-blocking rates mean OOH complements digital campaigns perfectly",
                "Nepal's mountainous topography creates natural 'billboard corridors' on all major highways",
                "Growing GDP and consumer spending — brands that establish OOH presence now gain first-mover advantage",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-3 text-center">
            Advertising Formats Available in Nepal
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Smart Media offers Nepal&apos;s most comprehensive portfolio of outdoor advertising formats,
            from premium airport placements to city-wide transit campaigns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formats.map((fmt) => (
              <div key={fmt.name} className="card p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                  <Link href={fmt.href} className="hover:text-brand-blue-600 transition-colors">
                    {fmt.name}
                  </Link>
                </h3>
                <p className="text-sm font-semibold text-brand-blue-600 mb-3">{fmt.reach}</p>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1.5">Formats</p>
                  <div className="flex flex-wrap gap-1.5">
                    {fmt.formats.map((f) => (
                      <span key={f} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Best for:</span> {fmt.bestFor}
                </p>
                <Link href={fmt.href} className="mt-4 text-sm font-semibold text-brand-blue-600 hover:underline inline-flex items-center gap-1">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nepal Advertising Statistics */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-8">
            Nepal OOH Advertising Market: Key Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { value: "NPR 8B+", label: "Annual Ad Spend (Nepal)" },
              { value: "35%", label: "OOH Share of Ad Market" },
              { value: "5M+", label: "TIA Annual Passengers" },
              { value: "10M+", label: "Daily OOH Impressions" },
            ].map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <p className="text-2xl font-extrabold font-heading text-brand-blue-600">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="prose prose-gray max-w-none text-gray-600">
            <p>
              According to industry estimates, Nepal&apos;s total advertising market exceeded NPR 8 billion in 2024,
              with outdoor advertising representing approximately 35% of total spend — significantly higher than the
              global OOH average of 20%. This reflects the unique effectiveness of physical media in Nepal&apos;s context.
            </p>
            <p className="mt-4">
              Key advertising corridors include the Kathmandu Valley ring road system, the Prithvi Highway
              connecting Kathmandu to Pokhara, the Araniko Highway to the Chinese border, and the East-West
              Mahendra Highway traversing the Terai. Smart Media&apos;s network spans all of these.
            </p>
          </div>
        </div>
      </section>

      {/* Location table */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-8 text-center">
            Top Advertising Locations in Nepal
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["Location", "City", "Format", "Daily Impressions", "Best For"].map((h) => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {[
                  ["TIA International Arrival Hall", "Kathmandu", "Digital Screens", "15,000+", "Premium brands"],
                  ["Maitighar Mandala", "Kathmandu", "Billboard / Unipole", "80,000+", "Mass market, FMCG"],
                  ["Durbar Marg Junction", "Kathmandu", "Digital Screen", "50,000+", "Luxury, banking"],
                  ["Kalanki Chowk", "Kathmandu", "Billboard", "120,000+", "Automotive, telecom"],
                  ["Sifal Chowk", "Kathmandu", "Digital + Static", "45,000+", "Real estate, education"],
                  ["Lakeside Road", "Pokhara", "Billboard", "30,000+", "Tourism, hospitality"],
                  ["Bharatpur Highway Entry", "Chitwan", "Unipole", "40,000+", "FMCG, agriculture"],
                  ["Siddhartha Highway", "Butwal", "Billboard", "35,000+", "Terai market brands"],
                ].map(([loc, city, fmt, imp, best]) => (
                  <tr key={loc} className="hover:bg-gray-50">
                    <td className="table-cell font-medium">{loc}</td>
                    <td className="table-cell">{city}</td>
                    <td className="table-cell"><span className="badge bg-blue-100 text-blue-700">{fmt}</span></td>
                    <td className="table-cell font-semibold text-brand-blue-600">{imp}</td>
                    <td className="table-cell text-gray-500 text-xs">{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">* Impression data based on traffic surveys. Actual figures vary by time of day and season.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-10 text-center">
            Frequently Asked Questions about Advertising in Nepal
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
            Ready to Launch Your Nepal Advertising Campaign?
          </h2>
          <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
            Our media planning team will create a customised OOH strategy aligned to your target audience,
            budget, and campaign objectives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-brand-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg">
              Get Your Free Media Plan
            </Link>
            <a href="tel:+97714444444" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-colors">
              Call +977-1-4444444
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
