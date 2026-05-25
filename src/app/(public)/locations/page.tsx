import type { Metadata } from "next";
import { buildSEOMeta, buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = buildSEOMeta({
  title: "Advertising Locations Nepal | OOH Site Network Map",
  description: "Explore Smart Media's advertising site network across Nepal — from Tribhuvan Airport to Pokhara Lakeside. View locations, formats, sizes, and availability for your next campaign.",
  path: "/locations",
  keywords: ["advertising locations Nepal", "OOH sites Kathmandu", "billboard locations Nepal", "Smart Media network", "advertising sites map Nepal"],
});

async function getLocations() {
  return prisma.asset.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      code: true,
      address: true,
      city: true,
      format: true,
      width: true,
      height: true,
      unit: true,
      status: true,
      monthlyRate: true,
      dailyImpressions: true,
      lat: true,
      lng: true,
    },
    orderBy: [{ city: "asc" }, { name: "asc" }],
  });
}

const FORMAT_LABELS: Record<string, string> = {
  STATIC_BILLBOARD: "Static Billboard",
  DIGITAL_SCREEN: "Digital Screen",
  STREET_FURNITURE: "Street Furniture",
  TRANSIT: "Transit",
  MALL: "Mall",
  AIRPORT: "Airport",
  UNIPOLE: "Unipole",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://smartmedia.com.np/" },
      { name: "Locations", url: "https://smartmedia.com.np/locations" },
    ]),
  ],
};

export default async function LocationsPage() {
  const locations = await getLocations();
  const cities = [...new Set(locations.map((l) => l.city))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-700 text-white section-padding">
        <div className="container-xl">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Locations</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">Our Site Network</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {locations.length} premium advertising sites across {cities.length} cities — from Kathmandu's busiest junctions to Pokhara's lakeside promenade.
          </p>
        </div>
      </section>

      {/* City filter tabs */}
      <section className="section-padding">
        <div className="container-xl space-y-12">
          {cities.map((city) => {
            const cityLocations = locations.filter((l) => l.city === city);
            const vacantCount = cityLocations.filter((l) => l.status === "VACANT").length;
            return (
              <div key={city} id={city.toLowerCase().replace(/\s+/g, "-")}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-gray-900">{city}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {cityLocations.length} sites · {vacantCount} available
                    </p>
                  </div>
                  <Link href="/contact" className="btn-outline py-2 px-4 text-sm">
                    Book in {city}
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cityLocations.map((loc) => (
                    <div key={loc.id} className="card p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm leading-snug">{loc.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 font-mono">{loc.code}</p>
                        </div>
                        <span className={`badge text-xs shrink-0 ${
                          loc.status === "VACANT"
                            ? "bg-green-50 text-green-700"
                            : loc.status === "BOOKED"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}>
                          {loc.status}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500">{loc.address}</p>

                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-gray-100">
                        <span className="badge bg-blue-50 text-blue-700 text-xs">
                          {FORMAT_LABELS[loc.format] ?? loc.format}
                        </span>
                        {loc.width && loc.height && (
                          <span className="badge bg-gray-50 text-gray-600 text-xs">
                            {loc.width}×{loc.height} {loc.unit}
                          </span>
                        )}
                        {loc.dailyImpressions && (
                          <span className="badge bg-purple-50 text-purple-700 text-xs">
                            {(loc.dailyImpressions / 1000).toFixed(0)}K/day
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-brand-blue-700">
                          NPR {loc.monthlyRate.toLocaleString()}/mo
                        </p>
                        {loc.status === "VACANT" && (
                          <Link href={`/contact?site=${loc.code}`} className="text-xs text-brand-blue-600 hover:underline font-medium">
                            Book now →
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {locations.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No locations listed yet.</p>
              <Link href="/contact" className="text-brand-blue-600 hover:underline mt-2 inline-block">Contact us for availability</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-blue-700 text-white text-center">
        <div className="container-xl max-w-2xl">
          <h2 className="text-3xl font-extrabold font-heading mb-4">Can't Find the Right Site?</h2>
          <p className="text-white/80 mb-8">
            Tell us your target area and audience — our team will identify the best available placements for your campaign.
          </p>
          <Link href="/contact" className="btn-primary bg-white text-brand-blue-700 hover:bg-gray-100 py-3 px-8">
            Request a Site Recommendation
          </Link>
        </div>
      </section>
    </>
  );
}
